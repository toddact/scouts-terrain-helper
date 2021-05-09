async function getProfile(container,lastuser) {
  container.innerHTML = "Getting Profile ...";
  const response = await fetch("https://members.terrain.scouts.com.au/profiles", {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("CognitoIdentityServiceProvider.6v98tbc09aqfvh52fml3usas3c."+lastuser+".idToken")
    },
    redirect: 'error', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  await response.json().then(data => {
    myProfile = data;
  });;
  return response.ok;
  /*
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          //container.innerHTML = this.responseText;
          myProfile = JSON.parse(this.responseText);
      }
    };
    container.innerHTML = "Getting Profile ...";
    xhttp.open("GET", "https://members.terrain.scouts.com.au/profiles ", true);
    xhttp.setRequestHeader('Authorization',localStorage.getItem("CognitoIdentityServiceProvider.6v98tbc09aqfvh52fml3usas3c."+lastuser+".idToken"));
    xhttp.send();
    */
}

const showReportScreen = async () => {

  if (document.getElementsByClassName("v-main__wrap")[0] != undefined) {

    console.log("Loading Reports");
    //var menuItem = '<div class="NavMenu__menu-group"><div class="v-list-group NavMenu__list-group v-list-group--no-action"><div tabindex="0" aria-expanded="false" role="button" class="v-list-group__header v-list-item v-list-item--link theme--light"><a href="/reports" class="NavMenu__item v-list-item v-list-item--link theme--light" tabindex="0" router=""><div class="v-list-item__content"><!----> <div class="v-list-item__title">Reports</div></div></a></div><!----></div></div>'
      var container =  document.getElementsByClassName("v-main__wrap")[0];
      container = container.getElementsByClassName("container")[0].children[0];
      container.className="";
      //.getElementsByClassName("container");
      container.innerHTML = "";

      var lastuser = localStorage.getItem('CognitoIdentityServiceProvider.6v98tbc09aqfvh52fml3usas3c.LastAuthUser');
      console.log(lastuser);

    if (myProfile === null) {
      await getProfile(container, lastuser);
      console.log (myProfile);
    }



 
    
    

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          //container.innerHTML = this.responseText;
          var myUnit = JSON.parse(this.responseText);
          showUnit(myUnit, container,myProfile.profiles[0].unit.name);
      }
    };
    container.innerHTML = "Loading unit " + myProfile.profiles[0].unit.name + "...";
    xhttp.open("GET", "https://metrics.terrain.scouts.com.au/units/"+myProfile.profiles[0].unit.id+"/members?limit=999", true);
    xhttp.setRequestHeader('Authorization',localStorage.getItem("CognitoIdentityServiceProvider.6v98tbc09aqfvh52fml3usas3c."+lastuser+".idToken"));
    xhttp.send();
/*
      $.ajax({
        url: "https://metrics.terrain.scouts.com.au/units/0ee5b535-3746-4fdd-b52b-78695a0e860f/members?limit=999",
        method: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        cache: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "CognitoIdentityServiceProvider.6v98tbc09aqfvh52fml3usas3c."+lastuser+".idToken");
        },
        success: function (data) {
          container.innerHTML = data;
        },
        error: function (jqXHR, textStatus, errorThrown) {
          container.innerHTML = textStatus;
        }
      });
  */
  }

function completion(done, required) {
  if (done >= required) {
    return '<td class="completed"></td>';
  } else {
    return '<td>'+done+'/'+required+'</td>';
  }
}

function showUnit(myUnit, container,unitName ) {


var milestoneTable =
       {"1": {"participate": 6, "assist": 2, "lead": 1},
        "2": {"participate": 5, "assist": 3, "lead": 2},
        "3": {"participate": 6, "assist": 4, "lead": 4}}

    var out = '<h2>Unit: '+unitName+'</h2><div class="v-data-table__wrapper"><table class="reports"><thead class="v-data-table-header"><tr><th scope="col" class="UnitsMetricsTable__header text-start rotate" style="width: 180px; min-width: 180px;"><div class="d-flex align-center"><span style="white-space: initial;">Unit member</span></div></th><th class="rotate"><div><span>Age</th><th class="rotate"><div><span>Scouts</th><th class="rotate"><div><span>Section</th> ' + 
      '<th class="rotate"><div><span>Milestone 1</span></div></th><th class="rotate"><div><span>Milestone 2</th><th class="rotate"><div><span>Milestone 3</th>' +
      '<th style="width: 20px">&nbsp;</th><th class="rotate"><div><span>Current</th><th class="rotate"><div><span>Community</th><th class="rotate"><div><span>Outdoors</th><th class="rotate"><div><span>Creative</th><th class="rotate"><div><span>Personal Growth</th><th class="rotate"><div><span>Assist</th><th class="rotate"><div><span>Lead</th></tr></thead>';
    var i;
    myUnit.results.sort(compare);

    for(i = 0; i < myUnit.results.length; i++) {
        var me = myUnit.results[i];
        var into_scouts = "";
        var into_section = "";
        var m1 = ""; var m2 = ""; var m3 = "";
        if (me.milestones[0] != undefined) { if (me.milestones[0].awarded == true) { m1 = "completed";} else {m1 = "inprogress";}}
        if (me.milestones[1] != undefined) { if (me.milestones[1].awarded == true) { m2 = "completed";} else {m2 = "inprogress";}}
        if (me.milestones[2] != undefined) { if (me.milestones[2].awarded == true) { m3 = "completed";} else {m3 = "inprogress";}}
        if (me.intro_to_scouts != null) {into_scouts = "completed";}
        if (me.intro_to_section != null) {into_section = "completed";}
        for (j = 0; j < me.milestone.participates.length; j++) {
            var ca = me.milestone.participates[j].challenge_area
            me[ca] = completion(me.milestone.participates[j].total,milestoneTable[me.milestone.milestone].participate);
        }

        out +=  '<tr><td>' + me.name + '</td><td>' + me.y + '</td><td class="' + into_scouts + '"></td><td class="' + into_section + '"></td><td class="' + m1 + '"></td><td class="' + m2 + '"></td><td class="' + m3 + '"></td><td></td><td>'+me.milestone.milestone+'</td>'+me.community +me.outdoors +me.creative +me.personal_growth +
        completion(me.milestone.total_assists,milestoneTable[me.milestone.milestone].assist)+completion(me.milestone.total_leads,milestoneTable[me.milestone.milestone].lead)+'</tr>';
    }
    container.innerHTML = out + "</table></div>";

  }
  function compare( a, b ) {
    if (a.y === undefined) {
      var myRe = /(\d+)y (\d+)m/g;
      var ra = myRe.exec(a.age);
      a.y = ra[1];
      a.m = ra[2];
    }
    if (b.y === undefined) {
      var myRe = /(\d+)y (\d+)m/g;
      var rb = myRe.exec(b.age);
      b.y = rb[1];
      b.m = rb[2];
    }
    
    if ( a.y < b.y ){
      return 1;
    }
    if ( a.y > b.y ){
      return -1;
    }
    if ( a.m < b.m ){
      return 1;
    }
    if ( a.m > b.m ){
      return -1;
    }
    return 0;
  }

   /*
Class
  .NavMenu__menu-container.v-list


  https://terrain.scouts.com.au/config.json
  https://members.terrain.scouts.com.au/profiles  -> get group from each profile

  -- Get the units for the group
  https://metrics.terrain.scouts.com.au/groups/5c8d7417-4b77-30bc-9c21-ad814d8680e4/units?limit=999 

-- Get the members for the unit
  https://metrics.terrain.scouts.com.au/units/0ee5b535-3746-4fdd-b52b-78695a0e860f/members?limit=999

  */

  
};

const setupMenu = () => {

    if (document.getElementsByClassName("v-list")[0] != undefined) {
      
      //var menuItem = '<div class="NavMenu__menu-group"><div class="v-list-group NavMenu__list-group v-list-group--no-action"><div tabindex="0" aria-expanded="false" role="button" class="v-list-group__header v-list-item v-list-item--link theme--light"><a id="reports" href="#reports" class="NavMenu__item v-list-item v-list-item--link theme--light" tabindex="0" router=""><div class="v-list-item__content"><!----> <div class="v-list-item__title">Reports</div></div></a></div><!----></div></div>';
      var menuItem = '<a id="reports" href="#reports" class="NavMenu__item v-list-item v-list-item--link theme--light" tabindex="0" router=""><div class="v-list-item__content"><!----> <div class="v-list-item__title">Reports</div></div></a>';
      //var menu =  $(".NavMenu__menu-container > .v-list");
      //var menu = document.getElementsByClassName("v-list")[0];
      var menu = document.getElementsByClassName("ProfileSwitcher__panel")[0];
      //var menuItem = menu.lastElementChild.clone()
      menu.innerHTML += menuItem;

      document.getElementById('reports').addEventListener('click',showReportScreen);
    } else {
      console.log("Menu is undefined");
      window.setTimeout(setupMenu, 1000);
    }
//<div class="v-main__wrap"><div class="container app-container container--fluid"></div>

};

var myProfile = null;

window.addEventListener("load", function(event) {
    console.log("Loading Todds Scout Reports");

    const cmenu = setupMenu();
    const cshowReportScreen = showReportScreen();

    cmenu;
});

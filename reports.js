//Get the userProfile to work out the Unit.
// TODO: Check if they are in multiple units and allow them to select.
async function getProfile(container,lastuser) {
  container.innerHTML = "Getting Profile ...";
  const response = await fetch("https://members.terrain.scouts.com.au/profiles", {
    method: 'GET', mode: 'cors', cache: 'no-cache', credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem("CognitoIdentityServiceProvider.6v98tbc09aqfvh52fml3usas3c."+lastuser+".idToken")
    },
    redirect: 'error', referrerPolicy: 'no-referrer', 
  });
  await response.json().then(data => {
    myProfile = data;
  });;
  return response.ok;
}

async function showReportScreen(){

  if (document.getElementsByClassName("v-main__wrap")[0] != undefined) {

    console.log("Loading Reports");
    var container =  document.getElementsByClassName("v-main__wrap")[0];
    container = container.getElementsByClassName("container")[0].children[0];
    container.className=""; //Remove the class from the container. The class on basecamp causes layout issues.
    container.innerHTML = ""; //Clear page.

    var lastuser = localStorage.getItem('CognitoIdentityServiceProvider.6v98tbc09aqfvh52fml3usas3c.LastAuthUser');
    console.log(lastuser);

    if (myProfile === null) {
      await getProfile(container, lastuser);
      console.log (myProfile);
    }

    

    //return m;

    container.innerHTML = "Loading unit " + myProfile.profiles[0].unit.name + "...";
    const response = await fetch("https://metrics.terrain.scouts.com.au/units/"+myProfile.profiles[0].unit.id+"/members", { //?limit=999
        method: 'GET', mode: 'cors', cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem("CognitoIdentityServiceProvider.6v98tbc09aqfvh52fml3usas3c."+lastuser+".idToken")
        },
        redirect: 'error', referrerPolicy: 'strict-origin-when-cross-origin', 
     }).catch(err => {
      container.innerHTML = "An error has occured loading unit members<br><pre>" + err + "</pre><p>Going to try using cached records...</p>";
      console.log("Error getting members from API. " + err);
      getMembersMetricsCache(myProfile.profiles[0].unit.id).then(data => {
        container.innerHTML += "<br>Calling showUnit using cached data...";
        showUnit(data, container,myProfile.profiles[0].unit.name + " (Cached)");
      })
    });
    response.json().then(data => {
       container.innerHTML += "<br>Calling showUnit...";
        showUnit(data, container,myProfile.profiles[0].unit.name);
    });;
    

   // window.webpackJsonp
  //const M = await window.$workbox;
  //this.$accessor.me.getUnitMembersData
  //window.webpackJsonp.$accessor.me.getUnitMembersData
  //getUnitMembers
}
function getUnitMembers(M) {
  return D.a.get("https://metrics.terrain.scouts.com.au/units/"+M+"/members?limit=999").then((M=>M.data.results)).catch((M=>{
      if (console.warn("Failed to retrieve the Unit's Members. Error: " + M),
      window.$nuxt.isOffline)
          return window.$nuxt.error({
              statusCode: 503,
              message: ""
          })
  }
  ));
}

async function getMembersMetricsCache(M) {

  console.log("Getting members from cache");
  const cacheStorage   = await caches.open( "workbox-runtime-https://terrain.scouts.com.au/" );
  const request = new Request("https://metrics.terrain.scouts.com.au/units/"+M+"/members");
  const options = {ignoreSearch: true, ignoreVary: true}
  const cachedResponse = await cacheStorage.match(request.url, options);

  if ( ! cachedResponse || ! cachedResponse.ok ) {
    console.log("error getting members from cache");
    return false;
 }
 //return cachedResponse;
 return await cachedResponse.json();

 /* const M = await window.$workbox;
  
    i = await M.core.caches.open("workbox-runtime-https://terrain.scouts.com.au/")
            , o = await l({
              plugins: r,
              request: t,
              mode: "read"
          });
          */
}
//If requirement is completed, show a tick
function completion(done, required) {
  if (done >= required) {
    return '<td class="completed"></td>';
  } else {
    return '<td>'+done+'/'+required+'</td>';
  }
}



function oas(oas) {
  var oaslist = {"camping":"-", "bushcraft": "-" ,"bushwalking": "-","alpine":"-","cycling":"-","vertical":"-","aquatics":"-","boating":"-","paddling":"-"};
 
  for (i = 0; i < oas.highest.length; i++) {
    if (oaslist[oas.highest[i].branch] == "-" || oas.highest[i].stage > oaslist[oas.highest[i].branch]) {
      oaslist[oas.highest[i].branch] = oas.highest[i].stage;
    }
  }
  oas.list = oaslist;
  return '<td class="core">'+oas.list.camping+'</td><td class="core">'+oas.list.bushcraft+'</td><td class="core">'+oas.list.bushwalking+'</td><td>'+oas.list.alpine+'</td><td>'+oas.list.cycling+'</td><td>'+oas.list.vertical+'</td><td class="water">'+oas.list.aquatics+'</td><td class="water">'+oas.list.boating+'</td><td class="water">'+oas.list.paddling+'</td>';
}


function showUnit(myUnit, container,unitName ) {


    var milestoneTable =
       {"1": {"participate": 6, "assist": 2, "lead": 1},
        "2": {"participate": 5, "assist": 3, "lead": 2},
        "3": {"participate": 6, "assist": 4, "lead": 4}}

    var out = '<h2>Unit: '+unitName+'</h2><div class="v-data-table__wrapper"><table class="reports"><thead class="v-data-table-header"><tr><th scope="col" class="UnitsMetricsTable__header text-start rotate" style="width: 180px; min-width: 180px;"><div class="d-flex align-center"><span style="white-space: initial;">Unit member</span></div></th><th class="rotate"><div><span>Age</th><th class="rotate"><div><span>Scouts</th><th class="rotate"><div><span>Section</th> ' + 
      '<th class="rotate"><div><span>Milestone 1</span></div></th><th class="rotate"><div><span>Milestone 2</th><th class="rotate"><div><span>Milestone 3</th>' +
      '<th class="divider">&nbsp;</th><th class="rotate"><div><span>Current</th><th class="rotate"><div><span>Community</th><th class="rotate"><div><span>Outdoors</th><th class="rotate"><div><span>Creative</th><th class="rotate"><div><span>Personal Growth</th><th class="rotate"><div><span>Assist</th><th class="rotate"><div><span>Lead</th>' +
      '<th class="divider"><div><span></th><th class="rotate"><div><span>Camping</th><th class="rotate"><div><span>Bushcraft</th><th class="rotate"><div><span>Bushwalking</th>' +
      '<th class="rotate"><div><span>Alpine</th><th class="rotate"><div><span>Cycling</th><th class="rotate"><div><span>Vertical</th>' +
      '<th class="rotate"><div><span>Aquatics</th><th class="rotate"><div><span>Boating</th><th class="rotate"><div><span>Paddling</th>' +
      '</tr></thead>';
    var i;
    myUnit.results.sort(compareAge);

    for(i = 0; i < myUnit.results.length; i++) { //For each scout
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
        

        out +=  '<tr><td>' + me.name + '</td><td>' + me.y + '</td><td class="' + into_scouts + '"></td><td class="' + into_section + '"></td><td class="' + m1 + '"></td><td class="' + m2 + '"></td><td class="' + m3 + '"></td><td class="divider">&nbsp;</td><td>'+me.milestone.milestone+'</td>'+me.community +me.outdoors +me.creative +me.personal_growth +
        completion(me.milestone.total_assists,milestoneTable[me.milestone.milestone].assist)+completion(me.milestone.total_leads,milestoneTable[me.milestone.milestone].lead)+'<td class="divider">&nbsp</td>'+oas(me.oas)+'</tr>';
    }
    //Output Table
    container.innerHTML = out + "</table></div>";
   

     if (debug) {
      myUnit.results[0].member_id = "*****"
      var myRe = /(.*) (\w).*/g;
      var ra = myRe.exec(myUnit.results[0].name);
      myUnit.results[0].name = ra[1]+' '+ra[2];
        out = "<br>Debug:<br /><pre>"+JSON.stringify(myUnit.results[0])+"</pre>";
        container.innerHTML += out;

     }
  }

// Compare Ages of scouts. Oldest will appear at the top
function compareAge( a, b ) {
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
};


const setupMenu = () => {

    if (document.getElementsByClassName("v-list")[0] != undefined) {
      
      var menuItem = '<a id="reports" href="#reports" class="NavMenu__item v-list-item v-list-item--link theme--light" tabindex="0" router=""><div class="v-list-item__content"><!----> <div class="v-list-item__title">Reports ('+chrome.runtime.getManifest().version+')</div></div></a>';
      var menu = document.getElementsByClassName("ProfileSwitcher__panel")[0];
      menu.innerHTML += menuItem;

      document.getElementById('reports').addEventListener('click',showReportScreen);
      console.log("Report button added");
    } else {
      console.log("Menu is undefined");
      window.setTimeout(setupMenu, 1000);
    }
};

console.log (chrome.runtime.getManifest().name + " - Version: " + chrome.runtime.getManifest().version);

var myProfile = null;
var debug = false;

chrome.storage.sync.get(['enabled'], function(result) {
   if (typeof result.enabled === 'undefined' || result.enabled) {
    window.setTimeout(load, 100);
   } else {
     console.log ("Plugin not enabled");
   }
});



chrome.storage.sync.get(['debug'], function(result) {
  if (result.debug == 1) {debug = true;}
  console.log((debug) ? 'Extension Debug on' : 'Extension Debug off');
});


function load() {

    if(document.getElementsByClassName("v-list")[0] === undefined) {
        window.setTimeout(load, 100);
    } else {
        //Load
    
        if (document.getElementsByClassName("ProfileSwitcherManageUser__backToCurrent").length > 0) {
            console.log("Don't load when in another role");
        } else {


            //window.addEventListener("load", function(event) {
                console.log("Loading Scout Reports - Custom");

                const cmenu = setupMenu();
                //const cshowReportScreen = showReportScreen();

                cmenu;
            // });
        }
    }
}

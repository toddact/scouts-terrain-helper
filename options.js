// Saves options to chrome.storage
function save_options() {
  var refreshInterval = document.getElementById('refreshInterval').value;
  chrome.storage.sync.set({
    refreshInterval: refreshInterval
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value 30 seconds
  chrome.storage.sync.get({
    refreshInterval: '30'
  }, function(items) {
    document.getElementById('refreshInterval').value = items.refreshInterval;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);


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
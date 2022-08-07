function onOpen() {
  var ui = SpreadsheetApp.getUi();
  var service = getService();
  


  if (service.hasAccess()) {

    ui.createMenu('Jira integration').addItem('Get', 'getIssuesFromMultiProject')  
    .addItem('Send', 'updateRecords')
    .addItem('Disconnect    Jira', 'reset').addToUi();

  }

  else {

    ui.createMenu('Jira integration').addItem('Connect to Jira', 'run').addToUi();
  }

}



function checkHasAccess()
{
  ScriptApp.newTrigger('reloadUI')
  .timeBased()
  .everyMinutes(1)
  .create();
}

function reloadUI ()
{
  onOpen();
}



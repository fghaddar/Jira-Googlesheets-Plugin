function updateIssues() {
  var service = getService();
  Logger.log(service.getAccessToken());
  var issueIdOrKey = 'CP-15'
  Logger.log(service.hasAccess());
  if (service.hasAccess()) {

    var data = {
      "update": {
        // updates summary
        "summary": [{ "set": "Demo update 2!" }],
        // updates priority level
        "priority": [{ "set": { "id": "5" } }]
      }
    };
   
    var route = `/rest/api/3/issue/${issueIdOrKey}`;
    var cloudid = getCloudId(service);
    var url = 'https://api.atlassian.com/ex/jira/' + cloudid + route;
    // var url = 'https://api.atlassian.com/ex/jira/' + cloudid + route+'?overrideEditableFlag=true';
    Logger.log(url);

    seePermission();

    Logger.log(service.getAccessToken());

    var headers = {
     "Accept": "application/json",
     "Content-Type": "application/json",
     'Authorization': 'Bearer ' + service.getAccessToken()
     };

    var options = {
      'method' : 'put',
      'headers' : headers,
      'payload' : JSON.stringify(data)
      };

      var response = UrlFetchApp.fetch(url, options);

      Logger.log(response.getResponseCode());
      Logger.log(service.getAccessToken());
      
      // if response is not 204, it is invalid 
      if (response.getResponseCode() != 204) {
        Logger.log("Update Failed")
        Logger.log ("Should get a response of 204 but received  " + response.getResponseCode());
        return;
      }
      // otherwise, update was successful 
      Logger.log("Updated Successful with response " + response.getResponseCode());
  }
}
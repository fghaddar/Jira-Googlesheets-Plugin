function popUsendDataToJirap() {

  // Make a POST request with a JSON payload.

  var service = getService();

  Logger.log(service.hasAccess());

  if (service.hasAccess()) {

    var data = {
   "fields":{
      "summary":"Testing create issue.",
      "issuetype":{
         "id": "10012"
      },
      "project":{
         "id": "10003"
      }
   }
};

    var route = '/rest/api/3/issue';
    var cloudid = getCloudId(service);

    var url = 'https://api.atlassian.com/ex/jira/' + cloudid + route;
    Logger.log(url);


    var headers = {
     "Accept": "application/json",
     "Content-Type": "application/json",
     'Authorization': 'Bearer ' + service.getAccessToken()
     };
  
    var options = {
      'method' : 'post',
      'headers' : headers,
      'payload' : JSON.stringify(data)
}
    try {
      var response = UrlFetchApp.fetch(url, options);
      var result = JSON.parse(response.getContentText());
    } catch (err) {
      Logger.log(err);
    }






  }

}

function GenericGetRequest(endPoints) {


  var service = getService();

  Logger.log(service.hasAccess());

  if (service.hasAccess()) {
    var cloudid = getCloudId(service);

    //var url = 'https://api.atlassian.com/ex/jira/' + cloudid +
    // '/rest/api/2/project';

    var url = 'https://api.atlassian.com/ex/jira/' + cloudid + endPoints;


    Logger.log(url);

    var response = UrlFetchApp.fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + service.getAccessToken()
      }
    });
  }

  return response;

}

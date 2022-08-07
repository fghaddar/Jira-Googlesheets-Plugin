
//dark issue

//https://developer.atlassian.com/server/jira/platform/jira-rest-api-examples/#creating-an-issue-examples
//https://confluence.atlassian.com/jiracore/createmeta-rest-endpoint-to-be-removed-975040986.html
//https://confluence.atlassian.com/jirakb/enable-dark-feature-in-jira-959286331.html


function enbaleDarkFeature() {

  var service = getService();
  var cloudid = getCloudId(service);

  if (service.hasAccess()) {

//var url = 'https://api.atlassian.com/ex/jira/' + cloudid +`/rest/internal/1.0/darkFeatures/R3cEtR4MhfUdkk3Jvv3R`;
var url = 'https://api.atlassian.com/ex/jira/' + cloudid +`/rest/internal/1.0/darkFeatures/${service.getAccessToken()}`;
//var url = 'https://api.atlassian.com/ex/jira' +`/rest/internal/1.0/darkFeatures/${cloudid}`;
var payload = {
  "enabled": "true"
};
var headers = {
//  "Accept": "application/json", // Modified (I couldn't confirm whether this is required.)
//  "Content-Type": "application/json", // Modified
   Authorization: 'Bearer ' + service.getAccessToken()
};
var options = {
  "method": "put",
  "headers": headers,
//  "contentType" : "application/json", // Modified
  "payload": payload, // Modified
  "muteHttpExceptions" : true,
};
var request = UrlFetchApp.getRequest(url, options);
Logger.log(request);
var response = UrlFetchApp.fetch(url,options);
Logger.log(response.getContentText());

  }

}


function testingWind()
{
   showLoading();
   closeLoadingWindow();
}

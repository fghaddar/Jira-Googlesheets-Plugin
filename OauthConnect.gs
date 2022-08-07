
/**
 * Demonstrates how to authorize access to the Jira API using the authorization
 * code grants (3LO) for apps flow.
 * @see {@link https://developer.atlassian.com/cloud/jira/platform/oauth-2-authorization-code-grants-3lo-for-apps/}
 */


// ** information a client needs to provide **  one can get this info from here https://documentation.agilepoint.com/8010/admin/accesstokenFindConsumerKeySecretJira.html#:~:text=In%20Jira%20Software%2C%20to%20copy%20the%20Client%20ID%2C,details%20screen%2C%20in%20the%20Secret%20field%2C%20click%20Copy.
var CLIENT_ID = ''; 
var CLIENT_SECRET = ''; 


// ** another client example **
//var CLIENT_ID = '';  
//var CLIENT_SECRET = ''; 









// scope are space seperated
var SCOPE = `read:jira-user read:jira-work write:jira-work manage:jira-configuration`;
var PROJECT_NAME = '';
var SheetWithAllIssues = 'ALL-ISSUES';


//'read:jira-work manage:jira-project manage:jira-configuration read:jira-user write:jira-work manage:jira-webhook manage:jira-data-provider read:issue:jira write:issue:jira read:issue-type:jira //write:issue-type:jira';

// The key to use when storing the cloudid.
var CLOUDID_KEY = 'cloudid';

/**
 * Authorizes and makes a request to the UltraCart API.
 */
function run() {
  var service = getService();

  Logger.log(service.hasAccess());
  //Logger.log(service.getAccessToken());

  //updateIssue(service);

  if (service.hasAccess()) {

      //updateIssue(service);


    var cloudid = getCloudId(service);
    var url = 'https://api.atlassian.com/ex/jira/' + cloudid +
      '/rest/api/3/myself';
    var response = UrlFetchApp.fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + service.getAccessToken()
      }
    });
    var result = JSON.parse(response.getContentText());
    Logger.log(JSON.stringify(result, null, 2));
  } else {
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s',
      authorizationUrl);

    //const authinfo = ScriptApp.getAuthorizationInfo();
    //SpreadsheetApp.getUi().alert(authinfo.getAuthorizationStatus());

    // Logger.log('authorization status: %s',
    //authinfo.getAuthorizationStatus());

    //SpreadsheetApp.getUi().alert(`Please authenticate this link here : ${authorizationUrl}`)


    //var result = SpreadsheetApp.getUi().alert("Jake is requesting 3 days of vacation in June. Do you approve?", SpreadsheetApp.getUi().ButtonSet.//YES_NO);
    //SpreadsheetApp.getActive().toast(result);
    openUrl(authorizationUrl);


  }
}

/**
 * Gets the cloudid of the Jira site to operate against. This implementation
 * selects the first authorized site, but in a real application you'd probably
 * want to let the user select which site to operate against. After the first
 * run the cloudid is saved into the service's storage layer for easy retrieval.
 * @param {OAuth.Service_} service The authorized service.
 * @returns {string} The cloudid of the site to operate on.
 */
function getCloudId(service) {
  var cloudid = service.getStorage().getValue(CLOUDID_KEY);
  if (cloudid) return cloudid;
  // Get the cloudid of the first site the user has access to.
  var url = 'https://api.atlassian.com/oauth/token/accessible-resources';
  var response = UrlFetchApp.fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + service.getAccessToken()
    }
  });
  var result = JSON.parse(response.getContentText());
  cloudid = result[0].id;
  service.getStorage().setValue(CLOUDID_KEY, cloudid);
  return cloudid;
}

/**
 * Reset the authorization state, so that it can be re-tested.
 */
function reset() {
  getService().reset();
}

/**
 * Configures the service.
 */
function getService() {

  var YOUR_USER_BOUND_VALUE = getStateToken('authCallback');
  return OAuth2.createService('Jira')
    // Set the endpoint URLs.
    .setAuthorizationBaseUrl('https://auth.atlassian.com/authorize')
    .setTokenUrl('https://auth.atlassian.com/oauth/token')

    // Set the client ID and secret.
    .setClientId(CLIENT_ID)
    .setClientSecret(CLIENT_SECRET)

    // Set the name of the callback function that should be invoked to
    // complete the OAuth flow.
    .setCallbackFunction('authCallback')

    // Set the property store where authorized tokens should be persisted.
    .setPropertyStore(PropertiesService.getUserProperties())

    .setParam('state', YOUR_USER_BOUND_VALUE)

    // new

        .setCache(CacheService.getUserCache())
        .setLock(LockService.getUserLock())

      // Requests offline access.
      .setParam('access_type', 'offline')
      .setParam('offline_access', true)


    // end

    // Set the scope and other paramaeters required by Atlassian.
    .setScope(SCOPE)
    .setParam('audience', 'api.atlassian.com')
    .setParam('response_type', 'code') // this new
    .setParam('prompt', 'consent');
}




/**
 * Handles the OAuth callback.
 */
function authCallback(request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied');
  }
}


function getStateToken(callbackFunction) {
  var stateToken = ScriptApp.newStateToken()
    .withMethod(callbackFunction)
    .withTimeout(120)
    .createToken();
  return stateToken;
}

/**
 * Logs the redict URI to register.
 */
function logRedirectUri() {
  Logger.log(OAuth2.getRedirectUri());
}

function getProjectName() {
  // will need to get project name from UI but for now, project = 'capstone-project'
  return PROJECT_NAME;
}
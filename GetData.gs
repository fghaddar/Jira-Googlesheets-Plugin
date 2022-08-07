

function getJiraData() {

  var service = getService();

  Logger.log(service.hasAccess());

  if (service.hasAccess()) {
    var cloudid = getCloudId(service);
    var url = 'https://api.atlassian.com/ex/jira/' + cloudid +
      '/rest/api/2/project';

    // var url = 'https://api.atlassian.com/ex/jira/' + cloudid +
    //  '/rest/api/3/issuetype';

    Logger.log(url);

    var response = UrlFetchApp.fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + service.getAccessToken()
      }
    });
    var result = JSON.parse(response.getContentText());

    Logger.log(JSON.stringify(result, null, 2));
  }


  //get issue type
  //getIssueType("10000");

}



function getAccountId(UserName) {
  // var UserName = "Bablu Banik"
  var response = GenericGetRequest('/rest/api/3/users');
  var result = JSON.parse(response.getContentText());

  var IDaccouint = null;



  for (var i = 0; i < result.length; i++) {


    if (result[i].displayName == UserName) {
      Logger.log(result[i].accountId);
      Logger.log(result[i].displayName);
      IDaccouint = result[i].accountId;
      break;

    }

  }

  return IDaccouint;

}


function getProjectID() {

  var givenProjectName = "Test Task Project"
  var response = GenericGetRequest('/rest/api/3/project');


  var result = JSON.parse(response.getContentText());

  var projectId;
  //Logger.log(JSON.stringify(result, null, 2));

  for (var i = 0; i < result.length; i++) {
    var avilableProject = result[i].name; //JSON.stringify(result[i].name);
    if (avilableProject.localeCompare(givenProjectName) == 0) {
      Logger.log(result[i].name);
      projectId = result[i].id;
      Logger.log(projectId);
    }

  }

  return projectId;

}





function getIssueType(projectIdOrKey) {

  var givenProject = getProjectID();
  var response = GenericGetRequest('/rest/api/3/issuetype');
  var result = JSON.parse(response.getContentText());
  // Logger.log(JSON.stringify(result, null, 2));

  var issueTypeName;
  for (var i = 0; i < result.length; i++) {

    try {
      var avilableProject = result[i].scope.project.id;


      if (avilableProject.localeCompare(givenProject) == 0) {
        Logger.log(result[i].scope.project.id);
        issueTypeName = result[i].name;
        Logger.log(issueTypeName);
      }

    }

    catch (e) {

      Logger.log(e);

    }


  }


}




function getEditMatedataBykey() {
  var issueKey = "CP-18"
  var response = GenericGetRequest(`/rest/api/3/issue/${issueKey}/editmeta`);

  //var ticketMetaData = `/rest/api/3/issue/${issueKey}?expand=fields`;

  var ticketMetaData = `/rest/api/3/issue/${issueKey}`;

  var response = GenericGetRequest(ticketMetaData);

  Logger.log(response);

  return response;


}


function getIssueMetaDataByKey(issueKey) {

  var response = GenericGetRequest('/rest/api/3/issue/createmeta');

  //var ticketMetaData = `/rest/api/3/issue/${issueKey}?expand=fields`;

  var ticketMetaData = `/rest/api/3/issue/${issueKey}`;

  var response = GenericGetRequest(ticketMetaData);

  //var result = JSON.parse(response.getContentText());

  // var result = JSON.stringify(response);

  //Logger.log(result.projects.issuetypes.fields);



  //var activeSpreadSheet = SpreadsheetApp.openById('1WrDxypLYy-i0s3MgsOFW3fOo4OPd_9OnxcBo1b-esHw');
  //var sheet = activeSpreadSheet.getActiveSheet();

  //var sheet = activeSpreadSheet.getSheetByName('Result');


  //var sheet = activeSpreadSheet.getSheetByName('Result');

  // sheet.appendRow([`${JSON.stringify(result, null, 2)}`]);

  // Logger.log(JSON.stringify(result, null, 2));
  Logger.log(response);

  //return JSON.stringify(result, null, 2);

  return response;


}

function getStatusInfomation() {
  const projectName = getProjectName();
  Logger.log(projectName);
  const endPoint = `/rest/api/3/search?jql=project=${projectName}&maxResults=100&startAt=0`;
  Logger.log(endPoint)

  const response = GenericGetRequest(endPoint);
  const data = JSON.parse(response.getContentText());

  // Logger.log(data);

  for (var i = 0; i < data.total; i++) {
    Logger.log(data.issues[i].key);

    Logger.log(data.issues[i].fields.duedate);
  }


}


function getTransitionInfomationID(issueKey, transitionsName) {

  //function getTransitionInfomationID() {

  //var issueKey = 'CP-13'
  //var transitionsName = 'Done'

  const endPoint = `/rest/api/3/issue/${issueKey}/transitions`;
  Logger.log(endPoint)

  const response = GenericGetRequest(endPoint);
  const data = JSON.parse(response.getContentText());

  //Logger.log(data);

  var transitionsID = "";

  for (var i = 0; i < data.transitions.length; i++) {
    if (transitionsName == data.transitions[i].name) {

      Logger.log(data.transitions[i].id);
      Logger.log(data.transitions[i].name);

      transitionsID = data.transitions[i].id;
      break;

    }

  }

  return transitionsID;


}


function getIssueMetaData() {
  var givenProject = getProjectID();
  var response = GenericGetRequest('/rest/api/3/issue/createmeta');
  // var response = GenericGetRequest ('/rest/api/3/createmeta');  // wrong api cause 403 error https://ecosystem.atlassian.net/browse/ACJIRA-2149
  var ticketMetaData = '/rest/api/3/issue/CP-16?expand=fields';
  var resources = '/';
  //var response = GenericGetRequest ('/rest/api/3/issue/CP-16?expand=fields');
  //var response = GenericGetRequest (`/rest/api/3/issue/createmeta/projectIds=${givenProject}`);
  var result = JSON.parse(response.getContentText());

  //var result = JSON.parse(response);

  //Logger.log(result.projects.issuetypes.fields);



  //var activeSpreadSheet = SpreadsheetApp.openById('1WrDxypLYy-i0s3MgsOFW3fOo4OPd_9OnxcBo1b-esHw');
  //var sheet = activeSpreadSheet.getActiveSheet();

  //var sheet = activeSpreadSheet.getSheetByName('Result');

  // sheet.appendRow([`${JSON.stringify(result, null, 2)}`]);






  Logger.log(JSON.stringify(result, null, 2));
  //Logger.log(`Response: ${response.status} ${response.statusText}`);
}

/*------------------------------------------------
  New Functions to display all issues for project 
  ------------------------------------------------*/

// Gets project name 
// function getProjectName() {
//   // will need to get project name from UI but for now, project = 'capstone-project'
//   return 'capstone-project';
// }

function getIssuesFromProject() {
  const projectName = getProjectName();
  Logger.log(projectName);
  const endPoint = `/rest/api/3/search?jql=project=${projectName}&maxResults=100&startAt=0`;
  Logger.log(endPoint)

  const response = GenericGetRequest(endPoint);
  const data = JSON.parse(response.getContentText());
  Logger.log(data);
  const issues = data.total;
  const maxResults = 100;

  // if the number of issues is greater than 100, it will append 100 issues at a time to the data object
  for (let i = 0; i < issues; i++) {
    if ((i % maxResults == 0) && (i > 0)) {
      let newEndPoint = `/rest/api/3/search?jql=project=${projectName}&maxResults=100&startAt=${i}`;
      let newResponse = GenericGetRequest(newEndPoint);
      let newData = JSON.parse(newResponse.getContentText());
      data.issues.push(...newData.issues);
    }
  }

  // retrieves issueId of first issue to list custom statuses from statusEndPoint
  Logger.log("data.issues = " + data.issues);
  if (data.issues != "0" && data.issues != '') {
    const issueId = data.issues[0].id;
    const statusEndPoint = `/rest/api/3/issue/${issueId}/editmeta`
    Logger.log("issue id = " + issueId);

    const statusResponse = GenericGetRequest(statusEndPoint);
    const statusData = JSON.parse(statusResponse.getContentText());
    Logger.log(statusData);


    // displays data
    displayData(data, statusData);

  }
}



function getDataAndStatusInfo(dataFull, statusDataFull) {


  

  const projectName = getProjectName();
  Logger.log(projectName);
  const endPoint = `/rest/api/3/search?jql=project=${projectName}&maxResults=100&startAt=0`;
  Logger.log(endPoint)

  const response = GenericGetRequest(endPoint);
  const data = JSON.parse(response.getContentText());
  Logger.log(data);
  const issues = data.total;
  const maxResults = 100;

  // if the number of issues is greater than 100, it will append 100 issues at a time to the data object
  for (let i = 0; i < issues; i++) {
    if ((i % maxResults == 0) && (i > 0)) {
      let newEndPoint = `/rest/api/3/search?jql=project=${projectName}&maxResults=100&startAt=${i}`;
      let newResponse = GenericGetRequest(newEndPoint);
      let newData = JSON.parse(newResponse.getContentText());
      data.issues.push(...newData.issues);
    }
  }



  // retrieves issueId of first issue to list custom statuses from statusEndPoint
  var statusData;
  Logger.log("data.issues = " + data.issues);
  if (data.issues != "0" && data.issues != '') {
    const issueId = data.issues[0].id;
    const statusEndPoint = `/rest/api/3/issue/${issueId}/editmeta`
    Logger.log("issue id = " + issueId);

    const statusResponse = GenericGetRequest(statusEndPoint);
    statusData = JSON.parse(statusResponse.getContentText());
    Logger.log(statusData);

  }

  dataFull = data;
  statusDataFull = statusData;

  return [dataFull, statusDataFull];

}


// adding all data and status together

//   dataFull.total =  dataFull.total + data.total;
//   dataFull.issues = dataFull.issues.concat(data.issues);


//   //statusDataFull = statusData.concat(statusDataFull); //statusDataFull.concat(statusData);


//   for(var key in statusDataFull.fields){
//   Logger.log(key, statusDataFull.fields[key]);
// }



//   for(var key in statusData.fields){
//   Logger.log(key, statusData.fields[key]);
// }


//   var answer = statusDataFull.fields.length();
//   var answer1 = statusData.fields.length();

// statusDataFull = answer.concat(answer1);

// statusDataFull = result;


//}


function getIssuesFromMultiProject() {

  // list of all projects


  var givenProjectName = "Test Task Project"
  var response1 = GenericGetRequest('/rest/api/3/project');


  var result = JSON.parse(response1.getContentText());

  var projectKey;
  //Logger.log(JSON.stringify(result, null, 2));

  // clearning sheet before loading all data
  // var  activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  // var yourNewSheet = activeSpreadSheet.getSheetByName(SheetWithAllIssues);
  // if (yourNewSheet != null) {
  //     yourNewSheet.clear();

  // }

  // array of unique default statuses
  const defaultStatuses = getDefaultStatuses();

  for (var i = 0; i < result.length; i++) {
    PROJECT_NAME = result[i].key;
    Logger.log(PROJECT_NAME);

    // var dataFull = {"total": 0, "issues":[]};
    // var statusDataFull = {"fields":{}};

    var dataFull;
    var statusDataFull;

    var info = getDataAndStatusInfo(dataFull, statusDataFull);

    dataFull = info [0];
    statusDataFull = info[1];

    var sheet;

    if (i == 0)
      sheet = prepareIssueSheet(dataFull, statusDataFull);



    if (statusDataFull!=null)
      displayData2(dataFull, statusDataFull, sheet, defaultStatuses);

  }


}

// function used to get unique default stauses
function getDefaultStatuses() {
  
  const statusEndPoint = `/rest/api/3/status`

  const statusResponse = GenericGetRequest(statusEndPoint);
  statusData = JSON.parse(statusResponse.getContentText());

  let statusList = [];
  
  for(let i = 0; i < statusData.length; i++) {
    statusList.push(statusData[i].name)
  }
 
  // returns an array of unique default statuses
  const defaultStatuses = statusList.filter((value, index, arr) => arr.indexOf(value) === index); 
 
  return defaultStatuses;
}




function notInUSE() {

  const statusEndPoint = `/rest/api/3/project/CP`

  const statusResponse = GenericGetRequest(statusEndPoint);
  var statuInfo = JSON.parse(statusResponse.getContentText());


  var query = 'google sheet';
  var url = 'https://api.github.com/search/repositories?sort=stars&q=' + encodeURIComponent(query);
  var response = UrlFetchApp.fetch(url, {
    'muteHttpExceptions': true
  });

  //var activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();

  var activeSpreadSheet = SpreadsheetApp.openById('1WrDxypLYy-i0s3MgsOFW3fOo4OPd_9OnxcBo1b-esHw');
  //var sheet = activeSpreadSheet.getActiveSheet();

  var sheet = activeSpreadSheet.getSheetByName('Result');

  sheet.appendRow(["James"]);
  sheet.appendRow(["Tapon", "562"]);
  sheet.appendRow(["56"]);
  sheet.appendRow(["36"]);
  sheet.appendRow(["%%&7"]);
  //Logger.log(response);

  for (var p in response.items) {

    Logger.log(response.items[p].id);
  }

  Logger.log(url);

}



// permission

function seePermission() {
  var service = getService();
  // Get the cloudid of the first site the user has access to.
  var url = 'https://api.atlassian.com/oauth/token/accessible-resources';
  var response = UrlFetchApp.fetch(url, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + service.getAccessToken()
    }
  });
  var result = JSON.parse(response.getContentText());
  Logger.log(" cloud accessible resouces" + JSON.stringify(result, null, 2));
}


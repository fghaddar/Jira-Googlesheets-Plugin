function updateRecords() {
  var service = getService();

  //getIssueMetaDataByKey ('CP-3');

  showLoading();

  //var sheet = SpreadsheetApp.getActiveSheet();
  var activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = activeSpreadSheet.getSheetByName(SheetWithAllIssues);

  var data = sheet.getDataRange().getValues();
  var data = arrayToJSONObject(sheet.getDataRange().getValues());
  
  // var collectProjectName = data[0].Key;
  // var splitDataProjectName = collectProjectName.split("-");
  // PROJECT_NAME = splitDataProjectName[0];
  Logger.log(data);

  if (service.hasAccess()) {

    // for (var i = 0; i < data.length; i++) {
    //   var rowData = data[i];
    //   // Logger.log(rowData.Assignee);
    //   // Logger.log(rowData);
    //   // we can onlu update Summary	Assignee	Priority	Status	Due date
    //   // , getIssueMetaDataByKey (rowData.Key)

    //   updateFields(service,rowData);
    // }

    // function used to update one changed field at a time
    updateField(service, data);

    //getIssuesFromProject();
    getIssuesFromMultiProject();
    closeLoadingWindow();
    
    if (errorCount > 0) {
      showLoadingWithErrorCount(errorCount);
    } else {
      showLoadingWithoutErrors();
    }
    
  }



  function updateFields(service, rowData) {

    updateSummary(service, rowData);
    updateAssignee(service, rowData);
    updatePriority(service, rowData);
    updateStatus(service, rowData);
    updateDueDate(service, rowData);

  }

  // new function used to update one field at a time
  function updateField(service, data) {
    const ss = SpreadsheetApp.getActive();
    const sheet = ss.getSheetByName(SheetWithAllIssues);
    const rows = data.length + 1; // add 1 to account for the header row
    const columns = HEADERS.length;
    for (let row = 2; row <= rows; row++) {
      for (let column = 1; column <= columns; column++) {
        let cell = sheet.getRange(row, column);
        let rowData = data[row - 2];
        let header = '';
        // if cell has been updated to a valid BOLD entry, update field 
        if (cell.getTextStyle().isBold()) {
          header = HEADERS[column - 1];
          switch(header) {
            case 'Summary':
              updateSummary(service, rowData);
              break;
            case 'Assignee':
              updateAssignee(service, rowData);
              break;
            case 'Priority':
              updatePriority(service, rowData);
              break;
            case 'Status':
              updateStatus(service, rowData);
              break;
            case 'Due date':
              updateDueDate(service, rowData);
              break;
            default:
              break;
          }
        } 
      }
    }
  }


  function updateSummary(service, rowData) {

    var data = {
      "update": {
        "summary": [{ "set": `${rowData.Summary}` }]
      }
    };

    var route = `/rest/api/3/issue/${rowData.Key}`;

    genericPutRequestProcessing(service, data, route,rowData);

  }


  function updateDueDate(service, rowData) {

    var defaultDate = new Date(`${rowData["Due date"]}`);
    var dateDue = defaultDate.toISOString ().substring(0, 10) ;

    var data = {

      "fields": {
        "duedate": `${dateDue}`
      }


    };

    var route = `/rest/api/3/issue/${rowData.Key}`;

    genericPutRequestProcessing(service, data, route,rowData);
   
  }



  function updateAssignee(service, rowData) {

    var accountID = getAccountId(rowData.Assignee)

    if (accountID == null)

    {
      // do nothing
    }

    else{

          var data = {

      "accountId": `${accountID}`
    };

    var route = `/rest/api/3/issue/${rowData.Key}/assignee`;
    genericPutRequestProcessing(service, data, route,rowData);

    }




  }



  function updatePriority(service, rowData) {
    var data = {
      "update": {
        "priority": [{ "set": { "name": `${rowData.Priority}` } }]
      }
    };

    var route = `/rest/api/3/issue/${rowData.Key}`;
    genericPutRequestProcessing(service, data, route,rowData);


  }



  function updateStatus(service, rowData) {

    var transitionID = getTransitionInfomationID(rowData.Key, rowData.Status);

    if (transitionID == "")

    {
      // do nothing
      updateCustomStatus(service, rowData)
    }

    else
    {

          var data = {

      "transition": { "id": `${transitionID}` }};

    var route = `/rest/api/3/issue/${rowData.Key}/transitions`;
    genericPostRequestProcessing(service, data, route,rowData);

    }




  }


  function updateCustomStatus(service, rowData)
  {

    var data = {

      "fields": {
        "customfield_10034": [{"value": `${rowData.Status}`}]
      }
      
    };

    var route = `/rest/api/3/issue/${rowData.Key}`;
    genericPutRequestProcessing(service, data, route,rowData);

  }


  //javascript create JSON object from two dimensional Array
  function arrayToJSONObject(arr) {
    //header
    var keys = arr[0];

    //vacate keys from main array
    var newArr = arr.slice(1, arr.length);

    var formatted = [],
      data = newArr,
      cols = keys,
      l = cols.length;
    for (var i = 0; i < data.length; i++) {
      var d = data[i],
        o = {};
      for (var j = 0; j < l; j++)
        o[cols[j]] = d[j];
      formatted.push(o);
    }
    return formatted;
  }
}


const MAX_RESULTS = 100;
const HEADERS = ['Issue Type', 'Key', 'Summary', 'Assignee', 'Reporter', 'Priority', 'Status', 'Resolution', 'Created', 'Updated', 'Due date'];


function prepareIssueSheet (data, statusData)
{
    //const ss = SpreadsheetApp.getActive();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log(`Spreadsheet name:  ${ss.getName()}`);
 // const sheet = ss.getActiveSheet();
  const sheet = CreateProjectSheet(ss);
  Logger.log(`Sheet name: ${sheet.getName()}`);
  // clear sheet data if exists
  sheet.clear(); 


 
  // Logger.log('total issues= '+ totalIssues);
  // Logger.log('start index= ' + startIndex);
  
  const columns = HEADERS.length;
 
  Logger.log('columns = ' + columns);
  
  // adds the first header row to spreadsheet
  sheet.appendRow(HEADERS);

  return sheet;

}

function displayData(data, statusData , sheet, defaultStatuses) {
  //const ss = SpreadsheetApp.getActive();
  //const ss = SpreadsheetApp.getActiveSpreadsheet();
 // Logger.log(`Spreadsheet name:  ${ss.getName()}`);
 // const sheet = ss.getActiveSheet();
 // const sheet = CreateProjectSheet(ss);
 // Logger.log(`Sheet name: ${sheet.getName()}`);
  // clear sheet data if exists
 // sheet.clear(); 

  const totalIssues = data.total;
  // Logger.log('total issues= '+ totalIssues);
  // Logger.log('start index= ' + startIndex);
  var rows = totalIssues ; //+ 1; // add extra row to account for header row
  const columns = HEADERS.length;
  Logger.log('rows = '+ rows);
  Logger.log('columns = ' + columns);
  
  // adds the first header row to spreadsheet
 // sheet.appendRow(HEADERS);

  // creates an array of project custom statuses 
  const statuses = [];

  // Logger.log("Length of allowed statuses = " + statusData.fields.customfield_10034.allowedValues.length);
  // Logger.log("values include:");

if (statusData.fields.customfield_10034 != null)

{

  for(let i = 0; i < statusData.fields.customfield_10034.allowedValues.length; i++) {
    // Logger.log(statusData.fields.customfield_10034.allowedValues[i].value);
    statuses.push(statusData.fields.customfield_10034.allowedValues[i].value);
  }

}
  
  // Logger.log(statuses);
  // Logger.log(data.issues[0].fields.customfield_10034[0].value)

  var startRow = sheet.getLastRow ()+1;
  rows = rows + startRow;
  
  const headerRow = 1;

  for (let row = startRow; row < rows; row++) {
    for (let column = 1; column <= columns; column++) {
      let cell = sheet.getRange(row, column);
      let rule = SpreadsheetApp.newDataValidation();
      switch (column) {
        case 1:
          cell.setValue(data.issues[row - startRow].fields.issuetype.name);
          break;
        case 2:
          cell.setValue(data.issues[row - startRow].key);
          break;
        case 3:
          cell.setValue(data.issues[row - startRow].fields.summary);
          break;
        case 4:
          if (data.issues[row - startRow].fields.assignee != null) {
            cell.setValue(data.issues[row - startRow].fields.assignee.displayName);
          }
          break;
        case 5:
          cell.setValue(data.issues[row - startRow].fields.reporter.displayName);
          break;
        case 6:
          if(cell.getRow() == headerRow) break; // if the first row, skip data validation
          rule.requireValueInList(PRIORITY, true).build();
          cell.setDataValidation(rule);
          cell.setValue(data.issues[row - startRow].fields.priority.name);
          break;
        case 7:
          if(cell.getRow() == headerRow) break; // if the first row, skip data validation
          // checks to see if custom fields for status are present and if so, applies data validation
          if (data.issues[row - startRow].fields.customfield_10034 && data.issues[row - startRow].fields.customfield_10034 != null) {
            // Logger.log("Will use statuses");
            // Logger.log(statuses);
            rule.requireValueInList(statuses, true).build();
            cell.setDataValidation(rule);
            if (data.issues[row - startRow].fields.customfield_10034.length > 1) {
              let values = []
              for (let i = 0; i < data.issues[row - startRow].fields.customfield_10034.length; i++) {
                values.push(data.issues[row - startRow].fields.customfield_10034[i].value);
              }
              cell.setValue(values);
              Logger.log(values);
            } else {
            cell.setValue(data.issues[row - startRow].fields.customfield_10034[0].value);
            Logger.log(cell.getValue());
            }
          } else {
          // otherwise, create data validation for default statuses
            rule.requireValueInList(defaultStatuses, true).build();
            cell.setDataValidation(rule);
            cell.setValue(data.issues[row - startRow].fields.status.name);
            Logger.log(cell.getValue());
          }
          break;
        case 8:
          if(cell.getRow() == headerRow) break; // if the first row, skip data validation
          rule.requireValueInList(RESOLUTION, true).build();
          cell.setDataValidation(rule);
          if (data.issues[row - startRow].fields.resolution != null) {
            cell.setValue(data.issues[row - startRow].fields.resolution.name);
          }
          break;
        case 9:
          let createdDate = new Date(data.issues[row - startRow].fields.created);
          createdDate.setHours(createdDate.getHours() - startRow);
          cell.setValue(createdDate);
          break;
        case 10:
          let updatedDate = new Date(data.issues[row - startRow].fields.updated);
          updatedDate.setHours(updatedDate.getHours() - startRow);
          cell.setValue(updatedDate);
          break;
        case 11:
          if(cell.getRow() == headerRow) break; // if the first row, skip data validation
          rule.requireDate().build();
          cell.setDataValidation(rule);
          if (data.issues[row - startRow].fields.duedate != null) {
            let dueDate = new Date(data.issues[row - startRow].fields.duedate);
            dueDate.setDate(dueDate.getDate() + 1);
            // Logger.log("Due date = " + dueDate);
            cell.setValue(dueDate.toLocaleDateString().split(' ')[0]);
          }
          break;
        default:
          break;
      }
    }
  }

  
   
  
}


function CreateProjectSheet (activeSpreadSheet) {
    
      //PROJECT_NAME  ;  activeSpreadSheet  SheetWithAllIssues
    var yourNewSheet = activeSpreadSheet.getSheetByName(SheetWithAllIssues);

   

    if (yourNewSheet == null) {
        yourNewSheet = activeSpreadSheet.insertSheet();
        yourNewSheet.setName(SheetWithAllIssues);
    }

  return yourNewSheet;

}

function displayData2(data, statusData , sheet, defaultStatuses) {
  //const ss = SpreadsheetApp.getActive();
  //const ss = SpreadsheetApp.getActiveSpreadsheet();
 // Logger.log(`Spreadsheet name:  ${ss.getName()}`);
 // const sheet = ss.getActiveSheet();
 // const sheet = CreateProjectSheet(ss);
 // Logger.log(`Sheet name: ${sheet.getName()}`);
  // clear sheet data if exists
 // sheet.clear(); 

  const totalIssues = data.total;
  // Logger.log('total issues= '+ totalIssues);
  // Logger.log('start index= ' + startIndex);
  var rows = totalIssues ; //+ 1; // add extra row to account for header row
  const columns = HEADERS.length;
  Logger.log('rows = '+ rows);
  Logger.log('columns = ' + columns);
  
  // adds the first header row to spreadsheet
 // sheet.appendRow(HEADERS);

  // creates an array of project custom statuses 
  const statuses = [];

  // Logger.log("Length of allowed statuses = " + statusData.fields.customfield_10034.allowedValues.length);
  // Logger.log("values include:");

  if (statusData.fields.customfield_10034 != null) {

    for (let i = 0; i < statusData.fields.customfield_10034.allowedValues.length; i++) {
      // Logger.log(statusData.fields.customfield_10034.allowedValues[i].value);
      statuses.push(statusData.fields.customfield_10034.allowedValues[i].value);
    }
  }
  
  var startRow = sheet.getLastRow ()+1;
  rows = rows + startRow;
  
  let projectData = []; // will hold all the project data
  const headerRow = 1;
  
  for (let row = startRow; row < rows; row++) {
    // will hold all the row data and reset after each row
    let rowData = []; 
    for (let column = 1; column <= columns; column++) {
      let cell = sheet.getRange(row, column);
      let rule = SpreadsheetApp.newDataValidation();
      switch (column) {
        case 1:
          rowData.push(data.issues[row - startRow].fields.issuetype.name);
          //cell.setValue(data.issues[row - startRow].fields.issuetype.name);
          break;
        case 2:
          rowData.push(data.issues[row - startRow].key);
          //cell.setValue(data.issues[row - startRow].key);
          break;
        case 3:
          rowData.push(data.issues[row - startRow].fields.summary);
          //cell.setValue(data.issues[row - startRow].fields.summary);
          break;
        case 4:
          if (data.issues[row - startRow].fields.assignee != null) {
            rowData.push(data.issues[row - startRow].fields.assignee.displayName);
            //cell.setValue(data.issues[row - startRow].fields.assignee.displayName);
          } else {
            rowData.push('');
          }
          break;
        case 5:
          rowData.push(data.issues[row - startRow].fields.reporter.displayName);
          // cell.setValue(data.issues[row - startRow].fields.reporter.displayName);
          break;
        case 6:
          if(cell.getRow() == headerRow) break; // if the first row, skip data validation
          rule.requireValueInList(PRIORITY, true).build();
          cell.setDataValidation(rule);
          rowData.push(data.issues[row - startRow].fields.priority.name);
          // cell.setValue(data.issues[row - startRow].fields.priority.name);
          break;
        case 7:
          if(cell.getRow() == headerRow) break; // if the first row, skip data validation
          // checks to see if custom fields for status are present and if so, applies data validation
          if (data.issues[row - startRow].fields.customfield_10034 && data.issues[row - startRow].fields.customfield_10034 != null) {
            // Logger.log("Will use statuses");
            // Logger.log(statuses);
            rule.requireValueInList(statuses, true).build();
            cell.setDataValidation(rule);
            rowData.push(data.issues[row - startRow].fields.customfield_10034[0].value); // pushes the first custom status
            // cell.setValue(data.issues[row - startRow].fields.customfield_10034[0].value);     
          } else {
          // otherwise, create data validation for default statuses
            rule.requireValueInList(defaultStatuses, true).build();
            cell.setDataValidation(rule);
            rowData.push(data.issues[row - startRow].fields.status.name);
            // cell.setValue(data.issues[row - startRow].fields.status.name);
            Logger.log(cell.getValue());
          }
          break;
        case 8:
          if(cell.getRow() == headerRow) break; // if the first row, skip data validation
          rule.requireValueInList(RESOLUTION, true).build();
          cell.setDataValidation(rule);
          if (data.issues[row - startRow].fields.resolution != null) {
            rowData.push(data.issues[row - startRow].fields.resolution.name);
            // cell.setValue(data.issues[row - startRow].fields.resolution.name);
          } else {
            rowData.push('');
          }
          break;
        case 9:
          let createdDate = new Date(data.issues[row - startRow].fields.created);
          createdDate.setHours(createdDate.getHours() - startRow);
          rowData.push(createdDate);
          // cell.setValue(createdDate);
          break;
        case 10:
          let updatedDate = new Date(data.issues[row - startRow].fields.updated);
          updatedDate.setHours(updatedDate.getHours() - startRow);
          rowData.push(updatedDate);
          // cell.setValue(updatedDate);
          break;
        case 11:
          if(cell.getRow() == headerRow) break; // if the first row, skip data validation
          rule.requireDate().build();
          cell.setDataValidation(rule);
          if (data.issues[row - startRow].fields.duedate != null) {
            let dueDate = new Date(data.issues[row - startRow].fields.duedate);
            dueDate.setDate(dueDate.getDate() + 1);
            // Logger.log("Due date = " + dueDate);
            rowData.push(dueDate.toLocaleDateString().split(' ')[0]);
            // cell.setValue(dueDate.toLocaleDateString().split(' ')[0]);
          } else {
            rowData.push('');
          }
          break;
        default:
          break;
      }
    }
    // appends row to project data
    projectData.push(rowData); 
  } 
  const row = projectData.length;
  const column = projectData[0].length;
  
  // appends project data to sheet
  sheet.getRange(sheet.getLastRow()+1, 1, row, column).setValues(projectData);
}


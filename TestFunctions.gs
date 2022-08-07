function isBold() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getActiveSheet();
  const rows = 19
  const columns = HEADERS.length
  Logger.log('rows = ' + rows);
  Logger.log('columns = ' + columns);

  for (let row = 2; row <= rows; row++) {
    for (let column = 1; column <= columns; column++) {
      let cell = sheet.getRange(row, column);
      if (cell.getTextStyle().isBold()) {
        Logger.log("CELL "+ cell.getA1Notation() + " IS BOLD ");
      } else {
        Logger.log("Cell "+ cell.getA1Notation() + " is not bold ");
      }
    }
  }
  
  // if (cell.getTextStyle().isBold()) {
  //   Logger.log('Cell is bold!');
  // } else {
  //   Logger.log("Cell is not bold!");
  // }
}

function isGreen() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getActiveSheet();
  const cell = sheet.getRange('A2');
  Logger.log(cell.getFontColor());
  if (cell.getFontColor() == '#008000')/*green hex*/ {
    Logger.log('Font color is green');
  } else {
    Logger.log('Font color is not green');
  }
}

function getHeaders() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getActiveSheet();
  Logger.log(sheet.getLastColumn());
  const range = sheet.getRange(1,1,1, sheet.getLastColumn());
  const headers = range.getValues();
  Logger.log(headers);

}

// function getDefaultStatuses() {
  
//   const statusEndPoint = `/rest/api/3/status`

//   const statusResponse = GenericGetRequest(statusEndPoint);
//   statusData = JSON.parse(statusResponse.getContentText());
//   Logger.log(statusData.length);

//   let statusList = [];
  
//   for(let i = 0; i < statusData.length; i++) {
//     statusList.push(statusData[i].name)
//   }
//   Logger.log(statusList);
//   // returns the unique default statuses
//   const defaultStatuses = statusList.filter((v, i, a) => a.indexOf(v) === i); 
//   Logger.log(defaultStatuses); 

//   return defaultStatuses;
// }

function test() {
  const ss = SpreadsheetApp.getActive();
  
  const sheet = ss.getActiveSheet();
  Logger.log(sheet.getLastRow());

}

// function displayData2(data, statusData , sheet, defaultStatuses) {
//   //const ss = SpreadsheetApp.getActive();
//   //const ss = SpreadsheetApp.getActiveSpreadsheet();
//  // Logger.log(`Spreadsheet name:  ${ss.getName()}`);
//  // const sheet = ss.getActiveSheet();
//  // const sheet = CreateProjectSheet(ss);
//  // Logger.log(`Sheet name: ${sheet.getName()}`);
//   // clear sheet data if exists
//  // sheet.clear(); 

//   const totalIssues = data.total;
//   // Logger.log('total issues= '+ totalIssues);
//   // Logger.log('start index= ' + startIndex);
//   var rows = totalIssues ; //+ 1; // add extra row to account for header row
//   const columns = HEADERS.length;
//   Logger.log('rows = '+ rows);
//   Logger.log('columns = ' + columns);
  
//   // adds the first header row to spreadsheet
//  // sheet.appendRow(HEADERS);

//   // creates an array of project custom statuses 
//   const statuses = [];

//   // Logger.log("Length of allowed statuses = " + statusData.fields.customfield_10034.allowedValues.length);
//   // Logger.log("values include:");

//   if (statusData.fields.customfield_10034 != null) {

//     for (let i = 0; i < statusData.fields.customfield_10034.allowedValues.length; i++) {
//       // Logger.log(statusData.fields.customfield_10034.allowedValues[i].value);
//       statuses.push(statusData.fields.customfield_10034.allowedValues[i].value);
//     }
//   }
  
//   var startRow = sheet.getLastRow ()+1;
//   rows = rows + startRow;
  
//   let projectData = []; // will hold all the project data
//   const headerRow = 1;
  
//   for (let row = startRow; row < rows; row++) {
//     // will hold all the row data and reset after each row
//     let rowData = []; 
//     for (let column = 1; column <= columns; column++) {
//       let cell = sheet.getRange(row, column);
//       let rule = SpreadsheetApp.newDataValidation();
//       switch (column) {
//         case 1:
//           rowData.push(data.issues[row - startRow].fields.issuetype.name);
//           //cell.setValue(data.issues[row - startRow].fields.issuetype.name);
//           break;
//         case 2:
//           rowData.push(data.issues[row - startRow].key);
//           //cell.setValue(data.issues[row - startRow].key);
//           break;
//         case 3:
//           rowData.push(data.issues[row - startRow].fields.summary);
//           //cell.setValue(data.issues[row - startRow].fields.summary);
//           break;
//         case 4:
//           if (data.issues[row - startRow].fields.assignee != null) {
//             rowData.push(data.issues[row - startRow].fields.assignee.displayName);
//             //cell.setValue(data.issues[row - startRow].fields.assignee.displayName);
//           } else {
//             rowData.push('');
//           }
//           break;
//         case 5:
//           rowData.push(data.issues[row - startRow].fields.reporter.displayName);
//           // cell.setValue(data.issues[row - startRow].fields.reporter.displayName);
//           break;
//         case 6:
//           if(cell.getRow() == headerRow) break; // if the first row, skip data validation
//           rule.requireValueInList(PRIORITY, true).build();
//           cell.setDataValidation(rule);
//           rowData.push(data.issues[row - startRow].fields.priority.name);
//           // cell.setValue(data.issues[row - startRow].fields.priority.name);
//           break;
//         case 7:
//           if(cell.getRow() == headerRow) break; // if the first row, skip data validation
//           // checks to see if custom fields for status are present and if so, applies data validation
//           if (data.issues[row - startRow].fields.customfield_10034 && data.issues[row - startRow].fields.customfield_10034 != null) {
//             // Logger.log("Will use statuses");
//             // Logger.log(statuses);
//             rule.requireValueInList(statuses, true).build();
//             cell.setDataValidation(rule);
//             rowData.push(data.issues[row - startRow].fields.customfield_10034[0].value); // pushes the first custom status
//             // cell.setValue(data.issues[row - startRow].fields.customfield_10034[0].value);     
//           } else {
//           // otherwise, create data validation for default statuses
//             rule.requireValueInList(defaultStatuses, true).build();
//             cell.setDataValidation(rule);
//             rowData.push(data.issues[row - startRow].fields.status.name);
//             // cell.setValue(data.issues[row - startRow].fields.status.name);
//             Logger.log(cell.getValue());
//           }
//           break;
//         case 8:
//           if(cell.getRow() == headerRow) break; // if the first row, skip data validation
//           rule.requireValueInList(RESOLUTION, true).build();
//           cell.setDataValidation(rule);
//           if (data.issues[row - startRow].fields.resolution != null) {
//             rowData.push(data.issues[row - startRow].fields.resolution.name);
//             // cell.setValue(data.issues[row - startRow].fields.resolution.name);
//           } else {
//             rowData.push('');
//           }
//           break;
//         case 9:
//           let createdDate = new Date(data.issues[row - startRow].fields.created);
//           createdDate.setHours(createdDate.getHours() - startRow);
//           rowData.push(createdDate);
//           // cell.setValue(createdDate);
//           break;
//         case 10:
//           let updatedDate = new Date(data.issues[row - startRow].fields.updated);
//           updatedDate.setHours(updatedDate.getHours() - startRow);
//           rowData.push(updatedDate);
//           // cell.setValue(updatedDate);
//           break;
//         case 11:
//           if(cell.getRow() == headerRow) break; // if the first row, skip data validation
//           rule.requireDate().build();
//           cell.setDataValidation(rule);
//           if (data.issues[row - startRow].fields.duedate != null) {
//             let dueDate = new Date(data.issues[row - startRow].fields.duedate);
//             dueDate.setDate(dueDate.getDate() + 1);
//             // Logger.log("Due date = " + dueDate);
//             rowData.push(dueDate.toLocaleDateString().split(' ')[0]);
//             // cell.setValue(dueDate.toLocaleDateString().split(' ')[0]);
//           } else {
//             rowData.push('');
//           }
//           break;
//         default:
//           break;
//       }
//     }
//     // appends row to project data
//     projectData.push(rowData); 
//   } 
//   const row = projectData.length;
//   const column = projectData[0].length;
  
//   // appends project data to sheet
//   sheet.getRange(sheet.getLastRow()+1, 1, row, column).setValues(projectData);
// }


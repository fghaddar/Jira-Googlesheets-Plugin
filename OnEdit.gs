//global variables 
const ISSUE_TYPE = ['Epic', 'Bug', 'Story', 'Task', 'Subtask'];
const PRIORITY = ['Lowest', 'Low', 'Medium', 'High', 'Highest'];
const STATUS = ['To Do', 'In Progress', 'Done'];
const RESOLUTION = ['Done'];
const COLUMNS = ['Issue Type', 'Key', 'Summary', 'Assignee', 'Reporter', 'Priority', 'Status', 'Resolution', 'Created', 'Updated', 'Due date'];

// // checks to see if the custom statuses exist 
// const CUSTOM_STATUSES = [];
// const pName = getProjectName();
//   const ePoint = `/rest/api/3/search?jql=project=${pName}&maxResults=100&startAt=0`;
//   const response = GenericGetRequest(ePoint);
//   const data = JSON.parse(response.getContentText());
//   const id = data.issues[0].id;
//   const sEndPoint = `/rest/api/3/issue/${id}/editmeta`

//   const sResponse = GenericGetRequest(sEndPoint);
//   const sData = JSON.parse(sResponse.getContentText());
  
//   for(let i = 0; i < sData.fields.customfield_10034.allowedValues.length; i++) {
//     // Logger.log(statusData.fields.customfield_10034.allowedValues[i].value);
//     CUSTOM_STATUSES.push(sData.fields.customfield_10034.allowedValues[i].value);
//   }


function onEdit() {
  Logger.log('changed content')
  const ss = SpreadsheetApp.getActive();
  Logger.log(`Spreadsheet name:  ${ss.getName()}`);
  const sheet = ss.getSheetByName(SheetWithAllIssues);
  Logger.log(`Sheet name: ${sheet.getName()}`);
  const range = sheet.getActiveRange();
  
  // if sheet is not equal to PROJECT_NAME, it will disable onEdit()
  if(range.getSheet().getName() != SheetWithAllIssues) {
    return;
  }

  // Logger.log("Custom statuses=");
  // Logger.log(CUSTOM_STATUSES);
  
  const rows = range.getNumRows();
  const columns = range.getNumColumns();
  Logger.log('rows = ' + rows);
  Logger.log('columns = ' + columns);
  Logger.log(range.getA1Notation());
  

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      let cell = range.getCell(i, j);
      Logger.log(cell.getA1Notation());
      Logger.log(`row=${cell.getRow()} column=${cell.getColumn()}`);
      let cellRow = cell.getRow();
      let cellColumn = cell.getColumn();
      let value = cell.getValue();
      let headerValue = COLUMNS[cellColumn - 1];
      Logger.log(headerValue);
      Logger.log(value);

      if (COLUMNS.includes(value) && cellRow == 1) {
        cell.clearFormat();
        return;
      }

      switch (headerValue) {
        case 'Issue Type':
          if (ISSUE_TYPE.includes(value)) {
            cell.clearFormat();
            cell.setBackground('yellow');
            cell.setFontColor('green');
            cell.setFontWeight('bold');
          } else {
            cell.setBackground('yellow');
            cell.setFontColor('red');
          }
          break;
        case 'Priority':
          if (PRIORITY.includes(value)) {
            cell.clearFormat();
            cell.setBackground('yellow');
            cell.setFontColor('green');
            cell.setFontWeight('bold');
          } else {
            cell.setBackground('yellow');
            cell.setFontColor('red');
          }
          break;
        case 'Status':
          // if (STATUS.includes(value)) {
          //   cell.clearFormat();
          //   cell.setBackground('yellow');
          //   cell.setFontColor('green');
          //   cell.setFontWeight('bold');
          // } else {
          //   cell.setBackground('yellow');
          //   cell.setFontColor('red');
          // }
          cell.clearFormat();
          cell.setBackground('yellow');
          cell.setFontColor('green');
          cell.setFontWeight('bold');
          break;
        case 'Resolution':
          if (RESOLUTION.includes(value) || value == '') {
            cell.clearFormat();
            cell.setBackground('yellow');
            cell.setFontColor('green');
            cell.setFontWeight('bold');
          } else {
            cell.setBackground('yellow');
            cell.setFontColor('red');
          }
          break;
        case 'Due date':
          if (value instanceof Date || value == '') {
            cell.clearFormat();
            cell.setBackground('yellow');
            cell.setFontColor('green');
            cell.setFontWeight('bold');
          } else {
            cell.setBackground('yellow');
            cell.setFontColor('red');
          }
          break;
        default:
          Logger.log("Default case");
          cell.clearFormat();
          cell.setBackground('yellow');
          cell.setFontColor('green');
          cell.setFontWeight('bold');
      }
    }
  }
}
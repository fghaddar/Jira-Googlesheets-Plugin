
var errorCount = 0;
function updateIssue() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getActiveSheet();
  
  const range = sheet.getDataRange();
  const rows = range.getNumRows(); 
  const columns = range.getNumColumns();
  Logger.log("rows= " + rows);
  Logger.log("columns= " + columns);
  
  let updates = [];
  // excludes header row and starts at row 2
  for (let row = 2; row <= rows; row++) {
    for (let column = 1; column <= columns; column++) {
      let cell = sheet.getRange(row, column);
      let cellValue = cell.getValue();
      
      // obtain key for each row
      let key = sheet.getRange(row, 2).getValue();
      
      if (cell.getTextStyle().isBold()) {
        updates.push({'column': column, 'value': cellValue});
      }      
    }   
  }
  Logger.log(updates);
}

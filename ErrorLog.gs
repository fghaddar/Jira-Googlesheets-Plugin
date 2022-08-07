function ErrorInformation(rowData, err,data) {

  var activeSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = CreateErrorLogSheet(activeSpreadSheet);

  // const HEADERS = ['Project', 'Key', 'Exact error point', 'Exact error', 'Time stamp'];

 
  var key = rowData.Key;
  var projectInfo = key.split("-");
  var projectName = projectInfo[0]; 
  var ExactErrorPoint = data;
  var ExactError = err;
  var TimeStamp = new Date();

  var data = [projectName,key,ExactErrorPoint,ExactError,TimeStamp]

  sheet.appendRow(data);


  
}

function CreateErrorLogSheet (activeSpreadSheet) {
    var yourNewSheet = activeSpreadSheet.getSheetByName("ERROR LOG");

    const HEADERS = ['Project', 'Key', 'Exact error point', 'Exact error', 'Time stamp'];

    if (yourNewSheet == null) {
        yourNewSheet = activeSpreadSheet.insertSheet();
        yourNewSheet.setName("ERROR LOG");
        yourNewSheet.appendRow(HEADERS);
    }

  return yourNewSheet;

}

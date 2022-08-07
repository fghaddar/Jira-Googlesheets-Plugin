/**
 * Open a URL in a new tab.
 * https://gist.github.com/smhmic/e7f9a8188f59bb1d9f992395c866a047
 */

var widget;
var spreadsheetApp;
function openUrl(url) {
  var html = HtmlService.createHtmlOutput('<!DOCTYPE html><html><script>'
    + 'window.close = function(){window.setTimeout(function(){google.script.host.close()},9)};'
    + 'var a = document.createElement("a"); a.href="' + url + '"; a.target="_blank";'
    + 'if(document.createEvent){'
    + '  var event=document.createEvent("MouseEvents");'
    + '  if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1){window.document.body.append(a)}'
    + '  event.initEvent("click",true,true); a.dispatchEvent(event);'
    + '}else{ a.click() }'
    + 'close();'
    + '</script>'
    // Offer URL as clickable link in case above code fails.
    + '<body style="word-break:break-word;font-family:sans-serif;">Failed to open automatically.  Click below:<br/><a href="' + url + '" target="_blank" onclick="window.close()">Click here to proceed</a>.</body>'
    + '<script>google.script.host.setHeight(55);google.script.host.setWidth(410)</script>'
    + '</html>')
    .setWidth(90).setHeight(1);
  SpreadsheetApp.getUi().showModalDialog(html, "Opening ...");
}


function showLoding1() {

  Logger.log("opening window");

  widget = HtmlService.createHtmlOutput("<h1>Update status</h1>"
   
   +"<p>Updating records ...<p>"

   );
spreadsheetApp = SpreadsheetApp;
spreadsheetApp.getUi().showModalDialog (widget," ");
}


function showLoading() {

  widget = HtmlService.createHtmlOutputFromFile('popUp');
   
spreadsheetApp = SpreadsheetApp;
spreadsheetApp.getUi().showModalDialog (widget," ");
}

function showLoadingWithoutErrors() {

  Logger.log("Error window");


  widget = HtmlService.createHtmlOutput("<h1>Update status</h1>"
   

   +"<p style='font-weight:bold;color:green'>Congratulations!</p>"

    +"<p style='font-style: italic; font-weight: bold; color:green'>Update successful with no errors</p>"

    + "<center><img src='https://i.postimg.cc/K8XfCq7F/green-check.png'/></center>"

   );

spreadsheetApp.getUi().showModalDialog (widget," ");

}

function showLoadingWithErrorCount(errorCount) {

  Logger.log("Error window");


  widget = HtmlService.createHtmlOutput("<h1>Update status</h1>"
   

   +"<p style='font-weight:bold; color:red'>Total errors: "+errorCount+"<p>"

    +"<p style='color:red'>See the sheet named <span style='font-style: italic;font-weight: bold'>ERROR LOG</span> for the detailed information for errors<p>"

    + "<center><img src='https://i.postimg.cc/WbvS8K5L/error-triangle.png'/></center>"

   );

spreadsheetApp.getUi().showModalDialog (widget," ");

}


function closeLoadingWindow() {

  widget = HtmlService.createHtmlOutput(
   
    '<script>'
     + 'window.close = function(){window.setTimeout(function(){google.script.host.close()},9)};'
        + 'close();'
    + '</script>'

   );

spreadsheetApp.getUi().showModalDialog (widget," ");

Logger.log("closing window");

 
}

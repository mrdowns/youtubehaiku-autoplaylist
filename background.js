chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.executeScript(null, {file: 'findvideos.js'});
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.url){
      openIncognito(request.url);
    }
  }
);

function openIncognito(url) {
  chrome.windows.create({"url":url, "incognito":true});
}

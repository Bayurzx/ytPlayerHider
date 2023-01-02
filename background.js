// background process aka service worker to exchange data from server and client

// check tabs and check if its Youtube
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    // extract videoId from the tab url
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    // url params are usually mapped `new Map()`with URLSearchParams
    // get() method return valur of the key input 
    const videoId = urlParameters.get("v")
    console.log(`This 
    is 
    the 
    background.js`);

    // send data to contentScript
    chrome.tabs.sendMessage(tabId, {
      videoId: videoId,
      type: "NEW"
    });
  }
});

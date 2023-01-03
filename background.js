// background process aka service worker to exchange data from server and client

// check tabs and check if its Youtube
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {

    // send data to contentScript
    chrome.tabs.sendMessage(tabId, {
      ytVideo: "NEW"
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      const queryParameters = tab.url.split("?")[1];
      const urlParameters = new URLSearchParams(queryParameters);
  
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        videoId: urlParameters.get("v"),
      });
    }
  });

  function handleMessage(request, sender, sendResponse) {
    console.log(`A content script sent a message: ${request.greeting}`);
    sendResponse({ response: "Response from background script" });
  }
  
  chrome.runtime.onMessage.addListener(handleMessage);
  
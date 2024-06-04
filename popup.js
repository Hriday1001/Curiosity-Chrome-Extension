document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        console.log('Message received in popup:', message.links);
        document.getElementById('resultText').innerText = message.links;
        // document.getElementsByClassName("card-title")[0].innerText = message.title; // Update the UI with the received data
        sendResponse('Popup received the message');
    });
});

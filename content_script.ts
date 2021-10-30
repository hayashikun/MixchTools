const observer = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (element) {
            chrome.runtime.sendMessage({type: "chat", data: element})
        });
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log(message);
    const chatContent = document.getElementsByClassName("chat-log")[0];

    switch (message.message) {
        case "activate":
            observer.observe(chatContent, {childList: true, subtree: true});
            break
        case "deactivate":
            observer.disconnect();
    }
})
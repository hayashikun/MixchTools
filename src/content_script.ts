import Chat from "./chat";

const observer = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
            let chat = Chat.fromLi(node as HTMLLIElement)
            chrome.runtime.sendMessage({type: "chat", data: chat})
        });
    });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    const chatContent = document.getElementsByClassName("chat-log")[0];

    switch (message.message) {
        case "activate":
            observer.observe(chatContent, {childList: true, subtree: true});
            break
        case "deactivate":
            observer.disconnect();
    }
})
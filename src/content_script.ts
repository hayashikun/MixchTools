import Chat from "./chat";
import "./content_style.scss"

const observer = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
            let chat = Chat.fromLi(node as HTMLLIElement)
            chrome.runtime.sendMessage({type: "chat", data: chat})
        });
    });
});

const mtLayoutClasses = [
    "mt-layout-1"
]

const resetLayout = () => {
    mtLayoutClasses.forEach((c) => {
        document.body.classList.remove(c)
    })
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.message) {
        case "activate":
            observer.observe(document.getElementsByClassName("chat-log")[0], {childList: true, subtree: true});
            break
        case "deactivate":
            observer.disconnect();
            break
        case "layout-0":
            resetLayout()
            break
        case "layout-1":
            resetLayout()
            document.body.classList.add("mt-layout-1")
            break
        case "video-width":
            document.body.style.setProperty('--video-width', `${message.value}%`);
            break;
        case "chat-log-height":
            document.body.style.setProperty('--chat-log-height', `${message.value}px`);
            break;
    }
})
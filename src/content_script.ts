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
    "mt-layout-vertical"
]

const resetLayout = () => {
    mtLayoutClasses.forEach((c) => {
        document.body.classList.remove(c)
    })
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.message) {
        case "push":
            if (message.activate) {
                observer.observe(document.getElementsByClassName("chat-log")[0], {childList: true, subtree: true});
            } else {
                observer.disconnect();
            }
            break
        case "layout":
            switch (message.layout) {
                case "reset":
                    resetLayout()
                    break
                case "vertical":
                    resetLayout()
                    document.body.classList.add("mt-layout-vertical")
                    break
            }
            break
        case "variable":
            document.body.style.setProperty(message.key, message.value);
            break;
    }
})
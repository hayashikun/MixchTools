let isActive = false;

window.onload = (event) => {
    const activateButton: HTMLElement = document.getElementById("activateButton")!;

    const updatePopup = function () {
        activateButton.innerText = isActive ? "Deactivate" : "Activate";
    }
    updatePopup();
    activateButton.onclick = () => {
        isActive = !isActive;
        updatePopup();
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id!, {message: "push", activate: isActive})
        })
    };

    ["reset", "vertical"].forEach((i) => {
        const button = document.getElementById(`${i}LayoutButton`)!
        button.onclick = () => {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id!, {message: "layout", layout: i})
            })
        }
    })

    const videoWidthInput = document.getElementById("videoWidthInput")! as HTMLInputElement;
    videoWidthInput.onchange = (event) => {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id!,
                {message: "variable", key: "--video-width", "value": `${videoWidthInput.value}%`}
            )
        })
    }

    const chatLogHeightInput = document.getElementById("chatLogHeightInput")! as HTMLInputElement;
    chatLogHeightInput.onchange = (event) => {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id!,
                {message: "variable", key: "--chat-log-height", "value": `${chatLogHeightInput.value}px`}
            )
        })
    }


};
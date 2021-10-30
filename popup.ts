let isActive = false;

window.onload = (event) => {
    const activateButton: HTMLElement = document.getElementById("activateButton")!;

    const updatePopup = function () {
        chrome.storage.sync.get('isActive', function (data) {
            isActive = data.isActive;
            activateButton.innerText = isActive ? "Deactivate" : "Activate";
        });
    }

    updatePopup();

    activateButton.onclick = function () {
        isActive = !isActive;
        chrome.storage.sync.set({isActive: isActive}, function () {
        });
        updatePopup();
        chrome.runtime.sendMessage({type: "activation", activate: isActive}, function () {
        });
    };
};
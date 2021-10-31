let isActive = false;

window.onload = (event) => {
    const activateButton: HTMLElement = document.getElementById("activateButton")!;

    const updatePopup = function () {
        activateButton.innerText = isActive ? "Deactivate" : "Activate";
    }

    updatePopup();

    activateButton.onclick = function () {
        isActive = !isActive;
        updatePopup();
        chrome.runtime.sendMessage({type: "activation", activate: isActive}, function () {
        });
    };
};
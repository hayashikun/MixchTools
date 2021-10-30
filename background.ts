chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    // urlMatches: 'mixch.tv\/u\/[0-9]+\/live',
                    schemes: ['https']
                },
            })
        ],
        actions: [
            new chrome.declarativeContent.ShowPageAction()
        ]
    }]);
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        case "activation":
            const activate = message.activate;
            chrome.notifications.create(
                "mixch_notification",
                {
                    type: "basic",
                    title: activate ? "Activated" : "Deactivated",
                    message: "message",
                    iconUrl: 'img/icon-512.png',
                    silent: true,
                });
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id!, {message: activate ? "activate" : "deactivate"})
            })
            break
        case "chat":
            console.log(message.data);
            chrome.notifications.create(
                "mixch_notification",
                {
                    type: "basic",
                    title: "chat",
                    message: "chat message",
                    iconUrl: 'img/icon-512.png',
                    silent: true,
                });
            break
    }

    sendResponse();
})
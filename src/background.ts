import Chat from "./chat";
import {DefaultIconUrl} from "./config";

chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [
            new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {
                    urlMatches: 'mixch.tv\/u\/[0-9]+\/live',
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
                {
                    type: "basic",
                    title: activate ? "Activated" : "Deactivated",
                    message: "Push notification activated",
                    iconUrl: DefaultIconUrl,
                    silent: true,
                });
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id!, {message: activate ? "activate" : "deactivate"})
            })
            break
        case "chat":
            const chat: Chat = message.data;
            let option = {
                type: "basic",
                title: "",
                message: "",
                iconUrl: DefaultIconUrl,
                silent: true,
            }

            switch (chat.type) {
                case "normal":
                    option.title = chat.from;
                    option.message = chat.body;
                    break
                case "super":
                    option.title = chat.from;
                    option.message = chat.body;
                    option.iconUrl = chat.imageUrl;
                    break;
                case "stamp":
                    option.title = chat.from;
                    option.iconUrl = chat.imageUrl;
                    break
                case "item":
                    option.message = chat.body;
                    break;
                case "undefined":
                    option.title = chat.body;
                    break;
            }
            chrome.notifications.create(option);
            break
    }

    sendResponse();
})
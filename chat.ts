import {DefaultIconUrl} from "./config";

type ChatType = "undefined" | "normal" | "super" | "stamp" | "item";

class Chat {
    type: ChatType
    imageUrl: string
    from: string
    body: string

    constructor(type: ChatType, body: string, image: string | null = null, from: string | null = null) {
        this.type = type;
        this.imageUrl = image ?? DefaultIconUrl;
        this.from = from ?? "";
        this.body = body;
    }

    static fromLi(li: HTMLLIElement): Chat {
        const children = li.children;
        if (children.length == 0) {
            return new Chat("item", li.textContent ?? "")
        }
        if (children.length == 1) {
            const message = li.getElementsByClassName("message")[0];
            return new Chat("super",
                message.children[0].textContent ?? "",
                li.getElementsByClassName("lefticon")[0].getAttribute("src"),
                message.children[1].textContent ?? ""
            )
        }
        if (children.length == 2) {
            if (children[1].tagName == "img") {
                return new Chat("stamp", "", children[1].getAttribute("src"), children[0].textContent)
            } else {
                return new Chat("normal", children[1].textContent ?? "", null, children[0].textContent)
            }
        }
        return new Chat("undefined", li.textContent ?? "");
    }
}

export default Chat;

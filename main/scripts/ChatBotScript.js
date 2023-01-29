function showForm() {
    document.getElementById("auth").hidden = !document.getElementById("auth").hidden;
}

function addMessageToChatLog(
    messageUser, whoSay, FromUser
) {
    let div = document.createElement('div');

    div.className = "chat_text message-from-ai";

    if (FromUser) {
        div.className = "chat_text";
    }

    // div.innerHTML = `${whoSay}: ${messageUser}`;
    div.innerHTML = `${messageUser}`;
    let MyIframe = $("#chat_frame").contents().find("body");
    MyIframe.append(div);

    console.log(`${whoSay} say: ${messageUser}`);

    if (FromUser) {

        let messageHistoryText = ""
        let messageHistoryElements = MyIframe.find('div');
        let LengthToParse = messageHistoryElements.length
        let SkipMessages = false

        // if (LengthToParse > 7) {
        //     LengthToParse = LengthToParse - 5
        //     SkipMessages = true
        // }

        // let DebugLength = 0

        for (let idHistoryMessage of Array(messageHistoryElements.length).keys()) {

            let textHistoryMessage = messageHistoryElements[idHistoryMessage].textContent;
            let className = messageHistoryElements[idHistoryMessage].className;

            if (className === "start_chat_message") {
                messageHistoryElements[idHistoryMessage].remove()
                continue
            }

            if (SkipMessages) {
                if (idHistoryMessage < LengthToParse) {
                    continue
                }
            }

            if (!className.includes("message-from-ai")) {
                messageHistoryText += `Human: ${textHistoryMessage.replace("Вы: ", "")}\\n\\n`
                // DebugLength++
            } else {
                messageHistoryText += `AI:${textHistoryMessage.replace("AI: ", "")}\\n\\n`
                // DebugLength++
            }
        }
        // console.log(DebugLength)
        // console.log(messageHistoryText)
        messageHistoryText += `AI:`
        GetAIResponse(messageHistoryText)
    }

}

function newMessageFromUser() {

    let messageInput = document.getElementById("MessageInput")
    let messageUser = messageInput.value;

    event.preventDefault();
    messageInput.value = "";
    addMessageToChatLog(messageUser, "You", true);
}

function GetAIResponse(messageUser) {

    let request = new XMLHttpRequest();
    let data = new FormData();

    data.append("mode", "var data = new FormData();")
    request.open("POST", "https://api.openai.com/v1/completions", true);
    request.setRequestHeader("Content-Type", "application/json")
    request.setRequestHeader("Authorization", "Bearer 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")
    request.send(`{"model": "text-davinci-003", "prompt": "Human: ${messageUser}\\n\\nAI: ", "temperature": 1, "max_tokens": 400}`);
    request.onload = function () {
        let AIAnswer = JSON.parse(request.response)['choices'][0]['text'].replace('\\n', '');
        addMessageToChatLog(AIAnswer, "AI", false);
    }
}

function OnKeyDown() {
    if (event.keyCode === 27) {
        if (!document.getElementById("auth").hidden) {
            showForm()
        }
    }
}

function OnClick(e) {
    if (!document.getElementById("auth").hidden) {
        if (e.target.className !== "botbutton") {
            showForm()
        }
    }
}
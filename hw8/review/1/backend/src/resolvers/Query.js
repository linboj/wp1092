import { validateChatBox } from "../utils.js";

const Query = {
    async CurrentMessage(parent, args, {db}, info){
        console.log('Query')
        const {chatbox_key} = args
        const chatBox = await validateChatBox(chatbox_key)
        const messages = new Array(chatBox.messages.length)
        for(var i = 0; i < messages.length; i++){
            const {sender, body} = chatBox.messages[i]
            const {name} = sender
            messages[i] = {sender: name, body: body}
        }
        return messages
    }
}

export default Query
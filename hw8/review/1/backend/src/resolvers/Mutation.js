import {messageModel} from '../model.js'
import { makeName, validateChatBox, validateUser} from '../utils.js'

const Mutation = {
    async createChatBox(parent, { sender, to}, {db}, info) {
        //console.log('createChatBox')
        const user1 = await validateUser(sender);
        const user2 = await validateUser(to);
        const chatbox_key = makeName(sender, to);
        const chatBox = await validateChatBox(chatbox_key);
        return chatBox
    },
    async createMessage(parent, { sender, to, message }, { pubsub }, info){
        //console.log('createMessage')
        const Sender = await validateUser(sender);
        const Receiver = await validateUser(to);
        
        const newMessage = new messageModel({sender: Sender, body: message});
        await newMessage.save()

        const chatbox_key = makeName(sender, to);
        const ChatBox = await validateChatBox(chatbox_key);
        ChatBox.messages.push(newMessage);
        await ChatBox.save();
        const name = newMessage.sender.name
        const body = newMessage.body
        pubsub.publish(`${chatbox_key}`,{
            NewMessage: {sender: name, body: body}
        });
        return {sender: name, body: body}
    }
}

export default Mutation
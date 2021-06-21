import {chatBoxModel} from "../model.js";

const Subscription = {
    NewMessage : {
        async subscribe(parent, {chatbox_key}, {pubsub}, info){
            console.log('Subscription')
            const ChatBox = await chatBoxModel.findOne({name: chatbox_key});
            if (!ChatBox){
                throw new Error('Chatbox not found!');
            }
            return pubsub.asyncIterator(`${chatbox_key}`)
        }
    }
}
export default Subscription
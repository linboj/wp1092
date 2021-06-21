import mongoose from 'mongoose'
const Schema = mongoose.Schema

const chatBoxSchema = new Schema({
    name: { type: String, required: true },
    messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});
  
const messageSchema = new Schema({
    sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    body: { type: String, required: true },
});

const userSchema = new Schema({
    name: { type: String, required: true },
});


const chatBoxModel = mongoose.model('ChatBox', chatBoxSchema)
const messageModel = mongoose.model('Message', messageSchema)
const userModel = mongoose.model('User', userSchema)


export {chatBoxModel,messageModel,userModel}

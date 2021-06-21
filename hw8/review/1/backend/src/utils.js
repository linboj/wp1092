import {userModel, chatBoxModel} from './model.js'

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const validateUser = async (name) => {
    const existing = await userModel.findOne({name: name});
    if (existing) return existing;
    return new userModel({name: name}).save();
};
  
const validateChatBox = async (name) => {
    //console.log('validatechatbox')
    let box = await chatBoxModel.findOne({name});
    if (!box) box = await new chatBoxModel({name}).save();
    return box
      .populate({ path: 'messages', populate: 'sender' })
      .execPopulate();
};

export { makeName, validateChatBox, validateUser,}
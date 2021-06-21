import {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {
    ADD_CHATBOX_MUTATION,
    ADD_MESSAGE_MUTATION,
} from '../graphql';

const useChatBox = () => {
    const [chatBoxes, setChatBoxes] = useState([]);
    const [addChatBox] = useMutation(ADD_CHATBOX_MUTATION)
    const [addMessage] = useMutation(ADD_MESSAGE_MUTATION)

    const createChatBox = async (friend, me) => {
        const newKey = me <= friend ? (me+'_'+friend): (friend+'_'+me)
        if (chatBoxes.some(({key}) => key === newKey)){
            throw new Error(friend+"'s chat box has already opened")
        }
        await addChatBox({
            variables: {
                sender: me, 
                to: friend,
            }
        })
        const newChatBoxes = [...chatBoxes]
        newChatBoxes.push({friend, key: newKey});
        setChatBoxes(newChatBoxes);
        return newKey
    }
    const removeChatBox = (targetKey, activeKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({key}, i) => {
            if(key === targetKey) lastIndex = i-1
        })
        const newChatBoxes = chatBoxes.filter(
            (chatBox) => chatBox.key !== targetKey);
        if(newChatBoxes.length){
            if(newActiveKey === targetKey){
                if(lastIndex > 0){
                    newActiveKey = newChatBoxes[lastIndex].key;
                } else {newActiveKey = newChatBoxes[0].key}
            }
        } else newActiveKey = '';
        setChatBoxes(newChatBoxes);
        return newActiveKey
    }
    const sendMessage = async (payload) => {
        const {name, to, body} = payload;
        await addMessage({
            variables: {
                sender: name,
                to: to, 
                message: body
            }
        })
    }
    return {chatBoxes, createChatBox, removeChatBox, sendMessage}
};

export default useChatBox;

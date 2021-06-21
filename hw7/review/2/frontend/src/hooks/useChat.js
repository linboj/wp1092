import { useState } from "react"; 
const useChat = () => {
    const [messages, setMessages] = useState([]); 
    const [status, setStatus] = useState({}); // { type, msg } 
    const client = new WebSocket('ws://localhost:8080');
    client.onmessage = (byteString) => {
        byteString = JSON.parse(byteString.data);
        const { type } = byteString;
        switch (type) {
            case 'CHAT' :{
                console.log("CHAT!!!")
                const payload = byteString.data.messages;
                setMessages(() => payload); break;
            }
            case 'MESSAGE' : {
                console.log("MESSAGE!!!")
                const payload = byteString.data.message;
                setMessages((messages) => [...messages, payload]); break;
            }
            default: break;
        }
    }
    const sendData = async (data) => { 
        await client.send(
            JSON.stringify(data));
    };
    const sendMessage = (payload) => {sendData(payload);}; // { key, msg }
    return { status, messages, sendMessage };
};
export default useChat;
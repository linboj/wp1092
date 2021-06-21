import { useState } from 'react';

const useChat = (server) => {
    const [status, setStatus] = useState({}); // { type, msg }
    const [messages, setMessages] = useState([]);

    const onEvent = (e) => {
        const { type } = e;

        switch (type) {
          case 'CHAT': {
            setMessages(e.data.messages);
            break;
          }
          case 'MESSAGE': {
            const newMessages = Object.assign([], messages);
            newMessages.push(e.data.message);
            setMessages(newMessages);
            break;
          }
        }
      };

    server.onmessage = (m) => {
        onEvent(JSON.parse(m.data));
    };

    const sendMessage = (payload, server) => {
        console.log(payload);
        server.sendEvent({
            type: 'MESSAGE',
            data: payload,
        });
    };

    return { status, sendMessage, messages };
};

export default useChat;
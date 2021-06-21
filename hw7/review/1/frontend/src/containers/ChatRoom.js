import '../App.css';
import { useEffect, useState } from 'react';
import { Tabs, Input, message } from 'antd';

import ChatModal from '../components/ChatModal';
import useChatBox from '../hooks/useChatBox';
import useChat from '../hooks/useChat';
import ChatLog from '../components/ChatLog';

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus, server }) => {
    const [messageInput, setMessageInput] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const { chatBoxes, createChatBox, removeChatBox } = useChatBox();
    const { sendMessage, messages } = useChat(server);

    const addChatBox = () => {
        setModalVisible(true);
    };

    const getReceiverName = () => {
        return chatBoxes.filter((chatBox) => chatBox.key === activeKey)[0].friend;
    }

    useEffect(() => {
        if (activeKey) {
            const startChat = () => {
                const receiver = getReceiverName();
                server.sendEvent({
                  type: 'CHAT',
                  data: { to: receiver, name: me },
                });
            };
            startChat();
        }
    }, [activeKey]);

    return (
        <>
            <div className='App-title'><h1>{me}'s Chat Room</h1></div>
            <div className='App-messages'>
                <Tabs 
                    type='editable-card'
                    activeKey={activeKey}
                    onChange={(key) => { 
                        setActiveKey(key); 
                    }}
                    onEdit={(targetKey, action) => {
                        if (action === 'add') { 
                            addChatBox(); 
                        }
                        else if (action === 'remove') { 
                            setActiveKey(removeChatBox(targetKey, activeKey)); 
                        }}
                    }
                >
                    {chatBoxes.map(({ friend, key, chatLog }) => (
                        <TabPane 
                            tab={friend} 
                            key={key}
                            closable={true}
                        >{
                            messages.length < 1 ? (
                                <p>Start chatting with {friend}!</p> 
                            ) : (
                                messages.map((m, i) => (
                                    // <p>{m.name}: {m.body}</p>
                                    <ChatLog key={`${friend}_${i}`} 
                                        name={m.name} msg={m.body} isSelf={m.name === me}/>
                                )
                            ))}
                        </TabPane>
                    ))}
                </Tabs>
                <ChatModal
                    visible={modalVisible}
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name, me));
                        setModalVisible(false);
                    }}
                    onCancel={() => {
                        setModalVisible(false);
                    }} 
                />
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                enterButton='Send'
                placeholder='Enter message here...'
                onSearch={(msg) => { 
                    if (!msg) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter message',
                        });
                        return;
                    } else if (activeKey === "") {
                        displayStatus({
                            type: 'error',
                            msg: 'Please add a chatbox first.',
                        });
                        return;
                    }
                    sendMessage({ to: getReceiverName(), name: me, body: msg }, server);
                    setMessageInput(""); 
                }}
            ></Input.Search>
        </>
    )
};

export default ChatRoom;
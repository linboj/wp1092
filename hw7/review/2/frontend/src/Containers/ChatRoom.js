import "../App.css";
import { useState } from "react"; 
import { Input } from "antd";
import ChatModal from "../Components/ChatModal";
import ChatBox from "../Components/ChatBox";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("")
    const {chatBoxes, createChatBox, removeChatBox} = useChatBox();
    const {messages, sendMessage} = useChat();
    const addChatBox = () => { setModalVisible(true); };
    return (
        <> <div className="App-title">
                <h1>{me}'s Chat Room</h1> </div> 
            <div className="App-messages"> 
                <ChatBox 
                    me={me}
                    chatBoxes={chatBoxes}
                    messages={messages}
                    activeKey={activeKey}
                    onChange={(key) => {setActiveKey(key);}} 
                    onEdit={(targetKey, action) => {
                        if (action === "add") addChatBox();
                        else if (action === "remove") setActiveKey(removeChatBox(activeKey, targetKey)); 
                    }}
                />
                <ChatModal 
                    visible={modalVisible} 
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(me, name));
                        sendMessage({ type: 'CHAT', data: {name: me, to: name} });
                        setModalVisible(false);
                    }}
                    onCancel={() => { setModalVisible(false);
                    }}
                />
            </div> 
            <Input.Search
                value={messageInput} 
                onChange={(e) =>setMessageInput(e.target.value)} 
                enterButton="Send"
                placeholder="Enter message here..."
                onSearch={(msg) => { 
                    if (!msg) {
                        displayStatus({
                            type: "error",
                            msg: "Please enter message.",
                        });
                        return;
                    } else if (activeKey === "") {
                        displayStatus({
                            type: "error",
                            msg: "Please add a chatbox first.",
                        }); 
                        setMessageInput(""); 
                        return;
                    }
                    sendMessage({ type: 'MESSAGE', data : {name: me, 
                        to: activeKey.substring(0, activeKey.search('_')) === me? activeKey.substring(activeKey.search('_')+1,activeKey.length)
                        : activeKey.substring(0, activeKey.search('_')), body: msg }}); 
                    setMessageInput("");
                }}
                     >
            </Input.Search> 
        </>);
}
export default ChatRoom;

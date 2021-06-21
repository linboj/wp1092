import "../App.css";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import ChatModal from "../Components/ChatModal"
import useChatBox from "../hooks/useChatBox";
import ChatBox from "../Components/ChatBox"
import {
    CHATBOXES_QUERY,
    USERS_QUERY,

    CREATE_CHATBOX_MUTATION,
    UPDATE_CHATBOX_MUTATION,
    CREATE_MESSAGE_MUTATION,
    CHATBOXES_SUBSCRIPTION,
} from '../graphql';
import { Tabs, Input } from "antd";
const { TabPane } = Tabs;

const ChatRoom = async ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const { chatBoxes, createChatBox, removeChatBox } = useChatBox()
    const addChatBox = () => { setModalVisible(true); };


    const { loading: loadingU, error: errorU, data: users_data } = useQuery(USERS_QUERY)
    const { loading: loadingC, error: errorC, data: chatboxes_data } = useQuery(CHATBOXES_QUERY)

    console.log(loadingU, errorU, users_data)
    console.log(loadingC, errorC, chatboxes_data)
    await users_data
    await chatboxes_data
    console.log("a", loadingU, errorU, users_data)
    console.log("b", loadingC, errorC, chatboxes_data)
    //const currentUser = users_data.users.filter((user) => user.name === "Band")
    //const currentChatBox = chatboxes_data.chatboxes.filter((chatbox) => chatbox.name === activeKey)

    //console.log("c", currentUser, currentChatBox)
    //const currentUser = users_data.users.filter((user) => user.name === me)[0]
    //const currentChatBox = chatboxes_query.chatboxes.filter((chatbox) => chatbox.name === activeKey)[0]

    const [startChat, { error: errorSC, data: NewChatBox }] = useMutation(CREATE_CHATBOX_MUTATION);
    const [updateChat, { error: errorUC, data: UpdatedChatBox }] = useMutation(UPDATE_CHATBOX_MUTATION);
    const [sendMessage, { error: errorSM, data: NewMessage }] = useMutation(CREATE_MESSAGE_MUTATION)

    return (
        <> <div className="App-title">
            <h1>{me}'s Chat Room</h1> </div>
            <div className="App-messages">
                <Tabs type="editable-card"
                    onEdit={(targetKey, action) => {
                        if (action === "add")
                            addChatBox();
                        else if (action === "remove")
                            setActiveKey(removeChatBox(activeKey, targetKey));
                    }}
                    activeKey={activeKey}
                    onChange={(key) => { setActiveKey(key); }}
                >
                    {chatBoxes.map((
                        { friend, key, chatLog }) => {
                        return (
                            <TabPane tab={friend}
                                key={key} closable={true}>
                                <p>{friend}'s chatbox.</p>
                                <ChatBox me={me} friend={friend} key={key} users_data={users_data} />
                            </TabPane>
                        );
                    })}

                </Tabs>


                <ChatModal
                    visible={modalVisible}
                    onCreate={async ({ name }) => {
                        setActiveKey(createChatBox(me, name));
                        setModalVisible(false);
                        await startChat({
                            variables: {
                                name1: me,
                                name2: name
                            },
                        });


                    }}

                    onCancel={() => {
                        setModalVisible(false);
                    }}
                />
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e) =>
                    setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder=
                "Enter message here..."
                onSearch={async (msg) => {
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
                    //sendMessage({ key: activeKey, body: msg });
                    setMessageInput("");
                    await sendMessage({
                        variables: {
                            sender: currentUser.id,
                            body: msg
                        }

                    });
                    await updateChat({
                        variables: {
                            chatbox_id: currentChatBox.id,
                            msg_id: NewMessage.id
                        }
                    })
                    const currentUser = users_data.users.filter((user) => user.name === me)[0]
                    const currentChatBox = chatboxes_data.chatboxes.filter((chatbox) => chatbox.name === activeKey)[0]
                }}
            ></Input.Search>
        </>);
};

export default ChatRoom;

//reference
//https://www.apollographql.com/docs/react/api/react/hooks/#usequery
//https://www.apollographql.com/docs/react/data/mutations/#usemutation-api
//https://www.apollographql.com/docs/react/data/subscriptions/
//https://www.apollographql.com/docs/apollo-server/data/subscriptions/
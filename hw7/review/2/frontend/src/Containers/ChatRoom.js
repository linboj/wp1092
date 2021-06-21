import "../App.css";
import ChatModal from "../Components/chatModal"
import { useState, useRef } from "react";
import { Tabs, Input } from "antd";
import useChatBox from "../hooks/useChatBox"
import useChat from "../hooks/useChat"


const { TabPane } = Tabs;


const ChatRoom = ({ me, displayStatus }) => {
	const [messageInput, setMessageInput] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [activeKey, setActiveKey] = useState("")
	const { chatBoxes ,createChatBox, removeChatBox } = useChatBox();
	//const { sendMessage } = useChat();

	const addChatBox = () => { setModalVisible(true); };
	let rcver = ""
	// let log = ;

	const server = new WebSocket('ws://localhost:8080');
	server.onopen = () => console.log('Server connected.');
	server.onmessage = (m) => {
		console.log("onmessage")
		onEvent(JSON.parse(m.data));
	};

	server.sendEvent = (e) => server.send(JSON.stringify(e));


	let messages = [];

	const startChat = (to,me) => {
		server.sendEvent({
		  type: 'CHAT',
		  data: { to: to, name: me },
		});
	};

	const sendMessage = (to,me,body) => {
		server.sendEvent({
		  type: 'MESSAGE',
		  data: { to: to, name: me, body: body },
		});
	};
	const messagesDOM = document.getElementById('messages');
	const ref = useRef([])
//messagesDOM.innerHTML = "test!!!!!!!"

	const renderMessages = (index) => {
		resetMessages(index);
		console.log("render")
		console.log("messages=",messages)
		messages.forEach(({ body, name }) => {
		  const newEle = document.createElement('li');
		  if (name === me){
			newEle.style.cssText = 'text-align:right;'
		  }
		  newEle.innerHTML = `${name}: ${body}`;
		  if(ref.current[index]){
			  ref.current[index].appendChild(newEle);
		  }
		});
		console.log("after:",ref.current)
	};

	const resetMessages = (index) => {
	// remove all children
		console.log(ref)
		if(ref.current[index]){
			ref.current[index].innerHTML = '';
		}
	};

	const onEvent = (e) => {
		const { type } = e;
		console.log("onEvent,type=",type)
		console.log("chatbox",chatBoxes,e.data)

		
		console.log("activeKey=",activeKey,"to=",rcver)

		let index = chatBoxes.findIndex(b=>b.friend === rcver)
		if(index === -1)
			index = chatBoxes.length
		console.log("index=",index)

		switch (type) {
		  case 'CHAT': {
		    messages = e.data.messages;
		    break;
		  }
		  case 'MESSAGE': {
		    messages.push(e.data.message);
		    break;
		  }
		}

		renderMessages(index);
	};

	return (
		<> <div className="App-title">
			<h1>{me}'s Chat Room</h1> </div>
		<div className="App-messages">
			<Tabs 
				type="editable-card" 
				activeKey={activeKey}
				onChange={(key) => { console.log("change",key); 
									let recver = '';
									if (me === key.slice(0, me.length))
										recver = key.slice(me.length+1, key.length)
									else 
										recver = key.slice(0, key.length - me.length - 1)
									rcver = recver
									console.log("rcver is",rcver)
									startChat(rcver,me); 
									setActiveKey(key); }}
				onEdit={(targetKey, action) => {
					if (action === "add") addChatBox();
					else if (action === "remove") setActiveKey( removeChatBox(targetKey, activeKey) );
				}}
				>
				{chatBoxes.map(({ friend, key, chatLog },index) => {
						return (
							<TabPane tab={friend}
								key={key} closable={true}>
								<p>{friend}'s chatbox.{index}</p>
								<p ref={el => ref.current[index] = el}></p>
							</TabPane>
						);})}
				
			</Tabs>
			<ChatModal
				visible={modalVisible}
				onCreate={({ name }) => {
					startChat(name,me)
					setActiveKey( createChatBox(name,me) );
					setModalVisible(false);
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

				let recver = '';
				if (me === activeKey.slice(0, me.length))
					recver = activeKey.slice(me.length+1, activeKey.length)
				else 
					recver = activeKey.slice(0, activeKey.length - me.length - 1)
				rcver = recver
				console.log("activeKey=",activeKey,"to=",rcver)
				sendMessage(rcver,me,msg);
				setMessageInput("");
				}}
		></Input.Search>
	</>);
};
export default ChatRoom;


/*{messages.map( log => {
									//console.log("myid =",myid.userid,"sender id =",log.sender)
									if(log.name === me){
										//console.log("same!!",log.body);
										return(<p align="right">me:<h3>{log.body}</h3></p>)
									}
									else{
										return(<p align="left">not me:<h3>{log.body}</h3></p>)
									}
								}*/
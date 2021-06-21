import { Tabs, Tag } from "antd";
const { TabPane } = Tabs;  
const ChatBox = ({me, chatBoxes, messages, activeKey, onChange, onEdit}) => {
    if(activeKey.includes('_') & messages.length > 0){
        const name1 = messages[0].name
        const name2 = messages[0].to.name
        const checkKey = name1 <= name2 ? `${name1}_${name2}` : `${name2}_${name1}`;
        if(activeKey === checkKey){
            const chatbox = chatBoxes.find(({ key }) => key === activeKey)
            chatbox.chatLog = messages;
        }
    }
    return(
        <Tabs type="editable-card"
            activeKey={activeKey}
            onChange={onChange}  
            onEdit={onEdit}>
            {chatBoxes.map((
                { friend, key, chatLog}) => {
                    return (
                        <TabPane tab={friend}
                            key={key} closable={true}> 
                            {chatLog.length === 0 ? (
                                <p style={{ color: '#ccc' }}> No messages... </p>
                            ):(chatLog.map(({ name, body }, i) => (  name === me?
                                (<p className="App-message" key={i} align="right">
                                {body} <Tag color="blue">{name}</Tag></p>)
                                :(<p className="App-message" key={i}>
                                <Tag color="blue">{name}</Tag>{body} </p>)
                            )))}
                        </TabPane>
            );})}
        </Tabs>
    );
};
export default ChatBox;
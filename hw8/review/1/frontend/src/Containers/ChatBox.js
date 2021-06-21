import '../App.css'
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {Tag} from 'antd'
import {
    MESSAGE_QUERY,
    MESSAGE_SUBSCRIPTION,
} from '../graphql'

const ChatBox = ({me, chatbox_key, friend}) => {
    const { loading, error, data, subscribeToMore} = useQuery(
        MESSAGE_QUERY, 
        { variables: {chatbox_key: chatbox_key}}
    );
    
    useEffect(() => {
        try {
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { chatbox_key: chatbox_key },
                updateQuery: (prev, {subscriptionData}) => {
                    if(!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.NewMessage;
                    return {
                        CurrentMessage: [...prev.CurrentMessage, newMessage],
                    };
                }
            });
        } catch (e) {
            console.log('Something wrong...', e.message);
        }
    }, [subscribeToMore, chatbox_key]);
    if (loading)
        return 'Loading...';
    if (error)
        return String(error);
    return (
        <div>
            {data.CurrentMessage.map((message, i) => (
                <p className="App-message" 
                    style={(me===message.sender)?({textAlign:'right'}):({textAlign:'left'})}>
                <Tag color='blue'>{message.sender}</Tag>{message.body}
                </p>
            ))}
        </div>
    );
}

export default ChatBox;
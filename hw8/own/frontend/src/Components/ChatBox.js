import {Tag} from 'antd';
import { useQuery} from '@apollo/react-hooks'
import { useEffect } from 'react'
import {CHATBOX_SUBSCRIPTION,
    CHATBOX_QUERY
} from '../graphql'

const ChatBox=({friend,me})=>{
    const localkey=[friend, me].sort().join('_');
    const {loading,error,data,subscribeToMore}=useQuery(CHATBOX_QUERY,{ variables: { chatBoxName: localkey } })
    
    useEffect(()=>{
        subscribeToMore({
            document: CHATBOX_SUBSCRIPTION,
            variables: { chatBoxName: localkey},
            updateQuery: (prev,{subscriptionData})=>{
                if (!subscriptionData.data) return prev
                return subscriptionData.data
            }
        }) 
    },[subscribeToMore])
    //if (!loading) return <p>Loading ...</p>;
    return(
        <>
            {!data?(<p>Loading ...</p>):
            (data.chatBox.messages.length===0 ?
                (<p style={{ color: '#ccc' }}>No messages...</p>):
                (data.chatBox.messages.map(({sender,body},i)=>{
                    if(sender.name!==me){
                        return (
                        <p className="App-message" key={i} style={{'text-align':'left'}}>
                            <Tag color='#40a9ff'>{sender.name}</Tag> {body}
                        </p>)
                    }
                    else{
                        return (
                        <p className="App-message" key={i} style={{'text-align':'right'}}>
                            {body} <Tag color='#40a9ff'>{sender.name}</Tag>
                        </p>)
                    }
                })
                )
            )}
        </>
    )
}

export default ChatBox
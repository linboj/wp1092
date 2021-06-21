import { useEffect } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import Message from "./Message"
import { CHATBOXES_QUERY, CHATBOXES_SUBSCRIPTION } from "../graphql"

const ChatBox = ({ me, friend, key, users_data }) => {
    const { loading, error, data: chatboxes_query, subscribeToMore } = useQuery(CHATBOXES_QUERY)
    console.log("in ChatBox")
    useEffect(() => {
        try {
            subscribeToMore({
                document: CHATBOXES_SUBSCRIPTION,
                //updateQuery is a function that tells Apollo Client how to combine the query's 
                //currently cached result (prev) with the subscriptionData that's pushed by our GraphQL server.
                //The return value of this function completely replaces the current cached result for the query.
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newChatBox = subscriptionData.data.chatbox.data;

                    return {
                        ...prev,
                        chatboxes: [newChatBox, ...prev.chatboxes],
                    };
                },
            });
        } catch (e) { }
    }, [subscribeToMore]);

    const chatbox = chatboxes_query.chatboxes.filter((chatbox) => chatbox.name === key)[0]

    return chatbox.messages.map((msg) => { //message: {sender, body}
        const sendername = users_data.filter((user) => user.id === msg.sender.id)[0]
        return <Message me={me} sender={sendername} body={msg.body} />
    })
};
export default ChatBox;
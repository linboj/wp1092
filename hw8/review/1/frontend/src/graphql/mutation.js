import { gql } from '@apollo/client';

const ADD_CHATBOX_MUTATION = gql`
    mutation createChatBox(
        $sender: String!,
        $to: String!,
    ) {
        createChatBox(
            sender: $sender,
            to: $to,
        ) {
            id
            name 
        }
    }
`

const ADD_MESSAGE_MUTATION = gql`
    mutation createMessage(
        $sender: String!, 
        $to: String!,
        $message: String!
    ) {
        createMessage(
            sender: $sender 
            to: $to 
            message: $message
        ) {
            sender 
            body
        }
    }
`

export {ADD_CHATBOX_MUTATION, ADD_MESSAGE_MUTATION} 
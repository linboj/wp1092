import { gql } from '@apollo/client'

const MESSAGE_SUBSCRIPTION = gql`
    subscription updateMessage(
        $chatbox_key: String!
    ) {
        NewMessage(
            chatbox_key: $chatbox_key
        ) {
            sender 
            body
        }
    }
`

export {MESSAGE_SUBSCRIPTION}
import { gql } from '@apollo/client';

const MESSAGE_QUERY = gql`
    query getMessages(
        $chatbox_key: String!,
    ) {
        CurrentMessage(chatbox_key: $chatbox_key) {
            sender 
            body
        }
    }
`
export {MESSAGE_QUERY}
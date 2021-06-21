import { gql } from '@apollo/client';
const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $name: String!
  ) {
    createUser(
      name: $name
    ) {
      id
      name
      }
    }
  
`
const CREATE_CHATBOX_MUTATION = gql`
  mutation createChatBox(
    $name1: String!
    $name2: String!
  ) {
    createChatBox(
      name1: $name1
      name2: $name2
    ) {
      id
      name
      messages{
        sender{
          id
          name
        }
        body
      }
    }
  }
`;

const UPDATE_CHATBOX_MUTATION = gql`
  mutation updateChatBox(
    $chatbox_id: ID
    $msg_id: ID
  ){
    updateChatBox(
      chatbox_id: $chatbox_id
      msg_id: $msg_id
    ) {
      id
      name
      messages{
        sender
        {
          id
          name
        }
        body
      }
    }
  }
`

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $sender: ID
    $body: String
  ){
    createMessage(
      data: {
        sender: $sender
        body: $body
      })
      {
        id
        sender{
          id 
          name
        }
        body
      }
    }
`
export { CREATE_USER_MUTATION,UPDATE_CHATBOX_MUTATION, CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION }

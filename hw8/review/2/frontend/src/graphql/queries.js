import { gql } from '@apollo/client';

const CHATBOXES_QUERY = gql`
  query {
    chatboxes{
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
const USERS_QUERY = gql`
  query {
    users{
      id
      name
    }
  }
`;

export { CHATBOXES_QUERY, USERS_QUERY }
import { gql } from '@apollo/client';

export const CHATBOXES_SUBSCRIPTION = gql`
  subscription {
    chatbox {
      mutation
      data {     
        name
        messages{
          sender{
            name
          }
          body
        }
      }
    }
  }`;

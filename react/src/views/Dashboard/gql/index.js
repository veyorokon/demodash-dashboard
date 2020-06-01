import {gql} from "apollo-boost";

export const USER__ACCOUNT_USER_SET = gql`
  query user($token: String!) {
    user(token: $token) {
      id
      accountUsers {
        id
        role
        account {
          id
          type
          profile {
            id
            name
          }
        }
      }
    }
  }
`;

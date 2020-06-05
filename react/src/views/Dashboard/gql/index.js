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
            address {
              id
              line1
              line2
              city
              state
              zip
              country
            }
            industry {
              id
              choice1
              choice2
              choice3
            }
          }
        }
      }
    }
  }
`;

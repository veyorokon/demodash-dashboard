import {gql} from "apollo-boost";

export const ACCOUNT_USER = gql`
  query accountUser($token: String!, $id: Int!) {
    accountUser(token: $token, id: $id) {
      id
      dateCreated
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
            country
            city
            zip
            state
          }
          industries {
            id
            choice
          }
        }
      }
    }
  }
`;

export const ACCOUNT_CATEGORIES = gql`
  query industries {
    industries {
      text
      value
    }
  }
`;

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount(
    $accountUserId: Int!
    $state: String
    $city: String
    $country: String
    $line1: String
    $line2: String
    $zip: String
    $accountName: String
    $token: String!
  ) {
    updateAccount(
      token: $token
      accountUserId: $accountUserId
      state: $state
      country: $country
      line1: $line1
      line2: $line2
      zip: $zip
      city: $city
      accountName: $accountName
    ) {
      account {
        id
        profile {
          id
          address {
            id
            line1
            line2
            city
            state
            zip
            country
          }
        }
      }
    }
  }
`;

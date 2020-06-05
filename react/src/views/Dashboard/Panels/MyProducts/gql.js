import {gql} from "apollo-boost";

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $token: String!
    $accountUserId: Int!
    $name: String!
    $description: String!
    $images: [Images]
    $variations: [Variations]
  ) {
    createProduct(
      token: $token
      accountUserId: $accountUserId
      name: $name
      description: $description
      images: $images
      variations: $variations
    ) {
      product {
        id
      }
    }
  }
`;

export const ACCOUNT_USER__PRODUCTS = gql`
  query accountUser($token: String!, $id: Int!) {
    accountUser(token: $token, id: $id) {
      id
      account {
        id
        products {
          id
          variations {
            id
            name
            options {
              id
              option
              image {
                id
                image
              }
            }
          }
          images {
            id
            image
            variationOption {
              id
            }
          }
        }
      }
    }
  }
`;

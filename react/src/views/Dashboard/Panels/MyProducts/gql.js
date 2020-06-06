import {gql} from "apollo-boost";

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $token: String!
    $accountUserId: Int!
    $name: String!
    $description: String!
    $images: [Images]!
    $variations: [Variations]
    $price: Float!
  ) {
    createProduct(
      token: $token
      accountUserId: $accountUserId
      name: $name
      description: $description
      images: $images
      variations: $variations
      price: $price
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
        profile {
          id
          name
        }
        products {
          id
          name
          description
          price
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

export const DELETE_PRODUCT = gql`
  mutation deleteProduct(
    $token: String!
    $accountUserId: Int!
    $productId: Int!
  ) {
    deleteProduct(
      token: $token
      accountUserId: $accountUserId
      productId: $productId
    ) {
      product {
        id
      }
    }
  }
`;

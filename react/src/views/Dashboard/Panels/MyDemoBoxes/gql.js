import {gql} from "apollo-boost";

export const ACCOUNT_USER__PRODUCTS = gql`
  query accountUser($token: String!, $id: Int!) {
    accountUser(token: $token, id: $id) {
      id
      account {
        id
        products {
          id
          name
        }
      }
    }
  }
`;

export const PRODUCT__DESCRIPTION = gql`
  query product($token: String!, $accountUserId: Int!, $productId: Int!) {
    product(
      token: $token
      accountUserId: $accountUserId
      productId: $productId
    ) {
      id
      description
    }
  }
`;

export const CREATE_DEMO_BOX = gql`
  mutation createDemoBox(
    $token: String!
    $accountUserId: Int!
    $name: String!
    $productIds: [Int]!
    $price: Float!
    $refillPrice: Float!
    $shippingPrice: Float!
  ) {
    createDemoBox(
      token: $token
      accountUserId: $accountUserId
      name: $name
      productIds: $productIds
      price: $price
      refillPrice: $refillPrice
      shippingPrice: $shippingPrice
    ) {
      demoBox {
        id
      }
    }
  }
`;

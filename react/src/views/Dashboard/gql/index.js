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

/*
    Products GQL
*/

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $token: String!
    $accountUserId: Int!
    $name: String!
    $description: String!
    $images: [Image]!
    $variations: [Variation]
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

/*
  DemoBox
*/

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

export const DEMO_BOXES = gql`
  query demoBoxes($token: String!, $accountUserId: Int!) {
    demoBoxes(token: $token, accountUserId: $accountUserId) {
      id
      name
      price
      refillPrice
      shippingPrice
      items {
        id
        product {
          id
          name
          price
        }
      }
      account {
        id
        profile {
          id
          name
        }
      }
      images {
        id
        image
      }
    }
  }
`;

export const DELETE_DEMO_BOX = gql`
  mutation deleteDemoBox(
    $token: String!
    $demoBoxId: Int!
    $accountUserId: Int!
  ) {
    deleteDemoBox(
      accountUserId: $accountUserId
      token: $token
      demoBoxId: $demoBoxId
    ) {
      demoBox {
        id
      }
    }
  }
`;

/*
  Demo Campaigns
*/

export const CAMPAIGN_TYPES = gql`
  query campaignTypes {
    campaignTypes {
      text
      value
    }
  }
`;
export const CREATE_DEMO_CAMPAIGN = gql`
  mutation(
    $accountUserId: Int!
    $commissions: [Commission]!
    $demoBoxId: Int!
    $demoerLimit: Int
    $name: String!
    $refillLimit: Int
    $token: String!
    $type: String!
  ) {
    createDemoCampaign(
      name: $name
      accountUserId: $accountUserId
      commissions: $commissions
      demoBoxId: $demoBoxId
      token: $token
      demoerLimit: $demoerLimit
      refillLimit: $refillLimit
      type: $type
    ) {
      demoCampaign {
        id
      }
    }
  }
`;

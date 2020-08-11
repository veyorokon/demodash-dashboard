import {gql} from "apollo-boost";

/*
Home
*/
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
          website
          address {
            id
            line1
            line2
            country
            city
            zip
            state
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
    $website: String
    $state: String
    $city: String
    $country: String
    $line1: String
    $line2: String
    $zip: String
    $accountName: String
    $token: String!
    $choice1: String
    $choice2: String
    $choice3: String
  ) {
    updateAccount(
      token: $token
      accountUserId: $accountUserId
      website: $website
      state: $state
      country: $country
      line1: $line1
      line2: $line2
      zip: $zip
      city: $city
      accountName: $accountName
      choice1: $choice1
      choice2: $choice2
      choice3: $choice3
    ) {
      account {
        id
      }
    }
  }
`;

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
            website
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
    Products
*/

export const CREATE_PRODUCT = gql`
  mutation createProduct(
    $token: String!
    $accountUserId: Int!
    $name: String!
    $description: String!
    $images: [Image]!
    $variations: [VariationInput]
    $price: Float!
    $shippingPrice: Float
  ) {
    createProduct(
      token: $token
      accountUserId: $accountUserId
      name: $name
      description: $description
      images: $images
      variations: $variations
      price: $price
      shippingPrice: $shippingPrice
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
          shippingPrice
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

export const DEMO_CAMPAIGNS = gql`
  query demoCampaigns($token: String!, $accountUserId: Int!) {
    demoCampaigns(token: $token, accountUserId: $accountUserId) {
      id
      name
      account {
        id
        profile {
          id
          name
        }
      }
      demoCommissions {
        id
        amount
        demoBoxItem {
          id
          product {
            id
            name
            price
          }
        }
      }
      demoBox {
        id
        name
        price
        refillPrice
        shippingPrice
        images {
          id
          image
        }
      }
    }
  }
`;

export const DELETE_DEMO_CAMPAIGN = gql`
  mutation deleteDemoCampaign(
    $token: String!
    $demoCampaignId: Int!
    $accountUserId: Int!
  ) {
    deleteDemoCampaign(
      accountUserId: $accountUserId
      token: $token
      demoCampaignId: $demoCampaignId
    ) {
      demoCampaign {
        id
      }
    }
  }
`;

/*
    Find Demo boxes
*/

export const OPEN_DEMO_CAMPAIGNS = gql`
  query openDemoCampaigns($token: String!, $search: String) {
    openDemoCampaigns(token: $token, search: $search) {
      id
      account {
        id
        profile {
          id
          name
        }
      }
      demoCommissions {
        id
        amount
        demoBoxItem {
          id
          product {
            id
            name
            description
            price
            shippingPrice
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
      demoBox {
        id
        name
        price
        refillPrice
        shippingPrice
      }
    }
  }
`;

/*

 */
export const MY_DEMO_BOXES = gql`
  query demoerInventory($token: String!, $accountUserId: Int!) {
    demoerInventory(token: $token, accountUserId: $accountUserId) {
      id
      demoCampaign {
        id
        account {
          id
          profile {
            id
            name
          }
        }
        demoCommissions {
          id
          amount
          demoBoxItem {
            id
            product {
              id
              name
              price
              description
              images {
                id
                image
                variationOption {
                  id
                  image {
                    id
                    image
                  }
                }
              }
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
            }
          }
        }
        demoBox {
          id
          name
          price
          refillPrice
          shippingPrice
          images {
            id
            image
          }
        }
      }
    }
  }
`;

/*
  Payout and Billing
*/

export const CREATE_BILLING_CARD = gql`
  mutation createCard(
    $token: String!
    $accountUserId: Int!
    $cardNumber: String!
    $cvc: String!
    $expirationMonth: String!
    $expirationYear: String!
    $name: String!
  ) {
    createCard(
      token: $token
      accountUserId: $accountUserId
      cardNumber: $cardNumber
      cvc: $cvc
      expirationMonth: $expirationMonth
      expirationYear: $expirationYear
      name: $name
    ) {
      account {
        id
      }
    }
  }
`;

export const ACCOUNT_PAYOUT_SET = gql`
  query accountPayoutSet($token: String!, $accountUserId: Int!) {
    accountPayoutSet(token: $token, accountUserId: $accountUserId) {
      id
      card {
        id
        isDefault
      }
      bank {
        id
        bankName
        routingNumber
        lastFour
        isDefault
      }
    }
  }
`;

export const ACCOUNT_CARD_SET = gql`
  query accountCardSet($token: String!, $accountUserId: Int!) {
    accountCardSet(token: $token, accountUserId: $accountUserId) {
      id
      name
      lastFour
      expMonth
      expYear
      brand
      isDefault
    }
  }
`;

export const DELETE_EXTERNAL_ACCOUNT = gql`
  mutation deleteExternalAccount(
    $token: String!
    $externalAccountId: Int!
    $accountUserId: Int!
  ) {
    deleteExternalAccount(
      accountUserId: $accountUserId
      token: $token
      externalAccountId: $externalAccountId
    ) {
      account {
        id
      }
    }
  }
`;

export const DELETE_CARD = gql`
  mutation deleteCard($token: String!, $cardId: Int!, $accountUserId: Int!) {
    deleteCard(accountUserId: $accountUserId, token: $token, cardId: $cardId) {
      account {
        id
      }
    }
  }
`;

export const SET_DEFAULT_CARD = gql`
  mutation setDefaultCard(
    $token: String!
    $cardId: Int!
    $accountUserId: Int!
  ) {
    setDefaultCard(
      accountUserId: $accountUserId
      token: $token
      cardId: $cardId
    ) {
      account {
        id
      }
    }
  }
`;

export const SET_DEFAULT_EXTERNAL_ACCOUNT = gql`
  mutation setDefaultExternalAccount(
    $token: String!
    $externalAccountId: Int!
    $accountUserId: Int!
  ) {
    setDefaultExternalAccount(
      accountUserId: $accountUserId
      token: $token
      externalAccountId: $externalAccountId
    ) {
      account {
        id
      }
    }
  }
`;

export const QUERY_ACCOUNT_BILLABLE = gql`
  query accountUser($token: String!, $id: Int!) {
    accountUser(token: $token, id: $id) {
      id
      account {
        id
        hasValidCard
      }
    }
  }
`;

export const CREATE_BANK = gql`
  mutation createBank(
    $token: String!
    $accountUserId: Int!
    $accountNumber: String!
    $routingNumber: String!
  ) {
    createBank(
      token: $token
      accountUserId: $accountUserId
      accountNumber: $accountNumber
      routingNumber: $routingNumber
    ) {
      account {
        id
      }
    }
  }
`;

/*
  Demo Checkout Drawer
*/
export const OPEN_DEMO_CAMPAIGN = gql`
  query openDemoCampaign($token: String!, $demoCampaignId: Int!) {
    openDemoCampaign(token: $token, demoCampaignId: $demoCampaignId) {
      id
      account {
        id
        profile {
          id
          name
        }
      }
      demoCommissions {
        id
        amount
        demoBoxItem {
          id
          product {
            id
            name
            description
            price
            images {
              id
              image
            }
          }
        }
      }
      demoBox {
        id
        name
        price
        refillPrice
        shippingPrice
        images {
          id
          image
        }
      }
    }
  }
`;

/*
  Purchase demobox
*/

export const CREATE_DEMO_BOX_PURCHASE = gql`
  mutation createDemoboxPurchase(
    $token: String!
    $accountUserId: Int!
    $demoCampaignId: Int!
    $accountCardId: Int
  ) {
    createDemoBoxPurchase(
      token: $token
      accountUserId: $accountUserId
      demoCampaignId: $demoCampaignId
      accountCardId: $accountCardId
    ) {
      receipt {
        id
        uid
      }
    }
  }
`;

/*
Purchases
*/
export const SALES = gql`
  query sales($token: String!, $accountUserId: Int!) {
    sales(token: $token, accountUserId: $accountUserId) {
      id
      purchase {
        id
        dateCreated
        paymentStatus
        price
        receipt {
          id
          transfers {
            id
            amount
          }
          items {
            id
            itemName
            commission {
              id
              amount
            }
            product {
              id
              name
            }
            demoBox {
              id
              items {
                id
                product {
                  id
                  name
                }
              }
            }
            options {
              id
              variationOptionName
            }
          }
        }
        recipient {
          id
          name
          address {
            id
            line1
            line2
            state
            city
            country
            zip
          }
        }
      }
    }
  }
`;

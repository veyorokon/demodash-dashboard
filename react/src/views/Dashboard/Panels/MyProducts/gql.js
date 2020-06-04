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

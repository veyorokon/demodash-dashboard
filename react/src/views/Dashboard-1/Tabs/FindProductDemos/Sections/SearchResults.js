import React from "react";
import {Box, ProductCard} from "components";
import {Query} from "@apollo/react-components";
import {gql} from "apollo-boost";
import {API_SERVER} from "api";

const OPEN_DEMO_CAMPAIGNS = gql`
  query openDemoCampaigns {
    openDemoCampaigns {
      id
      demoBoxPrice
      commission {
        id
        salePrice
        commissionPrice
        product {
          id
          account {
            id
            profile {
              id
              icon
              name
            }
          }
          name
          shortDescription
          images {
            id
            image
          }
        }
      }
    }
  }
`;

function formatCurrency(intVal) {
  return parseFloat(intVal / 100).toFixed(2);
}

function SearchResults(props) {
  return (
    <Box p={4}>
      <Query query={OPEN_DEMO_CAMPAIGNS} fetchPolicy="network-only">
        {({loading, error, data}) => {
          if (error) return <div>error</div>;
          if (loading || !data) return <div>Loading</div>;
          return data.openDemoCampaigns.map((campaign, index) => {
            console.log(campaign);
            return (
              <ProductCard
                key={index}
                mr={4}
                cardImage={
                  API_SERVER +
                  "media/" +
                  campaign.commission.product.images[0].image
                }
                cardIcon={
                  API_SERVER +
                  "media/" +
                  campaign.commission.product.account.profile.icon
                }
                brandName={campaign.commission.product.account.profile.name}
                productName={campaign.commission.product.name}
                productDescription={
                  campaign.commission.product.shortDescription
                }
                salePrice={`$${formatCurrency(campaign.commission.salePrice)}`}
                commission={`$${formatCurrency(
                  campaign.commission.commissionPrice
                )} per sale`}
                callBack={() => console.log("test")}
              />
            );
          });
        }}
      </Query>
    </Box>
  );
}
export default SearchResults;

import React from "react";
import {Box, ProductCard} from "components";
import bromaneImage from "assets/images/bromane-brand.jpg";
import bromaneIcon from "assets/svg/dashboard/bromane.svg";
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

function SearchResults(props) {
  return (
    <Box p={4}>
      <Query query={OPEN_DEMO_CAMPAIGNS} fetchPolicy="network-only">
        {({loading, error, data}) => {
          if (error) return <div>error</div>;
          if (loading || !data) return <div>Loading</div>;
          console.log(data);
          return data.openDemoCampaigns.map((campaign, index) => {
            console.log(campaign);
            return (
              <ProductCard
                key={index}
                mr={4}
                cardImage={
                  API_SERVER + campaign.commission.product.images[0].image
                }
                cardIcon={
                  API_SERVER + campaign.commission.product.account.profile.icon
                }
                brandName={"Bromane"}
                productName={"Hair filling fibers"}
                productDescription={`Bromane's cosmetic hair powder fills in thinning hair in seconds`}
                salePrice={"$20.00"}
                commission={"$6.00 per sale"}
                callBack={() => console.log("test")}
              />
            );
          });
        }}
      </Query>
      <ProductCard
        cardImage={bromaneImage}
        cardIcon={bromaneIcon}
        brandName={"Bromane"}
        productName={"Hair filling fibers starter kit"}
        productDescription={`Bromane's cosmetic hair powder fills in thinning hair in seconds`}
        salePrice={"$27.00"}
        commission={"$8.00 per sale"}
        callBack={() => console.log("test2")}
      />
    </Box>
  );
}
export default SearchResults;

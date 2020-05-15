import React from "react";
import {Box, ProductCard} from "components";
import bromaneImage from "assets/images/bromane-brand.jpg";
import bromaneIcon from "assets/svg/dashboard/bromane.svg";

function SearchResults(props) {
  return (
    <Box p={4}>
      <ProductCard
        mr={4}
        cardImage={bromaneImage}
        cardIcon={bromaneIcon}
        brandName={"Bromane"}
        productName={"Hair filling fibers"}
        productDescription={`Bromane's cosmetic hair powder fills in thinning hair in seconds`}
        salePrice={"$20.00"}
        commission={"$6.00 per sale"}
        callBack={() => console.log("test")}
      />
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

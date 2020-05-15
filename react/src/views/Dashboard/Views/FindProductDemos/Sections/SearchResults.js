import React from "react";
import {Box, ProductCard} from "components";

function SearchResults(props) {
  return (
    <Box p={4}>
      <ProductCard
        mr={4}
        brandName={"Bromane"}
        productName={"Hair filling fibers"}
        productDescription={`Bromane's cosmetic hair powder fills in thinning hair in seconds.`}
        salePrice={"$20.00"}
        commission={"$6.00 per sale."}
        callBack={() => console.log("test")}
      />
      <ProductCard
        brandName={"Bromane"}
        productName={"Hair filling fibers starter kit"}
        productDescription={`Bromane's cosmetic hair powder fills in thinning hair in seconds. `}
        salePrice={"$27.00"}
        commission={"$8.00 per sale."}
        callBack={() => console.log("test")}
      />
    </Box>
  );
}
export default SearchResults;

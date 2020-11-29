import React from "react";
import Products from "./Products";
import AddProductForm from "./AddProductForm";

const MyProducts = props => {
  return (
    <>
      <AddProductForm />
      <Products />
    </>
  );
};
export default MyProducts;

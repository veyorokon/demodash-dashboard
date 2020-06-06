import React from "react";
import DemoBoxes from "./DemoBoxes";
import AddDemoBoxForm from "./AddDemoBoxForm";

export default props => {
  return (
    <>
      <AddDemoBoxForm />
      <DemoBoxes />
    </>
  );
};

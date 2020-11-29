import React from "react";
import DemoBoxes from "./DemoBoxes";
import AddDemoBoxForm from "./AddDemoBoxForm";

const MyDemoBoxes = props => {
  return (
    <>
      <AddDemoBoxForm />
      <DemoBoxes />
    </>
  );
};
export default MyDemoBoxes;

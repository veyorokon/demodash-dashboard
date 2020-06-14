import React from "react";
import PayoutForm from "./PayoutForm";
import BillingForm from "./BillingForm";

export default function Home(props) {
  return (
    <>
      <PayoutForm />
      <BillingForm />
    </>
  );
}

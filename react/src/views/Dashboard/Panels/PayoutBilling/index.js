import React from "react";
import PayoutForm from "./PayoutForm";
import BillingForm from "./BillingForm";
import PaymentCards from "./PaymentCards";

export default function Home(props) {
  return (
    <>
      <PayoutForm />
      <BillingForm />
      <PaymentCards />
    </>
  );
}

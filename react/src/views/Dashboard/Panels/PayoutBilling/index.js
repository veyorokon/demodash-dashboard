import React from "react";
import PayoutForm from "./PayoutForm";
import BillingForm from "./BillingForm";
import PaymentCards from "./PaymentCards";
import PayoutAccounts from "./PayoutAccounts";

export default function Home(props) {
  return (
    <>
      <PayoutForm />
      <PayoutAccounts />
      <BillingForm />
      <PaymentCards />
    </>
  );
}

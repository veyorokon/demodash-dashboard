import React from "react";
import {Box} from "components";

import CheckoutContainer from "./CheckoutContainer";
import Confirmation from "./Confirmation";
import Overview from "./Overview";
import Success from "./Success";
import styled, {css} from "styled-components";
// import {responsive as r} from "lib";
import {connect} from "react-redux";
import {updateDemoCheckoutForm} from "redux/actions";

const Hide = styled(Box)`
  transition: opacity 0.8s ease-in-out;
  visibility: hidden;
  height: 0;
  width: 0;
  opacity: 0;
  max-height: fit-content;
  display: none;
  ${props =>
    props.showing &&
    css`
      height: 100%;
      width: 100%;
      opacity: 1;
      visibility: visible;
      display: block;
    `}
`;

function mapDispatchToProps(dispatch) {
  return {
    updateDemoCheckoutForm: payload => dispatch(updateDemoCheckoutForm(payload))
  };
}

const mapStateToProps = state => {
  const {demoCheckoutForm} = state;
  return {
    demoCheckoutForm
  };
};

class _Checkout extends React.Component {
  render() {
    const {demoCheckoutForm} = this.props;
    return (
      <>
        {this.props.children.length ? (
          this.props.children.map((elem, index) => (
            <Hide
              flexGrow={0}
              key={index}
              showing={demoCheckoutForm.currentPanel === index}
            >
              <CheckoutContainer>{elem}</CheckoutContainer>
            </Hide>
          ))
        ) : (
          <>
            <CheckoutContainer>{this.props.children}</CheckoutContainer>
          </>
        )}
      </>
    );
  }
}

const Checkout = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Checkout);

export default props => {
  return (
    <Checkout>
      <Overview />
      <Confirmation />
      <Success />
    </Checkout>
  );
};

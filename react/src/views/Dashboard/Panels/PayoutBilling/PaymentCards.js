import React from "react";
import {Flex, Text} from "components";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

class CardComponent extends React.Component {
  state = {
    focus: ""
  };

  handleInputFocus = e => {
    this.setState({focus: e.target.name});
  };

  handleInputChange = e => {
    const {name, value} = e.target;

    this.setState({[name]: value});
  };

  render() {
    return <Cards focused={this.state.focus} {...this.props} />;
  }
}

export default props => {
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Cards
        </Text>
      </Flex>
      <Flex mb={4} justifyContent="center">
        <div id="PaymentForm">
          <CardComponent
            cvc={"123"}
            expiry={"0212"}
            name={"some name"}
            number={"------------4242"}
            issuer={"JCB"}
            preview
          />
        </div>
      </Flex>
    </>
  );
};

import React from "react";
import {Box, Image, Text} from "components";
import styled from "styled-components";
import testImage from "assets/images/bromane.jpg";
import logo from "assets/svg/logo.svg";

const CardComponent = styled(Box)`
  width: 25rem;
  position: relative;
  ::before {
    content: "";
    position: absolute;
    top: -1.8rem;
    right: -1.8rem;
    width: 100%;
    height: 100%;
    border-radius: 1.6rem;
    padding-bottom: 2.4rem;
    background: #f5f5f5;
  }
`;

const CardImage = styled(Image)`
  width: 25rem;
  display: block;
  border-radius: 8px;
  box-shadow: 0 0 2rem rgba(10, 8, 16, 0.22);
  position: relative;
`;

const CardInterlude = styled(Box)`
  position: relative;
  font-size: 0.55rem;
  font-weight: 400;
  padding: 1.6rem 1.6rem 3.2rem 5.5rem;
  margin-left: 0.8rem;
  white-space: normal;
  text-align: left;
`;

const InterludeImage = styled(Image)`
  position: absolute;
  left: -1rem;
  top: 50%;
  transform: translateY(-66%);
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  border: 5px solid #f5f5f5;
  background: #f5f5f5;
`;

const CardContent = props => (
  <CardInterlude>
    <Text mb={2} fs={"1.6rem"} fw={500}>
      Bromane
    </Text>
    <InterludeImage h={"1.6rem"} src={logo} />
    <Text fs={"1.2rem"} lineHeight="1.5">
      Bromane's cosmetic hair powder fills in thinning hair in seconds. Results
      look natural and last all day.
    </Text>
  </CardInterlude>
);

export default props => {
  console.log(props);

  return (
    <CardComponent>
      <CardImage src={testImage} />
      <CardContent />
    </CardComponent>
  );
};

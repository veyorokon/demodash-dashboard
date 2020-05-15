import React from "react";
import {Box, Image, Text} from "components";
import styled from "styled-components";
import testImage from "assets/images/bromane-brand.jpg";
import bromane from "assets/svg/dashboard/bromane.svg";

const CardComponent = styled(Box)`
  width: 30rem;
  display: inline-block;
  margin-right: 1.8rem;
  margin-left: 1.8rem;
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
    background: #fff;
  }
`;

const CardImage = styled(Image)`
  width: 30rem;
  display: block;
  border-radius: 8px;
  box-shadow: 0 0 2rem rgba(10, 8, 16, 0.22);
  position: relative;
`;

const CardInterlude = styled(Box)`
  position: relative;
  font-size: 0.55rem;
  font-weight: 400;
  padding: 1rem 1rem 3rem 4.8rem;
  margin-left: 0.8rem;
  white-space: normal;
  text-align: left;
`;

const InterludeImage = styled(Image)`
  position: absolute;
  left: -1.2rem;
  top: 50%;
  transform: translateY(-66%);
  filter: grayscale(100%);
  border-radius: 50%;
  width: 5.7rem;
  height: 5.7rem;
  border: 7px solid #fff;
  background: #fff;
`;

export default props => {
  return (
    <Box display="inline-block" {...props}>
      <CardComponent>
        <CardImage src={testImage} />
        <CardInterlude>
          <Text mb={1} fs={"2.2rem"} fw={500}>
            {props.brandName}
          </Text>
          <Text mb={3} fs={"1.4rem"} fw={400}>
            {props.productName}
          </Text>
          <InterludeImage h={"1.6rem"} src={bromane} />
          <Text mb={3} fs={"1.2rem"} lineHeight="1.5">
            {props.productDescription}
          </Text>
          <Text mb={3} fs={"1.2rem"} lineHeight="1.5">
            <b>Commission:</b> {props.commission}
          </Text>
          <Text
            onClick={props.callBack}
            mb={3}
            cursor="pointer"
            fs={"1.4rem"}
            color="oranges.0"
          >
            Become a demoer
          </Text>
        </CardInterlude>
      </CardComponent>
    </Box>
  );
};

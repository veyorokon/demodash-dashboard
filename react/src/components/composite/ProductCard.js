import React from "react";
import {Box, Image, Text, Flex} from "components";
import styled from "styled-components";

const CardComponent = styled(Box)`
  width: 30rem;
  display: inline-block;
  margin-right: 1.8rem;
  margin-left: 1.8rem;
  position: relative;
  ::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1.6rem;
    padding-bottom: 2.4rem;
    background: #f4f5f9;
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
  white-space: normal;
  text-align: left;
`;

const InterludeImage = styled(Image)`
  filter: grayscale(100%);
  border-radius: 50%;
  width: 4.8rem;
  height: 4.8rem;
  border: 7px solid transparent;
`;

export default props => {
  return (
    <Box display="inline-block" {...props}>
      <CardComponent>
        {props.cardImage && <CardImage src={props.cardImage} />}
        <CardInterlude p={3} pl={4} pr={4}>
          <Flex mb={1} alignItems="center">
            {props.cardIcon && (
              <InterludeImage mr={2} h={"1.6rem"} src={props.cardIcon} />
            )}
            <Text fs={"2.2rem"} fw={600}>
              {props.brandName}
            </Text>
          </Flex>
          <Text mb={3} fs={"1.4rem"} fw={500}>
            {props.productName}
          </Text>

          <Text mb={3} fs={"1.2rem"} lineHeight="1.5">
            {props.productDescription}
          </Text>
          <Flex mb={3}>
            <Text mr={2} fs={"1.2rem"} fw={500} lineHeight="1.5">
              Sale Price:
            </Text>
            <Text fs={"1.2rem"} lineHeight="1.5">
              {props.salePrice}
            </Text>
          </Flex>
          <Flex mb={3}>
            <Text mr={2} fs={"1.2rem"} fw={500} lineHeight="1.5">
              Commission:
            </Text>
            <Text fs={"1.2rem"} lineHeight="1.5">
              {props.commission}
            </Text>
          </Flex>
          <Text
            onClick={props.callBack}
            mb={3}
            cursor="pointer"
            fs={"1.4rem"}
            color="oranges.0"
            fw={600}
          >
            Become a demoer
          </Text>
        </CardInterlude>
      </CardComponent>
    </Box>
  );
};

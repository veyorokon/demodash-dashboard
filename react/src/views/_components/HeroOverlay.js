import React from "react";
import {Box, Flex, Section, ImageBox, Text, Hidden} from "components";
import {responsive as r} from "lib";
import styled from "styled-components";

const Container = styled(Flex)`
  align-items: center;
`;
const LeftBox = styled(Box)`
  padding: 1rem;
  z-index: 10;
`;

const RightBox = styled(Box)``;

const WrapperDesktop = styled(Box)`
  z-index: 10;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 70%;
    height: 100%;
    background: #fff none repeat scroll 0 0;
    opacity: 0.95;
    -webkit-clip-path: polygon(0 0, 90% 0, 70% 100%, 0 100%);
    clip-path: polygon(0 0, 90% 0, 70% 100%, 0 100%);
  }
`;

const WrapperMobile = styled(Box)`
  z-index: 10;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #fff none repeat scroll 0 0;
    opacity: 0.8;
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
`;
const SmartWrapper = props => {
  return (
    <>
      <Hidden down={props.breakPoint - 1}>
        <ImageBox
          backgroundColor={props.backgroundColor}
          backgroundSize={props.backgroundSize ? props.backgroundSize : "cover"}
          overflow={"hidden"}
          backgroundPosition={"right"}
          backgroundImage={`url(${props.desktopMedia})`}
        >
          <WrapperDesktop {...props}>{props.children}</WrapperDesktop>
        </ImageBox>
      </Hidden>
      <Hidden up={props.breakPoint}>
        <ImageBox
          overflow={"hidden"}
          backgroundPosition={"right"}
          backgroundImage={`url(${props.mobileMedia})`}
        >
          <WrapperMobile {...props}>{props.children}</WrapperMobile>
        </ImageBox>
      </Hidden>
    </>
  );
};

function HeroOverlay(props) {
  return (
    <Section
      height={r("52rem --> 60rem ---> 80rem --> 85rem")}
      overflow="hidden"
    >
      <SmartWrapper {...props} h={"100%"} breakPoint={7} m={r("0 ------> 3")}>
        <Container
          flexDirection={r("column ------> row")}
          justifyContent={"center"}
          w={r("100% ------> 70%")}
          h="100%"
          p={r("2 ----> 4")}
        >
          <LeftBox ml={r("0 ----> 3% unset 3% 10% 6")} w={r("100%")}>
            <Text
              width="100%"
              mb={3}
              lineHeight={"1.18"}
              as="h3"
              fw={700}
              fs={r("1.4rem ---> 1.6rem")}
            >
              {props.subTitle}
            </Text>
            <Text
              width="100%"
              mb={2}
              mt={2}
              lineHeight={"1.18"}
              letterSpacing={"-0.8px"}
              as="h1"
              fw={700}
              fs={r("3rem --> 3.5rem 4rem ---> 4.7rem 5.5rem")}
            >
              {props.title}
            </Text>
            <Text
              mt={3}
              mb={r("4")}
              lineHeight={"1.4"}
              letterSpacing={"-.5px"}
              as="p"
              fw={400}
              fs={props.textSize || r("2rem ---> 2.4rem ----> 2.8rem")}
            >
              {props.text}
            </Text>
            {props.children && props.children}
          </LeftBox>
          <RightBox w={r("100% ------> 50%")}></RightBox>
        </Container>
      </SmartWrapper>
    </Section>
  );
}

export default HeroOverlay;

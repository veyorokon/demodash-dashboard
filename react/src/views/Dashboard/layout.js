import React from "react";
import {Box, Flex} from "components";
import {responsive as r} from "lib";
import styled, {css} from "styled-components";

const Hide = styled(Box)`
  transition: opacity 0.4s ease-in-out;
  visibility: hidden;
  height: 0;
  width: 0;
  opacity: 0;
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
const ScrollContainer = styled(Flex)`
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 10px;
  }
`;

const Left = styled(ScrollContainer)`
  height: 100vh;
  justify-content: space-around;
  flex-basis: 27rem;
  overflow: auto;
  flex-grow: 25;
`;
const Right = styled(ScrollContainer)`
  flex-grow: 80;
  height: 100vh;
  flex-basis: 44rem;
  overflow: auto;
`;
const Content = styled(Flex)`
  flex-direction: column;
  flex-grow: 0;
`;

export function LeftColumn(props) {
  return (
    <Left display={r("none ------> flex")} bg={"navys.4"}>
      <Content
        h="100%"
        justifyContent="space-between"
        alignItems="flex-start"
        w={"27rem"}
        ml={r("unset --------> 6")}
      >
        {props.children}
      </Content>
    </Left>
  );
}

export function RightColumn(props) {
  const {selected} = props || 0;
  return (
    <Right bg={"whites.0"} h="fit-content" justifyContent="flex-start">
      <Content mt={5} p={4} pt={0} w={r("100%")} h="fit-content">
        {props.children.length ? (
          props.children.map((component, index) => {
            return (
              <Hide key={index} showing={selected === index}>
                {component}
              </Hide>
            );
          })
        ) : (
          <Hide showing={true}>{props.children}</Hide>
        )}
      </Content>
    </Right>
  );
}

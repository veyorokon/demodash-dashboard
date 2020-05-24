/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/
import React from "react";
import {
  borderRadius,
  gridFields,
  themedComponent,
  flexFields,
  letterSpacing,
  boxShadow,
  fill
} from "theme";
import styled from "styled-components";

const Box = themedComponent(
  styled.div`
    ${borderRadius}
    ${boxShadow}
  `
);
Box.defaultProps = {};

const Button = themedComponent(
  styled.button`
    ${borderRadius}
  `
);

const Flex = themedComponent(
  styled.div`
    ${flexFields}
    ${borderRadius}
    ${boxShadow}
  `
);
Flex.defaultProps = {
  display: "flex",
  flexGrow: 1,
  minHeight: "fit-content"
};

const Input = themedComponent(
  styled.input`
    outline: none;
    ${borderRadius}
  `
);
Input.defaultProps = {
  border: "1px solid lightslategrey",
  padding: "1rem",
  fontSize: "1.6rem",
  lineHeight: "1",
  borderRadius: "4px"
};

const Text = themedComponent(styled.p`
  margin: ${props => (props.p ? "1rem" : props.h1 ? "2rem" : "initial")};
  &:hover {
    color: ${props => props.hoverColor || "none"};
  }
  transition: color 0.2s ease-in-out, font-size 0.2s ease-in-out,
    font-weight 0.1s ease-in-out;
  ${letterSpacing}
`);

Text.defaultProps = {
  minHeight: "fit-content",
  width: "fit-content",
  overflow: "hidden"
};

const Video = themedComponent(
  styled.video`
    ${borderRadius}
  `
);

const Image = themedComponent(
  styled.img`
    ${borderRadius}
    ${fill}
  `
);

const Grid = themedComponent(
  styled.div`
    display: grid;
    position: relative;
    ${gridFields}
  `
);

const Link = themedComponent(styled.a`
  width: fit-content;
  text-decoration: unset;
  color: inherit;
  font-weight: inherit;
  ${borderRadius}
  &:visited {
    color: inherit;
  }
`);

const Select = themedComponent(styled.select`
  ${borderRadius}
  ${boxShadow}
`);
const Option = themedComponent(styled.option`
  ${borderRadius}
  ${boxShadow}
`);

const IconBox = styled(Flex)`
  transition: color 0.2s ease-in-out;
  flex-grow: 0;
`;

const Icon = props => (
  <IconBox {...props}>
    {React.cloneElement(props.children, {
      height: "100%",
      fill: "currentColor"
    })}
  </IconBox>
);

export {
  Text,
  Grid,
  Box,
  Button,
  Flex,
  Input,
  Video,
  Image,
  Link,
  Select,
  Option,
  Icon
};

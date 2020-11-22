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
  fill,
  borderFields
} from "theme";
import styled from "styled-components";

const Box = themedComponent(
  styled.div`
    ${borderRadius}
    ${boxShadow}
    ${borderFields}
  `
);
Box.defaultProps = {};

const Button = themedComponent(
  styled.button`
    ${borderRadius}
    &:hover {
      color: ${props => props.hoverColor || "currentColor"};
      background: ${props => props.hoverBackground && props.hoverBackground};
    }
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
    border: 1px solid;
    transition: border-color 0.2s;
    ${borderRadius}
    ${borderFields}
  `
);
Input.defaultProps = {
  fontSize: "1.6rem",
  lineHeight: "1",
  borderRadius: "4px"
};

const Label = themedComponent(
  styled.label`
    ${borderRadius}
    ${flexFields}
    &:hover {
      color: ${props => props.hoverColor || "currentColor"};
      background: ${props => props.hoverBackground && props.hoverBackground};
    }
  `
);

const TextArea = themedComponent(
  styled.textarea`
    outline: none;
    font-family: inherit;
    ${borderRadius}
    ${borderFields}
  `
);
TextArea.defaultProps = {
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
    font-weight 0.2s ease-in-out;
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
    position: relative;
    ${gridFields}
  `
);
Grid.defaultProps = {
  display: "grid"
};

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
      fill: props.fill || "currentColor"
    })}
  </IconBox>
);

const Table = themedComponent(
  styled.table`
    ${borderRadius}
  `
);
const Tr = themedComponent(
  styled.tr`
    ${borderRadius}
  `
);
const Th = themedComponent(
  styled.th`
    ${borderRadius}
  `
);
const Td = themedComponent(
  styled.td`
    ${borderRadius}
  `
);

export {
  Text,
  Grid,
  Box,
  Button,
  Flex,
  Input,
  Label,
  Video,
  Image,
  Link,
  Select,
  Option,
  Icon,
  TextArea,
  Table,
  Tr,
  Th,
  Td
};

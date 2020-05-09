import React from "react";
import {Button, Link} from "components";
import styled from "styled-components";

export const CallToActionButton = styled(Button)`
  height: ${props =>
    props.height ? props.height : props.h ? props.h : "5rem"};
  cursor: pointer;
  min-width: fit-content;
  border: none;
  outline: none;
  letter-spacing: 0.2px;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;

  &:hover {
    color: ${props => props.hoverColor || "black"};
    background: ${props => props.hoverBg || "#f7d590"};
  }
`;

export const CallToAction = props => (
  <Link href={props.link} {...props}>
    <CallToActionButton {...props}>{props.children}</CallToActionButton>
  </Link>
);

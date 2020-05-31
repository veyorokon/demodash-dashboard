import React from "react";
import {Flex, Icon} from "components/core";
import styled from "styled-components";
import {responsive as r} from "lib";
import LogoIcon from "assets/svg/logo.js";

const Logo = styled(Text)`
  text-align: center;
  font-weight: 600;
  letter-spacing: -0.8px;
`;

export default props => (
  <Flex flexGrow={0} mb={4} alignItems="center" {...props}>
    <Icon justifyContent="center" mr={3} h={"3rem"} {...props.iconProps}>
      <LogoIcon />
    </Icon>
    <Logo
      ml={4}
      mr={"auto"}
      as="h1"
      fs={r("3rem ------> 3.1rem")}
      color="navys.0"
      {...props.logoProps}
    >
      demodash
    </Logo>
  </Flex>
);

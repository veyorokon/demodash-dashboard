import React from "react";
import styled from "styled-components";
import {Link, Flex} from "components/core";

const FlexWrapper = styled(Flex)`
  max-width: 100%;
  flex-wrap: wrap;
  height: auto;
`;

const FeatureLinkText = styled(Link)`
  position: relative;
  cursor: pointer;
  line-height: 1.5;
  overflow: hidden;
  transition-duration: inherit;

  ::before {
    left: -2px;
    width: 0;
    content: "";
    position: absolute;
    bottom: -1px;
    border: 1px solid currentColor;
    transition: width 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  ::after {
    content: "";
    width: 1.8rem;
    height: 1.2rem;
    display: inline-block;
    margin-left: 0.5em;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1%206a.5.5%200%200%200%200%201V6zM12.854.646a.5.5%200%200%200-.708.708l.708-.708zM18%206.5l.354.354a.5.5%200%200%200%200-.708L18%206.5zm-5.854%205.146a.5.5%200%200%200%20.708.708l-.708-.708zM1%207h16.5V6H1v1zm16.646-.854l-5.5%205.5.708.708%205.5-5.5-.708-.708zm-5.5-4.792l2.75%202.75.708-.708-2.75-2.75-.708.708zm2.75%202.75l2.75%202.75.708-.708-2.75-2.75-.708.708z%22%20fill%3D%22%231264A3%22%2F%3E%3C%2Fsvg%3E");
  }
  &:hover {
    ::before {
      width: 100%;
    }
  }
`;

const FeatureLink = props => (
  <FlexWrapper
    margin={"auto"}
    width="fit-content"
    justifyContent="center"
    height={"2.5rem"}
    {...props}
  >
    <FeatureLinkText {...props} h="fit-content">
      {props.children}
    </FeatureLinkText>
  </FlexWrapper>
);

export default FeatureLink;

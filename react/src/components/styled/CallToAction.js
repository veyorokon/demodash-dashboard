import {Button} from "components/core";
import styled from "styled-components";

export const CallToActionButton = styled(Button)`
  height: ${props =>
    props.height ? props.height : props.h ? props.h : "3.5rem"};
  min-width: fit-content;
  border: none;
  outline: none;
  letter-spacing: 0.2px;
  transition: all 0.3s ease-in-out;
`;

export default CallToActionButton;

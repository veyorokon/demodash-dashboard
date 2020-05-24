import {Button} from "components";
import styled, {css} from "styled-components";

const NavButton = styled(Button)`
  background: transparent;
  display: flex;
  height: 4rem;
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
  justify-content: flex-start;
  align-items: center;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  border: unset;
  border-left: 1px solid transparent;
  transition: border-left 0.2s linear;
  outline: none;
  transition: unset;
  padding-left: 1rem;
  &:hover {
    color: ${props => props.hoverColor || "white"};
  }
  ${props =>
    props.active &&
    css`
      color: ${props => props.activeColor || "white"};
      border-left-color: ${props => props.activeColor || "white"};
      font-weight: 600;
      &:hover {
        color: ${props => props.activeColor || "white"};
      }
    `}
`;

export default NavButton;

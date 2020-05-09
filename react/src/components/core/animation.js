/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/
import styled from "styled-components";
import {keyframes} from "styled-components";
import {animationFields} from "theme";
import {themedComponent} from "theme";
/*
    Keyframes
*/
const appear = keyframes`
  from {
    opacity: 0; }
  to {
    opacity: 1; }
`;

const Animate = themedComponent(
  styled.div`
    animation-name: ${props => props.animation};
    ${animationFields};
  `,
  "Animate"
);

Animate.defaultProps = {
  animation: appear,
  animationFillMode: "both",
  animationDuration: "0.5s",
  animationTimingFunction: "ease-in-out",
  animationDelay: ".2s",
  width: "100%",
  minHeight: "fit-content",
  height: "fit-content",
  overflow: "hidden"
};

export default Animate;
export {appear};

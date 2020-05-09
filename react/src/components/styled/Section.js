import styled from "styled-components";
import {themedComponent} from "theme";

const Section = themedComponent(
  styled.section`
    transition: height 0.2s ease-in-out;
    width: 100%;
    position: relative;
    min-height: fit-content;
  `
);

export default Section;

/*
    Author: Vahid Eyorokon
*/

/*
    Imports
*/

import React from "react";
import styled from "styled-components";
import {display, opacity, flexFields, background} from "theme";

const HiddenBox = styled.div`
  ${display};
  ${opacity};
  ${flexFields};
  ${background}
  height: 100%;
`;

class Hidden extends React.Component {
  getDisplayList = () => {
    const {down, up} = this.props;
    let display = this.props.display || "flex";
    var displayList = [];
    let i = 0;
    if (down) {
      displayList.push("none");
      for (i = 0; i < down; i++) {
        displayList.push("none");
      }
      displayList.push(display);
    } else {
      for (i = 0; i < up; i++) {
        displayList.push(display);
      }
      displayList.push("none");
    }
    return displayList;
  };

  render() {
    const {children} = this.props;
    const display = this.getDisplayList();
    return (
      <HiddenBox display={display} {...this.props}>
        {children}
      </HiddenBox>
    );
  }
}

Hidden.defaultProps = {
  up: false,
  down: false
};

export default Hidden;

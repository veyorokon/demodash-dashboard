import React, {Component} from "react";
import {Box, Image, Flex} from "components";
import {responsive as r} from "lib";
import styled from "styled-components";

import arrowUp from "assets/svg/arrowup.svg";

const ScrollDiv = styled(Box)`
  cursor: pointer;
  z-index: 200;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export default class ScrollTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_visible: false
    };
  }

  componentDidMount() {
    var scrollComponent = this;
    document.addEventListener("scroll", function(e) {
      scrollComponent.toggleVisibility();
    });
  }

  toggleVisibility() {
    if (window.pageYOffset > 400) {
      this.setState({
        is_visible: true
      });
    } else {
      this.setState({
        is_visible: false
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  render() {
    const {is_visible} = this.state;
    return (
      <ScrollDiv bg={"whites.0"} br={"5px"}>
        {is_visible && (
          <Flex p={2} onClick={this.scrollToTop}>
            <Image h={r("1.8rem 2rem --> 3rem")} src={arrowUp} />
          </Flex>
        )}
      </ScrollDiv>
    );
  }
}

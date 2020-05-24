import React from "react";
import NavItem from "./NavItem";
import {connect} from "react-redux";
import {updatePanel} from "redux/actions";

const _NavItem = props => {
  const {id, selected, updatePanel} = props;
  return (
    <NavItem
      onClick={() => updatePanel(id)}
      active={selected === id}
      {...props}
    />
  );
};
const mapNavItemStateToProps = state => {
  return {selected: state.panel};
};
function mapNavItemDispatchToProps(dispatch) {
  return {
    updatePanel: payload => dispatch(updatePanel(payload))
  };
}

export default connect(
  mapNavItemStateToProps,
  mapNavItemDispatchToProps
)(_NavItem);

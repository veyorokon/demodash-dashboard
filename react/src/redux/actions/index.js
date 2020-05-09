import {TOGGLE_NAV} from "redux/constants";

export function toggleNav() {
  return function(dispatch) {
    return dispatch({type: TOGGLE_NAV, payload: {}});
  };
}

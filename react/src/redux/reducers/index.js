import {TOGGLE_NAV} from "redux/constants";
import {updateState} from "lib";

const initialState = {
  navOpen: false
};

export default function rootReducer(state = initialState, action) {
  const {payload} = action;

  switch (action.type) {
    case TOGGLE_NAV:
      return updateState(state, ["navOpen"], !state.navOpen);
    default:
      if (payload) return Object.assign({}, state, payload);
      return state;
  }
}

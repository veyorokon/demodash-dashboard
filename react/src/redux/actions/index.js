import {
  UPDATE_REGISTRATION_FORM,
  UPDATE_ACCOUNT_FORM,
  UPDATE_LOGIN_FORM,
  UDPATE_CURRENT_ACCOUNT_USER,
  UDPATE_PANEL,
  TOGGLE_NAV
} from "redux/constants";

export function updateRegistrationForm(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_REGISTRATION_FORM, payload: payload});
  };
}

export function updateAccountForm(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_ACCOUNT_FORM, payload: payload});
  };
}

export function updateLoginForm(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_LOGIN_FORM, payload: payload});
  };
}

export function updateCurrentAccountUser(payload) {
  return function(dispatch) {
    return dispatch({type: UDPATE_CURRENT_ACCOUNT_USER, payload: payload});
  };
}
export function updatePanel(payload) {
  return function(dispatch) {
    return dispatch({type: UDPATE_PANEL, payload: payload});
  };
}

export function toggleNav() {
  return function(dispatch) {
    return dispatch({type: TOGGLE_NAV, payload: {}});
  };
}

import {
  UPDATE_REGISTRATION_FORM,
  UPDATE_ACCOUNT_FORM,
  UPDATE_LOGIN_FORM,
  UPDATE_ACCOUNT_USER_SET
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

export function updateAccountUserSet(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_ACCOUNT_USER_SET, payload: payload});
  };
}

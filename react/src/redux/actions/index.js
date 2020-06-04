import {
  UPDATE_REGISTRATION_FORM,
  UPDATE_ACCOUNT_FORM,
  UPDATE_LOGIN_FORM,
  UDPATE_CURRENT_ACCOUNT_USER,
  UDPATE_PANEL,
  TOGGLE_NAV,
  UDPATE_ACCOUNT_USER_SET,
  UPDATE_PROFILE_FORM,
  ADD_VARIATION_PRODUCT_FORM,
  DELETE_VARIATION_PRODUCT_FORM,
  UPDATE_PRODUCT_FORM,
  ADD_IMAGE_PRODUCT_FORM
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
    return dispatch({type: UDPATE_ACCOUNT_USER_SET, payload: payload});
  };
}
export function updateCurrentAccountUser(payload) {
  return function(dispatch) {
    return dispatch({type: UDPATE_CURRENT_ACCOUNT_USER, payload: payload});
  };
}
export function updateProfileForm(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_PROFILE_FORM, payload: payload});
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

export function addVariationProductForm(payload) {
  return function(dispatch) {
    return dispatch({type: ADD_VARIATION_PRODUCT_FORM, payload: {}});
  };
}
export function deleteVariationProductForm(payload) {
  return function(dispatch) {
    return dispatch({type: DELETE_VARIATION_PRODUCT_FORM, payload: payload});
  };
}
export function updateProductForm(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_PRODUCT_FORM, payload: payload});
  };
}

export function addImageProductForm(payload) {
  return function(dispatch) {
    return dispatch({type: ADD_IMAGE_PRODUCT_FORM, payload: payload});
  };
}

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
  ADD_IMAGE_PRODUCT_FORM,
  DELETE_IMAGE_PRODUCT_FORM,
  UPDATE_DEMO_BOX_FORM,
  UPDATE_DEMO_CAMPAIGN_FORM,
  TOGGLE_CHECKOUT,
  UPDATE_BILLING_FORM,
  UPDATE_DEPOSIT_FORM,
  UPDATE_DEMO_CHECKOUT_FORM,
  UPDATE_SCROLLY
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

export function toggleCheckout() {
  return function(dispatch) {
    return dispatch({type: TOGGLE_CHECKOUT, payload: {}});
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

export function deleteImageProductForm(payload) {
  return function(dispatch) {
    return dispatch({type: DELETE_IMAGE_PRODUCT_FORM, payload: payload});
  };
}

export function updateDemoBoxForm(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_DEMO_BOX_FORM, payload: payload});
  };
}

export function updateDemoCampaignForm(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_DEMO_CAMPAIGN_FORM, payload: payload});
  };
}

export function updateBillingForm(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_BILLING_FORM, payload: payload});
  };
}

export function updateDemoCheckoutForm(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_DEMO_CHECKOUT_FORM, payload: payload});
  };
}

export function updateScrollY(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_SCROLLY, payload: payload});
  };
}

export function updateDepositForm(payload) {
  return function(dispatch) {
    return dispatch({type: UPDATE_DEPOSIT_FORM, payload: payload});
  };
}

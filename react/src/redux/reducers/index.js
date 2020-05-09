import {UPDATE_REGISTRATION_FORM} from "redux/constants";
import {updateState, validateEmail} from "lib";

const initialState = {
  registrationForm: {
    email: "",
    fullName: "",
    password: "",
    passwordConfirmation: "",
    submitDisabled: true,
    errorMessage: "",
    isValidEmail: false
  }
};

export default function rootReducer(state = initialState, action) {
  const {payload} = action;
  let newState;

  switch (action.type) {
    case UPDATE_REGISTRATION_FORM:
      newState = updateState(
        state,
        ["registrationForm", payload.field],
        payload.value,
        false
      );
      newState.registrationForm.isValidEmail = validateEmail(payload.value);
      console.log(newState.registrationForm);
      return Object.assign({}, state, newState);
    default:
      return state;
  }
}

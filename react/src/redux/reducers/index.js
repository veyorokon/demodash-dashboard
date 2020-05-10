import {UPDATE_REGISTRATION_FORM} from "redux/constants";
import {updateState, validateEmail, validatePassword} from "lib";

const initialState = {
  registrationForm: {
    email: "",
    fullName: "",
    password: "",
    passwordConfirmation: "",
    submitDisabled: true,
    errorMessage: "",
    errorField: "",
    isValidEmail: false,
    isValidPassword: false
  }
};

function checkEmail(newState) {
  const emailValidation = validateEmail(newState.registrationForm.email);
  newState.registrationForm.isValidEmail = emailValidation[0];
  newState.registrationForm.errorMessage = emailValidation[1];
  newState.registrationForm.errorField = "email";
  return newState;
}

function checkPasswords(newState) {
  const passwordValidation = validatePassword(
    newState.registrationForm.password,
    newState.registrationForm.passwordConfirmation
  );
  newState.registrationForm.isValidPassword = passwordValidation[0];
  newState.registrationForm.errorMessage = passwordValidation[1];
  newState.registrationForm.errorField = "password";
  return newState;
}

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
      if (payload.field === "email") {
        newState = checkEmail(newState);
      } else if (
        payload.field === "password" ||
        payload.field === "passwordConfirmation"
      )
        newState = checkPasswords(newState);
      return Object.assign({}, state, newState);
    default:
      return state;
  }
}

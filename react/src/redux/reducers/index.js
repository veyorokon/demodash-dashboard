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
    isValidEmail: false,
    isValidPassword: false
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
      if (payload.field === "email") {
        const emailValidation = validateEmail(payload.value);
        newState.registrationForm.isValidEmail = emailValidation[0];
        newState.registrationForm.errorMessage = emailValidation[1];
      } else if (
        payload.field === "password" ||
        payload.field === "passwordConfirmation"
      ) {
        const passwordValidation = validatePassword(
          newState.registrationForm.password,
          newState.registrationForm.passwordConfirmation
        );
        newState.registrationForm.isValidPassword = passwordValidation[0];
        newState.registrationForm.errorMessage = passwordValidation[1];
      }
      console.log(newState);
      return Object.assign({}, state, newState);
    default:
      return state;
  }
}

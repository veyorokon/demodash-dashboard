import {
  UPDATE_REGISTRATION_FORM,
  UPDATE_ACCOUNT_FORM,
  UPDATE_LOGIN_FORM,
  UPDATE_ACCOUNT_USER_SET,
  UDPATE_CURRENT_ACCOUNT_USER,
  UDPATE_PANEL,
  TOGGLE_NAV
} from "redux/constants";
import {updateState, validateEmail, validatePassword} from "lib";

const anchor = window.location.hash.toLowerCase().replace("#", "");
const type =
  anchor === "storefront"
    ? "storefront"
    : anchor === "influencer"
    ? "influencer"
    : "brand";

// const initialState = {
//   registrationForm: {
//     email: "",
//     fullName: "",
//     password: "",
//     passwordConfirmation: "",
//     errorMessage: "",
//     errorField: "",
//     isValidEmail: false,
//     isValidPassword: false
//   },
//   accountForm: {
//     type: type
//   },
//   loginForm: {
//     email: "",
//     password: "",
//     errorMessage: ""
//   },
// dashboard:{}
// };

const initialState = {
  registrationForm: {
    email: "veyorokon@gmail.com",
    fullName: "Vahid Eyorokon",
    password: "Ve12345",
    passwordConfirmation: "Ve12345",
    errorMessage: "",
    errorField: "",
    isValidEmail: true,
    isValidPassword: true
  },
  accountForm: {
    type: type
  },
  loginForm: {
    email: "cherrys@barber.com",
    password: "123456",
    errorMessage: ""
  },
  dashboard: {
    currentAccountUser: {}
  },
  panel: "brandHome",
  navOpen: false
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
    case TOGGLE_NAV:
      return updateState(state, ["navOpen"], !state.navOpen);
    case UPDATE_REGISTRATION_FORM:
      newState = updateState(
        state,
        ["registrationForm", payload.field],
        payload.value,
        false
      );
      if (payload.field === "email") newState = checkEmail(newState);
      else if (
        payload.field === "password" ||
        payload.field === "passwordConfirmation"
      )
        newState = checkPasswords(newState);
      else if (payload.field === "errorMessage") {
        newState.registrationForm.errorField = "email";
      }
      return Object.assign({}, state, newState);
    case UPDATE_ACCOUNT_FORM:
      return updateState(state, ["accountForm"], payload);
    case UPDATE_LOGIN_FORM:
      return updateState(state, ["loginForm"], payload);
    case UPDATE_ACCOUNT_USER_SET:
      return updateState(state, ["dashboard"], payload);
    case UDPATE_CURRENT_ACCOUNT_USER:
      return updateState(
        state,
        ["dashboard", "accountUser"],
        state.dashboard.accountUserSet.filter(item => item.id === payload)
      );
    case UDPATE_PANEL:
      newState = updateState(state, ["panel"], payload, false);
      newState.navOpen = false;
      return Object.assign({}, state, newState);
    default:
      return state;
  }
}

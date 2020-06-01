import {
  UPDATE_REGISTRATION_FORM,
  UPDATE_ACCOUNT_FORM,
  UPDATE_LOGIN_FORM,
  UDPATE_CURRENT_ACCOUNT_USER,
  UDPATE_PANEL,
  TOGGLE_NAV,
  UDPATE_ACCOUNT_USER_SET,
  UPDATE_PROFILE_FORM
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
    currentAccountUser: null,
    previousAccountUser: null,
    accountUserSet: []
  },
  profileForm: {
    state: null,
    country: null,
    line1: null,
    line2: null,
    zip: null,
    city: null,
    accountName: null,
    category1: null,
    category2: null,
    category3: null
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

function filterAccountUser(state, id) {
  return state.dashboard.accountUserSet.filter(option => option.id === id)[0];
}

function getDefaultPanel(accountUser) {
  let panel = "demoerHome";
  if (accountUser.account.type === "Brand") panel = "brandHome";
  else if (
    accountUser.account.type === "Influencer" ||
    accountUser.account.type === "Storefront"
  )
    panel = "demoerHome";
  return panel;
}

export default function rootReducer(state = initialState, action) {
  const {payload} = action;
  let newState, accountUser;

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
    case UDPATE_ACCOUNT_USER_SET:
      newState = updateState(
        state,
        ["dashboard", "accountUserSet"],
        payload,
        false
      );
      if (!newState.dashboard.previousAccountUser) {
        newState.dashboard.currentAccountUser = payload[0].id || null;
        accountUser = filterAccountUser(newState, payload[0].id);
      } else {
        newState.dashboard.currentAccountUser =
          state.dashboard.currentAccountUser;
        accountUser = filterAccountUser(
          newState,
          newState.dashboard.currentAccountUser
        );
      }
      newState.panel = getDefaultPanel(accountUser);
      return Object.assign({}, state, newState);
    case UDPATE_CURRENT_ACCOUNT_USER:
      newState = updateState(
        state,
        ["dashboard", "currentAccountUser"],
        payload,
        false
      );
      newState.dashboard.previousAccountUser =
        state.dashboard.currentAccountUser;
      accountUser = filterAccountUser(state, payload);
      newState.panel = getDefaultPanel(accountUser);
      return Object.assign({}, state, newState);
    case UDPATE_PANEL:
      newState = updateState(state, ["panel"], payload, false);
      newState.navOpen = false;
      return Object.assign({}, state, newState);
    case UPDATE_PROFILE_FORM:
      return updateState(state, ["profileForm"], payload);
    default:
      return state;
  }
}

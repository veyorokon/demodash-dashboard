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
  UPDATE_DEMO_CAMPAIGN_FORM
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
  profileForm: {},
  productForm: {
    name: "",
    description: "",
    variations: {
      data: []
    },
    images: {
      data: [],
      errorMessage: ""
    },
    price: (0.0).toFixed(2),
    disabled: true,
    isSubmitting: false
  },
  demoBoxForm: {
    productIds: {
      data: []
    },
    price: (0.0).toFixed(2),
    refillPrice: (0.0).toFixed(2),
    shippingPrice: (0.0).toFixed(2),
    disabled: true,
    isSubmitting: false
  },
  demoCampaignForm: {
    demoBoxId: -1,
    name: "",
    commission: {
      data: []
    }
  },
  panel: "myDemoCampaigns",
  previousPanel: "home",
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

function populateProfileForm(state, accountUser, props = {}) {
  state.profileForm = {
    accountName: accountUser.account.profile.name,
    disabled: true,
    isSubmitting: false,
    submitComplete: true,
    ...accountUser.account.profile.address,
    ...accountUser.account.profile.industry,
    ...props
  };
  return state;
}

function checkPanel(panel) {
  const mutualPanels = ["home", "settings", "payoutBilling"];
  if (mutualPanels.includes(panel)) return true;
  else return false;
}

function remove(array, index) {
  array.splice(index, 1);
}

function updateImageVariationLinks(imageData, index) {
  let newImageData = [];
  for (var indx in imageData) {
    const image = imageData[indx];
    let linkData = image.variationLink.toString();
    if (image.variationLink && linkData.includes(",")) {
      const variationLink = linkData.split(",").map(x => +x);
      if (index === variationLink[0]) image.variationLink = -1;
      else newImageData.push(image);
    } else newImageData.push(newImageData);
  }
  return newImageData;
}

export default function rootReducer(state = initialState, action) {
  const {payload} = action;
  let newState, accountUser, isMutualPanel, data;

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
      //Checks if a previous account user was selected to return user
      if (!newState.dashboard.previousAccountUser) {
        newState.dashboard.currentAccountUser = payload[1].id || null;
        accountUser = filterAccountUser(newState, payload[1].id);
      } else {
        newState.dashboard.currentAccountUser =
          state.dashboard.currentAccountUser;
        accountUser = filterAccountUser(
          newState,
          newState.dashboard.currentAccountUser
        );
      }
      //Sets default values for profile form
      newState = populateProfileForm(newState, accountUser);
      isMutualPanel = checkPanel(state.panel);
      //newState.panel = "home";
      newState.panel = "myDemoCampaigns";

      //Restores previous panel if it is a mutual panel
      if (isMutualPanel) newState.panel = state.panel;
      return Object.assign({}, state, newState);
    case UDPATE_CURRENT_ACCOUNT_USER:
      newState = updateState(
        state,
        ["dashboard", "currentAccountUser"],
        payload,
        false
      );
      //Updates previous account user
      newState.dashboard.previousAccountUser =
        state.dashboard.currentAccountUser;
      accountUser = filterAccountUser(state, payload);
      //Restores previous panel if it is a mutual panel
      isMutualPanel = checkPanel(state.panel);
      //newState.panel = "home";
      newState.panel = "myDemoCampaigns";

      if (isMutualPanel) newState.panel = state.panel;
      //Sets default values for profile form
      populateProfileForm(newState, accountUser);
      return Object.assign({}, state, newState);
    case UDPATE_PANEL:
      newState = updateState(state, ["panel"], payload, false);
      newState.previousPanel = state.panel;
      newState.navOpen = false;
      return Object.assign({}, state, newState);
    case UPDATE_PROFILE_FORM:
      newState = updateState(state, ["profileForm"], payload, false);
      newState.profileForm.disabled = false;
      if (newState.profileForm.isSubmitting)
        newState.profileForm.disabled = true;
      return Object.assign({}, state, newState);
    case ADD_VARIATION_PRODUCT_FORM:
      newState = updateState(
        state,
        ["productForm", "variations", "data"],
        [...state.productForm.variations.data],
        false
      );
      newState.productForm.variations.data.push({name: "", choices: []});
      newState.productForm.errorMessage = "";
      newState.productForm.successMessage = "";
      return Object.assign({}, state, newState);
    case DELETE_VARIATION_PRODUCT_FORM:
      data = [...state.productForm.variations.data];
      remove(data, payload);
      updateImageVariationLinks(state.productForm.images.data, payload);
      newState = updateState(
        state,
        ["productForm", "variations", "data"],
        data,
        false
      );
      newState.productForm.errorMessage = "";
      newState.productForm.successMessage = "";
      return Object.assign({}, state, newState);
    case UPDATE_PRODUCT_FORM:
      return updateState(state, ["productForm"], payload);
    case ADD_IMAGE_PRODUCT_FORM:
      newState = updateState(
        state,
        ["productForm", "images", "data"],
        [...state.productForm.images.data],
        false
      );
      if (!payload.errorMessage) {
        newState.productForm.images.data.push({
          ...payload,
          variationLink: -1
        });
        newState.productForm.images.errorMessage = "";
      } else {
        newState.productForm.images = {
          ...newState.productForm.images,
          ...payload
        };
      }
      newState.productForm.errorMessage = "";
      newState.productForm.successMessage = "";
      newState.productForm.disabled = false;
      return Object.assign({}, state, newState);
    case DELETE_IMAGE_PRODUCT_FORM:
      data = [...state.productForm.images.data];
      remove(data, payload);
      newState = updateState(
        state,
        ["productForm", "images", "data"],
        data,
        false
      );
      newState.productForm.images.errorMessage = "";
      return Object.assign({}, state, newState);
    case UPDATE_DEMO_BOX_FORM:
      newState = updateState(state, ["demoBoxForm"], payload, false);
      return Object.assign({}, state, newState);
    case UPDATE_DEMO_CAMPAIGN_FORM:
      newState = updateState(state, ["demoCampaignForm"], payload, false);
      console.log(newState.demoCampaignForm);
      return Object.assign({}, state, newState);
    default:
      return state;
  }
}

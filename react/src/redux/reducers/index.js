import {
  UPDATE_REGISTRATION_FORM,
  UPDATE_ACCOUNT_FORM,
  UPDATE_LOGIN_FORM,
  UDPATE_CURRENT_ACCOUNT_USER,
  UDPATE_PANEL,
  TOGGLE_NAV,
  TOGGLE_CHECKOUT,
  UDPATE_ACCOUNT_USER_SET,
  UPDATE_PROFILE_FORM,
  ADD_VARIATION_PRODUCT_FORM,
  DELETE_VARIATION_PRODUCT_FORM,
  UPDATE_PRODUCT_FORM,
  ADD_IMAGE_PRODUCT_FORM,
  DELETE_IMAGE_PRODUCT_FORM,
  UPDATE_DEMO_BOX_FORM,
  UPDATE_DEMO_CAMPAIGN_FORM,
  UPDATE_BILLING_FORM,
  UPDATE_DEMO_CHECKOUT_FORM,
  UPDATE_SCROLLY,
  UPDATE_DEPOSIT_FORM,
  UPDATE_DEMODASH_STORE_FORM
} from "redux/constants";
import {updateState, validateEmail, validatePassword} from "lib";

const anchor = window.location.hash.toLowerCase().replace("#", "");
const type =
  anchor === "storefront"
    ? "storefront"
    : anchor === "influencer"
    ? "influencer"
    : "brand";

const initialState = {
  registrationForm: {
    email: "",
    fullName: "",
    password: "",
    passwordConfirmation: "",
    errorMessage: "",
    errorField: "",
    isValidEmail: false,
    isValidPassword: false
  },
  accountForm: {
    type: type
  },
  loginForm: {
    email: "",
    password: "",
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
    shippingPrice: (0.0).toFixed(2),
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
    type: -1,
    name: "",
    demoerLimit: 30,
    refillLimit: 65,
    commissions: {
      data: []
    },
    disabled: true,
    errorMessage: ""
  },
  billingForm: {
    name: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvc: "",
    disabled: true
  },
  depositForm: {
    routingNumber: "",
    accountNumber: "",
    accountNumberConfirmation: "",
    disabled: true
  },
  demoCheckoutForm: {
    demoCampaignId: null,
    accountCardId: null,
    sellerAccountId: null,
    currentPanel: 0,
    receiptUId: "",
    isRefill: false
  },
  demodashStoreForm: {
    handle: "",
    name: "",
    description: "",
    disabled: true,
    isSubmitting: false
  },
  panel: "demodashStore",
  previousPanel: "home",
  navOpen: false,
  checkoutOpen: false,
  lastScrollY: 0
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
  const {industry} = accountUser.account.profile;
  const choice1 = industry && industry.choice1 ? industry.choice1 : -1;
  const choice2 = industry && industry.choice2 ? industry.choice2 : -1;
  const choice3 = industry && industry.choice3 ? industry.choice3 : -1;
  state.profileForm = {
    accountName: accountUser.account.profile.name,
    disabled: true,
    isSubmitting: false,
    submitComplete: true,
    website: accountUser.account.profile.website,
    choice1: choice1,
    choice2: choice2,
    choice3: choice3,
    ...accountUser.account.profile.address,
    ...props
  };
  return state;
}

function populateDemodashStoreForm(state, accountUser) {
  state.demodashStoreForm = {
    ...accountUser.account.store
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
    case UPDATE_SCROLLY:
      return updateState(state, ["lastScrollY"], payload);
    case TOGGLE_NAV:
      return updateState(state, ["navOpen"], !state.navOpen);
    case TOGGLE_CHECKOUT:
      return updateState(state, ["checkoutOpen"], !state.checkoutOpen);
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
    case UPDATE_BILLING_FORM:
      return updateState(state, ["billingForm"], payload);
    case UDPATE_ACCOUNT_USER_SET:
      newState = updateState(
        state,
        ["dashboard", "accountUserSet"],
        payload,
        false
      );
      //Checks if a previous account user was selected to return user
      if (!newState.dashboard.previousAccountUser && payload.length) {
        newState.dashboard.currentAccountUser = payload[0].id || null;
        accountUser = filterAccountUser(newState, payload[0].id);
        //Sets default values for profile form
        newState = populateProfileForm(newState, accountUser);
        newState = populateDemodashStoreForm(newState, accountUser);
      } else {
        newState.dashboard.currentAccountUser =
          state.dashboard.currentAccountUser;
        accountUser = filterAccountUser(
          newState,
          newState.dashboard.currentAccountUser
        );
        newState.panel = "createAccount";
      }
      isMutualPanel = checkPanel(state.panel);
      //newState.panel = "home";
      if (newState.panel !== "createAccount") newState.panel = "demodashStore";
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
      newState.panel = "demodashStore";
      if (isMutualPanel) newState.panel = state.panel;
      //Sets default values for profile form
      populateProfileForm(newState, accountUser);
      newState = populateDemodashStoreForm(newState, accountUser);
      newState.checkoutOpen = false;
      return Object.assign({}, state, newState);
    case UDPATE_PANEL:
      newState = updateState(state, ["panel"], payload, false);
      newState.previousPanel = state.panel;
      newState.navOpen = false;
      newState.checkoutOpen = false;
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
      return updateState(state, ["demoBoxForm"], payload);
    case UPDATE_DEMO_CAMPAIGN_FORM:
      return updateState(state, ["demoCampaignForm"], payload);
    case UPDATE_DEMO_CHECKOUT_FORM:
      return updateState(state, ["demoCheckoutForm"], payload);
    case UPDATE_DEPOSIT_FORM:
      return updateState(state, ["depositForm"], payload);
    case UPDATE_DEMODASH_STORE_FORM:
      return updateState(state, ["demodashStoreForm"], payload);
    default:
      return state;
  }
}

export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = re.test(String(email).toLowerCase());
  let message = "";
  if (!isValidEmail) message = "Please enter a valid email";
  return [isValidEmail, message];
}

export function validatePassword(password, passwordConfirmation) {
  if (password.length <= 5 && passwordConfirmation.length <= 5)
    return [false, "Password length must be at least 5"];
  if (password !== passwordConfirmation)
    return [false, "Passwords don't match"];
  return [true, ""];
}

export function clearToken() {
  window.localStorage.removeItem("sessionToken");
  return window.localStorage.removeItem("sessionExpiration");
}

export function getToken() {
  try {
    const token = window.localStorage.getItem("sessionToken");
    const expiration = window.localStorage.getItem("sessionExpiration");
    return {token, expiration};
  } catch (err) {
    clearToken();
    return null;
  }
}

export function setToken(token, expiration) {
  window.localStorage.setItem("sessionToken", token);
  return window.localStorage.setItem("sessionExpiration", expiration);
}

export function getEventVal(event) {
  return event.target.value;
}

export function currentEpoch() {
  let d = new Date();
  let seconds = Math.round(d.getTime() / 1000);
  return seconds;
}

export function validateToken() {
  const tokenData = getToken();
  const {token, expiration} = tokenData;
  if (token && currentEpoch() < expiration) return true;
  return false;
}

export function formatErrorMessage(error, defaultMessage) {
  const graphQLStr = "GraphQL error: ";
  if (!error.message.includes(graphQLStr)) return defaultMessage;
  return error.message.replace(graphQLStr, "");
}

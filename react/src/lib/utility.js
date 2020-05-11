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
}

export function getToken() {
  try {
    return window.localStorage.getItem("sessionToken");
  } catch (err) {
    clearToken();
    return null;
  }
}

export function setToken(token) {
  return window.localStorage.setItem("sessionToken", token);
}

export function getEventVal(event) {
  return event.target.value;
}

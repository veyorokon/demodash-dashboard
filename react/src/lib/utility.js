export function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValidEmail = re.test(String(email).toLowerCase());
  let message = "";
  if (!isValidEmail) message = "Please enter a valid email";
  return [isValidEmail, message];
}

export function validatePassword(password, passwordConfirmation) {
  if (password.length <= 5 || passwordConfirmation.length <= 5)
    return [false, "Password length must be at least 5"];
  return [password === passwordConfirmation, "Passwords don't match"];
}

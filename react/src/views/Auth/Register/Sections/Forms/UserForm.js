import React from "react";
import {Flex, Input, Text, Link} from "components";
import ReCAPTCHA from "react-google-recaptcha";
import {responsive as r} from "lib";
import {connect} from "react-redux";
import {updateRegistrationForm} from "redux/actions";

import {RECAPTCHA_PUBLIC_KEY} from "api";
function updateField(event, field) {
  return {value: event.target.value, field: field};
}

export function UserForm(props) {
  const {updateRegistrationForm, registrationForm} = props;
  return (
    <Flex
      justifySelf="flex-start"
      mb={r("unset -----> auto")}
      flexGrow="0"
      flexDirection="column"
    >
      {props.header && props.header}
      <Text color="navys.0" mt={r("4")} mb={4} fs={"2rem"}>
        Create your account:
      </Text>
      <Text mb={3} color="navys.1" fs={"1.6rem"}>
        Email
      </Text>
      <Input
        p={2}
        pl={3}
        pr={3}
        autocapitalize="none"
        height={"4.4rem"}
        mb={props.errorMessage && props.errorField === "email" ? 1 : 3}
        br={2}
        type="email"
        value={props.email}
        onChange={evt => updateRegistrationForm(updateField(evt, "email"))}
      />
      {props.errorMessage && props.errorField === "email" && (
        <Text mb={3} color={"oranges.0"}>
          {props.errorMessage}
        </Text>
      )}
      <Text mb={3} color="navys.1" fs={"1.6rem"}>
        Full name
      </Text>
      <Input
        p={2}
        pl={3}
        pr={3}
        height={"4.4rem"}
        mb={3}
        br={2}
        value={props.fullName}
        onChange={evt => updateRegistrationForm(updateField(evt, "fullName"))}
      />

      <Text mb={3} color="navys.1" fs={"1.6rem"}>
        Password
      </Text>
      <Input
        p={2}
        pl={3}
        pr={3}
        height={"4.4rem"}
        mb={3}
        br={2}
        type="password"
        value={props.password}
        onChange={evt => updateRegistrationForm(updateField(evt, "password"))}
      />
      <Text mb={3} color="navys.1" fs={"1.6rem"}>
        Password confirmation
      </Text>
      <Input
        p={2}
        pl={3}
        pr={3}
        height={"4.4rem"}
        mb={props.errorMessage && props.errorField === "password" ? 1 : 3}
        br={2}
        type="password"
        value={props.passwordConfirmation}
        onChange={evt =>
          updateRegistrationForm(updateField(evt, "passwordConfirmation"))
        }
      />
      {props.errorMessage && props.errorField === "password" && (
        <Text mb={3} color={"oranges.0"}>
          {props.errorMessage}
        </Text>
      )}
      <Flex mb={2} justifyContent="center">
        <ReCAPTCHA
          sitekey={RECAPTCHA_PUBLIC_KEY}
          size="normal"
          onChange={recaptcha =>
            updateRegistrationForm({
              ...registrationForm,
              field: "recaptcha",
              recaptcha
            })
          }
        />
      </Flex>
      <Flex>
        <Text textAlign="center" fs="1.2rem">
          By creating an account, you agree to our{" "}
          <Link display="inline-flex" href="https://demodash.com/legal/terms">
            <Text fs="1.2rem" hoverColor={"#212C39"} fw={500} color="navys.2">
              Terms
            </Text>
          </Link>{" "}
          and the{" "}
          <Link
            display="inline-flex"
            href="https://stripe.com/connect-account/legal"
          >
            <Text fs="1.2rem" hoverColor={"#212C39"} fw={500} color="navys.2">
              Stripe Connected Account Agreement
            </Text>
          </Link>
          .
        </Text>
      </Flex>
    </Flex>
  );
}

const mapStateToProps = state => {
  return state.registrationForm;
};
function mapDispatchToProps(dispatch) {
  return {
    updateRegistrationForm: payload => dispatch(updateRegistrationForm(payload))
  };
}

const ConnectedUserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);

export default ConnectedUserForm;

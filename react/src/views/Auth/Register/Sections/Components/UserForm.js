import React from "react";
import {Flex, Input, Text} from "components";
import {responsive as r} from "lib";
import {connect} from "react-redux";
import {updateRegistrationForm} from "redux/actions";

function updateField(event, field) {
  return {value: event.target.value, field: field};
}

export function UserForm(props) {
  const {updateRegistrationForm} = props;

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
        height={"4.4rem"}
        mb={3}
        br={2}
        type="email"
        onChange={evt => updateRegistrationForm(updateField(evt, "email"))}
      />

      <Text mb={3} color="navys.1" fs={"1.6rem"}>
        Full name
      </Text>
      <Input
        height={"4.4rem"}
        mb={3}
        br={2}
        onChange={evt => updateRegistrationForm(updateField(evt, "fullName"))}
      />

      <Text mb={3} color="navys.1" fs={"1.6rem"}>
        Password
      </Text>
      <Input
        height={"4.4rem"}
        mb={3}
        br={2}
        type="password"
        onChange={evt => updateRegistrationForm(updateField(evt, "password"))}
      />
      <Text mb={3} color="navys.1" fs={"1.6rem"}>
        Password confirmation
      </Text>
      <Input
        height={"4.4rem"}
        mb={3}
        br={2}
        type="password"
        onChange={evt =>
          updateRegistrationForm(updateField(evt, "passwordConfirmation"))
        }
      />
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

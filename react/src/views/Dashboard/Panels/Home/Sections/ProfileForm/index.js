import React from "react";
import {Flex, Text} from "components";
import BusinessAccountForm from "./BusinessAccountForm";
import InfluencerAccountForm from "./InfluencerAccountForm";

import {responsive as r} from "lib";
import {connect} from "react-redux";

const mapStateToProps = state => {
  return {
    accountType: state.profileForm.type
  };
};

function _ProfileForm(props) {
  const isInfluencer = props.accountType === "Influencer";
  return (
    <>
      <Flex mb={4}>
        <Text fw={500} fs={"2rem"}>
          Profile
        </Text>
      </Flex>
      <Flex
        w={r("80rem ---------> 100rem")}
        maxWidth="100%"
        mb={4}
        justifyContent="center"
      >
        {isInfluencer ? (
          <InfluencerAccountForm title={"Account settings"} />
        ) : (
          <BusinessAccountForm title={"Account settings"} />
        )}
      </Flex>
    </>
  );
}

const ProfileForm = connect(
  mapStateToProps,
  null
)(_ProfileForm);

export default ProfileForm;

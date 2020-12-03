import React from "react";
import {Flex, Text} from "components";

import BrandAccountForm from "./BrandAccountForm";
import StoreAccountForm from "./StoreAccountForm";
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
  const isStore = props.accountType === "Storefront";
  const isBrand = props.accountType === "Brand";
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
        {isBrand && <BrandAccountForm title={"Account settings"} />}
        {isStore && <StoreAccountForm title={"Account settings"} />}
        {isInfluencer && <InfluencerAccountForm title={"Account settings"} />}
      </Flex>
    </>
  );
}

const ProfileForm = connect(
  mapStateToProps,
  null
)(_ProfileForm);

export default ProfileForm;

import React from "react";
import {Flex, Text} from "components";
import AccountFormCard from "./AccountFormCard";
import {responsive as r} from "lib";

const ProfileForm = props => {
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
        <AccountFormCard title={"Account settings"} />
      </Flex>
    </>
  );
};
export default ProfileForm;

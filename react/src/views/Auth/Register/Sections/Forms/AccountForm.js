import {Flex, Text, Image, Box, VertTabs, TabPanel} from "components";
import React from "react";
import {responsive as r} from "lib";
import influencer from "assets/svg/influencer.svg";
import storefront from "assets/svg/storefront.svg";
import brand from "assets/svg/brand.svg";

import {connect} from "react-redux";
import {updateAccountForm} from "redux/actions";

const Panel = props => (
  <TabPanel
    height={"100%"}
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="space-around"
    bg={props.bg}
  >
    <Image mb={4} mt={4} maxWidth={"100%"} h={r("16rem ")} src={props.svg} />
    <Box>
      <Text
        lineHeight={"1.5"}
        as="p"
        fw={400}
        fs={r("1.6rem --> 1.8rem")}
        color="navys.2"
        textAlign={r("center")}
        letterSpacing="-0.5px"
        maxWidth="100%"
      >
        {props.text}
      </Text>
      {props.children && props.children}
    </Box>
  </TabPanel>
);

function AccountForm(props) {
  const {updateAccountForm} = props;
  return (
    <Flex
      justifySelf="flex-start"
      mb={r("unset -----> auto")}
      flexGrow="0"
      flexDirection="column"
    >
      {props.header && props.header}
      {props.showTitle && (
        <Text color="navys.0" mt={r("4")} mb={4} fs={"2rem"}>
          Choose your account type:
        </Text>
      )}
      <Flex mt={3} h="100%">
        <VertTabs
          bg={props.bg ? props.bg : "whites.0"}
          tabHeaders={["Brand", "Storefront", "Influencer"]}
          selected={props.account}
        >
          <Panel
            bg={props.bg ? props.bg : "whites.0"}
            text={
              "You ship demo products to storefronts and influencers; and purchases to customers."
            }
            svg={brand}
            callBack={() => updateAccountForm({type: "brand"})}
          ></Panel>
          <Panel
            bg={props.bg ? props.bg : "whites.0"}
            text={
              "Demo products on customers at your storefront and earn commission for each sale."
            }
            svg={storefront}
            callBack={() => updateAccountForm({type: "storefront"})}
          ></Panel>
          <Panel
            bg={props.bg ? props.bg : "whites.0"}
            text={
              "Demo products for followers on your social media and earn commission for each sale."
            }
            svg={influencer}
            callBack={() => updateAccountForm({type: "influencer"})}
          ></Panel>
        </VertTabs>
      </Flex>
    </Flex>
  );
}

const mapStateToProps = state => {
  return state.accountForm;
};
function mapDispatchToProps(dispatch) {
  return {
    updateAccountForm: payload => dispatch(updateAccountForm(payload))
  };
}

const ConnectedAccountForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountForm);

export default ConnectedAccountForm;

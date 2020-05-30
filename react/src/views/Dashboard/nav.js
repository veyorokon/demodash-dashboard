import React from "react";
import {ConnectedNavItem, NavCategory} from "./Components";
import {Home as HomeIcon} from "@styled-icons/boxicons-solid/Home";
import {Search} from "@styled-icons/boxicons-regular/Search";
import {Settings as SettingsIcon} from "@styled-icons/material/Settings";
// import {Users as UsersIcon} from "@styled-icons/heroicons-solid/Users";
import {DollarSign} from "@styled-icons/fa-solid/DollarSign";
import {Dropbox} from "@styled-icons/icomoon/Dropbox";
import {MoneyBill} from "@styled-icons/fa-solid/MoneyBill";
import DemodashIcon from "assets/icons/demodash";
import ProductDemoIcon from "assets/icons/productDemos";

const DemoerNav = props => {
  return (
    <>
      <ConnectedNavItem id={"demoerHome"} text="Home" icon={<HomeIcon />} />
      <NavCategory mt={3} text={"Demos"} />
      <ConnectedNavItem
        id={"findDemos"}
        text="Find demos"
        icon={<Search />}
        ml={3}
      />
      <ConnectedNavItem
        id={"myDemos"}
        text="My demos"
        icon={<ProductDemoIcon />}
        ml={3}
      />
      <ConnectedNavItem
        id={"demodashStore"}
        text="demodash store"
        icon={<DemodashIcon />}
        ml={3}
      />
      <NavCategory mt={3} text={"Account"} />
      <ConnectedNavItem
        id={"payoutBilling"}
        text="Payout"
        icon={<DollarSign />}
        ml={3}
      />
      {/*<ConnectedNavItem id={"users"} text="Users" icon={<UsersIcon />} ml={3} />*/}
      <ConnectedNavItem
        id={"settings"}
        text="Settings"
        icon={<SettingsIcon />}
        ml={3}
      />
    </>
  );
};

const BrandNav = props => {
  return (
    <>
      <ConnectedNavItem id={"brandHome"} text="Home" icon={<HomeIcon />} />
      <NavCategory mt={3} text={"Demos"} />
      <ConnectedNavItem
        id={"myProducts"}
        text="My products"
        icon={<ProductDemoIcon />}
        ml={3}
      />
      <ConnectedNavItem
        id={"myDemoBoxes"}
        text="My demo boxes"
        icon={<Dropbox />}
        ml={3}
      />
      <ConnectedNavItem
        id={"myDemoCampaigns"}
        text="Demo campaigns"
        icon={<DemodashIcon />}
        ml={3}
      />
      <ConnectedNavItem
        id={"findDemoers"}
        text="Find demoers"
        icon={<Search />}
        ml={3}
      />
      <NavCategory mt={3} text={"Sales"} />
      <ConnectedNavItem
        id={"purchases"}
        text="Purchases"
        icon={<MoneyBill />}
        ml={3}
      />
      <NavCategory mt={3} text={"Account"} />
      <ConnectedNavItem
        id={"payoutBilling"}
        text="Payout"
        icon={<DollarSign />}
        ml={3}
      />
      <ConnectedNavItem
        id={"settings"}
        text="Settings"
        icon={<SettingsIcon />}
        ml={3}
      />
    </>
  );
};

const AllNav = props => {
  return (
    <>
      <ConnectedNavItem
        id={"demoerHome"}
        text="Demoer Home"
        icon={<HomeIcon />}
      />
      <ConnectedNavItem id={"brandHome"} text="Home" icon={<HomeIcon />} />

      <ConnectedNavItem
        id={"myDemos"}
        text="My demos"
        icon={<ProductDemoIcon />}
      />
      <ConnectedNavItem
        id={"demodashStore"}
        text="demodash store"
        icon={<DemodashIcon />}
      />
      <ConnectedNavItem
        id={"payoutBilling"}
        text="Payout"
        icon={<DollarSign />}
      />

      <ConnectedNavItem
        id={"myProducts"}
        text="My products"
        icon={<ProductDemoIcon />}
      />
      <ConnectedNavItem
        id={"myDemoBoxes"}
        text="My demo boxes"
        icon={<Dropbox />}
      />
      <ConnectedNavItem
        id={"myDemoCampaigns"}
        text="Demo campaigns"
        icon={<DemodashIcon />}
      />
      <ConnectedNavItem
        id={"findDemoers"}
        text="Find demoers"
        icon={<Search />}
      />
      <ConnectedNavItem id={"findDemos"} text="Find demos" icon={<Search />} />
      <ConnectedNavItem
        id={"purchases"}
        text="Purchases"
        icon={<MoneyBill />}
      />
      <ConnectedNavItem
        id={"payoutBilling"}
        text="Payout"
        icon={<DollarSign />}
      />
      <ConnectedNavItem
        id={"settings"}
        text="Settings"
        icon={<SettingsIcon />}
      />
    </>
  );
};

export {DemoerNav, BrandNav, AllNav};

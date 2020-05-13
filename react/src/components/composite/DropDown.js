import React from "react";
import {Select, Option, Button, Image} from "components";

import styled from "styled-components";
import plus from "assets/svg/plus.svg";
const DropSelect = styled(Select)`
  height: 3.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &::select {
    appearance: none;
  }
`;
const DropOption = styled(Option)`
  height: 3.5rem;
`;

const DefaultButton = styled(Button)`
  display: flex;
  align-items: center;
  margin: auto;
  border-radius: 3px;
  font-size: 1.6rem;
  cursor: pointer;
  border: unset;
  outline: none;
  background: transparent;
  color: white;
`;

export default props => {
  if (!props.options.length && props.useDefaultButton) {
    return (
      <DefaultButton p={3} onClick={props.onDefaultClick}>
        <Image mr={2} src={plus} h={3} /> {props.defaultOption}
      </DefaultButton>
    );
  }
  return (
    <DropSelect
      color={"whites.0"}
      ml={"auto"}
      mr={"auto"}
      fs={"1.6rem"}
      onChange={props.onChange}
    >
      {props.options.map((elem, index) => (
        <DropOption key={index} value={elem.id ? elem.id : index}>
          {elem.text}
        </DropOption>
      ))}
      {props.defaultOption && (
        <DropOption value={props.options.length}>
          {props.defaultOption}
        </DropOption>
      )}
    </DropSelect>
  );
};

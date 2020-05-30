import {Input, Button} from "components/core";
import styled from "styled-components";

const SearchInput = styled(Input)`
  border-radius: 4px 0px 0px 4px;
  border-right: unset;
  border-color: #dae0e6;
`;
const SearchButton = styled(Button)`
  cursor: pointer;
  display: flex;
  border-radius: 0px 4px 4px 0px;
  justify-content: center;
  align-items: center;
  outline: none;
  border: unset;
`;

export {SearchInput, SearchButton};

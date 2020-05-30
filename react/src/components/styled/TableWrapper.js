import {Box} from "components/core";
import styled from "styled-components";

const TableWrapper = styled(Box)`
  overflow-x: scroll;
  width: 100%;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 3px;
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`;
export default TableWrapper;

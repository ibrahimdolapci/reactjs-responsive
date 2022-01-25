import styled from "styled-components";
import {Layout} from "antd";

export const StyledLayout = styled(Layout)`
  height: 100vh;
  padding: 20px 20px 0 20px;
  overflow: hidden;

  @media only screen and (min-width: 576px) {
    padding: 50px 50px 0 50px;
  }
`;

export const StyledWrapper = styled.div`
  display: flex;
  min-height: 0;
  flex: auto;
`;

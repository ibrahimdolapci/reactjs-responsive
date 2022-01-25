import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {List} from "antd";
import {colors} from "../../../styles/colors";

export const StyledNavLink = styled(NavLink)`
  display: flex;
  position: relative;

  &.empty-action::before {
    content: "";
    position: absolute;
    top: 4px;
    bottom: 4px;
    width: 5px;
    background-color: ${colors.tertiary};
    z-index: 1;
  }

  &.active .event-item {
    background-color: rgba(233, 207, 48, 0.2);
  }

  .event-item {
    background-color: white;
    padding: 8px 20px;
    margin: 4px 0;
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

export const StyledList = styled(List)`
  flex: auto;
  overflow: auto;
` as typeof List;

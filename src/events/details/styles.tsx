import styled from "styled-components";
import {LoadingOutlined} from "@ant-design/icons";
import {MessageTypes} from "./types";

export const StyledAction = styled.div`
  background: #F4F4F4;
  box-shadow: 0 3px 6px #00000029;
  padding: 12px 18px;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;

  &.selected {
    background-color: #454F63;

    > * {
      color: white;
    }
  }
`;

export const StyledHStack = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const StyledResolutionDetail = styled.div`
  margin-top: 20px;
`;

export const StyledAlertMessage = styled.div<{ type: MessageTypes }>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > * {
    text-align: center;
  }

  & > *:not(:last-child) {
    margin-bottom: 10px;
  }

  .alert-message--icon {
    font-size: 56px;
  }

  .alert-message--title, .alert-message--icon {
    color: ${({type}) => type === MessageTypes.Success ? '#3DA836' : '#D92323'}
  }
`;

export const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 275px;
  color: #3DA836;
  font-size: 56px;
`;

export const StyledActionButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export const StyledCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Loader = () => {
    return (
        <StyledLoader>
            <LoadingOutlined/>
        </StyledLoader>
    )
}

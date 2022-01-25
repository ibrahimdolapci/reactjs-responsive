import styled from "styled-components";
import {LoadingOutlined} from "@ant-design/icons";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StyledWrapper = styled(StyledContainer)`
  flex: 0 0 500px;
  margin-left: 20px;
`;

export const StyledContentWrapper = styled.div`
  flex: auto;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

export const StyledContent = styled.div`
  background-color: white;
  padding: 10px 20px;
  margin-top: 4px !important;
`;

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
  padding: 10px 0;
`;

export const StyledResolutionDetail = styled.div`
  margin-top: 20px;
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
  margin-top: 20px;
`;

export const StyledCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
  padding: 5px;

  > * {
    margin: 5px;
    flex: auto;
  }
`;

export const Loader = () => {
    return (
        <StyledLoader>
            <LoadingOutlined/>
        </StyledLoader>
    )
}

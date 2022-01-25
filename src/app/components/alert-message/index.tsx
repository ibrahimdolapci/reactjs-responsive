import Icon, {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Typography} from "antd";
import {ComponentType, useMemo} from "react";
import styled from "styled-components";

export enum MessageTypes {
    Success = "success",
    Error = 'error'
}

export interface Message {
    icon: ComponentType
    title: string
    description: string
    type: MessageTypes
}

export class SuccessMessage implements Message {
    icon = CheckCircleOutlined
    title = "ACTION HAS BEEN TAKEN!"
    description = "You can see the action details from details tab."
    type = MessageTypes.Success
}

export class ErrorMessage implements Message {
    icon = CloseCircleOutlined
    title = "A PROBLEM OCCURED!"
    description = "We cannot continue due to a problem. Please try again later."
    type = MessageTypes.Error
}

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

export function AlertMessage({type}: { type: MessageTypes }) {
    const message = useMemo<Message>(() => type === MessageTypes.Success ? new SuccessMessage() : new ErrorMessage(), [type]);

    return (
        <StyledAlertMessage type={message.type}>
            <Icon className="alert-message--icon" component={message.icon}/>
            <Typography.Title level={2} className="alert-message--title">{message.title}</Typography.Title>
            <Typography.Text type="secondary">{message.description}</Typography.Text>
        </StyledAlertMessage>
    )
}

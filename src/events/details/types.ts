import {ComponentType} from "react";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";

export type TakeActionModelProps = {
    visible: boolean,
    onCancel: () => void
}

export interface Action {
    id: number
    title: string
    description: string
}

export enum MessageTypes {
    Success,
    Error
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

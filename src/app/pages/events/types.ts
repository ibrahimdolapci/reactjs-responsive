export enum DetailFormatTypes {
    String = "string",
    Date = "date",
    IncidentType = "incident_type",
    Vehicle = "vehicle"
}

export enum EventMediaTypes {
    Image = "image",
    Audio = "audio"
}

export interface IEventMedia {
    url: string,
    type: EventMediaTypes,
}

export enum EventActions {
    NoActionNeeded,
    TakeAction
}

export interface IEventAction {
    comment: string;
    task_id: string;
    title: string;
    user: string;
    date: string;
    action_taken: boolean,
    action_id: EventActions,
}

export interface IEventExtras {
    new: boolean,
    vehicle_id: number,
    driver_id: string,
}

export interface IEventDetail {
    format: DetailFormatTypes
    value: string
    title: string
}

export interface IEventLocation {
    latitude: number;
    type: string;
    longitude: number;
}

export interface IEvent {
    media: IEventMedia[],
    actions: IEventAction[],
    extras: IEventExtras,
    details: IEventDetail[],
    type: string,
    id: number,
    location: IEventLocation,
}

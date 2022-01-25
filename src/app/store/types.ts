import {IEvent} from "../pages/events/types";

export interface RootState {
    events: EventsState
}

export type EventsState = {
    selectedEvent?: IEvent;
    dataSource: IEvent[];
}

import {IEvent} from "../events/types";

export interface RootState {
    events: EventsState
}

export type EventsState = {
    selectedEvent?: IEvent;
    visitedEventIds: number[];
    dataSource: IEvent[];
}

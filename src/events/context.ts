import {createContext, useContext} from "react";
import {IEvent} from "./types";

type EventsContextProps = {
    selectedEvent?: IEvent;
    visitedEventIds: number[];
}

export const EventsContext = createContext<EventsContextProps>({
    visitedEventIds: []
});

export function useEvents() {
    return useContext(EventsContext);
}

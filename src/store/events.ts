import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {EventsState, RootState} from "./types";
import {IEvent} from "../events/types";
import {example_response} from "../events/list/data";


const initialState: EventsState = {
    dataSource: example_response.data as IEvent[],
    visitedEventIds: []
}

export const eventsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        selectEvent: (state: EventsState, action: PayloadAction<IEvent>) => {
            state.visitedEventIds.push(action.payload.id);

            const selectedEvent = action.payload;
            state.selectedEvent = state.selectedEvent?.id === selectedEvent.id ? undefined : action.payload;
        },
        updateEvent: (state: EventsState, action: PayloadAction<IEvent>) => {
            const selectedEvent = action.payload;
            const index = state.dataSource.findIndex(({id}) => id === selectedEvent.id);
            state.dataSource[index] = selectedEvent;
            state.selectedEvent = selectedEvent;
        },
    },
})

export const selectEvents = (state: RootState) => state.events;

export const selectSelectedEvent = createSelector(selectEvents, events => events.selectedEvent)
export const selectDataSource = createSelector(selectEvents, events => events.dataSource)
export const selectVisitedEventIds = createSelector(selectEvents, events => events.visitedEventIds)

export default eventsSlice.reducer

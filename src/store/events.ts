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
        updateAction: (state: EventsState, action: PayloadAction<{ value: string }>) => {
            if(!state.selectedEvent) return state;

            const eventIndex = state.dataSource.findIndex(({id}) => id === state.selectedEvent?.id);
            const details = state.selectedEvent.details.slice() || [];

            const index = details.findIndex(({title}) => title === 'Aksiyon');
            if (index >= 0) {
                details[index] = {...details[index], value: action.payload.value};
                state.selectedEvent = {...state.selectedEvent, details};
                state.dataSource[eventIndex] = state.selectedEvent;
            }
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

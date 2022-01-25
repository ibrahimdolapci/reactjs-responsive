import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {EventsState, RootState} from "./types";
import {IEvent} from "../pages/events/types";
import {example_response} from "../pages/events/list/data";


const initialState: EventsState = {
    dataSource: example_response.data as IEvent[],
}

export const eventsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        selectEvent: (state: EventsState, action: PayloadAction<number>) => {
            state.selectedEvent = state.dataSource.find(item => item.id === action.payload);
        },
        updateAction: (state: EventsState, action: PayloadAction<{ value: string }>) => {
            if (!state.selectedEvent) return state;

            const details = state.selectedEvent.details.slice() || [];

            const index = details.findIndex(({title}) => title === 'Aksiyon');
            if (index >= 0) {
                details[index] = {...details[index], value: action.payload.value};
                state.selectedEvent = {...state.selectedEvent, details};

                const eventIndex = state.dataSource.findIndex(({id}) => id === state.selectedEvent?.id);
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

export const selectDataSource = createSelector(selectEvents, events => events.dataSource)
export const selectSelectedEvent = createSelector(selectEvents, events => events.selectedEvent)

export default eventsSlice.reducer

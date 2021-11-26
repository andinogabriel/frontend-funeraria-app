import { types } from '../types/types';

const initialState = {
    entries: [],
    fetched: false,
    totalElements: null
};

export const entriesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.entriesGet:
            return {
                ...state,
                entries: payload.entries,
                fetched: payload.fetched,
                totalElements: payload.totalElements
            };
        case types.entriesAddNew:
            return {
                ...state,
                fetched: payload.fetched,
                entries: [
                    ...state.entries,
                    payload
                ]
            };
        case types.entriesUpdated:
            return {
                ...state,
                fetched: payload.fetched,
                entries: state.entries.map(e => 
                    (e.id === payload.id) ? payload : e
                )
            };
        case types.entriesDeleted:
            return {
                ...state,
                entries: state.entries.filter(entry => (
                    entry.id !== payload.id
                ))
            };
        default:
            return state;
    }
};
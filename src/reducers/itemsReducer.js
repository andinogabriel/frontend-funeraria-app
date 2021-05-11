import { types } from './../types/types';

const initialState = {
    items: [],
    totalPages: '',
    fetched: false
};

export const itemsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.itemsGet:
            return {
                ...state,
                items: payload.items,
                totalPages: payload.totalPages,
                fetched: payload.fetched 
            };
        case types.itemsGetByCategory:
            return {
                ...state,
                items: payload.items,
                totalPages: payload.totalPages,
                fetched: payload.fetched
            };
        case types.itemsAddNew:
            return {
                ...state,
                fetched: payload.fetched,
                items: [
                    ...state.items,
                    payload
                ]
            };
        case types.itemsDeleted:
            return {
                ...state,
                items: state.items.filter(item => (
                    item.id !== payload.id
                ))
            };
        default:
            return state;
    }
};
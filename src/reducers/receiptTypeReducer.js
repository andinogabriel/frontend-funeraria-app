import { types } from '../types/types';

const initialState = {
    receiptTypes: [],
    fetched: false
};

export const receiptTypesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.receiptTypesGet:
            return {
                ...state,
                receiptTypes: payload.receiptTypes,
                fetched: payload.fetched
            };
        case types.receiptTypesAddNew:
            return {
                ...state,
                fetched: payload.fetched,
                receiptTypes: [
                    ...state.receiptTypes,
                    payload
                ]
            };
        case types.receiptTypesUpdated:
            return {
                ...state,
                fetched: payload.fetched,
                receiptTypes: state.receiptTypes.map(r => 
                    (r.id === payload.id) ? payload : r
                )
            };
        case types.receiptTypesDeleted:
            return {
                ...state,
                receiptTypes: state.receiptTypes.filter(receiptType => (
                    receiptType.id !== payload.id
                ))
            };
        default:
            return state;
    }
};
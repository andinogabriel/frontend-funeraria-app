import { types } from './../types/types';

const initialState = {
    suppliers: [],
    fetched: false,
};

export const suppliersReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case types.setSuppliers:
            return {
                ...state,
                fetched: payload.fetched,
                suppliers: payload.suppliers,
            };
        case types.suppliersAdNew:
            return {
                ...state,
                fetched: payload.fetched,
                suppliers: [
                    ...state.suppliers,
                    payload
                ]
            };
        case types.suppliersDeleted:
            return {
                ...state,
                suppliers: state.suppliers.filter(s => (
                    s.id !== payload.id
                ))
            };
        default:
            return state;
    }

};


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
                suppliers: payload.suppliers
            };
        default:
            return state;
    }

};


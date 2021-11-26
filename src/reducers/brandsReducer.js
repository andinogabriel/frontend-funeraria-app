import { types } from '../types/types';

const initialState = {
    brands: [],
    fetched: false
};

export const brandsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.brandsGet:
            return {
                ...state,
                brands: payload.brands,
                fetched: payload.fetched 
            };
        case types.brandsAddNew:
            return {
                ...state,
                fetched: payload.fetched,
                brands: [
                    ...state.brands,
                    payload
                ]
            };
        case types.brandsUpdated:
            return {
                ...state,
                fetched: payload.fetched,
                brands: state.brands.map(b => 
                    (b.id === payload.id) ? payload : b
                )
            };
        case types.brandsDeleted:
            return {
                ...state,
                brands: state.brands.filter(brand => (
                    brand.id !== payload.id
                ))
            };
        default:
            return state;
    }
};


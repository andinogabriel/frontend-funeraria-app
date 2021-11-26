import { types } from '../types/types';

const initialState = {
    categories: [],
    fetched: false
};

export const categoriesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.categoryGet:
            return {
                ...state,
                categories: payload.categories,
                fetched: payload.fetched
            };
        case types.categoryAddNew:
            return {
                ...state,
                fetched: payload.fetched,
                categories: [
                    ...state.categories,
                    payload
                ]
            };
        case types.brandsUpdated:
            return {
                ...state,
                fetched: payload.fetched,
                categories: state.categories.map(c => 
                    (c.id === payload.id) ? payload : c
                )
            };
        case types.categoryDeleted:
            return {
                ...state,
                categories: state.categories.filter(category => (
                    category.id !== payload.id
                ))
            };
        default:
            return state;
    }
};
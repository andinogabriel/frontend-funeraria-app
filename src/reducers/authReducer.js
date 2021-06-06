import { types } from '../types/types';

const initialState = {
    loggedIn: false,
    user: {},
    fetched: false,
};

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.setCurrentUser:
            return {
                ...state,
                loggedIn: payload.loggedIn,
                fetched: payload.fetched,
                user: {
                    ...payload.user
                }
            };
        default:
            return state;
    }
};
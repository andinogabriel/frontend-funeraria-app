import { types } from '../types/types';

const initialState = {
    loggedIn: false,
    user: {}
};

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.setCurrentUser:
            return {
                ...state,
                loggedIn: payload.loggedIn,
                user: {
                    ...payload.user
                }
            };
        default:
            return state;
    }
};
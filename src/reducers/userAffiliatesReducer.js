import { types } from './../types/types';

const initialState = {
    affiliates: [],
    fetched: false //Para saber si los afiliados han sido traidos de la API
};


export const userAffiliatesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.setUserAffiliates:
            return {
                ...state,
                fetched: payload.fetched,
                affiliates: payload.affiliates
            };
        default:
            return state;
    }
    
};




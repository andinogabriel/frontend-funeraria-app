import axios from 'axios';
import { types } from './../types/types';
import { USERS_AFFILIATES_ENDPOINT } from './../helpers/endpoints';


export const getUserAffiliates = () => {
    return async (dispatch) => {

        try {
            const resp = await axios.get(USERS_AFFILIATES_ENDPOINT);
            dispatch({
                type: types.setUserAffiliates,
                payload: {
                    fetched: true,
                    affiliates: resp.data
                }
            });
        } catch (error) {
            console.log(error);
        }

    };
};
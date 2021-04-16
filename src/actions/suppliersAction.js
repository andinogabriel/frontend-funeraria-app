import axios from 'axios';
import { types } from './../types/types';
import { SUPPLIERS_ENDPOINT } from './../helpers/endpoints';


export const getSuppliers = () => {

    return async (dispatch) => {

        try {
            const resp = await axios.get(SUPPLIERS_ENDPOINT);
            dispatch({
                type: types.setSuppliers,
                payload: {
                    fetched: true,
                    suppliers: resp.data
                }
            });
        } catch (error) {
            console.log(error);
        }

    };

};


import axios from 'axios';
import { types } from '../types/types';
import { ITEMS_ENDPOINT } from '../helpers/endpoints';


export const getItems = () =>{
    return async (dispatch) => {
        try {
            const resp = await axios.get(ITEMS_ENDPOINT);
            dispatch({
                type: types.itemsGet,
                payload: {
                    fetched: true,
                    items: resp.data,
                }
            });
        } catch (error) {
           console.log(error); 
        }
    };
};



export const addNewItem = (item) => {
    return async(dispatch) => {
        try {
            const resp = await axios.post(ITEMS_ENDPOINT, item);
            const { data } = resp;
            dispatch({
                type: types.itemsAddNew,
                payload: data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteItem = (id) => {
    return async(dispatch) => {
        try {
            await axios.delete(`${ITEMS_ENDPOINT}/${id}`);
            dispatch({
                type: types.itemsDeleted,
                payload: id
            });
        } catch (error) {
            console.log(error);
        }
    };
};


import axios from 'axios';
import { CATEGORIES_ENDPOINT } from '../helpers/endpoints';
import { types } from './../types/types';

export const getCategories = (setError) => {
    return async (dispatch) => {
        try {       
            const resp = await axios.get(CATEGORIES_ENDPOINT);
            dispatch({
                type: types.categoryGet,
                payload: {
                    fetched: true,
                    categories: resp.data
                }
            });
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };
};

export const addNewCategory = (category, setError) => {
    return async (dispatch) => {
        try {
            const resp = await axios.post(CATEGORIES_ENDPOINT, category);
            const {data} = resp;
            dispatch({
                type: types.categoryAddNew,
                payload: {data}
            });
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };
};

export const updateCategory = (category, setError) => {
    return async (dispatch) => {
        try {
            const resp = await axios.put(`${CATEGORIES_ENDPOINT}/${category.id}`, category);
            dispatch({
                type: types.categoryUpdated,
                payload: resp.data
            });
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };
};

export const deleteCategoryById = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${CATEGORIES_ENDPOINT}/${id}`);
            dispatch({
                type: types.categoryDeleted,
                payload: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error)
        }
    };
};

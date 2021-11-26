import axios from 'axios';
import { types } from './../types/types';
import { BRANDS_ENDPOINT } from './../helpers/endpoints';


export const getBrands = () => {
    return async (dispatch) => {
        try {       
            const resp = await axios.get(BRANDS_ENDPOINT);
            dispatch({
                type: types.brandsGet,
                payload: {
                    fetched: true,
                    brands: resp.data
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

};

export const addNewBrand = (brand) => {
    return async (dispatch) => {
        try {
            const resp = await axios.post(BRANDS_ENDPOINT, brand);
            const {data} = resp;
            dispatch({
                type: types.brandsAddNew,
                payload: data
            });
        } catch (error) {
            console.log(error);
            console.log(error.response.data.message);
        }
    };
};

export const updateBrand = (brand) => {
    return async (dispatch) => {
        try {
            const resp = await axios.put(`${BRANDS_ENDPOINT}/${brand.id}`, brand);
            dispatch({
                type: types.brandsAddNew,
                payload: resp.data
            });
        } catch (error) {
            console.log(error);
            console.log(error.response.data.message);
        }
    };
};


export const deleteBrandById = (id) => {
    return async (dispatch) => {

        try {
            await axios.delete(`${BRANDS_ENDPOINT}/${id}`);
            dispatch({
                type: types.brandsDeleted,
                payload: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error)
        }

    };
};
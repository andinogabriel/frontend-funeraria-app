import axios from 'axios';
import { types } from './../types/types';
import { BRANDS_ENDPOINT } from './../helpers/endpoints';


export const getBrands = (currentPage = 1, brandsPerPage = 5, sortDir ='asc', searchName = '') => {

    return async (dispatch) => {
        try {
            let resp;
            if(searchName.trim().length > 0) {
                resp = await axios.get(`${BRANDS_ENDPOINT}/search?name=${searchName}&page=${currentPage}&limit=${brandsPerPage}&sortBy=name&sortDir=${sortDir}`);
            } else {
                resp = await axios.get(`${BRANDS_ENDPOINT}/paginated?page=${currentPage}&limit=${brandsPerPage}&sortBy=name&sortDir=${sortDir}`);
            }
            
            dispatch({
                type: types.brandsGet,
                payload: {
                    fetched: true,
                    brands: resp.data.content,
                    totalPages: resp.data.totalPages,
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
                payload: {data}
            });
        } catch (error) {
            console.log(error);
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
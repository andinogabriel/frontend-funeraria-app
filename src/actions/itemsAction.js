import axios from 'axios';
import { types } from '../types/types';
import { ITEMS_ENDPOINT } from '../helpers/endpoints';


export const getItems = (categoryId, currentPage = 1, itemsPerPage = 5, sortBy = 'name', sortDir ='asc', searchName = '') =>{
    return async (dispatch) => {
        try {
            let resp;
            if(categoryId !== undefined && searchName.trim().length > 0) {
                resp = await axios.get(`${ITEMS_ENDPOINT}/search/${categoryId}?name=${searchName}&page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDir=${sortDir}`);
            } else if(categoryId !== undefined) {
                resp = await axios.get(`${ITEMS_ENDPOINT}/category/${categoryId}?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDir=${sortDir}`);
            }
            else if(searchName.trim().length > 0) {
                resp = await axios.get(`${ITEMS_ENDPOINT}/search?name=${searchName}&page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDir=${sortDir}`);
            } else {
                resp = await axios.get(`${ITEMS_ENDPOINT}/paginated?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}&sortDir=${sortDir}`);
            }
            console.log("Resp: ", resp);
            console.log("Sort by: ", sortBy);

            dispatch({
                type: types.itemsGet,
                payload: {
                    fetched: true,
                    items: resp.data.content,
                    totalPages: resp.data.totalPages,
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


import axios from 'axios';
import { types } from './../types/types';
import { SUPPLIERS_ENDPOINT } from './../helpers/endpoints';
import { PropTypes } from 'prop-types';


export const getSuppliers = (currentPage = 1, suppliersPerPage = 5, sortDir ='asc', searchName = '') => {

    return async (dispatch) => {
        try {
            let resp;
            if(searchName.trim().length > 0) {
                resp = await axios.get(`${SUPPLIERS_ENDPOINT}/search/${searchName}?page=${currentPage}&limit=${suppliersPerPage}&sortBy=name&sortDir=${sortDir}`);
            } else {
                resp = await axios.get(`${SUPPLIERS_ENDPOINT}/paginated?page=${currentPage}&limit=${suppliersPerPage}&sortBy=name&sortDir=${sortDir}`);
            }
            dispatch({
                type: types.setSuppliers,
                payload: {
                    fetched: true,
                    suppliers: resp.data.content,
                    totalPages: resp.data.totalPages,
                }
            });
        } catch (error) {
            console.log(error);
        }

    };

};


export const addNewSupplier = (supplier) => {
    return async (dispatch) => {
        try {
            const resp = await axios.post(SUPPLIERS_ENDPOINT, supplier);
            const {data} = resp;
            dispatch({
                type: types.suppliersAdNew,
                payload: {data}
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteSupplierById = (id) => {
    return async (dispatch) => {

        try {
            await axios.delete(`${SUPPLIERS_ENDPOINT}/${id}`);
            dispatch({
                type: types.suppliersDeleted,
                payload: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error)
        }

    };
};

getSuppliers.propTypes = {
    search: PropTypes.string
};
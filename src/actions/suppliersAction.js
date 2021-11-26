import axios from 'axios';
import { types } from './../types/types';
import { SUPPLIERS_ENDPOINT } from './../helpers/endpoints';
import { PropTypes } from 'prop-types';


export const getSuppliers = () => {

    return async (dispatch) => {
        try {
            const resp = await axios.get(SUPPLIERS_ENDPOINT);
            
            dispatch({
                type: types.setSuppliers,
                payload: {
                    fetched: true,
                    suppliers: resp.data,
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
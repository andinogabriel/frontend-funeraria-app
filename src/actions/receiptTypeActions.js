import axios from 'axios';
import { types } from '../types/types';
import { RECEIPT_TYPES_ENDPOINT } from './../helpers/endpoints';

export const getReceiptTypes = (setError) => {
    return async (dispatch) => {
        try {       
            const resp = await axios.get(RECEIPT_TYPES_ENDPOINT);
            dispatch({
                type: types.receiptTypesGet,
                payload: {
                    fetched: true,
                    receiptTypes: resp.data
                }
            });
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };
};

export const addNewReceiptType = (receiptType, setError) => {
    return async (dispatch) => {
        try {
            const resp = await axios.post(RECEIPT_TYPES_ENDPOINT, receiptType);
            dispatch({
                type: types.receiptTypesAddNew,
                payload: resp.data
            });
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };
};

export const updateReceiptType = (receiptType, setError) => {
    return async (dispatch) => {
        try {
            const resp = await axios.put(`${RECEIPT_TYPES_ENDPOINT}/${receiptType.id}`, receiptType);
            dispatch({
                type: types.receiptTypesUpdated,
                payload: resp.data
            });
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };
};

export const deleteEntryById = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${RECEIPT_TYPES_ENDPOINT}/${id}`);
            dispatch({
                type: types.receiptTypesDeleted,
                payload: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error);
        }
    };
};

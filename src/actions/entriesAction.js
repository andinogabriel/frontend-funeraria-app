import axios from 'axios';
import { ENTRIES_ENDPOINT } from '../helpers/endpoints';
import { types } from '../types/types';

export const getEntries = (setError, page, limit) => {
    return async (dispatch) => {
        try {       
            const resp = await axios.get(`${ENTRIES_ENDPOINT}/paginated?page=${page}&limit=${limit}`);
            
            dispatch({
                type: types.entriesGet,
                payload: {
                    fetched: true,
                    entries: resp.data.content,
                    totalElements: resp.data.totalElements
                }
            });
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    };
};

export const addNewEntry = (entry) => {
    return async (dispatch) => {
        try {
            const resp = await axios.post(ENTRIES_ENDPOINT, entry);
            const {data} = resp;
            dispatch({
                type: types.entriesAddNew,
                payload: {data}
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateEntry = (entry) => {
    return async (dispatch) => {
        try {
            const resp = await axios.put(`${ENTRIES_ENDPOINT}/${entry.id}`, entry);
            dispatch({
                type: types.entriesAddNew,
                payload: resp.data
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteEntryById = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${ENTRIES_ENDPOINT}/${id}`);
            dispatch({
                type: types.entriesDeleted,
                payload: {
                    id: id
                }
            });
        } catch (error) {
            console.log(error)
        }
    };
};

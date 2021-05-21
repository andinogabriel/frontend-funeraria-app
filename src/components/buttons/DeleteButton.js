import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {confirmAlert} from 'react-confirm-alert';
import DeleteIcon from '@material-ui/icons/Delete';


export const DeleteButton = ({id, name, currentPage, thingToDelete, deleteEndPoint, getEndPoint, thingsPerPage, deleteType, setCurrentPage}) => {
    
    const dispatch = useDispatch();

    const createAlert = () => {
        confirmAlert({
            title: `Eliminar ${thingToDelete}`,
            message: `¿Estas seguro que deseas eliminar a ${name}?`,
            buttons: [
                {
                    label: 'Si',
                    onClick: () => { deleteThing() }
                },
                {
                    label: 'No',
                    onClick: () => {return false;}
                }
            ]
        });
    };

    const deleteThing = async () => {
        try {
            await axios.delete(`${deleteEndPoint}/${id}`);

            dispatch({
                type: deleteType,
                payload: {
                    id: id
                }
            });
            
            toast.info(`${name} se ha eliminado satisfactoriamente.`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            const resp = await axios.get(`${getEndPoint}?page=${currentPage}&limit=${thingsPerPage}`);
            
            if(resp.data.content?.length < 1) {
                setCurrentPage(currentPage-1);
            }
 
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <DeleteIcon
            onClick={createAlert}
            color="secondary"
        />
    );
};

import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {confirmAlert} from 'react-confirm-alert';
import { HighlightOff, Delete } from '@mui/icons-material';


export const DeleteButton = ({id, name, thingToDelete, endpoint, deleteType, setList, index, iconType}) => {
    
    const dispatch = useDispatch();

    const createAlert = () => {
        confirmAlert({
            title: `Eliminar ${thingToDelete}`,
            message: `¿Estas seguro que deseas eliminar ${name}?`,
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
            if(typeof(id) === 'number') {
                await axios.delete(`${endpoint}/${id}`);
    
                if(deleteType !== null) {
                    dispatch({
                        type: deleteType,
                        payload: {
                            id: id
                        }
                    });
                } else {
                    setList((prev) => prev.filter((thing) => thing.id !== id));
                }
            } else {
                setList((prev) => prev.filter((thing) => thing !== prev[index]));
            }
    
            toast.info(`${name} se ha eliminado satisfactoriamente.`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
             
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <>
        {
            iconType && iconType !== null
                ?
                <HighlightOff
                    onClick={createAlert}
                    style={{color:"#ff3333", cursor: 'pointer'}}
                />
                :
                <Delete
                    onClick={createAlert}
                    style={{color:"#ff3333", cursor: 'pointer'}}
                />
        }
        </>   
    );
};

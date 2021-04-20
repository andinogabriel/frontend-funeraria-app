import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {confirmAlert} from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { deleteSupplierById, getSuppliers } from './../../actions/suppliersAction';



export const DeleteSupplierButton = ({id, name}) => {

    const dispatch = useDispatch();

    const createAlert = () => {
        confirmAlert({
            title: 'Eliminar Proveedor',
            message: `Estas seguro que deseas eliminar el proveedor ${name}`,
            buttons: [
                {
                    label: 'Si',
                    onClick: () => { deleteSupplier() }
                },
                {
                    label: 'No',
                    onClick: () => {return false;}
                }
            ]
        });
    };

    const deleteSupplier = async () => {

        try {
            //await axios.delete(`${SUPPLIERS_ENDPOINT}/${id}`);
            dispatch(deleteSupplierById(id));
            dispatch(getSuppliers());
            toast.info(`El proveedor ${name} se ha eliminado satisfactoriamente.`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            
            
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 3000,
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
            <Button 
                variant="danger" 
                size="sm"
                onClick={createAlert}
            >
                <FontAwesomeIcon icon={['fas', 'trash']}/>
            </Button>
        </>
    );
};

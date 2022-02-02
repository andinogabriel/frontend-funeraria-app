import React from 'react'
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useForm } from 'react-hook-form';

export const DialogForm = ({open, setOpen, thing, position, FormComponent}) => {

    const { reset } = useForm();

    const handleClose = () => {
        setOpen(false); 
        reset();
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                {
                    position !== null 
                        ?
                        `Actualizar ${thing}`
                        :
                        `Registrar ${thing}`
                }
            </DialogTitle>
            <DialogContent>
                <FormComponent
                />
            </DialogContent>
            
        </Dialog>
    )
}

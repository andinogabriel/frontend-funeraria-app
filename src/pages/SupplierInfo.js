import React, { useState } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import { Dialog, DialogTitle, DialogContent, DialogContentText, List, ListItem, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
}));

export const SupplierInfo = ({supplier}) => {
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const {name, nif, webPage, email, mobileNumbers, addresses} = supplier;
    
    const supplierInfo = [{label: 'Nombre', value: name}, {label: 'NIF', value: nif}, {label: 'Página web', value: webPage}, {label: 'Email', value: email}];

    const handleClose = () => {
        setOpen(false);
    };
    
    
    return (
        <div key={supplier.id}>
            <InfoIcon
                color="primary"
                onClick={() => {setOpen(true)}}
            />
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
                fullWidth	
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                component="div"
            >
                <DialogTitle id="scroll-dialog-title">{name}</DialogTitle>
                <DialogContent component="div">
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                        component="div"
                        style={{color:"black"}}
                    >
                        <List component="nav" className={classes.root} aria-label="mailbox folders">
                            {
                                supplierInfo.map((s, i) => (
                                    <ListItem button divider key={i}>
                                        {s.value !== '' ? `${s.label}: ${s.value}` : `${s.label}: No tiene.`}
                                    </ListItem>
                                ))
                            }
                            <ListItem button divider>
                            Numeros de telefono:
                            {
                                mobileNumbers?.length > 0 
                                ?
                                mobileNumbers.map((m, i) => (
                                    i > 0 ? `, ${m.mobileNumber}` : ` ${m.mobileNumber}`
                                ))
                                :
                                " No tiene."
                            }
                            </ListItem>
                            
                            <ListItem button divider>
                            <Box flexDirection="col">
                            Direccion:
                            {   
                                addresses?.length > 0 
                                ?
                                supplier.addresses.map((m,i) => (
                                    <ListItem divider dense key={i}>
                                       {m.city?.province !== undefined ? ` Provincia: ${m.city?.province?.name}` : ' Provincia: - '}<br/>
                                        {m?.city?.id !== undefined ? ` Ciudad: ${m.city?.name}` : ' Ciudad: - '}
                                        <br/>
                                        {m.streetName !== null ? ` Calle: ${m.streetName}` : ' Calle: - '}
                                        <br/>
                                        {m.blockStreet !== null ? ` Altura: ${m.blockStreet}` : ' Altura: - '}
                                        <br/>
                                        {m.apartment !== null ? ` Departamento: ${m.apartment}` : ' Departamento: - '}
                                        <br/>
                                        {m.flat !== null ? ` Piso: ${m.flat}` : ' Piso: - '}
                                    </ListItem>
                                ))
                                :
                                "Dirección: No tiene."
                            }
                            </Box>
                            </ListItem>
                        </List> 
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
};

import React, { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { Dialog, DialogContent, DialogContentText, DialogTitle, List, ListItem } from '@mui/material';


export const ItemInfo = ({item}) => {

    
    const [open, setOpen] = useState(false);
    const {name, description, code, itemImageLink, price, itemLength, itemHeight, itemWidth, stock, category, brand} = item;
    console.log(itemImageLink);
    
    const itemInfo = [
        {label: 'Imagén', value: itemImageLink},
        {label: 'Descripción: ', value: description},
        {label: 'Código: ', value: code},
        {label: 'Precio: $', value: price},
        {label: 'Largo: ', value: itemLength},
        {label: 'Alto: ', value: itemHeight},
        {label: 'Ancho: ', value: itemWidth},
        {label: 'Stock: ', value: stock},
        {label: 'Categoría: ', value: category},
        {label: 'Marca: ', value: brand}
    ];

    const handleClose = () => {
        setOpen(false);
    };
    

    return (
        <div key={item.id}>
            <InfoIcon
                color="primary"
                onClick={() => {setOpen(true)}}
                style={{cursor: 'pointer'}}
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
                        <List component="nav" className="info-root" aria-label="mailbox folders">
                            {
                                itemInfo.map((item, index) => (
                                    index <= 7
                                    ?
                                        item.value !== null 
                                        &&
                                            <ListItem button divider key={index}>
                                                {
                                                    item.label !== 'Imagén'
                                                    ?
                                                        item.label + (item.value !== undefined ? item.value : " - ")
                                                    :
                                                        <img 
                                                            src={itemImageLink} 
                                                            alt={name}
                                                            className="image"
                                                        />
                                                }
                                            </ListItem>
                                    :
                                        item.value !== null 
                                        && 
                                            <ListItem button divider key={index}>
                                                {`${item.label}${item.value.name}`}
                                            </ListItem>
                                ))
                            }
                        </List>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
};

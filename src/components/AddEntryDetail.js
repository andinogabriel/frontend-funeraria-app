import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, TextField, Grid, Box, Autocomplete } from '@mui/material';
import { Edit, AddCircleOutline } from '@mui/icons-material';
import { ITEMS_ENDPOINT } from '../helpers/endpoints';


const validationSchema = yup.object().shape({
    category: yup.object().required(),
    item: yup.object().required(),
    quantity: yup.number().positive('La cantidad debe ser positiva').typeError('').required(),
    purchasePrice: yup.number().positive('El precio de compra debe ser positivo.').typeError('').required().typeError('').test(
        "maxDigitsAfterDecimal",
        "Precio de compra solo debe tener 2 decimales o menos.",
        (number) => /^\d+(\.\d{1,2})?$/.test(number)
    ),
    salePrice: yup.number().positive('El precio de venta debe ser positivo.').typeError('').required().typeError('').test(
        "maxDigitsAfterDecimal",
        "Precio de venta solo debe tener 2 decimales o menos.",
        (number) => /^\d+(\.\d{1,2})?$/.test(number)
    )
});

export const AddEntryDetail = ({categories, setEntryDetails, entryDetail, position, entryDetails, open, setOpen}) => {

    const [fetched, setFetched] = useState(false);
    const [items, setItems] = useState([]);
    const [currentCategory, setCurrentCategory] = useState(null);
    
    const { handleSubmit, control, formState: { isValid }, reset, setValue } = useForm({defaultValues: {id: null, category: null, item: null, quantity: '', purchasePrice: '', salePrice: ''}, resolver: yupResolver(validationSchema)});


    useEffect(() => {
        if(entryDetail !== null && position !== null) {
            console.log(entryDetail);
            const { id, item, quantity, purchasePrice, salePrice } = entryDetail;
            setValue('id', id);
            setValue('category', item?.category);
            setValue('item', item);
            setValue('quantity', quantity);
            setValue('purchasePrice', purchasePrice);
            setValue('salePrice', salePrice);
        }
        const fetchData = async () => {
            try {
                if(currentCategory !== null && currentCategory !== undefined) {
                    setValue('item', '');
                    console.log(entryDetail);
                    const resp = await axios.get(`${ITEMS_ENDPOINT}/category/${currentCategory?.id}`);
                    setItems(resp.data);
                    setFetched(true);
                }
            } catch (error) {
                console.log(error);
                console.log(error?.response?.data?.message);
            }
        };
        fetchData();
    }, [entryDetail, currentCategory, setValue, position]);

   
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false); 
        reset({
            category: null, 
            item: null,
            quantity: '',
            purchasePrice: '',
            salePrice: ''
        });
    };

    const onSubmit = handleSubmit(data => { 
        if(position !== null) {
            const clone = [...entryDetails];
            clone[position] = data;
            setEntryDetails(clone);
        } else {
            setEntryDetails(i => [...i, data]);
        }
        handleClose(); 
        
    });

    return (
        <>
            {
                entryDetail
                    ?
                    <Edit onClick={handleClickOpen} style={{color:"#1662D2", cursor: "pointer"}}/>
                    :
                    <AddCircleOutline onClick={handleClickOpen} fontSize="large" style={{color:"#1662D2", cursor: "pointer"}}/>
            }
            
           
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {
                        position !== null 
                            ?
                            'Actualizar articulo ingresado'
                            :
                            'Cargar articulo ingresado'
                    }
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="category"
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Autocomplete
                                            onChange={(event, item) => {
                                                setCurrentCategory(item);
                                            }}
                                            options={categories}
                                            getOptionLabel={(item) => (item.name ? item.name : "")}
                                            isOptionEqualToValue={(option, value) =>
                                            value === undefined || value === "" || option.id === value.id
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Categoria"
                                                    margin="normal"
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={onChange}
                                                    value={value}
                                                    error={!!error}
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="item"
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Autocomplete
                                            onChange={(event, it) => {
                                                onChange(it);
                                            }}
                                            options={items}
                                            getOptionLabel={(it) => (it.name ? it.name : "")}
                                            isOptionEqualToValue={(option, value) =>
                                            value === undefined || value === "" || option.id === value.id
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Articulo"
                                                    margin="normal"
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={onChange}
                                                    value={value}
                                                    error={!!error}
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>           
                                <Controller
                                    name="quantity"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Cantidad"
                                        type="number"
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>           
                                <Controller
                                    name="purchasePrice"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Precio compra"
                                        type="number"
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                    )}
                                />
                            </Grid>  

                            <Grid item xs={12} sm={6}>           
                                <Controller
                                    name="salePrice"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Precio venta"
                                        type="number"
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                    )}
                                />
                            </Grid>

                            <DialogActions>
                                <Box>
                                    <Button onClick={handleClose} color="primary">
                                        Cancelar
                                    </Button>
                                    <Button type="submit" onClick={isValid ? handleClose() : undefined} color="primary">
                                        {
                                            typeof(position) === 'number' 
                                                ?
                                                'Actualizar'
                                                :
                                                'Registrar'
                                        }
                                        
                                    </Button>

                                </Box>
                            </DialogActions>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

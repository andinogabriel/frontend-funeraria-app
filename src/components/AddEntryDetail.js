import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, TextField, Grid, Autocomplete, Skeleton, Box } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import { ITEMS_ENDPOINT } from '../helpers/endpoints';


const validationSchema = yup.object().shape({
    categoryObject: yup.object().required(),
    itemObject: yup.object().required(),
    quantity: yup.number().positive().required(),
    purchasePrice: yup.number().required().typeError('').test(
        "maxDigitsAfterDecimal",
        "Precio de compra solo debe tener 2 decimales o menos.",
        (number) => /^\d+(\.\d{1,2})?$/.test(number)
    ),
    salePrice: yup.number().required().typeError('').test(
        "maxDigitsAfterDecimal",
        "Precio de venta solo debe tener 2 decimales o menos.",
        (number) => /^\d+(\.\d{1,2})?$/.test(number)
    )
});

export const AddEntryDetail = ({categories, setEntryDetails, entryDetail, position, entryDetails}) => {

    console.log(position);


    const [open, setOpen] = useState(false);
    const [fetched, setFetched] = useState(false);
    const [items, setItems] = useState([]);
    
    const { handleSubmit, control, watch, formState: { isValid }, reset, setValue } = useForm({defaultValues: {categoryObject: null, itemObject: null}, resolver: yupResolver(validationSchema)});

    const watchCategoryObject = watch('categoryObject');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(watchCategoryObject) {
                    const resp = await axios.get(`${ITEMS_ENDPOINT}?categoryId=${watchCategoryObject.id}`);
                    setItems(resp.data);
                    setFetched(true);
                }

                if(entryDetail) {
                    const { categoryObject, itemObject, quantity, purchasePrice, salePrice } = entryDetail;
                    setValue('categoryObject', categoryObject);
                    setValue('itemObject', itemObject);
                    setValue('quantity', quantity);
                    setValue('purchasePrice', purchasePrice);
                    setValue('salePrice', salePrice);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [watchCategoryObject]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false); 
    };

    const onSubmit = handleSubmit((data) => { 
        if(position !== null) {
            const clone = [...entryDetails];
            clone[position] = data;
            setEntryDetails(clone);
        } else {
            setEntryDetails(i => [...i, data]);
        }
        reset({
            categoryObject: null, 
            itemObject: null,
            quantity: '',
            purchasePrice: '',
            salePrice: ''
        });
        setOpen(false);
    });

    return (
        <>
            {
                entryDetail 
                    ?
                    <EditIcon onClick={handleClickOpen} style={{color:"#1662D2"}}/>
                    :
                    <AddCircleOutlineIcon onClick={handleClickOpen} fontSize="large" style={{color:"#1662D2"}}/>
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
                            {
                                categories.length > 0
                                ?
                                <Controller
                                    control={control}
                                    name="categoryObject"
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Autocomplete
                                            onChange={(event, item) => {
                                                onChange(item);
                                            }}
                                            options={categories}
                                            getOptionLabel={(item) => (item.name ? item.name : "")}
                                            getOptionSelected={(option, value) =>
                                            value === undefined || value === "" || option.id === value.id
                                            }
                                            value={value}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Categoria"
                                                    margin="normal"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={value}
                                                    onChange={onChange}
                                                    error={!!error}
                                                />
                                            )}
                                        />
                                    )}
                                />
                                :
                                    <Skeleton height={90}/>
                                }
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Controller
                                    control={control}
                                    name="itemObject"
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <Autocomplete
                                            onChange={(event, item) => {
                                                onChange(item);
                                            }}
                                            options={items}
                                            getOptionLabel={(item) => (item.name ? item.name : "")}
                                            getOptionSelected={(option, value) =>
                                            value === undefined || value === "" || option.id === value.id
                                            }
                                            value={value}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Articulo"
                                                    margin="normal"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={value}
                                                    onChange={onChange}
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

                                    <Button onClick={isValid ? handleClose : undefined} color="primary" type="submit">
                                        {
                                            position !== null 
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

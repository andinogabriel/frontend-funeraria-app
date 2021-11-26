import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Grid, TextField, Box, Button, Typography, Autocomplete, Alert } from '@mui/material';
import { ENTRIES_ENDPOINT, ENTRY_DETAILS_ENDPOINT } from './../../helpers/endpoints';
import { EntryDetailsTable } from './../tables/EntryDetailsTable';


const validationSchema = yup.object().shape({
    receiptNumber: yup.number().required().test(
        "maxDigits",
        "El numero de recibo no debe superar los 20 digitos.",
        (number) => String(number).length < 20
    ),
    receiptSeries: yup.number().required().test(
        "maxDigits",
        "La serie del recibo no debe superar los 20 digitos.",
        (number) => String(number).length < 20
    ),
    tax: yup.number().min(0, "Impuesto minimo 0.").max(100, "Impuesto máximo 100.").typeError('').required().test(
        "maxDigitsAfterDecimal",
        "El impuesto solo debe contener como maximo 2 decimales.",
        (number) => /^\d+(\.\d{1,2})?$/.test(number)
      ),
    receiptType: yup.object().required(),
    entrySupplier: yup.object().required()
});

const tableHeaders = [
    {label: 'Articulo'},
    {label: 'Cantidad'},
    {label: 'Precio venta'},
    {label: 'Precio compra'},
    {label: 'Acciones'},
];

export const EntryForm = ({entryToUpdate, fetching, receiptTypes, categories, suppliers}) => {

    const [entryDetails, setEntryDetails] = useState([]);
    const [error, setError] = useState(null);
    const history = useHistory();
    
    const { handleSubmit, control, watch, isValid, setValue } = useForm({defaultValues: { receiptType: null, entrySupplier:null, receiptNumber: '', receiptSeries: '', tax: ''}, resolver: yupResolver(validationSchema)});

    const watchTax = watch('tax');

    useEffect(() => {
        if(entryToUpdate) {
            const { id, entrySupplier, receiptType, receiptNumber, receiptSeries, tax } = entryToUpdate;
            setValue('entrySupplier', entrySupplier);
            setValue('receiptType', receiptType);
            setValue('receiptNumber', receiptNumber);
            setValue('receiptSeries', receiptSeries);
            setValue('tax', tax);
            
            setEntryDetails(entryToUpdate.entryDetails);
        }
    }, [setValue, entryToUpdate]);


    const onSubmit = handleSubmit(async (data) => {
        try {
            //Actualizamos los detalles del ingreso
            if(entryToUpdate !== null) {
                entryDetails?.map(async (entryDetail) => {
                    console.log(entryDetail);
                    if(typeof(entryDetail?.id) === 'number') {
                        let { id, item, quantity, purchasePrice, salePrice } = entryDetail;
                        
                        const entry = entryToUpdate.id;
                        item = item.id;
                
                        const resp = await axios.put(`${ENTRY_DETAILS_ENDPOINT}/${id}`, { item, quantity, purchasePrice, salePrice, entry});
                    } else {
                        let { item, quantity, purchasePrice, salePrice } = entryDetail;

                        const entry = entryToUpdate.id;
                        item = item.id;

                        await axios.post(ENTRY_DETAILS_ENDPOINT, { item, quantity, purchasePrice, salePrice, entry});
                    }
                });
               
                let { entrySupplier, receiptType, receiptNumber, receiptSeries, tax } = data;
                entrySupplier = entrySupplier.id;
                receiptType = receiptType.id;
                //Actualizamos el ingreso
                await axios.put(`${ENTRIES_ENDPOINT}/${entryToUpdate?.id}`, {entrySupplier, receiptType, receiptNumber, receiptSeries, tax});

            } else {

                if(entryDetails.length < 1) {
                    setError("Ingreso invalido. Debe tener al menos un artículo.");
                    return;
                }

                let { entrySupplier, receiptType, receiptNumber, receiptSeries, tax } = data;
    
                entrySupplier = entrySupplier.id;
                receiptType = receiptType.id;
                
                const resp = await axios.post(ENTRIES_ENDPOINT, {entrySupplier, receiptType, receiptNumber, receiptSeries, tax});
                
                entryDetails.map(async (entryDetail) => {
                    let { item, purchasePrice, quantity, salePrice } = entryDetail;
                    
                    const entry = resp.data.id;
                    item = item.id;

                    await axios.post(ENTRY_DETAILS_ENDPOINT, {entry, item, purchasePrice, quantity, salePrice});
                });
            }

            toast.info(`Ingreso ${entryToUpdate ? 'actualizado' : 'registrado'}satisfactoriamente.`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('/ingresos');
        } catch (error) {
            console.log(error);
            setError(error?.response?.data?.message);
        }
            
    });
        
    return (
        <>
            <form onSubmit={onSubmit}>
                <Grid container spacing={2}>

                    {
                        error &&
                        <Grid item xs={12} sm={12}>
                            <Alert severity="error" variant="outlined">
                                <Typography align="center" color="error">{error}</Typography>
                            </Alert>
                        </Grid>
                    }
                
                    <Grid item xs={6} sm={6}>
                        <Controller
                            name="receiptNumber"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Número de recibo"
                                type="number"
                                variant="outlined"
                                fullWidth
                                color="primary"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                            />
                            )}
                        />
                    </Grid>

                    <Grid item xs={6} sm={6}>
                        <Controller
                            name="receiptSeries"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Número de serie"
                                type="number"
                                variant="outlined"
                                fullWidth
                                color="primary"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                            />
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} sm={4}>
                        <Controller
                            name="tax"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Impuesto"
                                type="number"
                                variant="outlined"
                                fullWidth
                                color="primary"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} sm={4} mt={-2}>     
                        {
                            <Controller
                                control={control}
                                name="receiptType"
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Autocomplete
                                    onChange={(event, item) => {
                                        onChange(item);
                                    }}
                                    options={receiptTypes}
                                    getOptionLabel={(item) => (item.name ? item.name : "")}
                                    isOptionEqualToValue={(option, value) =>
                                    value === undefined || value === "" || option.id === value.id
                                    }
                                    value={value}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Tipo de recibo"
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth
                                            value={value}
                                            error={!!error}
                                        />
                                    )}
                                />
                            )}
                            />
                        }        
                    </Grid>

                    <Grid item xs={4} sm={4} mt={-2}>     
                        {
                            <Controller
                                control={control}
                                name="entrySupplier"
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Autocomplete
                                    onChange={(event, item) => {
                                        onChange(item);
                                    }}
                                    options={suppliers}
                                    getOptionLabel={(item) => (item.name ? item.name : "")}
                                    isOptionEqualToValue={(option, value) =>
                                    value === undefined || value === "" || option.id === value.id
                                    }
                                    value={value}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Proveedor"
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        value={value}
                                        error={!!error}
                                    />
                                    )}
                                />
                            )}
                            />
                        }        
                    </Grid>

                
                    <Box clone mt={2} ml={2}>
                        <Button type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary">
                            {
                                entryToUpdate
                                    ?
                                    'Actualizar'
                                    :
                                    'Registrar'
                            }
                        </Button>
                    </Box>
                
                </Grid>
            </form>
            <EntryDetailsTable
                entryDetails={entryDetails}
                setEntryDetails={setEntryDetails}
                watchTax={watchTax}
            />
        </>
    );
};

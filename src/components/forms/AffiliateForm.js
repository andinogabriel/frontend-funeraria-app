import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { GENDERS_ENDPOINT, AFFILIATES_ENDPOINT } from '../../helpers/endpoints';
import { getUserAffiliates } from '../../actions/affiliatesActions';
import { useDispatch } from 'react-redux';
import { Grid, TextField } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    dni: yup.number()
            .typeError('El DNI solo debe contener numeros.')
            .min(999999, 'El DNI debe tener mas de 7 dígitos.')
            .max(1000000000, 'El DNI no puede superar los 9 dígitos.'),
    timestamp: yup.date().max(new Date(),'La fecha de nacimiento debe ser menor que la fecha de hoy.')
});


export const AffiliateForm = () => {

    const [genders, setGenders] = useState([]);
    const [relationships, setRelationships ] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [errores, setErrores] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const { 
        handleSubmit, 
        formState: { errors },
        control,
        setValue
    } = useForm({resolver: yupResolver(schema)});

    
    const onSubmit = handleSubmit(async (data) => {
        console.log(data);
        const {firstName, lastName, dni, timestamp, affiliateGender, affiliateRelationship} = data;
        const date = new Date(timestamp);
        const birthDate = Date.parse(date);
     
        try {
            await axios.post(AFFILIATES_ENDPOINT, {firstName, lastName, dni, birthDate, affiliateGender, affiliateRelationship});
            await dispatch(getUserAffiliates());

            toast.info('Afiliado registrado satisfactoriamente.', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('/mis-afiliados');
        } catch (error) {
            //setErrores(error.response.data.message);
            console.log(errores);
            console.log(error);
        }
    });

    return (
        <>
            {
                !fetching &&
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        {/*
                            errores && errores.length &&
                            <Grid item xs={12} sm={12}>
                                <Alert severity="error" variant="outlined">
                                    <Typography align="center" color="error">
                                        {
                                            errores.map(e => (
                                                e?.message
                                            ))
                                        }
                                    </Typography>
                                </Alert>
                            </Grid>*/
                        }

                        <Grid item xs={6} sm={6}>
                            <Controller
                                name="firstName"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="Nombre"
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
                                name="lastName"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="Apellido"
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
                                name="dni"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="DNI"
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
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Controller
                                    name="timestamp"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <DatePicker
                                            disableFuture
                                            label="Responsive"
                                            openTo="year"
                                            views={['day', 'month', 'year']}
                                            value={value}
                                            onChange={(newValue) => {
                                                setValue("timestamp", newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} 
                                            />}
                                        />
                                    )}
                                />
                            </LocalizationProvider>  
                        </Grid>

                        
                                

                    </Grid>

                </form>
            }
        </>
    );
};

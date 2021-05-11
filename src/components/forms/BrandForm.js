import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Grid, Box, TextField, Button, Alert } from '@material-ui/core';
import { BRANDS_ENDPOINT } from './../../helpers/endpoints';
import { getBrands } from './../../actions/brandsAction';


const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre de la marca es requerido.'),
});

export const BrandForm = ({id, brand}) => {

    const [error, setError] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const { handleSubmit, control, setValue } = useForm({defaultValues: { name: '' }, resolver: yupResolver(validationSchema)});

    useEffect(() => {
        if(id !== null && brand !== null) {
            setValue('name', brand.name);
        }
    }, [id, brand, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            if(id) {
                await axios.put(`${BRANDS_ENDPOINT}/${id}`, data);
            } else {
                await axios.post(BRANDS_ENDPOINT, data);
            }
            
            toast.info(`Marca ${id ? 'actualizada' : 'registrada'} satisfactoriamente.`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            await dispatch(getBrands());
            history.push('/marcas');
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
        }
    });

    return (
        <>
            <form onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    {
                        error !== null 
                            &&
                            <Grid item xs={12} sm={12}>
                                <Alert severity="error">{error}</Alert>
                            </Grid>    
                    }
                    <Grid item xs={12} sm={12}>
                        <Controller
                            name="name"
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
                                helperText={error ? error.message : null}
                            />
                            )}
                        />
                    </Grid>
                    <Box clone mt={2} ml={2}>
                        <Button type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                        >
                            {
                                id !== undefined
                                    ?
                                    'Actualizar'
                                    :
                                    'Registrar'
                            }
                        </Button>
                    </Box>
                </Grid>
            </form>
        </>
    );
};

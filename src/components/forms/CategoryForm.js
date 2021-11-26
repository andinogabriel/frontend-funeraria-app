import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Alert, Grid, Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { addNewCategory, getCategories, updateCategory } from '../../actions/categoriesAction';
import { BrandFormSkeleton } from '../skeletons/BrandFormSkeleton';


const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre de la categoría es requerido.'),
});

export const CategoryForm = ({fetching, category}) => {

    const [error, setError] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const [sending, setsending] = useState(false);

    console.log(sending);
    const { handleSubmit, control, setValue } = useForm({defaultValues: {id: null, name: '', description: '' }, resolver: yupResolver(validationSchema)});

    useEffect(() => {
        if(category) {
            const { id, name, description } = category;
            setValue('id', id);
            setValue('name', name);
            setValue('description', description);
        }
    }, [category, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        setsending(true);
        if(category) {
            dispatch(updateCategory(data, setError));
        } else {
            dispatch(addNewCategory(data, setError));  
        }
        setsending(false);
        !sending &&
            dispatch(getCategories());
            toast.info(`Categoría ${category ? 'actualizada' : 'registrada'} satisfactoriamente.`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('/categorias'); 
    });

    return (
        <>
            {
                fetching 
                ?
                    <BrandFormSkeleton/>
                :
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        {
                            error !== null 
                                &&
                                <Grid item xs={12} sm={12}>
                                    <Alert severity="error">{error}</Alert>
                                </Grid>    
                        }
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="Nombre"
                                    variant="outlined"
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
                                name="description"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                <TextField
                                    label="Descripcion"
                                    variant="outlined"
                                    multiline
                                    color="primary"
                                    fullWidth
                                    value={value !== null ? value : undefined}
                                    onChange={onChange}
                                />
                                )}
                            />
                        </Grid>

                        <Box clone mt={2}>
                            <LoadingButton type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                color="primary"
                                loading={sending}
                                loadingIndicator={category ? 'Actualizando...' : 'Registrando...'}
                            >
                                {
                                    category
                                        ?
                                        'Actualizar'
                                        :
                                        'Registrar'
                                }
                            </LoadingButton>
                        </Box>
                    </Grid>
                </form>
            }
        </>
    );
};

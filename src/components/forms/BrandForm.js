import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Alert, Grid, Box, TextField, Button } from '@mui/material';
import { addNewBrand, getBrands, updateBrand } from './../../actions/brandsAction';
import { BrandFormSkeleton } from './../skeletons/BrandFormSkeleton';


const validationSchema = yup.object().shape({
    name: yup.string().required('El nombre de la marca es requerido.'),
});

export const BrandForm = ({fetching, brand}) => {

    const [error, setError] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const { handleSubmit, control, setValue } = useForm({defaultValues: {id: null, name: '', webPage: '' }, resolver: yupResolver(validationSchema)});

    useEffect(() => {
        if(brand) {
            const { id, name, webPage } = brand;
            setValue('id', id);
            setValue('name', name);
            setValue('webPage', webPage);
        }
    }, [brand, setValue]);

    
    const onSubmit = handleSubmit(async (data) => {
        if(brand) {
            dispatch(updateBrand(data));
        } else {
            dispatch(addNewBrand(data));  
        }

        dispatch(getBrands());
        toast.info(`Marca ${brand ? 'actualizada' : 'registrada'} satisfactoriamente.`, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        
        history.push('/marcas'); 
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
                                name="webPage"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                <TextField
                                    label="Pagina web"
                                    variant="outlined"
                                    fullWidth
                                    value={value !== null ? value : undefined}
                                    onChange={onChange}
                                />
                                )}
                            />
                        </Grid>

                        <Box clone mt={2}>
                            <Button type="submit"
                                fullWidth
                                size="large"
                                variant="contained"
                                color="primary"
                            >
                                {
                                    brand
                                        ?
                                        'Actualizar'
                                        :
                                        'Registrar'
                                }
                            </Button>
                        </Box>
                    </Grid>
                </form>
            }
        </>
    );
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextField, Grid, Box, Autocomplete, Alert } from '@mui/material';
import { ITEMS_ENDPOINT } from '../../helpers/endpoints';
import { ItemFormSkeleton } from '../skeletons/ItemFormSkeleton';


const validationSchema = yup.object().shape({
    name: yup.string().required(''),
    price: yup.number().required().typeError('').test(
        "maxDigitsAfterDecimal",
        "number field must have 2 digits after decimal or less",
        (number) => /^\d+(\.\d{1,2})?$/.test(number)
      ),
    categoryObject: yup.object().required(),
});


export const ItemForm = ({id, item, fetching}) => {

    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categories);
    const { brands, fetched } = useSelector(state => state.brands);
    const history = useHistory();

    console.log(brands);
    console.log(categories);

    const { handleSubmit, control, setValue, watch } = useForm({defaultValues: { categoryObject: '', brandObject:null, name: '', price: '', description: '', image: '', itemLength: '', itemWidth: '', itemHeight: '' }, resolver: yupResolver(validationSchema)});

    const watchCategoryObject = watch('categoryObject');
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(id !== null && item !== null) {
                    const { brand, category, name, price, description, itemLength, itemHeight, itemWidth } = item;
                    setValue('name', name);
                    setValue('price', price);
                    setValue('description', description);
                    setValue('brandObject', brand);
                    setValue('categoryObject', category);
                    //setValue('image', itemImageLink);
                    setValue('itemLength', itemLength);
                    setValue('itemHeight', itemHeight);
                    setValue('itemWidth', itemWidth);                   
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id, item, setValue, dispatch]);

   
    const handleFileChange = (e) => {
        setValue('image', e.target.files[0]);
    };


    const onSubmit = handleSubmit(async (data) => {   
        try {
            if(id) {
                const { code } = item;
                const {brandObject, name, price, description, image, itemLength, itemHeight, itemWidth} = data;
                console.log(data);
                
                const category = watchCategoryObject?.id;
                const brand = brandObject.id;
    
                await axios.put(`${ITEMS_ENDPOINT}/${id}`, {category, brand, name, price, description, itemLength, itemHeight, itemWidth, code});

                console.log(image);
                if(image !== null && image !== undefined && image !== "") {
                    const formData = new FormData();
                    formData.append('file', image);
                    await axios.post(`${ITEMS_ENDPOINT}/${id}/image/upload`, 
                    formData, 
                        {
                            headers: {
                                "Content-Type": "multipart/formdata"
                            }
                        }
                    );
                }
    
            } else {
                const {brandObject, name, price, description, image, itemLength, itemHeight, itemWidth} = data;
                const category = watchCategoryObject.id;
                const brand = brandObject.id;
            
                const resp = await axios.post(ITEMS_ENDPOINT, {category, brand, name, price, description, itemLength, itemHeight, itemWidth});
                
                if(image !== null && image !== undefined && image !== "") {
                    const formData = new FormData();
                    formData.append('file', image);
                    await axios.post(`${ITEMS_ENDPOINT}/${resp.data.id}/image/upload`, 
                    formData, 
                        {
                            headers: {
                                "Content-Type": "multipart/formdata"
                            }
                        }
                    );
                }
            }
            toast.info(`Artículo ${id ? 'actualizado' : 'registrado'} satisfactoriamente.`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            //await dispatch(getItems());
            history.push('/articulos');
        } catch(error) {
            console.log(error.response);
            setError(error.response.data.message);
        }
    });

    return (
        <>
        {
            fetching
                ?
                <ItemFormSkeleton/>
                :
                <form onSubmit={onSubmit}>
                    <Grid container spacing={2}>
                        {
                            error !== null &&
                            <Grid item xs={12} sm={12}>
                                <Alert severity="error">{error}</Alert>
                            </Grid>
                            
                        }
                        <Grid item xs={6} sm={6}>
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
                                />
                                )}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>           
                            <Controller
                                name="price"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="Precio"
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

                        <Grid item xs={6} sm={6}>           
                            <Controller
                                name="image"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    onChange={handleFileChange}
                                    name="image"
                                    label="Imagen"
                                    type="file"
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                />
                                )}
                            />
                            {
                                (item?.itemImageLink !== null &&  item?.itemImageLink !== undefined)
                                    &&
                                    <a href={`https://funerariadb-images.s3-sa-east-1.amazonaws.com/${item?.name}/${item?.itemImageLink}`}>Imágen de {item.name}</a>

                            }
                        </Grid> 

                        <Grid item xs={6} sm={6}>
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
                                    value={value}
                                    onChange={onChange}
                                />
                                )}
                            />
                        </Grid>

                        <Grid item xs={6} sm={6}>               
                            <Controller
                                control={control}
                                name="brandObject"
                                render={({ field: { onChange, value } }) => (
                                <Autocomplete
                                    onChange={(event, item) => {
                                        onChange(item);
                                    }}
                                    options={brands}
                                    getOptionLabel={(item) => (item.name ? item.name : "")}
                                    isOptionEqualToValue={(option, value) =>
                                    value === undefined || value === "" || option.id === value.id
                                    }
                                    value={value}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Marca"
                                        margin="normal"
                                        variant="outlined"
                                        onChange={onChange}
                                    />
                                    )}
                                />
                                )}
                            />
                        </Grid> 

                        <Grid item xs={6} sm={6}>
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
                                        isOptionEqualToValue={(option, value) =>
                                        value === undefined || value === "" || option.id === value.id
                                        }
                                        value={value}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Categoria"
                                                margin="normal"
                                                variant="outlined"
                                                onChange={onChange}
                                                error={!!error}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </Grid>

                        {
                            watchCategoryObject?.name === "Ataúd"
                                &&
                                <>
                                    <Grid item xs={4} sm={4}>
                                        <Controller
                                            name="itemHeight"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <TextField
                                                label="Alto"
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
                                            rules={{ required: 'La altura del ataud es requerida.' }}
                                        />
                                    </Grid>

                                    <Grid item xs={4} sm={4}>
                                        <Controller
                                            name="itemWidth"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <TextField
                                                label="Ancho"
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
                                            rules={{ required: 'La anchura del ataud es requerida.' }}
                                        />
                                    </Grid>

                                    <Grid item xs={4} sm={4}>
                                        <Controller
                                            name="itemLength"
                                            control={control}
                                            defaultValue=""
                                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <TextField
                                                label="Largo"
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
                                            rules={{ required: 'La longitud del ataud es requerida.' }}
                                        />
                                    </Grid>
                                    
                            </>     
                        }
                        
                        <Box clone mt={2} ml={2}>
                            <Button type="submit"
                                fullWidth
                                size="large"
                                variant="contained"
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
        }         
        </>
    )
}

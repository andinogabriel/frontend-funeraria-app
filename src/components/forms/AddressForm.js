import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CITIES_ENDPOINT, PROVINCES_ENDPOINT } from '../../helpers/endpoints';
import { Button, Dialog, DialogTitle, DialogContent, Grid, DialogActions } from '@mui/material';
import { Edit, AddCircleOutline } from '@mui/icons-material';
import { FormInputText } from '../inputsForms/FormInputText';
import { FormAutoComplete } from '../inputsForms/FormAutoComplete';


const validationSchema = yup.object().shape({
    province: yup.object().required(),
    city: yup.object().required(),
    streetName: yup.string().required(''),
    blockStreet: yup.number().positive('La altura debe ser positiva.').typeError('').required()
});

const inputTextFields = [
    { name: 'streetName', label: 'Calle', type: 'text' },
    { name: 'blockStreet', label: 'Altura', type: 'number' },
    { name: 'apartment', label: 'Departamento', type: 'text' },
    { name: 'flat', label: 'Piso', type: 'text' }
];

const addressDefault = {
    id: null, province: null, city: null, streetName: '', blockStreet: '', flat: '', apartment: ''
};

export const AddressForm = ({ addressList, address, setAddressList, position}) => {

    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [open, setOpen] = useState(false);
 

    const { handleSubmit, control, formState: { isValid }, reset, setValue, watch, getValues } = useForm({defaultValues: addressDefault, resolver: yupResolver(validationSchema)});

    const watchProvince = watch('province');

    useEffect(() => {

        if(address) {
            const { city, streetName, flat, blockStreet, apartment, id } = address;
            if(typeof(id) === 'number') {
                setValue("id", id);
            }
            setValue("province", city?.province);
            setValue("city", city);
            setValue("streetName", streetName);
            setValue("flat", flat);
            setValue("blockStreet", blockStreet);
            setValue("apartment", apartment);
        }

        const fetchData = async () => {
            try {
                if(provinces.length <= 0) {
                    const resp = await axios.get(PROVINCES_ENDPOINT);
                    console.log("LLamado al get provincias!");
                    setProvinces(resp.data); 
                }
                
                if(watchProvince !== null && watchProvince !== undefined) {
                    console.log("LLamado al get ciudades!");
                    const response = await axios.get(`${CITIES_ENDPOINT}?province_id=${watchProvince?.id}`);       
                    setCities(response?.data);
                }
                setFetched(true);
            } catch (error) {
                console.log(error);
                console.log(error?.response?.data?.message);
            }
        };
        fetchData();
        setFetched(true);
    }, [watchProvince, address, setValue, provinces.length]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false); 
        reset();
    };

    const onSubmit = handleSubmit(data => { 
        console.log(data);
        if(position !== null && position >= 0) {
            const clone = [...addressList];
            clone[position] = data;
            setAddressList(clone);
        } else {
            setAddressList(i => [...i, data]);
        }
        handleClose();
    });
    


    return (
        <>
            {
                address 
                    ?
                    <Edit onClick={handleClickOpen} style={{color:"#1662D2", cursor:'pointer'}}/>
                    :
                    <AddCircleOutline onClick={handleClickOpen} fontSize="large" style={{color:"#1662D2", cursor:'pointer'}}/>
            }
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">
                    {
                        position !== null 
                            ?
                            'Actualizar dirección'
                            :
                            'Registrar dirección'
                    }
                </DialogTitle>

                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <FormAutoComplete
                                    name="province"
                                    label="Provincia"
                                    variant="outlined"
                                    options={provinces}
                                    control={control}
                                />
                            </Grid>

                                    
                            <Grid item xs={12} sm={6}>
                                <FormAutoComplete
                                    name="city"
                                    label="Ciudad"
                                    variant="outlined"
                                    options={cities}
                                    control={control}
                                />
                            </Grid>

                            {
                                inputTextFields.map((inputText, i) => (
                                    <Grid item xs={12} sm={6} key={i}>
                                        <FormInputText
                                            name={inputText.name}
                                            label={inputText.label}
                                            type={inputText.type}
                                            variant="outlined"
                                            control={control}
                                        />
                                    </Grid>
                                ))
                            }

                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                        Cancelar
                                    </Button>
                                <Button type="submit" onClick={isValid ? handleClose() : undefined} color="primary">
                                    {
                                        position !== null 
                                            ?
                                            'Actualizar'
                                            :
                                            'Registrar'
                                    }  
                                </Button>
                            </DialogActions>
                        </Grid>  
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

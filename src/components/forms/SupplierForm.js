import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { MOBILE_NUMBERS_ENDPOINT, ADDRESSES_ENDPOINT, SUPPLIERS_ENDPOINT  } from '../../helpers/endpoints';
import { Grid, Alert, TextField, Box, Button } from '@material-ui/core';
import { AddAddressForm } from './AddAddressForm';
import { AddMobileNumbers } from './AddMobileNumbers';
import { getSuppliers } from './../../actions/suppliersAction';


const schema = yup.object().shape({
    name: yup.string().required(''),
    nif: yup.string().required(''),
    email: yup.string().email().required('')
});

export const SupplierForm = ({id, addressList, setAddressList, addressesProvince, mobNumsList, setMobNumsList, error, setError}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    //React Hook form estructura
    const {handleSubmit, setValue, control} = useForm({resolver: yupResolver(schema)});

    const onSubmit = async (data) => { 
        try {
            if(id) {
                if(mobNumsList.length > 0) {
                    
                    mobNumsList.map(async mobNum => {
                        if(mobNum.id !== '') {
                            await axios.put(`${MOBILE_NUMBERS_ENDPOINT}/${mobNum.id}`, mobNum);
                        } else {
                            await axios.post(MOBILE_NUMBERS_ENDPOINT, mobNum);
                        }
                    });
                }
                
                if(addressList?.length > 0) {
                    addressList.map(async address => {
                        if(address.id !== '') {
                            await axios.put(`${ADDRESSES_ENDPOINT}/${address.id}`, address);
                        } else {
                            await axios.post(ADDRESSES_ENDPOINT, address);
                        }   
                    });
                }

                await axios.put(`${SUPPLIERS_ENDPOINT}/${id}`, data);
            
            } else {
                const resp = await axios.post(SUPPLIERS_ENDPOINT, data);

                //Agrego a cada telefono objeto creado el id del proveedor
                mobNumsList.map(async (x)=> (
                    x.supplierNumber = resp.data.id
                ));

                //Agrego a cada direccion creada el id del proveedor
                addressList.map(async (a) => (
                    a.supplierAddress = resp.data.id
                ));
                
                if(mobNumsList.length > 0 && mobNumsList[0].supplierNumber !== null) {
                    mobNumsList.map(async (mobNum) => (
                        await axios.post(MOBILE_NUMBERS_ENDPOINT, mobNum)
                    ));
                }    

                if(addressList.length > 0 && addressList[0].supplierAddress !== null) {
                    addressList.map(async (address) => (
                        await axios.post(ADDRESSES_ENDPOINT, address)
                    ));
                }
            }

            toast.info(`Proveedor ${id ? 'actualizado' : 'registrado'} satisfactoriamente.`, {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            history.push('/proveedores');
            await dispatch(getSuppliers());

        } catch (error) {
            setError(error);
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    {
                        error !== null 
                            &&
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
                            name="nif"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="NIF"
                                variant="outlined"
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
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Email"
                                variant="outlined"
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
                            name="webPage"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Pagina web"
                                variant="outlined"
                                fullWidth
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                type="email"
                            />
                            )}
                        />
                    </Grid>
                </Grid>
                <hr/>
                
                <AddAddressForm
                    addressList={addressList}
                    deleteEndPoint={ADDRESSES_ENDPOINT}
                    setAddressList={setAddressList}
                    initialValue={{id: '', streetName: "", blockStreet: "", apartment: "", flat: "", city: "", province: "", supplierAddress: id}}
                    addressesProvince={addressesProvince}
                />


                <AddMobileNumbers
                    inputList={mobNumsList}
                    deleteEndPoint={MOBILE_NUMBERS_ENDPOINT}
                    setInputList={setMobNumsList}
                    initialValue={{id: '', mobileNumber: "", supplierNumber: id}}
                />

                
                <Box mt={3}>
                    <Button type="submit" fullWidth variant="contained" color="primary">
                        {
                            id ? "Actualizar" : "Registrar"
                        }
                    </Button>             
                </Box>
                
            </form>
        </>
    );
};

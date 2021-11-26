import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { MOBILE_NUMBERS_ENDPOINT, ADDRESSES_ENDPOINT, SUPPLIERS_ENDPOINT  } from '../../helpers/endpoints';
import { Alert, Grid, Box, Button,} from '@mui/material';
import { getSuppliers } from './../../actions/suppliersAction';
import { AddressTable } from '../tables/AddressTable';
import { AddMobileNumbers } from './AddMobileNumbers';
import { SupplierFormSkeleton } from './../skeletons/SupplierFormSkeleton';
import { FormInputText } from '../inputsForms/FormInputText';


const schema = yup.object().shape({
    name: yup.string().required(''),
    nif: yup.string().required(''),
    email: yup.string().email().required('')
});

const inputsForm = [
    {name: 'name', label: 'Nombre', type: 'text', variant: 'outlined'},
    {name: 'nif', label: 'NIF', type: 'text', variant: 'outlined'},
    {name: 'email', label: 'Email', type: 'text', variant: 'outlined'},
    {name: 'webPage', label: 'Página web', type: 'text', variant: 'outlined'}
];


export const SupplierForm = ({supplier, error, setError, fetching}) => {

    const [mobNumsList, setMobNumsList] = useState([{id: '', mobileNumber: "", supplierNumber: supplier?.id}]);
    const [addressList, setAddressList] = useState([{id: '', streetName: "", blockStreet: "", apartment: "", flat: "", city: "", province: "", supplierAddress: supplier?.id}]);
    const [fetched, setFetched] = useState(false);
    

    const dispatch = useDispatch();
    const history = useHistory();

    //React Hook form estructura
    const {handleSubmit, setValue, control} = useForm({resolver: yupResolver(schema)});

   
    
    useEffect(() => {
        if(supplier) {
            const {id, name, nif, email, webPage, addresses, mobileNumbers} = supplier;
            //Con estos setValues seteamos los values de los inputs del formulario, para que aparezcan rellenos con la informacion que nos devolvio el metodo get
            setValue("name", name);  
            setValue("nif", nif); 
            setValue("webPage", webPage); 
            setValue("email", email); 
            addresses?.length > 0 && setAddressList(addresses);
            mobileNumbers?.length > 0 && setMobNumsList(mobileNumbers);

        }
        setFetched(true);
    }, [setValue, supplier]);

    
    const onSubmit = async (data) => { 
        try {
            if(supplier) {
                
                if(mobNumsList.length > 0) {
                    
                    mobNumsList.map(async mobNum => {
                        if(mobNum.id !== '') {
                            await axios.put(`${MOBILE_NUMBERS_ENDPOINT}/${mobNum.id}`, mobNum);
                        } else {
                            await axios.post(MOBILE_NUMBERS_ENDPOINT, mobNum);
                        }
                    });
                }
                
                if(addressList?.length > 0 && addressList[0].city !== "") {
                    addressList.map(async address => {
                        let { apartment, blockStreet, city, flat, streetName, supplierAddress } = address;
                        city = city?.id;
                        if(typeof(address.id) === 'number') {
                            await axios.put(`${ADDRESSES_ENDPOINT}/${address.id}`, { apartment, blockStreet, city, flat, streetName, supplierAddress });
                        } else {
                            supplierAddress = supplier.id;
                            city = city?.id;
                            await axios.post(ADDRESSES_ENDPOINT, { apartment, blockStreet, city, flat, streetName, supplierAddress });
                        }   
                    });
                }

                await axios.put(`${SUPPLIERS_ENDPOINT}/${supplier?.id}`, data);
            
            } else {
                const resp = await axios.post(SUPPLIERS_ENDPOINT, data);

                //Agrego a cada telefono objeto creado el id del proveedor
                mobNumsList.map(x => (
                    x.supplierNumber = resp.data.id
                ));

                //Agrego a cada direccion creada el id del proveedor
                addressList.map(a => (
                    a.supplierAddress = resp.data.id
                ));
                
                if(mobNumsList.length > 0 && mobNumsList[0].mobileNumber !== '') {
                    mobNumsList.map(async (mobNum) => (
                        await axios.post(MOBILE_NUMBERS_ENDPOINT, mobNum)
                    ));
                }    


                /*if(addressList.length > 0 && addressList[0]?.supplierAddress !== null) {
                    addressList.map(address => {
                        mutate(address);
                    });
                }*/
            }

            toast.info(`Proveedor ${supplier ? 'actualizado' : 'registrado'} satisfactoriamente.`, {
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
            setError(error?.response?.data?.message);
            console.log(error?.response?.data?.message);
        }
    };


    return (
        <>
            {
                fetching && !fetched
                ?
                    <SupplierFormSkeleton/>
                :
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

                            {
                                inputsForm.map(({name, label, type, variant}, i) => (
                                    <Grid item xs={6} sm={6} key={i}>
                                        <FormInputText
                                            name={name}
                                            label={label}
                                            type={type}
                                            variant={variant}
                                            control={control}
                                        />
                                    </Grid>
                                ))
                            }
                        
                        </Grid>

                        <hr/>
                        <AddMobileNumbers
                            inputList={mobNumsList}
                            setInputList={setMobNumsList}
                            initialValue={{id: '', mobileNumber: "", supplierNumber: supplier?.id}}
                        />
                        <hr/>

                        <Box mt={3}>
                            <Button type="submit" fullWidth variant="contained" color="primary">
                                {
                                    supplier ? "Actualizar" : "Registrar"
                                }
                            </Button>             
                        </Box>
                    </form>
                    <hr/>
                    <AddressTable
                        supplier={supplier}
                        addressList={addressList}
                        setAddressList={setAddressList}
                    />
                </>
            }
        </>
    );
};

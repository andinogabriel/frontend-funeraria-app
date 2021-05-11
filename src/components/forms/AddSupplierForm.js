import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { Alert, Grid, TextField, Button, makeStyles, Card, CardContent, Paper, Box } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import { getSuppliers } from './../../actions/suppliersAction';
import { AddMobileNumbers } from './AddMobileNumbers';
import { AddAddressForm } from './AddAddressForm';
import { SUPPLIERS_ENDPOINT, MOBILE_NUMBERS_ENDPOINT, ADDRESSES_ENDPOINT } from '../../helpers/endpoints';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});


//Validaciones de los campos del formulario
const schema = yup.object().shape({
    name: yup.string().required(''),
    nif: yup.string().required(''),
    email: yup.string().email().required('')
});

export const AddSupplierForm = () => {

    const classes = useStyles();

    const {id} = useParams();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [mobNumsList, setMobNumsList] = useState([{id: '', mobileNumber: "", supplierNumber: id}]);
    const [addressList, setaddressList] = useState([{id: '', streetName: "", blockStreet: "", apartment: "", flat: "", city: "", province: "", supplierAddress: id}]);
    const [addressesProvince, setAddressesProvince] = useState([]);
    const history = useHistory();

    //React Hook form estructura
    const {handleSubmit, setValue, control} = useForm({resolver: yupResolver(schema)});

    useEffect(() => {
        //Si existe un id en el parametro de la url entonces realizamos el fetch
        if(id) {
            const fetchData = async () => {
                try {
                    const resp = await axios.get(`${SUPPLIERS_ENDPOINT}/${id}`);
                    if(resp.data !== null) {
                        const {name, nif, email, webPage, mobileNumbers, addresses} = resp.data;
                        //Con estos setValues seteamos los values de los inputs del formulario, para que aparezcan rellenos con la informacion que nos devolvio el metodo get
                        setValue("name", name);  
                        setValue("nif", nif); 
                        setValue("webPage", webPage); 
                        setValue("email", email); 
                        
                        mobileNumbers?.forEach((m,i) => {
                            i !== 0
                                ?
                                setMobNumsList(i => [...i, {id: m.id, mobileNumber: m.mobileNumber, supplierNumber: id}])
                                :
                                setMobNumsList([{id: m.id, mobileNumber: m.mobileNumber, supplierNumber: id}]);
                        });
                        
                        
                        addresses?.forEach((a, i) => {
                            setAddressesProvince(i => [...i, a.city.province.id]);
                            i !== 0
                                ?
                                setaddressList(i => [...i, {id: a.id, streetName: a.streetName, blockStreet: a.blockStreet, apartment: a.apartment, flat: a.flat, city: a.city.id, province: a.city.province.id, supplierAddress: id}])
                                :
                                setaddressList([{id: a.id, streetName: a.streetName, blockStreet: a.blockStreet, apartment: a.apartment, flat: a.flat, city: a.city.id, province: a.city.province.id, supplierAddress: id}])
                        });
                     
                    }
                } catch (error) {
                    setError(error);
                    console.log(error);
                }
            }
            fetchData();
        }
    }, [id, setValue]);
    
    
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
        <Box mt={5}>
            <Paper elevation={7}>
                <Card className={classes.root} variant="outlined" >
                    <CardContent>
                        {
                            id 
                                ? (<h2>Actualizar proveedor</h2>) 
                                : (<h2>Registrar proveedor</h2>)
                        }
                    
                    <hr/>
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
                            deleteEndPoint={'http://localhost:8081/api/v1/addresses'}
                            setAddressList={setaddressList}
                            initialValue={{id: '', streetName: "", blockStreet: "", apartment: "", flat: "", city: "", province: "", supplierAddress: id}}
                            addressesProvince={addressesProvince}
                        />
        

                        <AddMobileNumbers
                            inputList={mobNumsList}
                            deleteEndPoint={'http://localhost:8081/api/v1/mobileNumbers'}
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
                    </CardContent> 
                    <Button size="sm" variant="contained" component={NavLink} to={'/proveedores'}>
                        <ListIcon/> Volver a proveedores
                    </Button>
                </Card>
            </Paper>
        </Box>

    );
};

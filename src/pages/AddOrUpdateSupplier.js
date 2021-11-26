import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import {  Button, Card, CardContent, Paper, Box } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { SUPPLIERS_ENDPOINT } from './../helpers/endpoints';
import { SupplierForm } from './../components/forms/SupplierForm';

export const AddOrUpdateSupplier = () => {

    const { id } = useParams();
    const [error, setError] = useState(null);
    const [supplier, setSupplier] = useState(null);
    const [fetching, setFetching] = useState(true);
    

    useEffect(() => {
        //Si existe un id en el parametro de la url entonces realizamos el fetch
        if(id) {
            const fetchData = async () => {
                try {
                    const resp = await axios.get(`${SUPPLIERS_ENDPOINT}/${id}`);
                    
                    setSupplier(resp.data);
                    const {name, nif, email, webPage, mobileNumbers, addresses} = resp.data;
                    //Con estos setValues seteamos los values de los inputs del formulario, para que aparezcan rellenos con la informacion que nos devolvio el metodo get
                    //setValue("name", name);  
                    //setValue("nif", nif); 
                    //setValue("webPage", webPage); 
                    //setValue("email", email); 
                   
                    //mobileNumbers?.lenght > 0 && setMobNumsList([mobileNumbers]);
                    //addresses?.lenght > 0 && setAddressList(addresses);
                    
                    /*
                    mobileNumbers?.forEach((m,i) => {
                        i !== 0
                            ?
                            setMobNumsList(i => [...i, {id: m.id, mobileNumber: m.mobileNumber, supplierNumber: id}])
                            :
                            setMobNumsList([{id: m.id, mobileNumber: m.mobileNumber, supplierNumber: id}]);
                    });
                                            
                    addresses?.forEach((a, i) => {
                        i !== 0
                            ?
                            setAddressList(i => [...i, {id: a.id, streetName: a.streetName, blockStreet: a.blockStreet, apartment: a.apartment, flat: a.flat, city: a.city, province: a.city?.province, supplierAddress: id}])
                            :
                            setAddressList([{id: a.id, streetName: a.streetName, blockStreet: a.blockStreet, apartment: a.apartment, flat: a.flat, city: a.city, province: a.city?.province, supplierAddress: id}])
                    });*/
                     
                    setFetching(false);
                } catch (error) {
                    setError(error?.response?.data?.message);
                    console.log(error?.response?.data?.message);
                }
            }
            fetchData();
        } else {
            setFetching(false);
        }
    }, [id]);
    
    console.log(fetching);
    return (
        <Box mt={5}>
            <Paper elevation={7}>
                <Card className="card-root" variant="outlined" >
                    <CardContent>
                        {
                            id 
                                ? (<h2>Actualizar proveedor</h2>) 
                                : (<h2>Registrar proveedor</h2>)
                        }
                        <hr/>
                   
                        <SupplierForm
                            supplier={supplier}
                            error={error}
                            setError={setError}
                            fetching={fetching}
                        />

                    </CardContent> 
                    <Button size="sm" variant="contained" component={NavLink} to={'/proveedores'}>
                        <ListIcon/> Volver a proveedores
                    </Button>
                </Card>
            </Paper>
        </Box>

    );
};

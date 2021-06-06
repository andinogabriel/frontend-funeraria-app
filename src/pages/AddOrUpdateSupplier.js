import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {  Button, Card, CardContent, Paper, Box } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import { SUPPLIERS_ENDPOINT } from './../helpers/endpoints';
import { SupplierForm } from './../components/forms/SupplierForm';

export const AddOrUpdateSupplier = () => {

    const {id} = useParams();
    const [error, setError] = useState(null);
    const [mobNumsList, setMobNumsList] = useState([{id: '', mobileNumber: "", supplierNumber: id}]);
    const [addressList, setAddressList] = useState([{id: '', streetName: "", blockStreet: "", apartment: "", flat: "", city: "", province: "", supplierAddress: id}]);
    const [addressesProvince, setAddressesProvince] = useState([]);
    const { setValue} = useForm();


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
                                setAddressList(i => [...i, {id: a.id, streetName: a.streetName, blockStreet: a.blockStreet, apartment: a.apartment, flat: a.flat, city: a.city.id, province: a.city.province.id, supplierAddress: id}])
                                :
                                setAddressList([{id: a.id, streetName: a.streetName, blockStreet: a.blockStreet, apartment: a.apartment, flat: a.flat, city: a.city.id, province: a.city.province.id, supplierAddress: id}])
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
                            id={id}
                            addressList={addressList}
                            setAddressList={setAddressList}
                            addressesProvince={addressesProvince}
                            mobNumsList={mobNumsList}
                            setMobNumsList={setMobNumsList}
                            error={error}
                            setError={setError}
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

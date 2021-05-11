import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CITIES_ENDPOINT, PROVINCES_ENDPOINT } from '../../helpers/endpoints';
import { InputLabel, Select, Grid, TextField, Box } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export const AddAddressForm = React.memo(({addressList, deleteEndPoint, setAddressList, initialValue, addressesProvince}) => {

    const [provinces, setProvinces] = useState([]);
    const [province, setProvince] = useState(null);
    const [cities, setCities] = useState([]);
    const [fetched, setFetched] = useState(false);
    

    useEffect(() => {
        addressesProvince.length > 0 &&
            addressesProvince.forEach(async (p) => {
                const response = await axios.get(`${CITIES_ENDPOINT}?province_id=${p}`);       
                setCities(i => [...i, response.data]);
            });
    }, [addressesProvince]);

    useEffect(() => {
        const fetchData = async () => {
            if(provinces.length <= 0) {
                const resp = await axios.get(PROVINCES_ENDPOINT);
                console.log("LLamado al get provincias!");
                setProvinces(resp.data); 
            }
            
            if(province !== null) {
                console.log("LLamado al get ciudades!");
                const response = await axios.get(`${CITIES_ENDPOINT}?province_id=${province}`);       
                setCities(i => [...i, response.data]);
                
            }

            setFetched(true);
        };
        fetchData();
    }, [provinces.length, province]);

  
    const handleInputChange = (e, index) => {
        e.preventDefault();
        const { name, value } = e.target;
        if(name === 'province') {
            setProvince(value);
        }
        const list = [...addressList];
        list[index][name] = value;
        setAddressList(list);
    };

    const handleAddClick = (e) => {
        e.preventDefault();
        setProvince(null);
        setAddressList([...addressList, initialValue]); //aca va el objeto inicializador
    };

    const handleRemoveInput = async (e, index) => {
        e.preventDefault();
        setCities((prev) => prev.filter((item) => item !== prev[index]));
        setAddressList((prev) => prev.filter((item) => item !== prev[index]));
        const addressId = addressList[index].id;
        if(addressId !== '') {
            try {
                await axios.delete(`${deleteEndPoint}/${addressId}`);
            } catch (error) {
                console.log(error);
            }
        }
    };
    
    
    return (
        <>
        {   fetched &&
            addressList?.map((item, i) => (
                <React.Fragment key={i}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6}>
                            <InputLabel  htmlFor="outlined-province-native-simple">Provincia</InputLabel>
                            <Select
                                native
                                fullWidth
                                name="province"
                                label="Provincia"
                                value={item?.province}
                                onChange={(e) => handleInputChange(e, i)}
                                inputProps={{
                                    name: 'province',
                                    id: 'outlined-province-native-simple',
                                }}
                            >  
                                <option>Provincia</option>
                            {
                                
                                fetched &&
                                provinces.map((province, i) => (
                                    <option key={i}  value={province.id}>{province.name}</option> 
                                ))
                            }       
                            </Select>
                        </Grid>

                        <Grid item xs={6} sm={6}>
                            <InputLabel  htmlFor="outlined-city-native-simple">Ciudad</InputLabel>
                            <Select
                                native
                                fullWidth
                                label="Ciudad"
                                name="city"
                                value={item?.city}
                                onChange={(e) => handleInputChange(e, i)}
                                inputProps={{
                                    name: 'city',
                                    id: 'outlined-city-native-simple',
                                }}
                            >
                                {
                                    fetched &&
                                    cities[i]?.map((city, i) => (
                                        <option key={i}  value={city.id}>{city.name}</option>     
                                    ))
                                }
                            </Select>
                        </Grid>

                        <Grid item xs={6} sm={4}>
                            <TextField
                                fullWidth
                                label="Calle"
                                variant="outlined"
                                name="streetName"
                                value={item.streetName}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </Grid>

                        <Grid item xs={6} sm={2}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Altura"
                                variant="outlined"
                                name="blockStreet"
                                value={item.blockStreet}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </Grid>

                        <Grid item xs={6} sm={3}>
                            <TextField
                                fullWidth
                                label="Departamento"
                                variant="outlined"
                                name="apartment"
                                value={item.apartment}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </Grid>

                        <Grid item xs={3} sm={2}>
                            <TextField
                                fullWidth
                                label="Piso"
                                variant="outlined"
                                name="flat"
                                value={item.flat}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </Grid>
                        {
                            (addressList.length - 1 === i) 
                                &&
                                <Box color="primary" mt={3} ml={0.5}>
                                    <AddCircleOutlineIcon fontSize="large" onClick={handleAddClick} style={{color:"#1662D2"}}/>
                                </Box>
                                

                        }
                        {
                            (addressList.length !== 1) 
                                &&
                                <Box color="primary" mt={3} ml={0.5}>
                                    <HighlightOffIcon fontSize="large" onClick={(e) => handleRemoveInput(e, i)} style={{color:"#ff3333"}}/>
                                </Box>
                        }
  
                    </Grid>         
                    <hr/>
                </React.Fragment>
            ))
        }
        </>
    );
});

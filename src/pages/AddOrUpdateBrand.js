import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { Box, Card, CardContent, Paper, Button } from '@mui/material';
import { BrandForm } from '../components/forms/BrandForm';
import { BRANDS_ENDPOINT } from '../helpers/endpoints';
import ListIcon from '@mui/icons-material/List';


export const AddOrUpdateBrand = () => {

    const {id} = useParams();
    const [brandToUpdate, setBrandToUpdate] = useState(null);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if(id) {
            const fetchData = async() => {
              try {
                const resp = await axios.get(`${BRANDS_ENDPOINT}/${id}`);
                if(resp.data !== null) {
                    setBrandToUpdate(resp.data);
                    setFetching(false);
                }
              } catch (error) {
                console.log(error);
              }
            };
            fetchData();
        } else {
            setFetching(false);
        }

    }, [id]);

    return (
        <Box mt={5}>
            <Paper elevation={7}>
                <Card className="card-root" variant="outlined">
                    <CardContent>
                        <h2>
                          {
                            id !== undefined 
                              ?
                              'Actualizar marca'
                              :
                              'Agregar marca'
                          }
                        </h2>
                        <hr/>
                        <BrandForm
                            brand={brandToUpdate}
                            fetching={fetching}
                        />
                    </CardContent>
                    <Button size="small" variant="contained" component={NavLink} to={'/marcas'}>
                        <ListIcon/> Volver a marcas
                    </Button>
                </Card>
            </Paper>
        </Box>
    );
};

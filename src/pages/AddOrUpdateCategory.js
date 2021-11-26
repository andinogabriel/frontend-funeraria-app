import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { Alert, Box, Card, CardContent, Paper, Button, Grid } from '@mui/material';
import { List } from '@mui/icons-material';
import { CATEGORIES_ENDPOINT } from '../helpers/endpoints';
import { CategoryForm } from './../components/forms/CategoryForm';


export const AddOrUpdateCategory = () => {

    const {id} = useParams();
    const [categoryToUpdate, setCategoryToUpdate] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(id) {
            const fetchData = async() => {
              try {
                const resp = await axios.get(`${CATEGORIES_ENDPOINT}/${id}`);
                if(resp.data !== null) {
                    setCategoryToUpdate(resp.data);
                    setFetching(false);
                }
              } catch (error) {
                console.log(error);
                setError(error.response.data.message);
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
                                'Actualizar categoría'
                                :
                                'Agregar categoría'
                        }
                        </h2>
                        {
                            error !== null 
                                &&
                                <Grid item xs={12} sm={12}>
                                    <Alert severity="error">{error}</Alert>
                                </Grid>   
                        }   
                        <hr/>
                        <CategoryForm
                            category={categoryToUpdate}
                            fetching={fetching}

                        />
                    </CardContent>
                    <Button size="small" variant="contained" component={NavLink} to={'/categorias'}>
                        <List/> Volver a categorías
                    </Button>
                </Card>
            </Paper>
        </Box>
    )
}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { Alert, Box, Paper, Card, CardContent, Grid, Button } from '@mui/material';
import { EntryForm } from '../components/forms/EntryForm';
import { ENTRIES_ENDPOINT } from '../helpers/endpoints';
import { List } from '@mui/icons-material';
import { getSuppliers } from './../actions/suppliersAction';
import { getReceiptTypes } from './../actions/receiptTypeActions';
import { getCategories } from './../actions/categoriesAction';


export const AddOrUpdateEntry = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const [entryToUpdate, setEntryToUpdate] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);
    const { suppliers } = useSelector(state => state.suppliers);
    const { categories } = useSelector(state => state.categories);
    const { receiptTypes } = useSelector(state => state.receiptTypes);

    useEffect(() => {
        dispatch(getSuppliers());
        dispatch(getReceiptTypes());
        dispatch(getCategories());
        if(id) {
            const fetchData = async() => {
                try {
                    const resp = await axios.get(`${ENTRIES_ENDPOINT}/${id}`);
                    console.log(resp);
                    setEntryToUpdate(resp?.data);
                    setFetching(false);
                } catch (error) {
                    setFetching(true);
                    console.log(error);
                    setError(error?.response?.data?.message);
                }
            };
            fetchData();
        } else {
            setFetching(false);
        }
    }, [id, dispatch]);

    return (
        <Box mt={5}>
            <Paper elevation={7}>
                <Card className="card-root" variant="outlined">
                    <CardContent>
                        <h2>
                            {
                                id !== undefined 
                                    ?
                                    'Actualizar ingreso'
                                    :
                                    'Agregar ingreso'
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
                        <EntryForm
                            fetching={fetching}
                            entryToUpdate={entryToUpdate}
                            suppliers={suppliers}
                            receiptTypes={receiptTypes}
                            categories={categories}
                        />
                    </CardContent>
                    <Button size="small" variant="contained" component={NavLink} to={'/ingresos'}>
                        <List/> Volver a ingresos
                    </Button>
                </Card>
            </Paper>
        </Box>
    );
};

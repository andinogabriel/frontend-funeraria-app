import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ItemsTable } from '../components/tables/ItemsTable';
import { getItems } from './../actions/itemsAction';
import { Box, Paper, Toolbar, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { getCategories } from './../actions/categoriesAction';
import { getBrands } from './../actions/brandsAction';


export const Items = () => {

    const dispatch = useDispatch();
    const {fetched, items} = useSelector(state => state.items);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getBrands());
        dispatch(getItems());
    }, [dispatch]);

    
    return (
        <Box m={2} pt={5} >
            <Paper>
                <Toolbar className="table-root">
                    <Typography className="table-title" variant="h6" id="tableTitle" component="div">
                        Artículos
                    </Typography>  
                    <div style={{"float":"right"}}>
                        <NavLink to="/articulo-formulario">
                            <AddCircle style={{color:"#1662D2"}} fontSize="large"/>
                        </NavLink>
                    </div>   
                </Toolbar>
                <ItemsTable
                    items={items}
                    fetched={fetched}
                />  
            </Paper>
        </Box>
    );
};

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Box, Paper, Toolbar, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { getCategories } from './../actions/categoriesAction';
import { CategoriesTable } from './../components/tables/CategoriesTable';


export const Categories = () => {

    const dispatch = useDispatch();
    const {fetched, categories} = useSelector(state => state.categories);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        dispatch(getCategories(setError));
    }, [dispatch]);

    return (
        <Box m={2} pt={5}>
            <Paper>
            <Toolbar className="table-root">
                    <Typography className="table-title" variant="h6" id="tableTitle" component="div">
                        Categorías
                    </Typography>  
                    <div style={{"float":"right"}}>
                        <NavLink to="/agregar-categoria">
                            <AddCircle style={{color:"#1662D2"}} fontSize="large"/>
                        </NavLink>
                    </div>   
                </Toolbar>
                <CategoriesTable
                    categories={categories}
                    fetched={fetched}
                />
            </Paper>
        </Box>
    );
};

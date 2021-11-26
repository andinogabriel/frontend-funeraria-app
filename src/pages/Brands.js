import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Box, Paper, Toolbar, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { getBrands } from './../actions/brandsAction';
import { BrandsTable } from './../components/tables/BrandsTable';


export const Brands = () => {

    const dispatch = useDispatch();
    const {fetched, brands} = useSelector(state => state.brands);

    useEffect(() => {
        const fetchData = async() => {
            try {
                dispatch(getBrands());
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [dispatch]);



    return (
        <Box m={2} pt={5}>
            <Paper>
            <Toolbar className="table-root">
                    <Typography className="table-title" variant="h6" id="tableTitle" component="div">
                        Marcas
                    </Typography>  
                    <div style={{"float":"right"}}>
                        <NavLink to="/agregar-marca">
                            <AddCircle style={{color:"#1662D2"}} fontSize="large"/>
                        </NavLink>
                    </div>   
                </Toolbar>
                <BrandsTable
                    brands={brands}
                    fetched={fetched}
                />
            </Paper>
        </Box>
    );
};

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Typography, Toolbar } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { SupplierTable } from './../components/tables/SupplierTable';
import { getSuppliers } from './../actions/suppliersAction';


export const Suppliers = () => {
    
    const {fetched, suppliers} = useSelector(state => state.suppliers);
    const dispatch = useDispatch();

    /*
    const {data: suppliers, isLoading} = useQuery(SUPPLIERS_QUERY_KEY, getAllSuppliers, {
        retry: false
    });
    console.log(suppliers);*/

   
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(getSuppliers());
            } catch (error) {
                console.log(error);
                //setErrores(error);
            }
        }
        fetchData();
    }, [dispatch]); 

    
    return (
        
        <Box m={2} pt={5} >
            <Paper>
                <Toolbar className="table-root">
                    <Typography className="table-title" variant="h6" id="tableTitle" component="div">
                            Proveedores
                    </Typography>    
                    <div style={{"float":"right"}}>
                        <NavLink to="/proveedor-formulario">
                            <AddCircle style={{color:"#1662D2"}} fontSize="large"/>
                        </NavLink>
                    </div>    
                </Toolbar>
                <SupplierTable
                    suppliers={suppliers}
                    fetched={fetched}
                />
            </Paper>
        </Box> 
       
    );  
};

import React from 'react';
import { Box, Paper, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { AddCircle } from '@mui/icons-material';
import { EntriesTable } from './../components/tables/EntriesTable';



export const Entries = () => {

    return (
        <div>
            <Box m={2} pt={5}>
                <Paper>
                    <Toolbar className="table-root">
                        <Typography className="table-title" variant="h6" id="tableTitle" component="div">
                            Ingresos
                        </Typography>  
                        <div style={{"float":"right"}}>
                            <NavLink to="/agregar-ingreso">
                                <AddCircle style={{color:"#1662D2"}} fontSize="large"/>
                            </NavLink>
                        </div>   
                    </Toolbar>
                    <EntriesTable/>
                </Paper>

            </Box>
        </div>
    );
};

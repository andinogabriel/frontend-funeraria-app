import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Toolbar, Fab } from '@material-ui/core';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import AddIcon from '@material-ui/icons/Add';
import { Searcher } from './../Searcher';
import { Paginator } from '../Paginator';
import { QuantityDropdown } from '../QuantityDropdown';
import { SupplierInfo } from './../../pages/SupplierInfo';
import { DeleteButton } from '../buttons/DeleteButton';
import { types } from './../../types/types';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    container: {
      maxHeight: 450,
    },
    title: {
        flex: '1 1 100%',
    },
}));

const columns = [
    { id: 'nif', label: 'NIF', minWidth: 100},
    { id: 'email', label: 'Email', minWidth: 170},
    { id: 'webPage', label: 'Página web', minWidth: 170 },
    { id: 'actions', label: 'Acciones', minWidth: 100}
];

export const SuppliersTable = ({suppliers, currentPage, totalPages, setCurrentPage, suppliersPerPage, setSuppliersPerPage, searchName, setSearchName,  sortSuppliers, sortToggle}) => {

    const classes = useStyles();

    return (
        
        <Box m={2} pt={3}>
            <Paper className={classes.root}>
                <Toolbar className={classes.root}>
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            Proveedores
                    </Typography>
                    <div style={{"float":"right"}}>
                        <Searcher
                            searchThing={searchName}
                            setSearchName={setSearchName}
                            thingToSearch="nombre"
                        />
                    </div>
                </Toolbar>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Nombre 
                                {
                                    !sortToggle ?
                                    <ArrowDropDownIcon onClick={sortSuppliers}/>
                                    :
                                    <ArrowDropUpIcon onClick={sortSuppliers}/>
                                }
                            </TableCell>
                            {
                                columns.map((c, i) => (
                                    <TableCell
                                        key={c.id}
                                        style={{ minWidth: c.minWidth }}
                                        >
                                            {c.label}
                                        </TableCell>
                                ))
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            suppliers.map(supplier => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={supplier.id}>
                                    <TableCell>{supplier.name}</TableCell>
                                    <TableCell>{supplier.nif}</TableCell>
                                    <TableCell>{supplier.email}</TableCell>
                                    <TableCell>{supplier.webPage}</TableCell>
                                    <TableCell>
                                        <div className="d-flex justify-content-around">
                                            <SupplierInfo
                                                supplier={supplier}
                                            />
                                            <Link to={`/editar-proveedor/${supplier.id}`} style={{ textDecoration: 'none' }}>
                                                <SystemUpdateAltIcon color="primary"/>
                                            </Link>
                                            
                                            <DeleteButton
                                                id={supplier.id}
                                                name={supplier.name}
                                                currentPage={currentPage}
                                                thingToDelete={'proveedor'}
                                                deleteEndPoint="http://localhost:8081/api/v1/suppliers"
                                                getEndPoint="http://localhost:8081/api/v1/suppliers/paginated"
                                                thingsPerPage={suppliersPerPage}
                                                deleteType={types.suppliersDeleted}
                                                setCurrentPage={setCurrentPage}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    </Table>
                </TableContainer>
                <Paginator
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    
                />
                <QuantityDropdown
                    setThingsPerPage={setSuppliersPerPage}
                    things="proveedores"
                    thingsPerPage={suppliersPerPage}
                    quantityArray={[5, 10, 15]}
                />
            </Paper>
            <Fab color="primary" aria-label="add" component={Link} to="proveedor-formulario" style={{ textDecoration: 'none'}}>
                <AddIcon />
            </Fab>
            
        </Box>       
    );
}

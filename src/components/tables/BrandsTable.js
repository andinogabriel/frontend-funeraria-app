import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Toolbar, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Fab, makeStyles } from '@material-ui/core';
import AddIcon  from '@material-ui/icons/Add';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import { Searcher } from '../Searcher';
import { Paginator } from '../Paginator';
import { QuantityDropdown } from '../QuantityDropdown';
import { DeleteButton } from './../buttons/DeleteButton';
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


export const BrandsTable = ({brands, totalPages, setCurrentPage, currentPage, brandsPerPage, setBrandsPerPage, sortToggle, sortBrands, setSearchName, searchName}) => {

    const classes = useStyles();

    return (
        <Box m={2} pt={3}>
            <Paper className={classes.root}>
                <Toolbar className={classes.root}>
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Marcas
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
                                    !sortToggle 
                                        ?
                                            <ArrowDropDownIcon onClick={() => sortBrands()}/>
                                        :
                                            <ArrowDropUpIcon onClick={() => sortBrands()}/>
                                }
                                </TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                brands.map(brand => (
                                    <TableRow key={brand.id} role="checkbox" tabIndex={-1}>
                                        <TableCell>{brand.name}</TableCell>
                                        <TableCell>
                                            <Box 
                                                display="flex"         justifyContent="space-around"
                                            >
                                                <Link to={`/editar-marca/${brand.id}`} style={{ textDecoration: 'none' }}>
                                                    <SystemUpdateAltIcon color="primary"/>
                                                </Link>
                                                <DeleteButton
                                                    id={brand.id}
                                                    name={brand.name}
                                                    currentPage={currentPage}
                                                    thingToDelete={'marca'}
                                                    deleteEndPoint="http://localhost:8081/api/v1/brands"
                                                    getEndPoint="http://localhost:8081/api/v1/brands"
                                                    thingsPerPage={brandsPerPage}
                                                    deleteType={types.brandsDeleted}
                                                    setCurrentPage={setCurrentPage}
                                                />
                                            </Box>
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
                    setThingsPerPage={setBrandsPerPage}
                    things="marcas"
                    thingsPerPage={brandsPerPage}
                    quantityArray={[5, 10, 15]}
                />
            </Paper>
            <Fab color="primary" aria-label="add" component={Link} to="agregar-marca" style={{ textDecoration: 'none'}}>
                <AddIcon />
            </Fab>
        </Box>
    );
};

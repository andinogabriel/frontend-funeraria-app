import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Toolbar, Typography, makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Fab, Autocomplete, TextField } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import AddIcon from '@material-ui/icons/Add';
import SystemUpdateAltIcon  from '@material-ui/icons/SystemUpdateAlt';
import { Searcher } from '../Searcher';
import { Paginator } from '../Paginator';
import { QuantityDropdown } from './../QuantityDropdown';
import { DeleteButton } from '../buttons/DeleteButton';
import { ItemInfo } from '../../pages/ItemInfo';
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


export const ItemsTable = ({items, searchName, setSearchName, sortToggle, sortItems, totalPages, currentPage, setCurrentPage, setItemsPerPage, itemsPerPage, sortBy, categories, setCategoryId}) => {

    const classes = useStyles();
    
    return (
        
        <Box m={2} pt={3}>
            <Paper className={classes.root}>
                <Toolbar className={classes.root}>
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                                Articulos
                    </Typography>
                    <Autocomplete
                        id="combo-box-demo"
                        options={categories}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, option) => setCategoryId(option?.id)}
                        getOptionSelected={(option, value) =>
                            value === undefined || value === "" || option.id === value.id
                        }
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Categorías" variant="outlined" />}
                    />
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
                                    !sortToggle && sortBy === 'name'
                                        ?
                                            <ArrowDropDownIcon onClick={() => sortItems('name')}/>
                                        :
                                            <ArrowDropUpIcon onClick={() => sortItems('name')}/>
                                }
                                </TableCell>
                                <TableCell>
                                    Precio
                                    {
                                        !sortToggle && sortBy === 'price'
                                            ?
                                                <ArrowDropDownIcon onClick={() => sortItems('price')}/>
                                            :
                                                <ArrowDropUpIcon onClick={() => sortItems('price')}/>
                                    }
                                </TableCell>
                                <TableCell>Categoría</TableCell>
                                <TableCell >Stock</TableCell>
                                <TableCell style={{width: 100}}>Acciones</TableCell>    
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                items?.map((item) => (
                                    <TableRow role="checkbox" tabIndex={-1} key={item.id}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>${item.price}</TableCell>
                                        <TableCell>{item?.category?.name}</TableCell>
                                        <TableCell>{item?.stock !== null ? item.stock : ' - '}</TableCell>
                                        <TableCell>
                                            <Box display="flex" justifyContent="space-around"
                                            >
                                                <ItemInfo
                                                    item={item}
                                                />
                                                <Link to={`/editar-articulo/${item.id}`} style={{ textDecoration: 'none' }}>
                                                    <SystemUpdateAltIcon color="primary"/>
                                                </Link>
                                               
                                                <DeleteButton
                                                    id={item.id}
                                                    name={item.name}
                                                    currentPage={currentPage}
                                                    thingToDelete='articulo'
                                                    deleteEndPoint="http://localhost:8081/api/v1/items"
                                                    getEndPoint="http://localhost:8081/api/v1/items/paginated"
                                                    thingsPerPage={itemsPerPage}
                                                    deleteType={types.itemsDeleted}
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
                    setThingsPerPage={setItemsPerPage}
                    things="articulos"
                    thingsPerPage={itemsPerPage}
                    quantityArray={[5, 10, 15]}
                />
            </Paper>
            <Fab color="primary" aria-label="add" component={Link} to="articulo-formulario" style={{ textDecoration: 'none'}}>
                <AddIcon />
            </Fab>
        </Box>      
    );
};

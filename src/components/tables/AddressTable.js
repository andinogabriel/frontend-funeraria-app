import React from 'react';
import { Grid, Card, CardContent, Table, TableHead, TableRow, TableBody, TableCell, TableContainer, Paper, Toolbar, Typography } from '@mui/material';
import { AddressForm } from '../forms/AddressForm';
import { DeleteButton } from '../buttons/DeleteButton';
import { ADDRESSES_ENDPOINT } from './../../helpers/endpoints';


const columns = ['Provincia', 'Ciudad', 'Calle', 'Altura', 'Departamento', 'Piso', 'Acciones'];


export const AddressTable = ({supplier, addressList, setAddressList}) => {


    return (
        <Paper>
            <Toolbar className="table-root">
                <Typography className="table-title" variant="h6" id="tableTitle" component="div">
                    Direcciones
                </Typography>    
                <div style={{"float":"right"}}>
                    <AddressForm
                        addressList={addressList}
                        address={null}
                        position={null}
                        setAddressList={setAddressList}
                        supplier={supplier}
                    />
                </div>    
            </Toolbar>
            <Grid item>
                <Card className="card-root" variant="outlined" >
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table aria-label="spanning table">
                                <TableHead>
                                    <TableRow>
                                        {
                                            columns.map((c, i) => (
                                                <TableCell key={i}>
                                                    {c}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                    
                                </TableHead>
                                <TableBody>
                                    {
                                        addressList?.map((a, i) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                                <TableCell>{a?.city?.province?.name}</TableCell>
                                                <TableCell>{a?.city?.name}</TableCell>
                                                <TableCell>{a.streetName}</TableCell>
                                                <TableCell>{a?.blockStreet}</TableCell>
                                                <TableCell>{a?.apartment}</TableCell>
                                                <TableCell>{a?.flat}</TableCell>
                                                <TableCell>
                                                    <AddressForm
                                                        addressList={addressList}
                                                        address={a}
                                                        position={i}
                                                        setAddressList={setAddressList}
                                                    />
                                                    <DeleteButton
                                                        index={i}
                                                        id={a.id}
                                                        name={`la direccion ${a?.streetName} ${a?.city?.name}`}
                                                        thingToDelete="Dirección"
                                                        endpoint={ADDRESSES_ENDPOINT}
                                                        deleteType={null}
                                                        setList={setAddressList}
                                                        iconType={true}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid> 
        </Paper>
    );
};

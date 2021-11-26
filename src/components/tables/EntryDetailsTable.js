import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Table, Paper, TableContainer, TableHead, TableRow, TableCell, TableBody, Box, Toolbar, Typography } from '@mui/material';
import { AddEntryDetail } from './../AddEntryDetail';
import { DeleteButton } from './../buttons/DeleteButton';
import { ENTRY_DETAILS_ENDPOINT } from '../../helpers/endpoints';



const tableHeaders = [
    {label: 'Articulo'},
    {label: 'Cantidad'},
    {label: 'Precio venta'},
    {label: 'Precio compra'},
    {label: 'Acciones'},
];


export const EntryDetailsTable = ({entryDetails, setEntryDetails, watchTax}) => {

    const { categories } = useSelector(state => state.categories);
    const [open, setOpen] = useState(false);
    
   
    const ccyFormat = (num) => {
        return `${num.toFixed(2)}`;
    }

    const subtotal = () => {
        return entryDetails.map(({purchasePrice, quantity}) => purchasePrice*quantity).reduce((sum, i) => sum + i, 0);
    };

    const invoiceSubtotal = subtotal();
    const invoiceTaxes = (watchTax * invoiceSubtotal) / 100;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    return (
        <Box m={2} pt={5} >
            <Paper>
                <Toolbar className="table-root">
                    <Typography className="table-title" variant="h6" id="tableTitle" component="div">
                        Detalles de ingreso
                    </Typography>    
                    <div style={{"float":"right"}}>
                        <AddEntryDetail
                            setEntryDetails={setEntryDetails}
                            entryDetails={entryDetails}
                            categories={categories}
                            entryDetail={null}
                            position={null}
                            setOpen={setOpen}
                            open={open}
                        />
                    </div>    
                </Toolbar>
                {
                    entryDetails?.length > 0 &&
                    <Card className="card-root" variant="outlined" >
                        <CardContent >
                            <TableContainer component={Paper}>
                                <Table aria-label="spanning table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" colSpan={3}>
                                                Detalles
                                            </TableCell>
                                            <TableCell>
                                                Precio
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            {
                                                tableHeaders.map((t, i) => (
                                                    <TableCell key={i}>{t.label}</TableCell>
                                                ))
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            entryDetails.map((t, i) => (
                                                <TableRow role="checkbox" tabIndex={-1} key={i}>
                                                    <TableCell>
                                                        {t.item.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {t.quantity}
                                                    </TableCell>
                                                    <TableCell>
                                                        {t.salePrice}
                                                    </TableCell>
                                                    <TableCell>
                                                        {t.purchasePrice}
                                                    </TableCell>
                                                    <TableCell>
                                                        <AddEntryDetail 
                                                            categories={categories} 
                                                            setEntryDetails={setEntryDetails} 
                                                            entryDetail={t} 
                                                            position={i} 
                                                            entryDetails={entryDetails}
                                                            setOpen={setOpen}
                                                            open={open}
                                                        />
                                                        <DeleteButton
                                                            id={t.id}
                                                            name={`Ingreso de ${t.item.name}`}
                                                            thingToDelete="Detalle de ingreso"
                                                            endpoint={ENTRY_DETAILS_ENDPOINT}
                                                            deleteType={null}
                                                            setList={setEntryDetails}
                                                            index={i}
                                                            iconType={true}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                        <TableRow>
                                            <TableCell rowSpan={3} />
                                            <TableCell colSpan={2}>
                                                Subtotal
                                            </TableCell>
                                            <TableCell >
                                                {ccyFormat(invoiceSubtotal)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Impuesto</TableCell>
                                            <TableCell>
                                                {watchTax  !== null ? watchTax + ' %' : undefined}
                                            </TableCell>
                                            <TableCell>
                                                {ccyFormat(invoiceTaxes)}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={2}>
                                                Total
                                            </TableCell>
                                            <TableCell>
                                                {ccyFormat(invoiceTotal)}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                }
            </Paper>
        </Box>
    );
};

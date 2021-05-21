import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid, Autocomplete, TextField, Box, Button, Skeleton, List, ListItem, Paper, Card, CardContent, Table, TableRow, TableContainer, TableHead, TableCell, TableBody } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { CATEGORIES_ENDPOINT, RECEIPT_TYPES_ENDPOINT, SUPPLIERS_ENDPOINT } from './../../helpers/endpoints';
import { AddEntryDetail } from '../AddEntryDetail';


const validationSchema = yup.object().shape({
    receiptNumber: yup.number().required().test(
        "maxDigits",
        "El numero de recibo no debe superar los 20 digitos.",
        (number) => String(number).length < 20
    ),
    receiptSeries: yup.number().required().test(
        "maxDigits",
        "La serie del recibo no debe superar los 20 digitos.",
        (number) => String(number).length < 20
    ),
    tax: yup.number().min(1).max(100).required().typeError('').test(
        "maxDigitsAfterDecimal",
        "El impuesto solo debe contener como maximo 2 decimales.",
        (number) => /^\d+(\.\d{1,2})?$/.test(number)
      ),
    receiptTypeObject: yup.object().required(),
    entrySupplierObject: yup.object().required()
});

const tableHeaders = [
    {label: 'Articulo'},
    {label: 'Cantidad'},
    {label: 'Precio venta'},
    {label: 'Precio compra'},
    {label: 'Acciones'},
];

export const EntryForm = () => {

    const [receiptTypes, setReceiptTypes] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [entryDetails, setEntryDetails] = useState([]);
    const [entryDetail, setEntryDetail] = useState(null);


    const { handleSubmit, control, watch } = useForm({defaultValues: { receiptTypeObject: null, entrySupplierObject:null, receiptNumber: '', receiptSeries: '', tax: ''}, resolver: yupResolver(validationSchema)});

    const watchTax = watch('tax');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(RECEIPT_TYPES_ENDPOINT);
                setReceiptTypes(resp.data);
                const response = await axios.get(SUPPLIERS_ENDPOINT);
                setSuppliers(response.data);
                const respon = await axios.get(CATEGORIES_ENDPOINT);
                setCategories(respon.data);
                setFetched(true);
            } catch (error) {
                console.log(error.response.data.message);
            }
        };
        fetchData();
    }, []);

    const handleDeleteEntryDetail = (index) => {
        setEntryDetails((prev) => prev.filter((entryDetail) => entryDetail !== prev[index]));
    };

    const ccyFormat = (num) => {
        return `${num.toFixed(2)}`;
    }

    const subtotal = () => {
        return entryDetails.map(({purchasePrice, quantity}) => purchasePrice*quantity).reduce((sum, i) => sum + i, 0);
    };

    const invoiceSubtotal = subtotal();
    const invoiceTaxes = (watchTax * invoiceSubtotal) / 100;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    const onSubmit = handleSubmit(async (data) => {

        console.log(data);
    });

    console.log(entryDetails);
    return (
        <>
            <form onSubmit={onSubmit}>
                <Grid container spacing={2}>

                    <Grid item xs={6} sm={6}>
                        <Controller
                            name="receiptNumber"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Numero de recibo"
                                type="number"
                                variant="outlined"
                                fullWidth
                                color="primary"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                            />
                            )}
                        />
                    </Grid>

                    <Grid item xs={6} sm={6}>
                        <Controller
                            name="receiptSeries"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Numero de serie"
                                type="number"
                                variant="outlined"
                                fullWidth
                                color="primary"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                            />
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} sm={4}>
                        <Controller
                            name="tax"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                label="Impuesto"
                                type="number"
                                variant="outlined"
                                fullWidth
                                color="primary"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                            />
                            )}
                        />
                    </Grid>

                    <Grid item xs={4} sm={4} mt={-2}>     
                        {
                            fetched 
                            ?
                            <Controller
                                control={control}
                                name="receiptTypeObject"
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Autocomplete
                                    onChange={(event, item) => {
                                        onChange(item);
                                    }}
                                    options={receiptTypes}
                                    getOptionLabel={(item) => (item.name ? item.name : "")}
                                    getOptionSelected={(option, value) =>
                                    value === undefined || value === "" || option.id === value.id
                                    }
                                    value={value}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Tipo de recibo"
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        onChange={onChange}
                                        error={!!error}
                                    />
                                    )}
                                />
                            )}
                            />
                            :
                            <Skeleton height={90}/>
                        }        
                    </Grid>

                    <Grid item xs={4} sm={4} mt={-2}>     
                        {
                            fetched 
                            ?
                            <Controller
                                control={control}
                                name="entrySupplierObject"
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Autocomplete
                                    onChange={(event, item) => {
                                        onChange(item);
                                    }}
                                    options={suppliers}
                                    getOptionLabel={(item) => (item.name ? item.name : "")}
                                    getOptionSelected={(option, value) =>
                                    value === undefined || value === "" || option.id === value.id
                                    }
                                    value={value}
                                    renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Proveedor"
                                        margin="normal"
                                        variant="outlined"
                                        fullWidth
                                        onChange={onChange}
                                        error={!!error}
                                    />
                                    )}
                                />
                            )}
                            />
                            :
                            <Skeleton height={90}/>
                        }        
                    </Grid>

                    {
                        entryDetails.length > 0
                        &&
                            <Grid item xs={12} sm={8}>
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
                                                                    {t.itemObject.name}
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
                                                                    />

                                                                    <RemoveCircleIcon       style={{color:"#ff3333"}}
                                                                    onClick={() => handleDeleteEntryDetail(i)}
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
                            </Grid> 
                    }

                    <Box mt={5}>

                        <AddEntryDetail categories={categories} setEntryDetails={setEntryDetails} entryDetail={entryDetail} position={null} entryDetails={entryDetails}/>
                    </Box>


                    <Box clone mt={2} ml={2}>
                        <Button type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary">
                            Registrar
                        </Button>
                    </Box>
                
                </Grid>
            </form>
        </>
    );
};

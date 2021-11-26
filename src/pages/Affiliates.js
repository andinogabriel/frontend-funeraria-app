import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserAffiliates } from './../actions/affiliatesActions';
import dayjs from 'dayjs';
import { makeStyles, withStyles  } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';


const StyledTableCell = withStyles((theme) => ({
    head: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.white
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
});


export const Affiliates = () => {

    const {fetched, affiliates} = useSelector(state => state.affiliates);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState();
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getUserAffiliates());

            } catch (error) {
                console.log(error);
                setErrors(error);
            }
        }
        fetchData();
    }, [dispatch]);

    const rows = affiliates;

    return (
        <>
            { 
                fetched &&
                <Box m={2} pt={3}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Apellido</StyledTableCell>
                                <StyledTableCell>Nombre</StyledTableCell>
                                <StyledTableCell>DNI</StyledTableCell>
                                <StyledTableCell>Edad</StyledTableCell>
                                <StyledTableCell>Parentesco</StyledTableCell>
                                <StyledTableCell>Genero</StyledTableCell>
                                <StyledTableCell>Fecha de afiliacion</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.affiliateId}>
                                    <StyledTableCell>{row.lastName}</StyledTableCell>
                                    <StyledTableCell>{row.firstName}</StyledTableCell>
                                    <StyledTableCell>{row.dni}</StyledTableCell>
                                    <StyledTableCell>{new Date().getFullYear() - new Date(row.birthDate).getFullYear()}</StyledTableCell>
                                    <StyledTableCell>{row.affiliateRelationship.name}</StyledTableCell>
                                    <StyledTableCell>{row.affiliateGender.name}</StyledTableCell>
                                    <StyledTableCell>{dayjs(row.startDate).format('DD/MM/YYYY')}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button variant="contained">Default</Button>
                </Box>
            }
        </>
    );
};

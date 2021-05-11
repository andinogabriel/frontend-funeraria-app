import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { Box, Card, CardContent, Paper, Button } from '@material-ui/core';
import { BrandForm } from '../components/forms/BrandForm';
import { makeStyles } from '@material-ui/styles';
import { BRANDS_ENDPOINT } from '../helpers/endpoints';
import ListIcon from '@material-ui/icons/List';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

export const AddOrUpdateBrand = () => {

    const classes = useStyles();
    const {id} = useParams();
    const [brandToUpdate, setBrandToUpdate] = useState(null);

    useEffect(() => {
        if(id) {
            const fetchData = async() => {
              try {
                const resp = await axios.get(`${BRANDS_ENDPOINT}/${id}`);
                if(resp.data !== null) {
                    setBrandToUpdate(resp.data);
                }
              } catch (error) {
                console.log(error);
              }
            };
            fetchData();
        }
    }, [id]);

    return (
        <Box mt={5}>
            <Paper elevation={7}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <h2>
                          {
                            id !== undefined 
                              ?
                              'Actualizar marca'
                              :
                              'Agregar marca'
                          }
                        </h2>
                        <hr/>
                        <BrandForm
                            id={id}
                            brand={brandToUpdate}
                        />
                    </CardContent>
                    <Button size="sm" variant="contained" component={NavLink} to={'/marcas'}>
                        <ListIcon/> Volver a marcas
                    </Button>
                </Card>
            </Paper>
        </Box>
    );
};

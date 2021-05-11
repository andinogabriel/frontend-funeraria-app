import React, { useEffect, useState } from 'react'
import { Box, Paper, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ItemForm } from '../components/forms/ItemForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ITEMS_ENDPOINT } from '../helpers/endpoints';

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

export const AddOrUpdateItem = () => {

  const classes = useStyles();
  const {id} = useParams();
  const [itemToUpdate, setItemToUpdate] = useState(null);
  

  useEffect(() => {
    if(id) {
      const fetchData = async() => {
        try {
          const resp = await axios.get(`${ITEMS_ENDPOINT}/${id}`);
          if(resp.data !== null) {
            setItemToUpdate(resp.data);
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
                  <h2>{id !== undefined ? 'Actualizar artículo' : 'Registrar artículo'}</h2>
                  <hr/>
                  <ItemForm
                    id={id}
                    item={itemToUpdate}
                  />
                </CardContent>
            </Card>
        </Paper>
    </Box>
  )
}

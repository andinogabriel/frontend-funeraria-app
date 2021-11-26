import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Paper, Card, CardContent, Button } from '@mui/material';
import { ItemForm } from '../components/forms/ItemForm';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { ITEMS_ENDPOINT } from '../helpers/endpoints';
import { List } from '@mui/icons-material';


export const AddOrUpdateItem = () => {
 
  const {id} = useParams();
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const [fetching, setFetching] = useState(true);
  const history = useHistory();
  
  useEffect(() => {
    const source = axios.CancelToken.source();
    if(id) {
      const fetchData = async() => {
        try {
          const resp = await axios.get(`${ITEMS_ENDPOINT}/${id}`, {cancelToken: source.token});
          setItemToUpdate(resp.data);
          setFetching(false);
        } catch (error) {
          console.log(error);
          history.push('/articulos');
        }
      };
      fetchData();
    } else {
      setFetching(false);
    }
    return ()=> source.cancel()
  }, [id]);

  return (
    <Box mt={5}>
        <Paper elevation={7}>
            <Card className="card-root" variant="outlined">
                <CardContent>
                  <h2>{id !== undefined ? 'Actualizar artículo' : 'Registrar artículo'}</h2>
                  <hr/>
                  <ItemForm
                    id={id}
                    item={itemToUpdate}
                    fetching={fetching}
                  />
                </CardContent>
                <Box mt={2}>
                  <Button size="small" variant="contained" component={NavLink} to={'/articulos'}>
                    <List/> Volver a Artículos
                  </Button>
                </Box>
            </Card>
        </Paper>
    </Box>
  )
}

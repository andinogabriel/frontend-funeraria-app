import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Paper, Card, CardContent } from '@material-ui/core';
import { ItemForm } from '../components/forms/ItemForm';
import { useHistory, useParams } from 'react-router-dom';
import { ITEMS_ENDPOINT } from '../helpers/endpoints';

export const AddOrUpdateItem = () => {
 
  const {id} = useParams();
  const [itemToUpdate, setItemToUpdate] = useState(null);
  const history = useHistory();
  
  useEffect(() => {

    const source = axios.CancelToken.source();

    if(id) {
      const fetchData = async() => {
        try {
          const resp = await axios.get(`${ITEMS_ENDPOINT}/${id}`, {cancelToken: source.token});
          setItemToUpdate(resp.data);
          
        } catch (error) {
          console.log(error);
          history.push('/articulos');
        }
      };
      fetchData();
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
                  />
                </CardContent>
            </Card>
        </Paper>
    </Box>
  )
}

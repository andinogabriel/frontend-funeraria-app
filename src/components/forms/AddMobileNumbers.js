import React from 'react';
import { Grid, TextField, Box } from '@material-ui/core';
import { DeleteButton } from '../buttons/DeleteButton';
import { MOBILE_NUMBERS_ENDPOINT } from './../../helpers/endpoints';
//import { makeStyles } from '@material-ui/styles';
import { HighlightOff, AddCircleOutline } from '@mui/icons-material';




// const useStyles = makeStyles((theme) => ({
//     gridItem: {
//       margin: theme.spacing(0.69)
//     }
//   }));

export const AddMobileNumbers = ({inputList, setInputList, initialValue}) => {

    //const styles = useStyles();

    const handleInputChange = (e, index) => {
        e.preventDefault();
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };


    const handleAddClick = (e) => {
        e.preventDefault();
        setInputList([...inputList, initialValue]); //aca va el objeto inicializador
    };

    const handleRemoveInput = (e, index) => {
        e.preventDefault();
        setInputList((prev) => prev.filter((item) => item !== prev[index]));
    };


    return (
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" >
        {
            inputList?.map((item, i) => (
                <React.Fragment key={i}>
                        <Grid item xs={4} sm={2} style={{ margin: 5}}> 
                            <TextField
                                fullWidth
                                type="tel"
                                label="Télefono"
                                variant="outlined"
                                name="mobileNumber"
                                value={item.mobileNumber}
                                onChange={(e) => handleInputChange(e, i)}
                            />
                        </Grid>
                        {
                            (inputList.length - 1 === i) 
                                &&
                                <Box color="primary" mt={2.5}>
                                    <AddCircleOutline onClick={handleAddClick} style={{color:"#1662D2", cursor: 'pointer'}}/>
                                </Box>

                        }
                        {
                            (inputList.length !== 1) 
                                &&
                                <Box color="primary" mt={2.5}>
                                    {
                                        //Si el indice i del array tiene id significa que esta guardado en la db
                                        typeof(item?.id) === 'number'
                                            ?
                                            <DeleteButton
                                                id={item.id}
                                                name={`el numero ${item.mobileNumber}`}
                                                thingToDelete="número de telefono"
                                                endpoint={MOBILE_NUMBERS_ENDPOINT}
                                                deleteType={null}
                                                setList={setInputList}
                                                index={i}
                                                iconType={true}
                                            />
                                            :
                                            <HighlightOff onClick={(e) => handleRemoveInput(e, i)} style={{color:"#ff3333", cursor: 'pointer'}}/>
                                    }
                                </Box>
                        }             
                </React.Fragment>
            ))
        }
        </Grid> 
    );
};

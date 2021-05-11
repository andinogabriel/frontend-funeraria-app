import React from 'react';
import axios from 'axios';
import { Grid, TextField, Box } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

export const AddMobileNumbers = ({inputList, deleteEndPoint, setInputList, initialValue}) => {

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

    const handleRemoveInput = async (e, index) => {
        e.preventDefault();
        setInputList((prev) => prev.filter((item) => item !== prev[index]));
        const mId = inputList[index].id;
        if(mId !== '') {
            try {
                await axios.delete(`${deleteEndPoint}/${mId}`);
            } catch (error) {
                console.log(error);
            }
        }
        
    };


    return (
        <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1} >
        {
            inputList.map((item, i) => (
                <React.Fragment key={i}>
                        <Grid item xs={4} sm={5}> 
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
                                <Box color="primary" mt={2}>
                                    <AddCircleOutlineIcon fontSize="large" onClick={handleAddClick} style={{color:"#1662D2"}}/>
                                </Box>

                        }
                        {
                            (inputList.length !== 1) 
                                &&
                                <Box color="primary" mt={2}>
                                    <HighlightOffIcon fontSize="large" onClick={(e) => handleRemoveInput(e, i)} style={{color:"#ff3333"}}/>
                                </Box>
                        }             
                </React.Fragment>
            ))
        }
        </Grid> 
    );
};

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));


export const QuantityDropdown = ({setThingsPerPage, thingsPerPage, things, quantityArray}) => {
    const classes = useStyles();

    const handleChange = (event) => {
        setThingsPerPage(event.target.value);
    };

    return (
        <FormControl className={classes.formControl}>
            <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={thingsPerPage}
                onChange={handleChange}
                className={classes.selectEmpty}
            >
                {
                    quantityArray.map((quantity, i) => (
                        <MenuItem key={i} value={quantity}>{quantity}</MenuItem>
                    ))
                }
            </Select>
            <FormHelperText>{`Cantidad ${things} a mostrar`}</FormHelperText>
        </FormControl>

    );
};

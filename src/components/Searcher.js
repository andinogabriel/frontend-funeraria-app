import React from 'react';
import {InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const Searcher = ({searchThing, setSearchName, thingToSearch}) => {

    const searchChange = (event) => {
        setSearchName(event.target.value);
    };

    return (
        <TextField
            value={searchThing}
            onChange={searchChange}
            id='search'
            name="searchThing"
            margin="normal"
            label={`Buscar por ${thingToSearch}`} 
            InputProps={{ 
                endAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                )
            }}
        >

        </TextField>
        
    );
};

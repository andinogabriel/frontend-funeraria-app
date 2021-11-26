import React from 'react'
import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';

export const FormAutoComplete = ({name, label, variant, options, control}) => {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Autocomplete
                    onChange={(event, item) => {
                        onChange(item);
                    }}
                    options={options}
                    getOptionLabel={(item) => (item.name ? item.name : "")}
                    isOptionEqualToValue={(option, value) =>
                        value === undefined || value === "" || option.id === value.id
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            margin="normal"
                            variant={variant}
                            fullWidth
                            value={value}
                            error={!!error}
                        />
                    )}
                />
            )}
        />
    );
};

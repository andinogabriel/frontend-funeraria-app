import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';


export const FormInputText = ({name, label, type, variant, control}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={({
                field: { onChange, value },
                fieldState: { error },
                formState,
            }) => (
                <TextField
                    helperText={error ? error.message : null}
                    type={type}
                    margin="normal"
                    error={!!error}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    autoFocus
                    label={label}
                    variant={variant}
                />
            )}
        />
    );
};

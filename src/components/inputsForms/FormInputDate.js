import React from 'react'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from '@mui/lab/DatePicker';


export const FormInputDate = ({name, label, contorl}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
                name={name}
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <DatePicker
                        disableFuture
                        label={label}
                        openTo="year"
                        views={['day', 'month', 'year']}
                        value={value}
                        onChange={(newValue) => {
                            setValue(name, newValue);
                        }}
                        renderInput={(params) => <TextField {...params} 
                        />}
                    />
                )}
            />
        </LocalizationProvider>
    );
};

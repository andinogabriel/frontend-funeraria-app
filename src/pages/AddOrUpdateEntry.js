import React, { useEffect, useState } from 'react'
import { Box, Paper, Card, CardContent } from '@material-ui/core';
import { EntryForm } from '../components/forms/EntryForm';


export const AddOrUpdateEntry = () => {
    return (
        <Box mt={5}>
            <Paper elevation={7}>
                <Card className="card-root" variant="outlined">
                    <CardContent>
                        <h2>Registrar ingreso</h2>
                        <hr/>
                        <EntryForm/>
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
};

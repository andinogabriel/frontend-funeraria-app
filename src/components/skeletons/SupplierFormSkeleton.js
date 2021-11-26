import React from 'react';
import { Grid, Skeleton } from '@mui/material';

export const SupplierFormSkeleton = () => {
    return (
        <Grid container spacing={2}>
            {
                [0,1,2,3].map(i => (
                    <Grid item xs={6} sm={6} key={i}>
                        <Skeleton height={70}/>
                    </Grid>
                ))
            }
            <Grid item xs={12} sm={12} key={6}>
                <Skeleton height={70}/>
                <Skeleton height={200}/>
            </Grid>
        </Grid>
    );
};

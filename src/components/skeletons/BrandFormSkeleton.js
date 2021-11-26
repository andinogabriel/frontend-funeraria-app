import React from 'react';
import { Grid, Skeleton } from '@mui/material';

export const BrandFormSkeleton = () => {
    return (
        <Grid container spacing={2}>
            {
                [0,1].map(i => (
                    <Grid item xs={12} sm={6} key={i}>
                        <Skeleton height={65}/>
                    </Grid>
                ))
            }
        </Grid>
    );
};

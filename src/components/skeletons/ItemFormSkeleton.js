import React from 'react';
import { Grid, Skeleton } from '@mui/material';

export const ItemFormSkeleton = () => {
    
    return (
        <Grid container spacing={2}>
            {
                [0,1,2,3,4,5].map(i => (
                    <Grid item xs={6} sm={6} key={i}>
                        <Skeleton height={70}/>
                    </Grid>
                ))
            }
        </Grid>
    );
};

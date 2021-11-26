import React from 'react';
import { Container, Typography, Grid, Button } from '@material-ui/core';


export const Home = () => {
    return (
        <div className="hero-content">
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Funeraria Nuñez y Hnos.
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Something short and leading about the collection below—its contents, the creator, etc.
                    Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                    entirely.
                </Typography>
                <div className="hero-buttons">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item>
                        <Button variant="contained" color="primary">
                            Main call to action
                        </Button>
                        </Grid>
                        <Grid item>
                        <Button variant="outlined" color="primary">
                            Secondary action
                        </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    )
}

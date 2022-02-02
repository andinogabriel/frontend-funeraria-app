import React from 'react';
import { Typography  } from '@mui/material';



export const Footer = () => {


    return (
        <footer className="footer">
            <Typography variant="h6" align="center" gutterBottom>
                Nuñez y Hnos
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Funeraria Nuñez y Hnos.
                {'Copyright © '} {new Date().getFullYear()}
            </Typography>
        </footer>
    );
};

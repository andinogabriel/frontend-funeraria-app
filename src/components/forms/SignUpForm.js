import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Grid, Container, Avatar, Button, CssBaseline, Typography, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {makeStyles} from '@mui/styles';
import { FormInputText } from './../inputsForms/FormInputText';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        //padding: theme.spacing(2),
    
        '& .MuiTextField-root': {
          //margin: theme.spacing(1),
          width: '300px',
        },
        '& .MuiButtonBase-root': {
          //margin: theme.spacing(2),
        },
    },
    paper: {
      //marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      //margin: theme.spacing(1),
      backgroundColor: theme?.palette?.secondary?.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      //marginTop: theme.spacing(3),
    },
    submit: {
      //margin: theme.spacing(3, 0, 2),
    },
}));

const schema = yup.object().shape({
    firstName: yup.string().required(''),
    lastName: yup.string().required(''),
    email: yup.string().required('').email('Correo electronico invalido.'),
    password: yup.string()
            .min(8, 'La contraseña debe tener al menos 8 caracteres.')
            .max(30, 'La contraseña no debe superar los 30 caracteres.')
            .required(),
    rePassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir.')
        .required(''),
});

const inputs = [
    {name: 'firstName', label: 'Nombre', type: 'text'},
    {name: 'lastName', label: 'Apellido', type: 'text'},
    {name: 'email', label: 'Email', type: 'email'},
    {name: 'password', label: 'Contraseña', type: 'password'},
    {name: 'rePassword', label: 'Confirmar contraseña', type: 'password'},
];

export const SignUpForm = ({onSubmitCallback}) => {

    const classes = useStyles();

    const { 
        handleSubmit, 
        control 
    } = useForm({resolver: yupResolver(schema)});

    
    const onSubmit = (data) => {
        const {email, password, firstName, lastName, rePassword} = data;
        onSubmitCallback({email, password, firstName, lastName, rePassword});
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper} onSubmit={handleSubmit(onSubmit)}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Registrarse</Typography>
                <form className={classes.form}>
                    <Grid container spacing={2}>
                        {
                            inputs.map(({name, label, type}, i) => (
                                i < 2 
                                ?
                                <Grid item xs={12} sm={6} key={i}>
                                    <FormInputText
                                        name={name}
                                        label={label}
                                        type={type}
                                        variant='filled'
                                        control={control}
                                    />
                                </Grid>
                                :
                                <Grid item xs={12} key={i}>
                                    <FormInputText
                                        name={name}
                                        label={label}
                                        type={type}
                                        variant='filled'
                                        control={control}
                                    />
                                </Grid>
                            ))
                        }
                    
                    </Grid>

                    <Box pt={2}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                            Registrarse
                        </Button>
                    </Box>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Box pt={1}>
                                <Link to="/signin" style={{ color: '#FFF',  textDecoration: 'none' }}>
                                    Already have an account? Sign in
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>

                </form>
            </div>
        </Container>
    );
};

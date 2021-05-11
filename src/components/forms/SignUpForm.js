import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Grid, Container, Avatar, Button, CssBaseline, Typography, Box } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
    
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '300px',
        },
        '& .MuiButtonBase-root': {
          margin: theme.spacing(2),
        },
    },
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
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
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="firstName"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="Nombre"
                                    variant="filled"
                                    fullWidth
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                                )}
                                rules={{ required: 'El nombre es requerido.' }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="lastName"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="Apellido"
                                    variant="filled"
                                    fullWidth
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                                )}
                                rules={{ required: 'El apellido es requerido.' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="Email"
                                    variant="filled"
                                    fullWidth
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    type="email"
                                />
                                )}
                                rules={{ required: 'El email es requerido.' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="Contraseña"
                                    variant="filled"
                                    fullWidth
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    type="password"
                                />
                                )}
                                rules={{ required: 'La contraseña es requerida.'}}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Controller
                                name="rePassword"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    label="Confirmar contraseña"
                                    variant="filled"
                                    fullWidth
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    type="password"
                                />
                                )}
                            />
                        </Grid>

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

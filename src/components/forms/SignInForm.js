import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, Controller  } from 'react-hook-form';
import { Avatar, Button, TextField, CssBaseline, Grid, Typography, Container, Box } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    
    paper: {
      marginTop: theme.spacing(8),
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
      marginTop: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export const SignInForm = ({errores, onSubmitCallback}) => {

    const classes = useStyles();
    const { 
        handleSubmit, 
        control 
    } = useForm();

    const onSubmit = (data) => {
        const {email, password} = data;
        onSubmitCallback({email, password});
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Iniciar sesión</Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Email"
                            variant="filled"
                            type="email"
                            margin="normal"
                            autoFocus
                            fullWidth
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                        rules={{ required: 'El email es requerido.' }}
                    />
                    
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            label="Contraseña"
                            variant="filled"
                            fullWidth
                            autoFocus
                            margin="normal"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                            type="password"
                        />
                        )}
                        rules={{ required: 'La contraseña es requerida.'}}
                    />

                <Box pt={2}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Iniciar sesión
                    </Button>
                </Box>
                
                <Grid container pt={2}>
                    <Grid item xs>
                        <Link to="/" style={{ color: '#000',  textDecoration: 'none' }}>
                            ¿Olvidaste la contraseña?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to="/signup" style={{ color: '#000',  textDecoration: 'none' }}>
                            ¿No tenes cuenta? Registrate aquí.
                        </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
        </Container>
    );
};

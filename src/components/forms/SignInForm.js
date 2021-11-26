import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FormInputText } from '../inputsForms/FormInputText';
import { useDispatch } from 'react-redux';
import { startLoginUser } from './../../actions/authActions';
import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, Typography } from '@mui/material';


const useStyles = makeStyles((theme) => ({
    paper: {
      //marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      //margin: theme.spacing(1),
      //backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      //marginTop: theme.spacing(2),
    },
    submit: {
      //margin: theme.spacing(3, 0, 2),
    },
}));

const validationSchema = yup.object().shape({
    email: yup.string().email('Formato de email no valido.').required(''),
    password: yup.string().required('')
});


export const SignInForm = () => {

    const dispatch = useDispatch();
    const [error, setError] = useState(null);


    const classes = useStyles();
    const { 
        handleSubmit, 
        control, 
    } = useForm({resolver: yupResolver(validationSchema)});

    const onSubmit = ({email, password}) => {
        dispatch(startLoginUser({email, password}, setError));
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper} style={{marginTop: '16px'}}>
                <Avatar className="signin-avatar">
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Iniciar sesión</Typography>
                {
                    error &&
                    <Grid item xs={12} sm={12}>
                        <Alert severity="error" variant="outlined">
                            <Typography align="center" color="error">{error}</Typography>
                        </Alert>
                    </Grid>
                }
                
                <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
                    <FormInputText 
                        name='email' 
                        label='Email' 
                        type='text'
                        variant='filled'
                        control={control}
                    />
                    <FormInputText 
                        name='password' 
                        label='Contraseña' 
                        type='password' 
                        variant='filled'
                        control={control}
                    />
                    
                    <Box pt={2}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{'margin': "3px 0px 7px"}}
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

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Grid} from '@mui/material';
import { startLoginUser } from './../actions/authActions';
import { SignInForm } from './../components/forms/SignInForm';


export const SignIn = () => {

    const [errores, setErrores] = useState(null);
    const dispatch = useDispatch();
    const {loggedIn} = useSelector(state => state.auth);
    const history = useHistory();

    useEffect(() => {
        //Si el loggedIn es true que lo mande a la pag de inicio, nos fijamos en nuestro estado de auth.
        if(loggedIn) {
            history.push("/");
        }
    }, [loggedIn, history]);


    const login = ({email, password}) => {
        try {
            dispatch(startLoginUser({email, password}, setErrores));
        } catch (error) {
            console.log(error);
        }
    };

    
    return (
        <Container maxWidth="sm">
            <Grid container spacing={2}>
                <Grid item>
                    <SignInForm onSubmitCallback={login} errores={errores}/>
                </Grid>
            </Grid>
            
        </Container>
    )
}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import { startLoginUser } from './../actions/authActions';
import { SignInForm } from './../components/forms/SignInForm';
import { Typography, Alert, Grid } from '@material-ui/core';


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
        <Container className="mt-5">
            <Row>
                <Col sm="12" md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}}>
                    <SignInForm onSubmitCallback={login} errores={errores}/>
                </Col>
            </Row>
            
        </Container>
    )
}

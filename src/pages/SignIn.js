import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import { startLoginUser } from './../actions/authActions';
import { SignInForm } from '../components/SignInForm';



export const SignIn = () => {

    const [errores, setErrores] = useState({});
    
    const dispatch = useDispatch();

    const {loggedIn} = useSelector(state => state.auth);

    const history = useHistory();

    useEffect(() => {
        //Si el loggedIn es true que lo mande a la pag de inicio, nos fijamos en nuestro estado de auth.
        if(loggedIn) {
            history.push("/");
        }
    }, [loggedIn, history]);

    


    const login =  ({email, password}) => {
        const errores = {};
        //Cada vez que se lanze el formulario va a vaciar los errores para volver a recalcular a ver si tiene
        setErrores(errores);

        //Llamar nuestra accion lamar login
        dispatch(startLoginUser({email, password}))
            .then(response => {

            })
            .catch(error => {
                setErrores({
                    //error.response.data.message
                    auth: error.response.data.message
                });
            });
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

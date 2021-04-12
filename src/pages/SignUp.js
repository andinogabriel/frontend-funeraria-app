import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../actions/authActions';
import { startLoginUser } from './../actions/authActions';
import { Alert } from 'react-bootstrap';
import { SignUpForm } from '../components/SignUpForm';


export const SignUp = () => {

    const [errores, setErrores] = useState({});

    const dispatch = useDispatch();

    const register = ({email, password, firstName, lastName, rePassword}) => {

        const errores = {};
        //Cada vez que se lanze el formulario va a vaciar los errores para volver a recalcular a ver si tiene
        setErrores(errores);

        //Llamar nuestra accion lamar CREAR
        dispatch(registerUser({email, password, firstName, lastName, rePassword}))
            .then(response => {
                //Loguear al usuario
                dispatch(startLoginUser({email, password}));
            })
            .catch(error => {
                setErrores({
                    //error.response.data.message
                    registerError: error.response.data.message
                });
            });
        
    };


    return (
        <div className="container">
            <div className="row py-4 mt-4 align-items-center">
                
                <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                    <h1>Crear cuenta</h1>
                    <p className="font-italic  mb-0">Create una cuenta para poder solicitar el servicio.</p>
                    {
                        errores.registerError && (<Alert variant="danger">{errores.registerError}</Alert>)
                    }
                </div>

                <div className="col-md-7 col-lg-6 ml-auto mt-3">
                    <SignUpForm onSubmitCallback={register}/>
                </div>
            </div>
        </div>
    );
};

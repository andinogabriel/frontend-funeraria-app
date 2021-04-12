import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { registerUser } from '../actions/authActions';
import { startLoginUser } from './../actions/authActions';
import { Alert } from 'react-bootstrap';

const initialState = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    rePassword: ''
};

export const SignUp = () => {

    const [errores, setErrores] = useState({});

    const dispatch = useDispatch();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm(initialState);

    
    const onSubmit = ({email, password, firstName, lastName, rePassword}) => {

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
        console.log({email, password, firstName, lastName});
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">

                            <div className="input-group col-lg-6 mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                        <i className="fa fa-user text-muted"></i>
                                    </span>
                                </div>
                                <input
                                    type="text" 
                                    placeholder="Nombre" 
                                    className={`form-control bg-white border-left-1 border-md ${errors?.firstName?.type === "required" && "is-invalid"}`}
                                    {...register("firstName", { required: true})}
                                    />
                            </div>
                            

                        
                            <div className="input-group col-lg-6 mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                        <i className="fa fa-user text-muted"></i>
                                    </span>
                                </div>
                                <input
                                    type="text" 
                                    placeholder="Apellido" 
                                    className={`form-control bg-white border-left-1 border-md ${errors?.lastName?.type === "required" && "is-invalid"}`}
                                    {...register("lastName", { required: true, minLength: 1 })}
                                />
                            </div>

                        
                            <div className="input-group col-lg-12 mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                        <i className="fa fa-envelope text-muted"></i>
                                    </span>
                                </div>
                                <input
                                    type="email" 
                                    placeholder="Correo electronico" 
                                    className={`form-control bg-white border-left-1 border-md ${errors?.email?.type === "required" && "is-invalid"}`}
                                    {...register("email", { required: true})}
                                />
                            </div>

                            <div className="input-group col-lg-6 mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                        <i className="fa fa-lock text-muted"/>
                                    </span>
                                </div>
                                <input 
                                    type="password" 
                                    placeholder="Contraseña" 
                                    className={`form-control bg-white border-left-1 border-md ${errors?.password?.type === "required" && "is-invalid"}`}
                                    {...register("password", { required: true, minLength: 8, maxLength: 30})}
                                />
                            </div>
                            {
                                errors?.password?.type === "minLength" 
                                    &&
                                    <div className="text-danger text-small d-block mb-2 ml-3 col-lg-12 mb-4">
                                        La contraseña debe tener mas de 8 caracteres.
                                    </div>
                            }
                            {
                                errors?.password?.type === "maxLength" 
                                    &&
                                    <div className="text-danger text-small d-block mb-2 ml-3 col-lg-12 mb-4">
                                        La contraseña no debe superar los 30 caracteres.
                                    </div>
                            }

                            
                            <div className="input-group col-lg-6 mb-4">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white px-4 border-md border-right-0">
                                        <i className="fa fa-lock text-muted"/>
                                    </span>
                                </div>
                                <input 
                                    type="password" 
                                    placeholder="Confirmar Contraseña" 
                                    className={`form-control bg-white border-left-1 border-md ${errors?.rePassword?.type === "required" && "is-invalid"}`}
                                    {...register("rePassword", { required: true})}
                                />
                            </div>

                
                            <div className="form-group col-lg-12 mx-auto mb-0">
                                <button type="submit" className="btn btn-primary btn-block py-2">
                                    Registrar
                                </button>
                            </div>
                
                            <div className="text-center w-100">
                                <p className="font-weight-bold">¿Ya tenes cuenta?<Link to={"/signin"} className="text-primary ml-2">Inicia sesion aqui</Link></p>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

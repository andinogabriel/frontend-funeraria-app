import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Alert, Container, Row, Col, Card, Button } from 'react-bootstrap';
import { startLoginUser } from './../actions/authActions';


const initialState = {
    email: '',
    password: ''
};


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

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm(initialState);


    const onSubmit =  ({email, password}) => {
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
                    auth: "No se puede iniciar sesion con esos credenciales."
                });
            });
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col sm="12" md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}}>
                    <Card body bg="dark" text="light">
                        {
                            errores.auth && (<Alert variant="danger">{errores.auth}</Alert>)
                        }
                        <Card.Title><h2 className="text-align-center">Iniciar sesión</h2></Card.Title>
                        <hr/>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group control="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email" 
                                    placeholder="Correo electronico" 
                                    className={`form-control bg-white border-left-1 border-md ${errors?.email?.type === "required" && "is-invalid"}`}
                                    {...register("email", { required: true})}
                                />
                            </Form.Group>

                            <Form.Group control="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password" 
                                    placeholder="Contraseña" 
                                    className={`form-control bg-white border-left-1 border-md ${errors?.password?.type === "required" && "is-invalid"}`}
                                    {...register("password", { required: true})}
                                />
                            </Form.Group>
                            <Button 
                                variant="secondary" 
                                size="lg" block
                                type="submit"
                            >
                                Iniciar sesión
                            </Button>
                        </Form>
                        <div className="mt-4">
                            <Link to={"/signup"}>Registrarse aqui</Link>
                        </div>
                    </Card>
                </Col>
            </Row>
            
        </Container>
    )
}

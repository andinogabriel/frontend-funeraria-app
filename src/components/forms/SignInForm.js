import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Button, Card, Alert } from 'react-bootstrap';


const initialState = {
    email: '',
    password: ''
};

export const SignInForm = ({errores, onSubmitCallback}) => {

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm(initialState);

    const onSubmit = (data) => {
        const {email, password} = data;
        onSubmitCallback({email, password});
    };

    return (
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
    );
};

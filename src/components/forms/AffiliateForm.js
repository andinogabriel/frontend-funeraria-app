import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Col, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { GENDERS_ENDPOINT, RELATIONSHIPS_ENDPOINT, AFFILIATES_ENDPOINT } from '../../helpers/endpoints';
import { getUserAffiliates } from '../../actions/affiliatesActions';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    dni: yup.number()
            .typeError('El DNI solo debe contener numeros.')
            .min(999999, 'El DNI debe tener mas de 7 dígitos.')
            .max(1000000000, 'El DNI no puede superar los 9 dígitos.'),
    timestamp: yup.date().max(new Date(),'La fecha de nacimiento debe ser menor que la fecha de hoy.')
});


export const AffiliateForm = () => {

    const [genders, setGenders] = useState([]);
    const [relationships, setRelationships ] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [errores, setErrores] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect( () => {
        const fetchData = async () => {
            try {
                const resp1 = await axios.get(GENDERS_ENDPOINT);
                const resp2 = await axios.get(RELATIONSHIPS_ENDPOINT);

                setGenders(resp1.data);
                setRelationships(resp2.data);
                setFetching(false);
            } catch (error) {
                console.log(error);
                //setErrores(error);
            }
        }
        fetchData();
    }, []); //Solo llamamos a la api cuando el componente se monta



    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit = async (data) => {
        console.log(data);
        const {firstName, lastName, dni, timestamp, affiliateGender, affiliateRelationship} = data;
        const date = new Date(timestamp);
        const birthDate = Date.parse(date);
     
        try {
            await axios.post(AFFILIATES_ENDPOINT, {firstName, lastName, dni, birthDate, affiliateGender, affiliateRelationship});
            await dispatch(getUserAffiliates());

            toast.info('Afiliado registrado satisfactoriamente.', {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        } catch (error) {
            setErrores(error.response.data.message);
            console.log(errores);
            console.log(error);
        }
        history.push('/mis-afiliados');
    };

    return (
        <>
        {
            !fetching &&
                <Card body bg="dark" text="light" className="mt-5">
                <Card.Title><h2 className="text-align-center">Registrar afiliado</h2></Card.Title>
                <hr/>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="firstName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control 
                            className={`form-control ${errors?.firstName?.type === "required" && "is-invalid"}`}
                            type="text" 
                            placeholder="Nombre" 
                            {...register("firstName", { required: true})}
                        />
                        </Form.Group>

                        <Form.Group as={Col} controlId="lastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control 
                            className={`form-control ${errors?.lastName?.type === "required" && "is-invalid"}`}
                            type="text" 
                            placeholder="Apellido" 
                            {...register("lastName", { required: true})}
                        />
                        </Form.Group>
                    </Form.Row>


                    <Form.Row>
                        <Form.Group as={Col} controlId="dni">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control 
                                className={`form-control ${errors?.dni?.type === "required" && "is-invalid"}`}
                                type="number" 
                                placeholder="DNI"
                                {...register("dni", { required: true})} 
                            />
                            {
                                <div className="text-danger text-small d-block mb-2 ml-3 col-lg-12 mb-4">
                                    {errors.dni?.message}
                                </div>
                            }
                        </Form.Group>

                        <Form.Group as={Col} controlId="timestamp">
                            <Form.Label>Fecha de nacimiento</Form.Label>
                            <Form.Control 
                                className={`form-control ${errors?.birthDate?.type === "required" && "is-invalid"}`}
                                type="date" 
                                placeholder="Fecha de nacimiento" 
                                {...register("timestamp", { required: true})} 
                            />
                            <div className="text-danger text-small d-block mb-2 ml-3 col-lg-12 mb-4">
                                    {errors.birthDate?.message}
                            </div>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="affiliateGender">
                            <Form.Label>Genero</Form.Label>
                            <Form.Control 
                                className={`form-control ${errors?.gender?.type === "required" && "is-invalid"}`}
                                as="select" 
                                {...register("affiliateGender", { required: true})}
                                defaultValue="Seleccione el genero">
                                {
                                    !fetching &&
                                        genders.map((gender, i) => (
                                            <option value={gender.id} key={i}>{gender.name}</option>
                                        ))
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="affiliateRelationship">
                            <Form.Label>Parentesco</Form.Label>
                            <Form.Control 
                                className={`form-control ${errors?.relationship?.type === "required" && "is-invalid"}`}
                                as="select" 
                                {...register("affiliateRelationship", { required: true})}
                                defaultValue="Seleccione su parentesco">
                                {
                                    !fetching &&
                                        relationships.map((relationship, i) => (
                                            <option key={i} value={relationship.id}>{relationship.name}</option>
                                        ))
                                }
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="secondary" size="lg" block type="submit">
                        Registrar
                    </Button>
                    </Form>
                <div className="mt-4">
                    <Link to={"/mis-afiliados"}>Volver a mis afiliados</Link>
                </div>
            
            </Card>
        }
        </>
    );
};

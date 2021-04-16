import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { Form, Button, Col, Card, InputGroup } from 'react-bootstrap';
import { SUPPLIERS_ENDPOINT, MOBILE_NUMBERS_ENDPOINT } from '../../helpers/endpoints';
import { getSuppliers } from './../../actions/suppliersAction';


//Validaciones de los campos del formulario
const schema = yup.object().shape({
    name: yup.string().required(),
    nif: yup.string().required(),
    email: yup.string().email().required()
});

export const AddSupplierForm = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const [errores, setErrores] = useState({});
    const [inputList, setInputList] = useState([{ mobileNumber: "", supplierNumber: id}]);
    const history = useHistory();

    //React Hook form estructura
    const {register, handleSubmit, setValue, formState: { errors }} = useForm({resolver: yupResolver(schema)});


    useEffect(() => {
        //Si existe un id en el parametro de la url entonces realizamos el fetch
        if(id) {
            const fetchData = async () => {
                try {
                    const resp = await axios.get(`${SUPPLIERS_ENDPOINT}/${id}`);
                    if(resp.data !== null) {
                        const {name, nif, email, webPage} = resp.data;
                        //Con estos setValues seteamos los values de los inputs del formulario, para que aparezcan rellenos con la informacion que nos devolvio el metodo get
                        setValue("name", name);  
                        setValue("nif", nif); 
                        setValue("webPage", webPage); 
                        setValue("email", email);  
                    }
                } catch (error) {
                    setErrores(error);
                    console.log(error);
                }
            }
            fetchData(); 
        }
    }, [id, setValue]);

 
    const onSubmit = async (data) => { 
        if(id) {
            try {
                const response = await axios.put(`${SUPPLIERS_ENDPOINT}/${id}`, data);
            } catch (error) {
                setErrores(error);
                console.log(error);
            }
        } else {
            try {
                const resp = await axios.post(SUPPLIERS_ENDPOINT, data);

                const addSuplierNumbers = async () => {
                    inputList.map((x)=> (
                        x.supplierNumber = resp.data.id
                    ));
                };
                await addSuplierNumbers();

                const supplierNumbers = async () => {
                    for (let i = 0; i < inputList.length; i++) {
                        const mobNumber = inputList[i];
                        await axios.post(MOBILE_NUMBERS_ENDPOINT, mobNumber);
                    }
                };
                await supplierNumbers();
            } catch (error) {
                setErrores(error);
                console.log(error);
            }
        }

        toast.info(`Proveedor ${id ? 'actualizado' : 'registrado'} satisfactoriamente.`, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        await dispatch(getSuppliers());
        history.push('/proveedores');
    };

    const handleInputChange = (e, index) => {
        e.preventDefault();
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };  

    const handleAddClick = (e) => {
        e.preventDefault();
        setInputList([...inputList, { mobileNumber: "", supplierNumber: id}]);
    };

    const handleRemoveInput = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    console.log(inputList);
    return (
        <Card body bg="dark" text="light" className="mt-5">
            <Card.Title>
                {
                    id 
                        ? (<h2>Actualizar proveedor</h2>) 
                        : (<h2>Registrar proveedor</h2>)
                }
            </Card.Title>
            <hr/>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Row>
                    <Form.Group as={Col} controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><FontAwesomeIcon icon={['fas', 'user-tie']} /></InputGroup.Text>
                                </InputGroup.Prepend>
                            <Form.Control 
                                className={`form-control ${errors?.name && "is-invalid"}`}
                                type="text" 
                                placeholder="Nombre" 
                                {...register('name')}
                                onChange={e => setValue("name", e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} controlId="nif">
                        <Form.Label>NIF</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text><FontAwesomeIcon icon={['fas', 'id-card']} /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                className={`form-control ${errors?.nif && "is-invalid"}`}
                                type="text" 
                                placeholder="NIF" 
                                {...register("nif")}
                                onChange={e => setValue("nif", e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text><FontAwesomeIcon icon={['fas', 'envelope']} /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                                className={`form-control ${errors?.email && "is-invalid"}`}
                                type="email" 
                                placeholder="Email"
                                {...register("email")} 
                                onChange={e => setValue("email", e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} controlId="webPage">
                        <Form.Label>Página web</Form.Label>
                        <InputGroup className="mb-2 mr-sm-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text><FontAwesomeIcon icon={['fas', 'file-alt']} /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"                           
                                placeholder="Página web" 
                                {...register("webPage",)} 
                                onChange={e => setValue("webPage", e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Form.Row>

                {
                    inputList.map((item, i) => (
                        <Form.Row key={i}>
                            <Form.Group as={Col}>
                                <Form.Label>Num. Tel</Form.Label>
                                <InputGroup className="mb-2">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text><FontAwesomeIcon icon={['fas', 'phone-alt']} /></InputGroup.Text>
                                    </InputGroup.Prepend>

                                    <Form.Control
                                        type="tel" 
                                        name="mobileNumber"
                                        value={item.mobileNumber}
                                        placeholder="Numero de telefono"
                                        onChange={(e) => handleInputChange(e, i)}
                                    />
                                </InputGroup>
                                
                            </Form.Group>
                            {
                                (inputList.length - 1 === i) 
                                    &&
                                    <div onClick={handleAddClick} className="mr-2 mt-4 text-primary">
                                        <FontAwesomeIcon icon={['fas', 'plus-circle']} size="2x"/>
                                    </div>
  
                            }
                            {
                                (inputList.length !== 1) 
                                    &&
                                    <div onClick={handleRemoveInput} className="mr-2 mt-4 text-danger">
                                        <FontAwesomeIcon icon={['fas', 'minus-circle']}size="2x"/>
                                    </div>
                            }
                        </Form.Row>
                    ))
                }
                <Button variant="secondary" size="lg" block type="submit">
                    {
                        id ? "Actualizar" : "Registrar"
                    }
                </Button>
            </Form>
            
           
            <Button size="sm" variant="light" type="button" as={NavLink} to={'/proveedores'} className="mt-4">
                <FontAwesomeIcon icon={['fas', 'list']}/> Volver a proveedores
            </Button>
            
        </Card>
    );
};

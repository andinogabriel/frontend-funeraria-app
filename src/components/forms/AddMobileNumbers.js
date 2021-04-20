import React from 'react';
import axios from 'axios';
import { Form, InputGroup, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AddMobileNumbers = ({inputList, deleteEndPoint, setInputList, initialValue}) => {

    const handleInputChange = (e, index) => {
        e.preventDefault();
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };


    const handleAddClick = (e) => {
        e.preventDefault();
        setInputList([...inputList, initialValue]); //aca va el objeto inicializador
    };

    const handleRemoveInput = async (e, index) => {
        e.preventDefault();
        setInputList((prev) => prev.filter((item) => item !== prev[index]));
        const mId = inputList[index].id;
        if(mId !== '') {
            try {
                await axios.delete(`${deleteEndPoint}/${mId}`);
            } catch (error) {
                console.log(error);
            }
        }
        
    };

    return (
        <>
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
                            <div onClick={(e) => handleRemoveInput(e, i)} className="mr-2 mt-4 text-danger">
                                <FontAwesomeIcon icon={['fas', 'minus-circle']}size="2x"/>
                            </div>
                    }
                </Form.Row>
            ))
        }
        </>
    );
};

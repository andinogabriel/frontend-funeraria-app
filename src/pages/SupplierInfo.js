import React, { useState } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SupplierInfo = ({supplier}) => {

    const [showModal, setShowModal] = useState(false);

    const {name, nif, webPage, email, mobileNumbers, addresses} = supplier;
    
    return (
        <div key={supplier.id}>
        <Button
            variant="info"
            className="mr-2"
            onClick={() => {
            setShowModal(true);
            }}
        >
            <FontAwesomeIcon icon={['fas', 'info-circle']} />
        </Button>
        <Modal 
            onHide={() => setShowModal(false)} 
            show={showModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup.Item>NIF: {nif}</ListGroup.Item>
                <ListGroup.Item>Email: {email}</ListGroup.Item>
                <ListGroup.Item>Email:{supplier?.webPage ? webPage : " No tiene. "}</ListGroup.Item>
                <ListGroup.Item>Numeros de telefono: 
                    {
                        supplier?.mobileNumbers.length > 0 
                            ?
                            supplier.mobileNumbers.map(m => (
                                " " + m.mobileNumber + " - "
                            ))
                            :
                            " No tiene."
                    }
                </ListGroup.Item>
                     
                {/*
                    <ListGroup.Item>
                    {
                        supplier?.addresses.length > 0 
                            ?
                            supplier.addresses.map(m => (
                            <ListGroup.Item>
                                Ciudad: {m.addresses?.city ? city.name : " No tiene."}
                                Calle: {m.addresses?.streetName ? streetName : " No tiene."}
                                Altura: {m.addresses?.blockStreet ? blockStreet : " No tiene."}
                                Piso: {m.addresses?.flat ? flat : " No tiene."}
                            </ListGroup.Item>
                            ))
                            :
                            " No tiene."
                    }
                    </ListGroup.Item> 
                */}
 
            </Modal.Body>
        </Modal>
        </div>
    );
};

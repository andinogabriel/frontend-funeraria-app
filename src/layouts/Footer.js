import React from 'react';
import {Navbar, Container, Col} from 'react-bootstrap';

export const Footer = () => {

    let fullYear = new Date().getFullYear();

    return (
        <Navbar fixed="bottom" bg="dark" variant="dark" expand="lg">
            <Container>
                <Col lg={12} className="text-center text-muted">
                    <div>2021-{fullYear}, Proyecto Diseño de Sistemas</div>
                </Col>
            </Container>
        </Navbar>
    );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { logoutUser } from './../actions/authActions';


export const Navigation = () => {

    const {loggedIn} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser());
    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={NavLink} to={'/'}>
                <img src="https://img.icons8.com/ios/452/coffin.png" width="25" height="25" alt="brand"/>
                Funeraria Nuñez y Hnos.</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    
                    <Nav.Link as={NavLink} to={'/services'}>Servicio</Nav.Link>
                    
                    <Nav.Link href="#pricing">Afiliación</Nav.Link>
                </Nav>

                <Nav>
                    {
                        !loggedIn 
                            ?
                            (
                                <>
                                    <Nav.Link as={NavLink} to={'/signup'}>Crear cuenta</Nav.Link>
                                    <Nav.Link as={NavLink} to={'/signin'}>Iniciar sesión</Nav.Link>
                                </>
                            )
                            :
                            (
                                <NavDropdown title="UserName" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Mis datos</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Mis afiliados</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout}>Cerrar sesión</NavDropdown.Item>
                                </NavDropdown>
                            )
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

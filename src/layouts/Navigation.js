import React, { useState } from 'react'
import { Link as RouterLink, NavLink } from "react-router-dom";
import { Typography } from '@mui/material';
import { Menu, Close } from '@mui/icons-material';


const logoutHeadersData = [
    {
        label: "Articulos",
        href: "/articulos",
    },
    {
        label: "Servicio",
        href: "/services",
    },
    {
        label: "Iniciar sesión",
        href: "/signin",
    },
    {
        label: "Registrarse",
        href: "/signup",
    },
];


export const Navigation = () => {

    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const close = () => setClick(false);

    return (
        <div>
            <div className={click ? "main-container" : ""} onClick={()=>close()}>
                <nav className="navbar" onClick={(e)=>e.stopPropagation()}>
                    <div className="nav-container">
                        <Typography variant="h6" component={RouterLink} to="/" className="nav-logo">
                            Funeraria Nuñez y Hnos.
                        </Typography>
                        <ul className={click ? "nav-menu active" : "nav-menu"}>
                            
                            {
                                logoutHeadersData.map(({label, href}, i) => (
                                    <li className="nav-item" key={i}>
                                        <NavLink
                                            exact
                                            to={href}
                                            activeClassName="active"
                                            className="nav-links"
                                            onClick={click ? handleClick : null}
                                        >
                                            {label}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>

                        <div className="nav-icon" onClick={handleClick}>
                            {click ? <Close/> : <Menu/>}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

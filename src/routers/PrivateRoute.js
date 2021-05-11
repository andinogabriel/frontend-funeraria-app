import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

//...rest es el resto de todos los argumentos
export const PrivateRoute = ({isAuthenticated, component: Component, ...rest}) => {

    //Obtenemos el pathname en donde se encuentra el usuario en la aplicacion

    return (
        //La ruta tendra todas las propiedas
        <Route {...rest}
            //El componente que voy a mostrar depende de una condicion.
            /*Se llama con el callback para obtener como estaba el componente antes,
            para obtener todos los props anteriores, history, location, params, etc. 
            */
            component={ (props) => (
                (isAuthenticated) 
                    ? <Component {...props}/> //si es true, renderizo el componente al que el usuario quiere entrar, le paso con todo sus props.
                    : <Redirect to="/signin"/> //Sino que lo mande al login
            )}
        />
    );
};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
};

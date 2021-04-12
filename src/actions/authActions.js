import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { types } from './../types/types';
import { setAuthToken } from './../helpers/setAuthToken';
import { LOGIN_ENDPOINT, USERS_ENDPOINT } from './../helpers/endpoints';


//Dispatch en caso de llamar a otra accion
export const startLoginUser = (userData) => dispatch => {
    
    return new Promise((resolve, reject) => {
        axios.post(LOGIN_ENDPOINT, userData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            
            //Procesamos lo que viene del backend
            const {authorization} = response.headers;
    
            //Creamos una key en localStorage llamada jwtToken y le damos el value authotization que es el token que viene del header del backend
            localStorage.setItem('jwtToken', authorization);
            
            
            const decoded = jwt_decode(authorization); //Decodificamos lo que esta en authorization

            //Crear funcion para añadir token a axios, para que en cada peticion se envie el token automaticamente para no estar poniendole en los headers
            setAuthToken(authorization);
           
            dispatch(setCurrentUser({
                user: decoded,
                loggedIn: true
            }));

            
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
                     
};

export const setCurrentUser = ({user, loggedIn}) => ({
    //Hay que pasarle el tipo y el payload para que en el reducer se puedan tomar decisiones y cambiar el estado en el reducer
    type: types.setCurrentUser,
    payload: {user, loggedIn}
});

export const logoutUser = () => dispatch => {
    //Removemos la key jwtToken de nuestro localStorage
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({
        user: {},
        loggedIn: false
    }));
};

export const registerUser = (userData) => dispatch => {
    
    return new Promise((resolve, reject) => {
        axios.post(USERS_ENDPOINT, userData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            resolve(response);
        })
        .catch(error => {
            reject(error);
        });
    });
                     
};
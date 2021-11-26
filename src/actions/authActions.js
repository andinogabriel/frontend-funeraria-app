import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { types } from './../types/types';
import { setAuthToken } from './../helpers/setAuthToken';
import { LOGIN_ENDPOINT, USERS_ENDPOINT } from './../helpers/endpoints';


//Dispatch en caso de llamar a otra accion
export const startLoginUser = (userData, setErrores) =>  {
    return async (dispatch) => {
        try {
            const resp  = await axios.post(LOGIN_ENDPOINT, userData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const {authorization, authorities} = resp.data;

            //Si es un usuario valido el endpoint de login devuelve el token
            
            //Creamos una key en localStorage llamada jwtToken y le damos el value authorization que es el token que viene del login del backend
            localStorage.setItem('jwtToken', authorization);

            const decoded = jwt_decode(authorization); //Decodificamos lo que esta en token

            //Crear funcion para añadir token a axios, para que en cada peticion se envie el token automaticamente para no estar poniendole en los headers
            setAuthToken(authorization);

            //Transformamos el array de objectos autoridad a un array que solo contiene los valores de la autoridad
            let userRoles = authorities.map(({authority}) => authority);
            const response = await axios.get(`${USERS_ENDPOINT}/me`);
            const {firstName, lastName} = response.data;
            dispatch(setCurrentUser({
                user: {
                    ...decoded,
                    lastName,
                    firstName,
                    userRoles
                },
                loggedIn: true,
                fetched: true
            }));
          
            
        } catch (error) {
            setErrores(error?.response?.data?.message);
            console.log(error?.response?.data);
        }
    };
    
                     
};

export const setCurrentUser = ({user, loggedIn, fetched}) => ({
    //Hay que pasarle el tipo y el payload para que en el reducer se puedan tomar decisiones y cambiar el estado en el reducer
    type: types.setCurrentUser,
    payload: {user, loggedIn, fetched: true}
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
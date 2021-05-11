import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { types } from './../types/types';
import { setAuthToken } from './../helpers/setAuthToken';
import { LOGIN_ENDPOINT, USERS_ENDPOINT } from './../helpers/endpoints';


//Dispatch en caso de llamar a otra accion
export const startLoginUser = (userData) =>  {
    
    return async (dispatch) => {
        try {
            const resp  = await axios.post(LOGIN_ENDPOINT, userData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            const {authorization} = resp.headers;
            

            //Creamos una key en localStorage llamada jwtToken y le damos el value authotization que es el token que viene del header del backend
            localStorage.setItem('jwtToken', authorization);

            const decoded = jwt_decode(authorization); //Decodificamos lo que esta en authorization

            //Crear funcion para añadir token a axios, para que en cada peticion se envie el token automaticamente para no estar poniendole en los headers
            setAuthToken(authorization);

            try {
                const response  = await axios.get(USERS_ENDPOINT);
                const {firstName, lastName} = response.data;
                dispatch(setCurrentUser({
                    user: {
                        ...decoded,
                        lastName,
                        firstName
                    },
                    loggedIn: true,
                    fetched: true
                }));
            } catch (error) {
                console.log(error);
            }
            
        } catch (error) {
            console.log(error);
            console.log(error.response.data.message);
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
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from './setAuthToken';
import { store } from './../store/store';
import { setCurrentUser } from '../actions/authActions';
import { logoutUser } from './../actions/authActions';
import { USERS_ENDPOINT } from './endpoints';

export const tokenCheck = async () => {
    //si tenemos el token en localStorage lo traemos
    if(localStorage.jwtToken) {
        //Si tenemos lo seteamos
        setAuthToken(localStorage.jwtToken);

        const decoded = jwt_decode(localStorage.jwtToken); //Decodificamos lo que esta en authorization
       
        try {
            const getUser = await axios.get(USERS_ENDPOINT, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
               }
            });
            
            const { lastName, firstName } = getUser.data;
            //console.log(lastName, firstName);
            //Seteamos en nuestro store de User
            store.dispatch(setCurrentUser({
                user: {
                    ...decoded,
                    lastName,
                    firstName
                },
                loggedIn: true
            }));
        } catch (error) {
            console.log(error);
        }

        const currentTime = Math.floor(Date.now() / 1000); //Obtenemos los ms del tiempo actual

        //decode.exp tiene la fecha en que el token vence
        if(decoded.exp < currentTime) {
            //Si esta vencido el token
            store.dispatch(logoutUser());
            window.location.href = "/signin";
        }

    }

};
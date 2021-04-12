import axios from 'axios';

export const setAuthToken = (token) => {
    //si el token existe
    if(token) {
        //Le ponemos en el header de axios el token Authorization.
        //Seteamos el Authorization header al axios para cuando hagamos peticiones no repetir cada rato
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

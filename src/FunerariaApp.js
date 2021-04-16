import React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';
import { tokenCheck } from './helpers/tokenCheck';


//Configuracion global de dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/es';

import './helpers/fontawesome'; //Importamos nuestra libreria de fontAwesome
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';


dayjs.locale('es');
tokenCheck();


export const FunerariaApp = () => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    );
};

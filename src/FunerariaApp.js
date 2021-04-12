import React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';


import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { tokenCheck } from './helpers/tokenCheck';

tokenCheck();
export const FunerariaApp = () => {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    );
};

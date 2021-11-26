import React from 'react';
import { PrivateRoute } from '../PrivateRoute';
import { Entries } from '../../pages/Entries';
import { AddOrUpdateEntry } from '../../pages/AddOrUpdateEntry';


export const EntriesRouter = ({isAuthenticated}) => {
    return (
        <>
            <PrivateRoute
                exact path="/ingresos"
                component={ Entries}
                isAuthenticated={ isAuthenticated }
            />

            <PrivateRoute
                exact path="/agregar-ingreso"
                component={ AddOrUpdateEntry}
                isAuthenticated={ isAuthenticated }
            />

            <PrivateRoute
                exact path="/editar-ingreso/:id"
                component={ AddOrUpdateEntry}
                isAuthenticated={ isAuthenticated }
            />

            
        </>
    )
}

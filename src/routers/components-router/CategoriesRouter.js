import React from 'react';
import { PrivateRoute } from '../PrivateRoute';
import { Categories } from './../../pages/Categories';
import { AddOrUpdateCategory } from './../../pages/AddOrUpdateCategory';

export const CategoriesRouter = ({isAuthenticated}) => {
    
    return (
        <>
            <PrivateRoute
                exact path="/categorias"
                component={ Categories}
                isAuthenticated={ isAuthenticated }
            />

            <PrivateRoute
                exact path="/agregar-categoria"
                component={ AddOrUpdateCategory}
                isAuthenticated={ isAuthenticated }
            />

            <PrivateRoute
                exact path="/editar-categoria/:id"
                component={ AddOrUpdateCategory}
                isAuthenticated={ isAuthenticated }
            />

            
        </>
    )
}

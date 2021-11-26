import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Navigation } from './../layouts/Navigation';
import { Home } from './../pages/Home';
import { SignUp } from './../pages/SignUp';
import { SignIn } from './../pages/SignIn';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { Affiliates } from './../pages/Affiliates';
import { Suppliers } from './../pages/Suppliers';
import { AddOrUpdateSupplier } from '../pages/AddOrUpdateSupplier';
import { AffiliateForm } from './../components/forms/AffiliateForm';
import { Footer } from '../layouts/Footer';
import { AddOrUpdateItem } from './../pages/AddOrUpdateItem';
import { Items } from './../pages/Items';
import { AddOrUpdateBrand } from './../pages/AddOrUpdateBrand';
import { Brands } from './../pages/Brands';
import { ROLE_ADMIN } from './../helpers/constants';
import { Container } from '@material-ui/core';
import { CategoriesRouter } from './components-router/CategoriesRouter';
import { EntriesRouter } from './components-router/EntriesRouter';
import { OurServices } from './../pages/OurServices';



export const AppRouter = () => {

    const {loggedIn, user, fetched} = useSelector(state => state.auth);
    const { userRoles } = user;
    
    return (
        <Router>
             <div>
                <Navigation/>
                <Container>
                    <ToastContainer/> 
                    <Switch>

                        <Route 
                            exact path="/" 
                            component={ Home } 
                        />

                        <PublicRoute 
                            exact path="/signup" 
                            component={ SignUp } 
                            isAuthenticated={ loggedIn }
                        />
                        <PublicRoute 
                            exact path="/signin" 
                            component={ SignIn } 
                            isAuthenticated={ loggedIn }
                        />
                        <Route
                            exact path="/services" 
                            component={ OurServices }
                        />

                        {
                            fetched && userRoles?.includes(ROLE_ADMIN) !== undefined
                                &&
                                <>
                                    <PrivateRoute
                                        exact path="/proveedores"
                                        component={ Suppliers}
                                        isAuthenticated={ userRoles?.includes(ROLE_ADMIN) }
                                    />
                                    <PrivateRoute
                                        exact path="/proveedor-formulario"
                                        component={ AddOrUpdateSupplier }
                                        isAuthenticated={ userRoles?.includes(ROLE_ADMIN) }
                                    />
                                    <PrivateRoute
                                        exact path="/editar-proveedor/:id"
                                        component={ AddOrUpdateSupplier}
                                        isAuthenticated={ userRoles?.includes(ROLE_ADMIN) }
                                    />
                                    <PrivateRoute
                                        exact path="/articulos"
                                        component={ Items}
                                        isAuthenticated={ userRoles?.includes(ROLE_ADMIN) }
                                    />
                                    <PrivateRoute
                                        exact path="/articulo-formulario"
                                        component={ AddOrUpdateItem}
                                        isAuthenticated={ userRoles?.includes(ROLE_ADMIN) }
                                    />
                                    
                                    <PrivateRoute
                                        exact path="/editar-articulo/:id"
                                        component={ AddOrUpdateItem}
                                        isAuthenticated={ userRoles?.includes(ROLE_ADMIN) }
                                    />

                            
                                    <PrivateRoute
                                        exact path="/marcas"
                                        component={ Brands}
                                        isAuthenticated={ userRoles?.includes(ROLE_ADMIN) }
                                    />

                                    <PrivateRoute
                                        exact path="/agregar-marca"
                                        component={ AddOrUpdateBrand}
                                        isAuthenticated={ userRoles?.includes(ROLE_ADMIN) }
                                    />

                                    <PrivateRoute
                                        exact path="/editar-marca/:id"
                                        component={ AddOrUpdateBrand}
                                        isAuthenticated={ userRoles?.includes(ROLE_ADMIN) }
                                    />

                                    <CategoriesRouter isAuthenticated={ userRoles?.includes(ROLE_ADMIN) }/>

                                    <EntriesRouter isAuthenticated={ userRoles?.includes(ROLE_ADMIN) }/>
                        
                                </>
                        }

                        <PrivateRoute
                            exact path="/mis-afiliados"
                            component={ Affiliates}
                            isAuthenticated={ loggedIn }
                        />

                        <Route
                            exact path="/afiliado-form"
                            component={ AffiliateForm}
                            
                        />

        
                        <Redirect to="/" /> 
                    </Switch>
        
                </Container>
            </div>
            
            
        </Router>
    );
};
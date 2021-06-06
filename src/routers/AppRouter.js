import { Container } from 'react-bootstrap';
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
import { AddAddressForm } from './../components/forms/AddAddressForm';
import { AddOrUpdateItem } from './../pages/AddOrUpdateItem';
import { Items } from './../pages/Items';
import { AddOrUpdateBrand } from './../pages/AddOrUpdateBrand';
import { Brands } from './../pages/Brands';
import { AddOrUpdateEntry } from './../pages/AddOrUpdateEntry';
import { ROLE_ADMIN } from './../helpers/constants';



export const AppRouter = () => {

    const {loggedIn, user, fetched} = useSelector(state => state.auth);
    const { userRoles } = user;

    return (
        <Router>
             <div>
                <Navigation/>
            </div>
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
                    <PrivateRoute
                        exact path="/mis-afiliados"
                        component={ Affiliates}
                        isAuthenticated={ loggedIn }
                    />

                    <PrivateRoute
                        exact path="/afiliado-form"
                        component={ AffiliateForm}
                        isAuthenticated={ loggedIn }
                    />

                  
                    <PrivateRoute
                        exact path="/proveedores"
                        component={ Suppliers}
                        isAuthenticated={ userRoles?.includes(ROLE_ADMIN) }
                    />
                    

                    <PrivateRoute
                        exact path="/proveedor-formulario"
                        component={ AddOrUpdateSupplier }
                        isAuthenticated={ loggedIn }
                    />

                    <PrivateRoute
                        exact path="/editar-proveedor/:id"
                        component={ AddOrUpdateSupplier}
                        isAuthenticated={ loggedIn }
                    />

                    <PrivateRoute
                        exact path="/address"
                        component={ AddAddressForm}
                        isAuthenticated={ loggedIn }
                    />

                    <Route
                        exact path="/articulo-formulario"
                        component={ AddOrUpdateItem}
                    />

                    <Route
                        exact path="/editar-articulo/:id"
                        component={ AddOrUpdateItem}
                    />

                    <Route
                        exact path="/articulos"
                        component={ Items}
                    />

                    <Route
                        exact path="/marcas"
                        component={ Brands}
                    />

                    <Route
                        exact path="/agregar-marca"
                        component={ AddOrUpdateBrand}
                    />

                    <Route
                        exact path="/editar-marca/:id"
                        component={ AddOrUpdateBrand}
                    />

                    <Route
                        exact path="/agregar-ingreso"
                        component={ AddOrUpdateEntry}
                    />
                   
                    <Redirect to="/" /> 
                </Switch>
            </Container>
            <Footer/>
        </Router>
    );
};
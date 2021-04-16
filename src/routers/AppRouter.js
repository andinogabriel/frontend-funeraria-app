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
import { AffiliateForm } from './../components/forms/AffiliateForm';
import { AddSupplierForm } from './../components/forms/AddSupplierForm';


export const AppRouter = () => {

    const {loggedIn} = useSelector(state => state.auth);


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

                    <Route
                        exact path="/proveedores"
                        component={ Suppliers}
                        isAuthenticated={ loggedIn }
                    />

                    <Route
                        exact path="/proveedor-formulario"
                        component={ AddSupplierForm}
                        isAuthenticated={ loggedIn }
                    />

                    <Route
                        exact path="/editar-proveedor/:id"
                        component={ AddSupplierForm}
                        isAuthenticated={ loggedIn }
                    />
                   
                    <Redirect to="/" /> 
                </Switch>
            </Container>
            
        </Router>
    );
};
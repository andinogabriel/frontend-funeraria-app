import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigation } from './../layouts/Navigation';
import { Home } from './../pages/Home';
import { SignUp } from './../pages/SignUp';
import { SignIn } from './../pages/SignIn';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const {loggedIn} = useSelector(state => state.auth);


    return (
        <Router>
             <div>
                <Navigation/>
            </div>
            <Container>
                
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
                   
                    <Redirect to="/" /> 
                </Switch>
            </Container>
            
        </Router>
    );
};
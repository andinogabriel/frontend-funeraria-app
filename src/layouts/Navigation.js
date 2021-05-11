import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { logoutUser } from './../actions/authActions';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

export const Navigation = () => {

    const {loggedIn, user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const logout = () => {
        dispatch(logoutUser());
    };

    /*
    const handleChange = (event) => {
        setAuth(event.target.checked);
    }; */
    
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
      const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>  
            <AppBar position="static" style={{ background: '#29323c' }}>
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title} component={NavLink} to="/" style={{ color: '#FFF',  textDecoration: 'none' }}>
                    Funeraria Nuñez y Hnos.
                </Typography>
                {auth && (
                    <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        { loggedIn === true && `${user.lastName} ${user.firstName}`} 
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        autoFocus
                        anchorEl={anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}

                    >
                        {
                            !loggedIn 
                                ?
                                <div>
                                    <MenuItem onClick={handleClose} component={Link} to="/signup">Crear cuenta</MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} to="/signin">Iniciar sesión</MenuItem>
                                </div>
                                :
                                <div>
                                    <MenuItem onClick={handleClose} component={Link} to="/mis-afiliados">Mis afiliados</MenuItem>
                                    <MenuItem onClick={handleClose} component={Link} to="/proveedores">Proveedores</MenuItem>
                                    <MenuItem onClick={logout}>Cerrar sesión</MenuItem>
                                </div>
                        }
                        
                    </Menu>
                    </div>
                )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

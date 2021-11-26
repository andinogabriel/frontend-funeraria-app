import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AssignmentReturned, Category, Storefront, Menu, ListAlt, BrandingWatermark } from '@material-ui/icons';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export const AdminSidebar = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button component={Link} to="/proveedores">
            <ListItemIcon><Storefront/></ListItemIcon>
            <ListItemText primary="Proveedores" />
        </ListItem>
        <ListItem button component={Link} to="/articulos">
            <ListItemIcon><ListAlt/></ListItemIcon>
            <ListItemText primary="Articulos" />
        </ListItem>
        <ListItem button component={Link} to="/marcas">
            <ListItemIcon><BrandingWatermark/></ListItemIcon>
            <ListItemText primary="Marcas" />
        </ListItem>
        <ListItem button component={Link} to="/categorias">
            <ListItemIcon><Category/></ListItemIcon>
            <ListItemText primary="Categorías" />
        </ListItem>
        <ListItem button component={Link} to="/ingresos">
            <ListItemIcon><AssignmentReturned/></ListItemIcon>
            <ListItemText primary="Ingresos" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
        <Menu onClick={toggleDrawer("left", true)}/>
        <Drawer anchor="left" open={state["left"]} onClose={toggleDrawer("left", false)}>
            {list('left')}
        </Drawer>
    </>
  );
}

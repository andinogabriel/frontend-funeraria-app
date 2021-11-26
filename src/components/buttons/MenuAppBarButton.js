import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IconButton, Button, MenuItem, Avatar, ListItemIcon, Tooltip, Divider } from '@material-ui/core';
import { Logout, Menu,  Settings  } from '@material-ui/icons';
import { ROLE_ADMIN } from './../../helpers/constants';
import { logoutUser } from './../../actions/authActions';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


export const MenuAppBarButton = () => {

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <React.Fragment>
                <IconButton variant="contained" {...bindTrigger(popupState)} size="small" sx={{ ml: 2 }}>
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                    <MenuItem onClick={popupState.close}>Profile</MenuItem>
                    <MenuItem onClick={popupState.close}>My account</MenuItem>
                    <MenuItem onClick={popupState.close}>Logout</MenuItem>
                </Menu>
                </React.Fragment>
            )}
        </PopupState>
    );
};

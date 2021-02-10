import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from './DrawerToggle/DrawerToggle';

interface ToolbarProps {
    isAuth?: boolean;
    drawerTogglerClicked?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Toolbar: React.FC<ToolbarProps> = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerTogglerClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>
);

export default Toolbar;
import React, { useState } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store';

const Layout: React.FC = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const isAuthenticated = useSelector((state: ApplicationState) => state.auth.token !== null);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(prev => !prev)
    }

    return (
        <>
            <Toolbar
                isAuth={isAuthenticated}
                drawerTogglerClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={isAuthenticated}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
    );
}

export default Layout;
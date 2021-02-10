import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NagibationItem/NavigationItem';

interface NavigationItemsProps {
    isAuthenticated?: boolean;
}

const NavigationItems: React.FC<NavigationItemsProps> = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
            Burger Builder
        </NavigationItem>
        {props.isAuthenticated
            ? (
                <NavigationItem link="/orders">
                    Orders
                </NavigationItem>
            )
            : null}

        {!props.isAuthenticated
            ? (
                <NavigationItem link="/auth">
                    Authenticate
                </NavigationItem>
            )
            : (
                <NavigationItem link="/logout">
                    Logout
                </NavigationItem>
            )
        }
    </ul>
);

export default NavigationItems;
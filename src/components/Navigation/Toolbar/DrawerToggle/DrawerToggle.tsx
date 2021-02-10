import React from 'react';

import classes from './DrawerToggle.module.css';

interface DrawerToggleProps {
    clicked?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DrawerToggle: React.FC<DrawerToggleProps> = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;
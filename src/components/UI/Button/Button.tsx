import React from 'react';

import classes from './Button.module.css';

interface ButtonProps {
    disabled?: boolean;
    btnType: 'Success' | 'Danger';
    type?: "button" | "submit" | "reset";
    clicked?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        type={props.type}
        onClick={props.clicked}

    >
        {props.children}
    </button>
);

export default Button;
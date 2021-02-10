import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

interface BuildControlsProps {
    price: number;
    disabled: { [key: string]: boolean };
    purchasable?: boolean;
    isAuth?: boolean;
    ordered: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    ingridientAdded: (type: string) => void;
    ingridientRemoved: (type: string) => void;
}

const BuildControls: React.FC<BuildControlsProps> = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => props.ingridientAdded(ctrl.type)}
                    removed={() => props.ingridientRemoved(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
            >
                {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            </button>
        </div>
    );

};

export default BuildControls;
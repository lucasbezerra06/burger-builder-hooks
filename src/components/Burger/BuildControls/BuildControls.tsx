import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import { useBurgerBuilderStore } from '../../../burgerBuilderStore';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

interface BuildControlsProps {
    disabled: { [key: string]: boolean };
    isAuth?: boolean;
    ordered: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BuildControls: React.FC<BuildControlsProps> = (props) => {
    const totalPrice = useBurgerBuilderStore(state => state.totalPrice);
    const purchasable = useBurgerBuilderStore(state => state.purchasable);

    const addIngredient = useBurgerBuilderStore(state => state.addIngredient);
    const removeIngredient = useBurgerBuilderStore(state => state.removeIngredient);

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{totalPrice.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={() => addIngredient(ctrl.type)}
                    removed={() => removeIngredient(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}
                />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!purchasable}
                onClick={props.ordered}
            >
                {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            </button>
        </div>
    );

};

export default BuildControls;
import React from 'react';
import { Ingredients } from '../../../store/ducks/burgerBuilder/types';
import Button from '../../UI/Button/Button';

interface OrderSummaryProps {
    price: number;
    ingredients: Ingredients | null;
    purchaseCancelled: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    purchaseContinued: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = (props) => {
    const ingredientSummary = Object.keys(props.ingredients ? props.ingredients : {})
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients ? props.ingredients[igKey] : 0}
                </li>
            );
        })

    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </>
    );
}

export default OrderSummary;
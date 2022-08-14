import React from 'react';
import shallow from 'zustand/shallow';
import { useBurgerBuilderStore } from '../../../stores/burgerBuilderStore';
import Button from '../../UI/Button/Button';

interface OrderSummaryProps {
    purchaseCancelled: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    purchaseContinued: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = (props) => {
    const totalPrice = useBurgerBuilderStore(state => state.totalPrice);
    const ingredients = useBurgerBuilderStore(state => state.ingredients, shallow);

    const ingredientSummary = Object.keys(ingredients ? ingredients : {})
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ingredients ? ingredients[igKey] : 0}
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
            <p><strong>Total Price: {totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </>
    );
}

export default OrderSummary;
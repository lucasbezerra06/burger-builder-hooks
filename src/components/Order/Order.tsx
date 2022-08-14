import React from 'react';
import { Ingredients } from '../../burgerBuilderStore';

import classes from './Order.module.css';

interface OrderProps {
    ingredients: Ingredients | null;
    price: number;
}

const Order: React.FC<OrderProps> = (props) => {

    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = ingredients.map(ig => (
        <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>{ig.name} ({ig.amount}) </span>
    ));

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );

};

export default Order;
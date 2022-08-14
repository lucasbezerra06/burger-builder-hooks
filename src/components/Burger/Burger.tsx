import React from 'react';
import shallow from 'zustand/shallow';

import { useBurgerBuilderStore } from '../../burgerBuilderStore';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const Burger: React.FC = (props) => {
    const ingredients = useBurgerBuilderStore(state => state.ingredients, shallow);

    let transformedIngredients: JSX.Element[] | JSX.Element = ingredients ? Object.keys(ingredients)
        .map(igKey => {
            return [...Array(ingredients[igKey])]
                .map((_, i) => (
                    <BurgerIngredient key={igKey + i} type={igKey} />
                ))
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []) : [];
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
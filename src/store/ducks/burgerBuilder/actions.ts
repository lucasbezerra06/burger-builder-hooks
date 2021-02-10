import { action } from 'typesafe-actions';
import { BurgerBuilderTypes, Ingredients } from './types';

export const addIngredient = (type: string) => action(BurgerBuilderTypes.ADD_INGREDIENT, { type });

export const removeIngredient = (type: string) => action(BurgerBuilderTypes.REMOVE_INGREDIENT, { type });

export const setIngredients = (ingredients: Ingredients) => action(BurgerBuilderTypes.SET_INGREDIENTS, { ingredients });

export const fetchIngredientsFailed = () => action(BurgerBuilderTypes.FETCH_INGREDIENTS_FAILED);

export const initIngredients = () => action(BurgerBuilderTypes.INIT_INGREDIENTS);
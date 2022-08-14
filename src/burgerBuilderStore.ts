import create from 'zustand';
import { updateObject } from './shared/utility';

const INGREDIENT_PRICES: Ingredients = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

export interface Ingredients {
    [key: string]: number;
}

const updatePurchaseState = (ingredients: Ingredients) => {
    const sum = Object.keys(ingredients)
        .map(ingrKeys => ingredients[ingrKeys])
        .reduce((prev, curr) => prev + curr, 0);
    return sum > 0;
}

export const useBurgerBuilderStore = create<{
    ingredients: null | Ingredients;
    totalPrice: number;
    purchasable: boolean;
    error: boolean;
    building: boolean;
    addIngredient: (type: string) => void;
    removeIngredient: (type: string) => void;
    setIngredients: (ingredients: Ingredients) => void;
    fetchIngredientsFailed: () => void;
}>((set) => ({
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    error: false,
    building: false,
    addIngredient: (type) => set((state) => {
        const updateIngredient: any = { [type]: state.ingredients![type] + 1 }
        const updatedIngredients = updateObject<Ingredients>(state.ingredients!, updateIngredient);
        return ({
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[type],
            purchasable: updatePurchaseState(updatedIngredients),
            building: true,
        })
    }),
    removeIngredient: (type) => set((state) => {
        const updateIngredient: any = { [type]: state.ingredients![type] - 1 }
        const updatedIngredients = updateObject<Ingredients>(state.ingredients!, updateIngredient);
        return ({
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice - INGREDIENT_PRICES[type],
            purchasable: updatePurchaseState(updatedIngredients),
            building: true,
        })
    }),
    setIngredients: (ingredients) => set((state) => {
        return ({
            ingredients: {
                salad: ingredients.salad,
                bacon: ingredients.bacon,
                cheese: ingredients.cheese,
                meat: ingredients.meat,
            },
            totalPrice: 4,
            error: false,
            building: false,
        });
    }),
    fetchIngredientsFailed: () => set((state) => ({ error: true }))
}))
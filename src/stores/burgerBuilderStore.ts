import create from 'zustand';
import z from 'zod';

import axios from '../axios-orders';
import { updateObject } from '../shared/utility';

const ingredientsValidator = z.record(z.number());

export type IngredientsType = z.infer<typeof ingredientsValidator>;

const INGREDIENT_PRICES: IngredientsType = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const updatePurchaseState = (ingredients: IngredientsType) => {
    const sum = Object.keys(ingredients)
        .map(ingrKeys => ingredients[ingrKeys])
        .reduce((prev, curr) => prev + curr, 0);
    return sum > 0;
}

export const useBurgerBuilderStore = create<{
    ingredients: null | IngredientsType;
    totalPrice: number;
    purchasable: boolean;
    error: boolean;
    building: boolean;
    addIngredient: (type: string) => void;
    removeIngredient: (type: string) => void;
    initIngredients: () => void;
}>((set) => ({
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    error: false,
    building: false,
    addIngredient: (type) => set((state) => {
        const updateIngredient: any = { [type]: state.ingredients![type] + 1 }
        const updatedIngredients = updateObject<IngredientsType>(state.ingredients!, updateIngredient);
        return ({
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[type],
            purchasable: updatePurchaseState(updatedIngredients),
            building: true,
        })
    }),
    removeIngredient: (type) => set((state) => {
        const updateIngredient: any = { [type]: state.ingredients![type] - 1 }
        const updatedIngredients = updateObject<IngredientsType>(state.ingredients!, updateIngredient);
        return ({
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice - INGREDIENT_PRICES[type],
            purchasable: updatePurchaseState(updatedIngredients),
            building: true,
        })
    }),
    initIngredients: async () => {
        try {
            const response = await axios.get('https://react-my-burger-14162.firebaseio.com/ingredients.json');
            const ingredients = ingredientsValidator.parse(response.data);
            set((state) => ({
                ingredients: {
                    salad: ingredients.salad,
                    bacon: ingredients.bacon,
                    cheese: ingredients.cheese,
                    meat: ingredients.meat,
                },
                totalPrice: 4,
                error: false,
                building: false,
            }))
        } catch (err) {
            set((state) => ({ error: true }));
        }
    }
}))
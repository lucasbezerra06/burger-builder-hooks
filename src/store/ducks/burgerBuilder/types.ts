/**
 * Action types
 */
export enum BurgerBuilderTypes {
    ADD_INGREDIENT = '@burgerBuilder/ADD_INGREDIENT',
    REMOVE_INGREDIENT = '@burgerBuilder/REMOVE_INGREDIENT',
    SET_INGREDIENTS = '@burgerBuilder/SET_INGREDIENTS',
    FETCH_INGREDIENTS_FAILED = '@burgerBuilder/FETCH_INGREDIENTS_FAILED',
    INIT_INGREDIENTS = '@burgerBuilder/INIT_INGREDIENTS',
}

export interface Ingredients {
    [key: string]: number;
}

export interface BurgerBuilderState {
    ingredients: null | Ingredients;
    totalPrice: number;
    purchasable: boolean;
    error: boolean;
    building: boolean;
}
import { AnyAction, Reducer } from 'redux';
import { updateObject } from '../../../shared/utility';
import { BurgerBuilderState, BurgerBuilderTypes, Ingredients } from './types';

const INGREDIENT_PRICES: Ingredients = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

const initialState: BurgerBuilderState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    error: false,
    building: false,
};

const updatePurchaseState = (ingredients: Ingredients) => {
    const sum = Object.keys(ingredients)
        .map(ingrKeys => ingredients[ingrKeys])
        .reduce((prev, curr) => prev + curr, 0);
    return sum > 0;
}

const addIngredient = (state: BurgerBuilderState, action: AnyAction) => {
    const updateIngredient: any = { [action.payload.type]: state.ingredients![action.payload.type] + 1 }
    const updatedIngredients = updateObject<Ingredients>(state.ingredients!, updateIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.type],
        purchasable: updatePurchaseState(updatedIngredients),
        building: true,
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state: BurgerBuilderState, action: AnyAction) => {
    const updateIngredient: any = { [action.payload.type]: state.ingredients![action.payload.type] - 1 }
    const updatedIngredients = updateObject<Ingredients>(state.ingredients!, updateIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.type],
        purchasable: updatePurchaseState(updatedIngredients),
        building: true,
    }
    return updateObject(state, updatedState);
}

const setIngredients = (state: BurgerBuilderState, action: AnyAction) => {
    return updateObject<BurgerBuilderState>(state, {
        ingredients: {
            salad: action.payload.ingredients.salad,
            bacon: action.payload.ingredients.bacon,
            cheese: action.payload.ingredients.cheese,
            meat: action.payload.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false,
    });
}

const fetchIngredientsFailed = (state: BurgerBuilderState) => {
    return updateObject(state, { error: true })
}

const reducer: Reducer<BurgerBuilderState> = (state = initialState, action) => {
    switch (action.type) {
        case BurgerBuilderTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case BurgerBuilderTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case BurgerBuilderTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case BurgerBuilderTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
        default: return state;
    }
}

export default reducer;
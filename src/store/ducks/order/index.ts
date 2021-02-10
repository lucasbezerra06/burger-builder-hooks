import {AnyAction, Reducer} from 'redux';

import { updateObject } from '../../../shared/utility';
import { OrderState, OrderTypes } from './types';

const initialState: OrderState = {
    orders: [],
    loading: false,
    purchased: false,
}

const purchaseInit = (state: OrderState) => {
    return updateObject(state, { purchased: false });
}

const purchaseBurgerStart = (state: OrderState) => {
    return updateObject(state, { loading: true });
}

const purchaseBurgerSuccess = (state: OrderState, action: AnyAction) => {
    const newOrder = updateObject(action.payload.orderData, { id: action.payload.orderId });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
    });
}

const purchaseBurgerFail = (state: OrderState) => {
    return updateObject(state, { loading: false });
}

const fetchOrdersStart = (state: OrderState) => {
    return updateObject(state, { loading: true });
}

const fetchOrdersSuccess = (state: OrderState, action: AnyAction) => {
    return updateObject(state, { orders: action.payload.orders, loading: false });
}

const fetchOrdersFail = (state: OrderState) => {
    return updateObject(state, { loading: false });
}

const reducer: Reducer<OrderState> = (state = initialState, action) => {
    switch (action.type) {
        case OrderTypes.PURCHASE_INIT: return purchaseInit(state);
        case OrderTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state);
        case OrderTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case OrderTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
        case OrderTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
        case OrderTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case OrderTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state);
        default: return state;
    }
};

export default reducer;
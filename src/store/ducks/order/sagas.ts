import { put } from 'redux-saga/effects';

import * as actions from './actions';
import axios from '../../../axios-orders';
import { Order, OrderTypes } from './types';

export function* purchaseBurgerSaga(action: {
    type: typeof OrderTypes.PURCHASE_BURGER;
    payload: {
        token: string;
        orderData: Order;
    };
}) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.payload.token, action.payload.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.payload.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action: {
    type: typeof OrderTypes.FETCH_ORDERS;
    payload: {
        token: string;
        userId: string;
    };
}) {
    yield put(actions.fetchOrdersStart());
    const queryParams = '?auth=' + action.payload.token + '&orderBy="userId"&equalTo="' + action.payload.userId + '"';
    try {
        const response = yield axios.get('/orders.json' + queryParams);
        const fetchedOrders: Order[] = [];
        for (let key in response.data) {
            fetchedOrders.push({
                id: key,
                price: Number.parseFloat(response.data[key]),
                ...response.data[key]
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}
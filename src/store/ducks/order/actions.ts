import { action } from 'typesafe-actions';
import { Order, OrderTypes } from './types';

export const purchaseBurgerSuccess = (id: string, orderData: Order) => action(OrderTypes.PURCHASE_BURGER_SUCCESS, { id, orderData });

export const purchaseBurgerFail = (error: string) => action(OrderTypes.PURCHASE_BURGER_FAIL, { error });

export const purchaseBurgerStart = () => action(OrderTypes.PURCHASE_BURGER_START);

export const purchaseBurger = (orderData: Order, token: string) => action(OrderTypes.PURCHASE_BURGER, { orderData, token });

export const purchaseInit = () => action(OrderTypes.PURCHASE_INIT);

export const fetchOrdersSuccess = (orders: Order[]) => action(OrderTypes.FETCH_ORDERS_SUCCESS, { orders });

export const fetchOrdersFail = (error: string) => action(OrderTypes.FETCH_ORDERS_FAIL, { error });

export const fetchOrdersStart = () => action(OrderTypes.FETCH_ORDERS_START);

export const fetchOrders = (token: string, userId: string) => action(OrderTypes.FETCH_ORDERS, { token, userId });
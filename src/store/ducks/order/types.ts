import { Ingredients } from "../../../burgerBuilderStore";

export enum OrderTypes {
    PURCHASE_INIT = '@order/PURCHASE_INIT',
    PURCHASE_BURGER = '@order/PURCHASE_BURGER',
    PURCHASE_BURGER_START = '@order/PURCHASE_BURGER_START',
    PURCHASE_BURGER_SUCCESS = '@order/PURCHASE_BURGER_SUCCESS',
    PURCHASE_BURGER_FAIL = '@order/PURCHASE_BURGER_FAIL',
    FETCH_ORDERS = '@order/FETCH_ORDERS',
    FETCH_ORDERS_START = '@order/FETCH_ORDERS_START',
    FETCH_ORDERS_SUCCESS = '@order/FETCH_ORDERS_SUCCESS',
    FETCH_ORDERS_FAIL = '@order/FETCH_ORDERS_FAIL',
}

export interface Order {
    id?: string;
    ingredients: Ingredients | null;
    orderData: { [key: string]: string };
    price: number;
    userId: string | null;
}

export interface OrderState {
    orders: Order[];
    loading: boolean;
    purchased: boolean;
}
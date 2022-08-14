import React from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

import Order from '../../components/Order/Order';
import { Order as OrderType } from '../Checkout/ContactData/ContactData';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import { ApplicationState } from '../../store';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const useOrders = (payload: {
    token: string;
    userId: string;
}) => {
    return useQuery(['orders', payload.token], async () => {
        const queryParams = '?auth=' + payload.token + '&orderBy="userId"&equalTo="' + payload.userId + '"';
        const response = await axios.get('/orders.json' + queryParams);
        const fetchedOrders: OrderType[] = [];
        for (let key in response.data) {
            fetchedOrders.push({
                id: key,
                price: Number.parseFloat(response.data[key]),
                ...response.data[key]
            });
        }
        return fetchedOrders;

    });
}

const Orders: React.FC = () => {

    const token = useSelector((state: ApplicationState) => state.auth.token);
    const userId = useSelector((state: ApplicationState) => state.auth.userId);

    const { data: orders, isLoading } = useOrders({ token: token ?? '', userId: userId ?? '' })

    let ordersList: JSX.Element | JSX.Element[] = [];
    if (isLoading) {
        ordersList = <Spinner />;
    } else if (orders) {
        ordersList = orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        ));
    }

    return (
        <div>
            {ordersList}
        </div>
    );
}

export default withErrorHandler(Orders, axios);
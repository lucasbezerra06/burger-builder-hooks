import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import { ApplicationState } from '../../store';
import { fetchOrders } from '../../store/ducks/order/actions';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders: React.FC = () => {
    const dispatch = useDispatch();

    const loading = useSelector((state: ApplicationState) => state.order.loading);
    const orders = useSelector((state: ApplicationState) => state.order.orders);
    const token = useSelector((state: ApplicationState) => state.auth.token);
    const userId = useSelector((state: ApplicationState) => state.auth.userId);

    useEffect(() => {
        dispatch(fetchOrders(token || "", userId || ""))
    }, [dispatch, token, userId]);

    let ordersList: JSX.Element | JSX.Element[] = <Spinner />;
    if (!loading) {
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
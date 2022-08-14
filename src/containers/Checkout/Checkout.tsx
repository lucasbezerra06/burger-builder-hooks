import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory, useRouteMatch } from 'react-router-dom';
import shallow from 'zustand/shallow';

import { useBurgerBuilderStore } from '../../burgerBuilderStore';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { ApplicationState } from '../../store';
import ContactData from './ContactData/ContactData';

const Checkout: React.FC = () => {
    const history = useHistory();
    const match = useRouteMatch();

    const ingredients = useBurgerBuilderStore(state => state.ingredients, shallow);
    const purchased = useSelector((state: ApplicationState) => state.order.purchased);

    const checkoutCancelledHandler = () => {
        history.goBack();
    }

    const checkoutContinuedHandler = () => {
        history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />;

    if (ingredients) {
        const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
/*  */                    checkoutCancelled={checkoutCancelledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                />
                <Route
                    path={match.path + "/contact-data"}
                    component={ContactData} />
            </div>
        );
    }

    return summary;
}

export default Checkout;
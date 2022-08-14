import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import shallow from 'zustand/shallow';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { ApplicationState } from '../../store';
import { setAuthRedirectPath } from '../../store/ducks/auth/actions';
import axios from '../../axios-orders';
import { purchaseInit } from '../../store/ducks/order/actions';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { useBurgerBuilderStore } from '../../burgerBuilderStore';

const BurgerBuilder: React.FC = () => {
    const [purchasing, setPurchasing] = useState(false);

    const history = useHistory();

    const dispatch = useDispatch();
    const initIngredients = useBurgerBuilderStore(state => state.initIngredients);

    const ingredients = useBurgerBuilderStore(state => state.ingredients, shallow);
    const error = useBurgerBuilderStore(state => state.error);
    const isAuthenticated = useSelector((state: ApplicationState) => state.auth.token !== null);

    useEffect(() => {
        initIngredients();
    }, [initIngredients]);

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            dispatch(setAuthRedirectPath('/checkout'));
            history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        dispatch(purchaseInit());
        history.push('/checkout');
    }

    const disabledInfo: { [key: string]: boolean } = {};

    for (let key in ingredients) {
        disabledInfo[key] = ingredients ? ingredients[key] <= 0 : false;
    };

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (ingredients) {
        burger = (
            <>
                <Burger />
                <BuildControls
                    disabled={disabledInfo}
                    isAuth={isAuthenticated}
                    ordered={purchaseHandler}
                />
            </>
        );
        orderSummary = (
            <OrderSummary
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
            />
        );


    }

    return (
        <>
            <Modal
                show={purchasing}
                modalClosed={purchaseCancelHandler}
            >
                {orderSummary}
            </Modal>
            {burger}
        </>
    );

}

export default withErrorHandler(BurgerBuilder, axios)
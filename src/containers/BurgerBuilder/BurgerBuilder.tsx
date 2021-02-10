import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import { ApplicationState } from '../../store';
import { setAuthRedirectPath } from '../../store/ducks/auth/actions';
import axios from '../../axios-orders';
import { addIngredient, initIngredients, removeIngredient } from '../../store/ducks/burgerBuilder/actions';
import { purchaseInit } from '../../store/ducks/order/actions';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const BurgerBuilder: React.FC = () => {
    const [purchasing, setPurchasing] = useState(false);

    const history = useHistory();

    const dispatch = useDispatch();
    const ingredients = useSelector((state: ApplicationState) => state.burgerBuilder.ingredients);
    const totalPrice = useSelector((state: ApplicationState) => state.burgerBuilder.totalPrice);
    const purchasable = useSelector((state: ApplicationState) => state.burgerBuilder.purchasable);
    const error = useSelector((state: ApplicationState) => state.burgerBuilder.error);
    const isAuthenticated = useSelector((state: ApplicationState) => state.auth.token !== null);

    useEffect(() => {
        dispatch(initIngredients());
    }, [dispatch]);

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
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingridientAdded={(type) => dispatch(addIngredient(type))}
                    ingridientRemoved={(type) => dispatch(removeIngredient(type))}
                    disabled={disabledInfo}
                    price={totalPrice}
                    isAuth={isAuthenticated}
                    purchasable={purchasable}
                    ordered={purchaseHandler}
                />
            </>
        );
        orderSummary = (
            <OrderSummary
                ingredients={ingredients}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
                price={totalPrice}
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
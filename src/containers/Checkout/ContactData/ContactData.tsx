import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';
import { ApplicationState } from '../../../store';
import { purchaseBurger } from '../../../store/ducks/order/actions';
import { Form } from '../../../components/UI/Input/types';

const ContactData = () => {
    const dispatch = useDispatch();

    const ingredients = useSelector((state: ApplicationState) => state.burgerBuilder.ingredients);
    const price = useSelector((state: ApplicationState) => state.burgerBuilder.totalPrice);
    const loading = useSelector((state: ApplicationState) => state.order.loading);
    const token = useSelector((state: ApplicationState) => state.auth.token);
    const userId = useSelector((state: ApplicationState) => state.auth.userId);

    const [formIsValid, setFormIsValid] = useState(false);
    const [orderForm, setOrderForm] = useState<Form>({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fasted', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            validation: {},
            value: 'fasted',
            valid: true,
        },
    });

    const orderHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData: { [key: string]: string } = {};

        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: ingredients,
            price: price,
            orderData: formData,
            userId: userId,
        }
        dispatch(purchaseBurger(order, token || ""));
    }

    const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, inputIdentifier: string) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true,
        });

        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement,
        });

        const isFormValid = Object.keys(updatedOrderForm)
            .map(key => {
                return updatedOrderForm[key].valid;
            })
            .reduce((prev, curr) => prev && curr);

        setOrderForm(updatedOrderForm);
        setFormIsValid(isFormValid);
    }

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key],
        });
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button
                disabled={!formIsValid}
                btnType="Success"
                type="submit"
            >
                ORDER
            </Button>
        </form>
    );

    if (loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contanct Data</h4>
            {form}
        </div>
    );

}

export default withErrorHandler(ContactData, axios);
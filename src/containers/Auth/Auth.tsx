import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { updateObject, checkValidity } from '../../shared/utility';
import { ApplicationState } from '../../store';
import { auth, setAuthRedirectPath } from '../../store/ducks/auth/actions';
import { Form } from '../../components/UI/Input/types';
import { useBurgerBuilderStore } from '../../burgerBuilderStore';

const Auth = () => {
    const buildingBurguer = useBurgerBuilderStore(state => state.building);
    const authRedirectPath = useSelector((state: ApplicationState) => state.auth.authRedirectPath);
    const loading = useSelector((state: ApplicationState) => state.auth.loading);
    const error = useSelector((state: ApplicationState) => state.auth.error);
    const isAuthenticated = useSelector((state: ApplicationState) => state.auth.token !== null);

    const dispatch = useDispatch();

    const [isSignup, setIsSignup] = useState(true);
    const [authForm, setAuthForm] = useState<Form>({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        }
    });

    useEffect(() => {
        if (!buildingBurguer && authRedirectPath !== '/') {
            dispatch(setAuthRedirectPath('/'));
        }
    }, [buildingBurguer, authRedirectPath, dispatch]);

    const inputChangedHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, controlName: string) => {

        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true,
            }),
        });
        setAuthForm(updatedControls);
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password } = authForm;
        dispatch(auth(email.value, password.value, isSignup));
    }

    const swithAuthModeHandler = () => {
        setIsSignup(prev => !prev);
    }

    const formElementArray = [];
    for (let key in authForm) {
        formElementArray.push({
            id: key,
            config: authForm[key]
        });
    }

    let form: JSX.Element | JSX.Element[] = formElementArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ))

    if (loading) {
        form = <Spinner />;
    }

    let errorMessage = null;

    if (error) {
        errorMessage = (
            <p>{error.message}</p>
        );
    }

    let authRedirect = null;
    if (isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath} />
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button
                clicked={swithAuthModeHandler}
                btnType="Danger"
            >
                SWITCH TO {isSignup ? 'SIGIN' : 'SIGNUP'}
            </Button>
        </div>
    );

}

export default Auth;
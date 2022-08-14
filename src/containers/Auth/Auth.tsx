import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import axiosOrders from "../../axios-orders";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.module.css";
import { updateObject, checkValidity } from "../../shared/utility";
import { Form } from "../../components/UI/Input/types";
import { useBurgerBuilderStore } from "../../stores/burgerBuilderStore";
import { useAuthStore } from "../../stores/authStore";

const useAuth = () => {
  const authSuccess = useAuthStore((state) => state.authSuccess);
  const checkAuthTimeout = useAuthStore((state) => state.checkAuthTimeout);

  return useMutation<
    any,
    AxiosError<any>,
    { email: string; password: string; isSignup: boolean }
  >(
    async (payload) => {
      const authData = {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      };

      const url = payload.isSignup
        ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBe2mv8OgwabohGNFWsokEChJ9xXZ9enj4"
        : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBe2mv8OgwabohGNFWsokEChJ9xXZ9enj4";

      const response = await axiosOrders.post(url, authData);
      return response.data;
    },
    {
      onSuccess(data) {
        const { idToken, localId, expiresIn } = data;
        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );
        window.localStorage.setItem("token", idToken);
        window.localStorage.setItem(
          "expirationDate",
          expirationDate.toString()
        );
        window.localStorage.setItem("userId", localId);
        authSuccess(idToken, localId);
        checkAuthTimeout(expiresIn);
      },
    }
  );
};

const Auth = () => {
  const buildingBurguer = useBurgerBuilderStore((state) => state.building);

  const authRedirectPath = useAuthStore((state) => state.authRedirectPath);
  const setAuthRedirectPath = useAuthStore(
    (state) => state.setAuthRedirectPath
  );
  const isAuthenticated = useAuthStore((state) => state.token !== null);

  const { mutate, isLoading, error } = useAuth();

  const [isSignup, setIsSignup] = useState(true);
  const [authForm, setAuthForm] = useState<Form>({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  useEffect(() => {
    if (!buildingBurguer && authRedirectPath !== "/") {
      setAuthRedirectPath("/");
    }
  }, [authRedirectPath, buildingBurguer, setAuthRedirectPath]);

  const inputChangedHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    controlName: string
  ) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          authForm[controlName].validation
        ),
        touched: true,
      }),
    });
    setAuthForm(updatedControls);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = authForm;
    mutate({ email: email.value, password: password.value, isSignup });
  };

  const swithAuthModeHandler = () => {
    setIsSignup((prev) => !prev);
  };

  const formElementArray = [];
  for (let key in authForm) {
    formElementArray.push({
      id: key,
      config: authForm[key],
    });
  }

  let form: JSX.Element | JSX.Element[] = formElementArray.map(
    (formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => inputChangedHandler(event, formElement.id)}
      />
    )
  );

  if (isLoading) {
    form = <Spinner />;
  }

  let errorMessage = null;

  if (error) {
    errorMessage = <p>{error.response?.data.error.message}</p>;
  }

  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">{isSignup ? "Sign up" : "Log in"}</Button>
      </form>
      <div>
        {isSignup ? "Have an account?" : "Don't have an account?"}
        <Button clicked={swithAuthModeHandler} btnType="Danger">
          {isSignup ? "Log in" : "Sign up"}
        </Button>
      </div>
    </div>
  );
};

export default Auth;

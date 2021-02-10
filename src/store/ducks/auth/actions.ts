import { action } from 'typesafe-actions';
import { AuthTypes } from './types';

export const authStart = () => action(AuthTypes.AUTH_START);

export const authSuccess = (token: string, userId: string) => action(AuthTypes.AUTH_SUCCESS, { token, userId });

export const authFail = (error: string) => action(AuthTypes.AUTH_FAIL, { error });

export const logout = () => action(AuthTypes.AUTH_INITIATE_LOGOUT)

export const logoutSucceed = () => action(AuthTypes.AUTH_LOGOUT);

export const checkAuthTimeout = (expirationTime: number) => action(AuthTypes.AUTH_CHECK_TIMEOUT, { expirationTime });

export const auth = (email: string, password: string, isSignup: boolean) => action(AuthTypes.AUTH_USER, { email, password, isSignup });

export const setAuthRedirectPath = (path: string) => action(AuthTypes.SET_AUTH_REDIRECT_PATH, { path });

export const authCheckState = () => action(AuthTypes.AUTH_CHECK_STATE);


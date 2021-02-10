/**
 * Action types
 */
export enum AuthTypes {
    AUTH_START = '@auth/AUTH_START',
    AUTH_SUCCESS = '@auth/AUTH_SUCCESS',
    AUTH_FAIL = '@auth/AUTH_FAIL',
    AUTH_LOGOUT = '@auth/AUTH_LOGOUT',
    SET_AUTH_REDIRECT_PATH = '@auth/SET_AUTH_REDIRECT_PATH',
    AUTH_CHECK_STATE = '@auth/AUTH_CHECK_STATE',
    AUTH_USER = '@auth/AUTH_USER',
    AUTH_CHECK_TIMEOUT = '@auth/AUTH_CHECK_TIMEOUT',
    AUTH_INITIATE_LOGOUT = '@auth/AUTH_INITIATE_LOGOUT',
}

/**
 * State type
 */
export interface AuthState {
    token: null | string;
    userId: null | string;
    error: any;
    loading: boolean;
    authRedirectPath: string;
}
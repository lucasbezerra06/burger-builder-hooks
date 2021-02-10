import { AnyAction, Reducer } from 'redux';

import { updateObject } from '../../../shared/utility';
import { AuthState, AuthTypes } from './types';



const initialState: AuthState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
}

const authStart = (state: AuthState) => {
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state: AuthState, action: AnyAction) => {
    return updateObject(state, {
        token: action.payload.token,
        userId: action.payload.userId,
        error: null,
        loading: false
    });
}

const authFail = (state: AuthState, action: AnyAction) => {
    return updateObject(state, {
        error: action.payload.error,
        loading: false,
    });
}

const authLogout = (state: AuthState) => {
    return updateObject(state, { token: null, userId: null });
}

const setAuthRedirectPath = (state: AuthState, action: AnyAction) => {
    return updateObject(state, { authRedirectPath: action.payload.path })
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
    switch (action.type) {
        case AuthTypes.AUTH_START: return authStart(state);
        case AuthTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case AuthTypes.AUTH_FAIL: return authFail(state, action);
        case AuthTypes.AUTH_LOGOUT: return authLogout(state);
        case AuthTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
}

export default reducer;
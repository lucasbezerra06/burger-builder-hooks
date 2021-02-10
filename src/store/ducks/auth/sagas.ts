import { put, delay, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from './actions';
import { AuthTypes } from './types';

export function* logoutSaga() {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "userId");
    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga(action: {
    type: typeof AuthTypes.AUTH_CHECK_TIMEOUT;
    payload: {
        expirationTime: number;
    }
}) {
    yield delay(action.payload.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action: {
    type: typeof AuthTypes.AUTH_USER;
    payload:{
        email: string;
        password: string;
        isSignup: boolean;
    }
}) {
    yield put(actions.authStart());

    const authData = {
        email: action.payload.email,
        password: action.payload.password,
        returnSecureToken: true,
    }

    const url = action.payload.isSignup
        ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBe2mv8OgwabohGNFWsokEChJ9xXZ9enj4'
        : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBe2mv8OgwabohGNFWsokEChJ9xXZ9enj4';

    try {
        const response = yield axios.post(url, authData);
        const { idToken, localId, expiresIn } = response.data;
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        yield localStorage.setItem('token', idToken);
        yield localStorage.setItem('expirationDate', expirationDate.toString());
        yield localStorage.setItem('userId', localId);
        yield put(actions.authSuccess(idToken, localId));
        yield put(actions.checkAuthTimeout(expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate') || '');
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 100));
        }
    }
}
import { takeEvery, all } from 'redux-saga/effects';
import { checkAuthTimeoutSaga, logoutSaga, authUserSaga, authCheckStateSaga } from './auth/sagas';
import { AuthTypes } from './auth/types';


export function* watchAuth() {
    yield all([
        takeEvery(AuthTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(AuthTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(AuthTypes.AUTH_USER, authUserSaga),
        takeEvery(AuthTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    ]);
}
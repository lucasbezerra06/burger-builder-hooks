import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import { checkAuthTimeoutSaga, logoutSaga, authUserSaga, authCheckStateSaga } from './auth/sagas';
import { AuthTypes } from './auth/types';
import { fetchOrdersSaga, purchaseBurgerSaga } from './order/sagas';
import { OrderTypes } from './order/types';


export function* watchAuth() {
    yield all([
        takeEvery(AuthTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(AuthTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(AuthTypes.AUTH_USER, authUserSaga),
        takeEvery(AuthTypes.AUTH_CHECK_STATE, authCheckStateSaga),
    ]);
}

export function* watchOrder() {
    yield takeLatest(OrderTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(OrderTypes.FETCH_ORDERS, fetchOrdersSaga);
}
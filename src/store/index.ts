import {createStore, applyMiddleware, Store, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AuthState } from './ducks/auth/types';
import { BurgerBuilderState } from './ducks/burgerBuilder/types';
import { OrderState } from './ducks/order/types';

import rootReducer from './ducks/rootReducer';
import { watchAuth, watchBurgerBuilder, watchOrder } from './ducks/rootSaga';

const composeEnhancers = process.env.NODE_ENV === 'development' ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose: compose;

export interface ApplicationState{
    auth: AuthState;
    burgerBuilder: BurgerBuilderState;
    order: OrderState;
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

export default store;
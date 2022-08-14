import { combineReducers } from 'redux';

import orderReducer from './order';
import authReducer from './auth';

export default combineReducers({
    order: orderReducer,
    auth: authReducer,
});
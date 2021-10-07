import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import gameReducer from './game';

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;

const store = createStore(gameReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

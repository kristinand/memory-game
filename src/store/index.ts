import { Store, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { IState } from 'entities/interfaces';
import { TActionTypes } from './entities';
import gameReducer from './game';

const store: Store<IState, TActionTypes> = createStore(gameReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

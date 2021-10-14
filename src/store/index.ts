import { Store, createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { TActionTypes, IState } from './entities';
import gameReducer from './game/reducer';
import settingsReducer from './settings/reducer';

const rootReducer = combineReducers({
  game: gameReducer,
  settings: settingsReducer,
});

const store: Store<IState, TActionTypes> = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
// Middleware
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
// Persist storage
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-community/async-storage';

const middleware = applyMiddleware(ReduxThunk, logger);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['user'],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, middleware);
export const persistor = persistStore(store);

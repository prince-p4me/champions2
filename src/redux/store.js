import { createStore, combineReducers, applyMiddleware } from 'redux';
import { getUser, isLoading, getBanners, getPoints, isSuccess, getLanguage, isRtl } from './reducer';
import getListSaga from './saga';
import { all, fork } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

// creating reducers
const rootReducer = combineReducers({
  isLoading,
  getLanguage,
  isRtl,
  getBanners,
  getUser,
  getPoints,
  isSuccess
});

//creating, applying sagas

const sagaMiddleware = createSagaMiddleware();

export function* rootSaga() {
  yield all([fork(getListSaga)]);
}

//creating store persist
const persistConfig = {
  // Root
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [
    "getLanguage", "isRtl", "getUser"
  ],
  blacklist: [],
  throttle: 1000,
  debounce: 1000,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

//creating store
let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

//creating persistor
let persistor = persistStore(store);

//running saga middleware
sagaMiddleware.run(rootSaga);

export { store, persistor };

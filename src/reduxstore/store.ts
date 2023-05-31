import createSagaMiddleware from 'redux-saga';
import { PostsState, postsState } from './posts/reducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sagaPosts } from './posts/saga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const appReducer = combineReducers({
    postsState,
});

export interface ReduxState {
    postsState: PostsState;
}

const persistedReducer = persistReducer(persistConfig, appReducer)
export const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
export const persistor = persistStore(store)

sagaMiddleware.run(sagaPosts)
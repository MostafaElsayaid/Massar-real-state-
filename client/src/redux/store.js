import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import userReducer from './user/userSlice.js'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({user: userReducer})

const presistConfig = {
    key: 'root',
    storage,
    version: 1,
}
const persistedReducer = persistReducer(presistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export const persistor = persistStore(store);
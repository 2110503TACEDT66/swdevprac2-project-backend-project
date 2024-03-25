import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import bookSlice from "./features/bookSlice";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'rootPersist',
    storage
}

const rootReducer = combineReducers({booking:bookSlice})
const reduxPersistReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
        reducer:reduxPersistReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

'use client'
import { Provider } from "react-redux"
import { store } from "./store"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"
import { useState } from "react"

export default function ReduxProvider({ children} : { children:React.ReactNode}) {
    const [reduxPersistor, setReduxPersistor] = useState(persistStore(store));
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={reduxPersistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}
import {configureStore} from '@reduxjs/toolkit'
import bearerTokenReducer from './bearerToken'

export const store = configureStore({
    reducer: {
        bearerToken: bearerTokenReducer,
    }
})
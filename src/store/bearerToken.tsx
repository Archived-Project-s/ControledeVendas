import {createSlice} from '@reduxjs/toolkit'

export const bearerTokenSlice = createSlice({
    name: 'bearerToken',
    initialState: {
        value: ''
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
        logout: (state) => {
            state.value = ''
        }
    }
})

export const {login, logout} = bearerTokenSlice.actions
export default bearerTokenSlice.reducer
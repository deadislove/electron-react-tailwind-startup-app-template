import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: '',
    role: '',
    jwt: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.userId = action.payload.userId,
            state.role = action.payload.role,
            state.jwt = action.payload.jwt
        },
        clearUser(state) {
            state.userId = null,
            state.role = '',
            state.jwt = ''
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
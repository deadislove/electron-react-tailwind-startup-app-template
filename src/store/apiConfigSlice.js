import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: '',
    auth_endpoint: '',
    secret_header: ''
}

const apiConfigSlice = createSlice({
    name: 'apiConfig',
    initialState,
    reducers: {
        setApiConfig(state, action) {
            state.url = action.payload.api_url,
            state.auth_endpoint = action.payload.auth_endpoint,
            state.secret_header = action.payload.secret_header
        },
        // You can add more actions here if needed
    },
})

export const { setApiConfig } = apiConfigSlice.actions;
export default apiConfigSlice.reducer
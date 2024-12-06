import { configureStore } from "@reduxjs/toolkit";
import apiConfigReducer from './apiConfigSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
      apiConfig: apiConfigReducer,
      user: userReducer,
    },
  });
  
  export default store;
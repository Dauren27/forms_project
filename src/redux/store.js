import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./reducers/authApi";
import authSlice from "./reducers/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddlware) =>
        getDefaultMiddlware().concat(authApi.middleware),
});

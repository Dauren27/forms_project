import {createSlice} from "@reduxjs/toolkit";
import {authApi} from "./authApi";

const initialState = {
    isAuth: sessionStorage.getItem("token"),
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.login.matchFulfilled,
                (state, action) => {
                    state.isAuth = true;
                    state.token = action.token;
                    sessionStorage.setItem(
                        "token",
                        JSON.stringify(action.payload.token)
                    );
                }
            )
            .addMatcher(
                authApi.endpoints.logout.matchFulfilled,
                (state, action) => {
                    state.isAuth = false;
                    state.user = null;
                    state.token = null;
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("user");
                }
            );
    },
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;

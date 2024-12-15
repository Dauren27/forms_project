import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const API_URL = "https://scientific-registration.onrender.com";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: API_URL, credentials: "include"}),
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),

        logout: build.mutation({
            query: (body) => ({
                url: "/logout",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {useLoginMutation, useLogoutMutation} = authApi;

import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuth: false,
        user: [],
        favourites: []
    },
    reducers: {
        login: (state) => {
            state.isAuth = true;
        },

        logout: (state) => {
            state.isAuth = false;
        },

        setUser: (state, action) => {
            state.user = action.payload
        }
        ,
        setFevourites: (state, action) => {
            state.favourites = action.payload
        }

    }
})

export const { login, logout, setUser, setFevourites } = authSlice.actions;
export default authSlice.reducer
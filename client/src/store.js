import { configureStore } from "@reduxjs/toolkit"
import authSlice from "../src/Slices/authSlice"
import userSlice from "../src/Slices/userSlice"
import ticketSlice from "../src/Slices/ticketSlice"

const store = configureStore ({
    reducer: {
        auth: authSlice,
        user: userSlice,
        ticket: ticketSlice,
    }
})

export default store
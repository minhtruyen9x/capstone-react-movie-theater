import ticketboxAPI from "../Services/ticketboxAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  tickets: [],
  isloading: null,
  error: false,
};

export const bookingTicket = createAsyncThunk(
  "home/ticket/booking",
  async (infoBooking) => {
    try {
      const data = await ticketboxAPI.bookingTicket(infoBooking);
      return data
    } catch (error) {
      throw error;
    }
  }
);

const ticketSlice = createSlice ({
    name: "home/ticket",
    initialState,
    reducers: {},
})

export default ticketSlice.reducer
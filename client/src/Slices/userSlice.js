import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from '../Services/authAPI'

const initialState = {
	user: null,
	isloading: false,
	error: false,
	search: "",
};

export const getUserInfo = createAsyncThunk(
	"user/getUserInfo",
	async (_, { rejectWithValue }) => {
		try {
			const data = await authAPI.getUsersInfo();
			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
)

export const updateUserClient = createAsyncThunk(
	"user/updateUserClient",
	async (values, { rejectWithValue }) => {
		try {
			await authAPI.updateUserClient(values);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);


const userSlice = createSlice({
	name: "user",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(getUserInfo.pending, (state, action) => {
			return { ...state, isloading: true, error: false };
		});
		builder.addCase(getUserInfo.fulfilled, (state, action) => {
			return { ...state, isloading: false, user: action.payload }
		});
		builder.addCase(getUserInfo.rejected, (state, action) => {
			return { ...state, isloading: false, error: action.payload }
		});
	},
});

export default userSlice.reducer;
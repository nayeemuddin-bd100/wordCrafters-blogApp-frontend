import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

export const resetVerifyEmailAction = createAction(
	"verify-email/reset-email-verification"
);

//send token into email
export const verifyEmailAction = createAsyncThunk(
	"verify-email/sent-email-token",
	async (id, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.post(
				`${baseUrl}/api/users/generate-verify-email-token`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			);
			return res.data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

//verify token
export const verifyTokenAction = createAsyncThunk(
	"verify-email/verify-token",
	async (token, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.put(
				`${baseUrl}/api/users/verify-account`,
				{ token },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			);
			return res.data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

const emailVerificationSlices = createSlice({
	name: "verify-email",
	initialState: {},

	extraReducers: (builder) => {
		//sent email
		builder.addCase(verifyEmailAction.pending, (state, action) => {
			state.verifyEmailLoading = true;
			state.verify = undefined;
		});
		builder.addCase(verifyEmailAction.fulfilled, (state, action) => {
			state.verify = action?.payload;
			state.verifyEmailLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(verifyEmailAction.rejected, (state, action) => {
			state.verifyEmailLoading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
				state.verify = undefined;
		});

		// reset email send
		builder.addCase(resetVerifyEmailAction, (state) => {
			state.verify = undefined;
		});

		//verify token
		builder.addCase(verifyTokenAction.pending, (state, action) => {
			state.verifyEmailLoading = true;
		});
		builder.addCase(verifyTokenAction.fulfilled, (state, action) => {
			state.accountVerification = action?.payload;
			state.verifyEmailLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(verifyTokenAction.rejected, (state, action) => {
			state.verifyEmailLoading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
	},
});

export default emailVerificationSlices.reducer;

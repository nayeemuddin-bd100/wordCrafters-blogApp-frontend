import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "./../../../utils/baseUrl";

export const resetEmailSendAction = createAction("mail/reset-email-sent");

export const sendMailAction = createAsyncThunk(
	"mail/sent",
	async (email, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;
			const res = await axios.post(
				`${baseUrl}/api/sendEmail`,
				{
					to: email?.recipientEmail,
					subject: email?.subject,
					text: email?.message,
				},
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

const sendEmailSlices = createSlice({
	name: "mail",
  initialState: { mail: "sent" },
  

	extraReducers: (builder) => {
		//create
		builder.addCase(sendMailAction.pending, (state, action) => {
			state.emailLoading = true;
		});
		builder.addCase(sendMailAction.fulfilled, (state, action) => {
			state.mailSent = action?.payload;
			state.emailLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(sendMailAction.rejected, (state, action) => {
			state.emailLoading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// reset email send
		builder.addCase(resetEmailSendAction, (state) => {
			state.mailSent = undefined;
		});
	},
});

export default sendEmailSlices.reducer;

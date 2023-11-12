import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

//Add comment
export const addCommentAction = createAsyncThunk(
	"comment/create",
	async (data, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.post(
				`${baseUrl}/api/comments/`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			);
			return res.data;
		} catch (error) {
			if (!error?.response) throw error;
			return rejectWithValue(error?.response?.data);
		}
	}
);



const commentSlices = createSlice({
	name: "comment",
	initialState: { comments: [] },

	extraReducers: (builder) => {
		//create comment
		builder.addCase(addCommentAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(addCommentAction.fulfilled, (state, action) => {
			state.loading = false;
			state.createdComment = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(addCommentAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
	},
});

export default commentSlices.reducer;

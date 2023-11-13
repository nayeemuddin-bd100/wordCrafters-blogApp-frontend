import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";


export const resetUpdatedCommentAction = createAction("comment/reset-updated-comment");
export const resetCommentDetailsAction = createAction("comment/reset-comment-details");


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

//delete comment
export const deleteCommentAction = createAsyncThunk(
	"comment/delete",
	async (id, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.delete(`${baseUrl}/api/comments/${id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${jwtToken}`,
				},
			});
			return res.data;
		} catch (error) {
			if (!error?.response) throw error;
			return rejectWithValue(error?.response?.data);
		}
	}
);

//update comment
export const updateCommentAction = createAsyncThunk(
	"comment/update-comment",
	async (updateComment, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.put(`${baseUrl}/api/comments/${updateComment?.id}`, updateComment, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${jwtToken}`,
				},
			});
			return res.data;
		} catch (error) {
			if (!error?.response) throw error;
			return rejectWithValue(error?.response?.data);
		}
	}
);


//fetch single comment
export const fetchSingleCommentAction = createAsyncThunk(
	"comment/fetch-single-comment",
	async (id, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.get(`${baseUrl}/api/comments/${id}`,{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${jwtToken}`,
				},
			});
			console.log(res)
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

		//delete comment
		builder.addCase(deleteCommentAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(deleteCommentAction.fulfilled, (state, action) => {
			state.loading = false;
			state.deletedComment = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(deleteCommentAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//fetch single comment
		builder.addCase(fetchSingleCommentAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(fetchSingleCommentAction.fulfilled, (state, action) => {
			state.loading = false;
			state.commentDetails = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(fetchSingleCommentAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
		// Reset comment details
		builder.addCase(resetCommentDetailsAction, (state) => {
			state.commentDetails = undefined;
		});

		//update comment
		builder.addCase(updateCommentAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(updateCommentAction.fulfilled, (state, action) => {
			state.loading = false;
			state.updatedComment = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(updateCommentAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// Reset updated comment
		builder.addCase(resetUpdatedCommentAction, (state) => {
			state.updatedComment = undefined;
		});
	},
});

export default commentSlices.reducer;

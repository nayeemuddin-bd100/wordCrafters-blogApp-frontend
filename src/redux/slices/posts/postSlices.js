import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "./../../../utils/baseUrl";


export const resetCreatedPostAction = createAction("posts/reset-create-post");
export const resetPostsListAction = createAction("posts/reset-posts-list");

// create post
export const createPostAction = createAsyncThunk("posts/create-post", async (post,{rejectWithValue,getState}) => {

  try {

    const state = getState();
    const jwtToken = state?.users?.userAuth?.token;

    
    const res = await axios.post(`${baseUrl}/api/posts`, post, {
			headers: {
        'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${jwtToken}`,
			},
		});
    return res.data
    
  } catch (error) {
    if (!error?.response) throw error;
    return rejectWithValue(error?.response?.data);
  }
})
// fetch all post
export const fetchAllPostsAction = createAsyncThunk("posts/posts-list", async (post,{rejectWithValue,getState}) => {
  try {
    
    const res = await axios.get(`${baseUrl}/api/posts`, post, {
			headers: {
        'Content-Type': 'application/json'
			},
		});
    return res.data
    
  } catch (error) {
    if (!error?.response) throw error;
    return rejectWithValue(error?.response?.data);
  }
})


const postSlices = createSlice({
	name: "posts",
	initialState: { postsList: [] },

	extraReducers: (builder) => {
		builder.addCase(createPostAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(createPostAction.fulfilled, (state, action) => {
			state.loading = false;
			state.createdPost = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(createPostAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// Reset created post
		builder.addCase(resetCreatedPostAction, (state) => {
			state.createdPost = undefined;
		});

		// Fetch all posts
		builder.addCase(fetchAllPostsAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(fetchAllPostsAction.fulfilled, (state, action) => {
			state.loading = false;
			state.postsList = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(fetchAllPostsAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// Reset post list
		builder.addCase(resetPostsListAction, (state) => {
			state.postsList = [];
		});
	},
});

export default postSlices.reducer;
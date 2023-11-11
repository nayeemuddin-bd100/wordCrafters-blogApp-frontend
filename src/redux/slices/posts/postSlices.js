import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "./../../../utils/baseUrl";


export const resetCreatedPostAction = createAction("posts/reset-create-post");
export const resetPostsListAction = createAction("posts/reset-posts-list");
export const resetUpdatedPostAction = createAction("posts/reset-updated-post");
export const resetPostDetailsAction = createAction("posts/reset-post-details");
export const resetPostDeleteAction = createAction("posts/reset-deletedPost");

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
export const fetchAllPostsAction = createAsyncThunk("posts/posts-list", async (category,{rejectWithValue,getState}) => {
	try {
      const res = await axios.get(`${baseUrl}/api/posts?category=${category}`, {
			headers: {
        'Content-Type': 'application/json'
			},
			});

		const data = res.data;
		const arrangeData = data.reverse()
    return arrangeData;
    
  } catch (error) {
    if (!error?.response) throw error;
    return rejectWithValue(error?.response?.data);
  }
})


// toggle like post
export const toggleLikePostAction = createAsyncThunk("post/like", async (postId,{rejectWithValue,getState}) => {
  try {
    const state = getState();
		const jwtToken = state?.users?.userAuth?.token;
    const res = await axios.put(`${baseUrl}/api/posts/like/${postId}`,{}, {
			headers: {
				Authorization: `Bearer ${jwtToken}`,
			},
		});
    return res.data
    
	} catch (error) {
    if (!error?.response) throw error;
    return rejectWithValue(error?.response?.data);
  }
})

// toggle dislike post
export const toggleDislikePostAction = createAsyncThunk("post/dislike", async (postId,{rejectWithValue,getState}) => {
  try {
    const state = getState();
		const jwtToken = state?.users?.userAuth?.token;
    const res = await axios.put(`${baseUrl}/api/posts/dislike/${postId}`,{}, {
			headers: {
				Authorization: `Bearer ${jwtToken}`,
			},
		});
    return res.data
    
	} catch (error) {
    if (!error?.response) throw error;
    return rejectWithValue(error?.response?.data);
  }
})


// fetch post details
export const fetchPostDetailsAction = createAsyncThunk(
	"posts/post-details",
	async (id, { rejectWithValue, getState }) => {
		try {
			const res = await axios.get(`${baseUrl}/api/posts/${id}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return res.data;
		} catch (error) {
			if (!error?.response) throw error;
			return rejectWithValue(error?.response?.data);
		}
	}
);

// update post
export const updatePostAction = createAsyncThunk("posts/update-post", async (post,{rejectWithValue,getState}) => {

  try {

    const state = getState();
    const jwtToken = state?.users?.userAuth?.token;
    
    const res = await axios.put(`${baseUrl}/api/posts/${post?.id}`, post, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwtToken}`,
			},
		});
    return res.data
    
  } catch (error) {
    if (!error?.response) throw error;
    return rejectWithValue(error?.response?.data);
  }
})

// delete post
export const deletePostAction = createAsyncThunk("posts/delete-post", async (id,{rejectWithValue,getState}) => {

  try {

    const state = getState();
    const jwtToken = state?.users?.userAuth?.token;
    
    const res = await axios.delete(`${baseUrl}/api/posts/${id}`, {
			headers: {
        'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtToken}`,
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
		//Create post
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

		//Toggle like post
		builder.addCase(toggleLikePostAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(toggleLikePostAction.fulfilled, (state, action) => {
			state.loading = false;
			state.like = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(toggleLikePostAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//Toggle dislike post
		builder.addCase(toggleDislikePostAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(toggleDislikePostAction.fulfilled, (state, action) => {
			state.loading = false;
			state.dislike = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(toggleDislikePostAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//fetch post details
		builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
			state.loading = false;
			state.postDetails = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// Reset post details
		builder.addCase(resetPostDetailsAction, (state) => {
			state.postDetails = undefined;
		});

		//update post
		builder.addCase(updatePostAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(updatePostAction.fulfilled, (state, action) => {
			state.loading = false;
			state.updatePost = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(updatePostAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// Reset updated post
		builder.addCase(resetUpdatedPostAction, (state) => {
			state.updatePost = undefined;
		});

		//delete post
		builder.addCase(deletePostAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(deletePostAction.fulfilled, (state, action) => {
			state.loading = false;
			state.deletedPost = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(deletePostAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		// reset deleted post
		builder.addCase(resetPostDeleteAction, (state) => {
			state.deletedPost = undefined;
		});
	},
});

export default postSlices.reducer;
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "./../../../utils/baseUrl";

export const createPostAction = createAsyncThunk("posts/create-post", async (post,{rejectWithValue,getState}) => {

  try {
    const state = getState();
    const jwtToken = state?.users?.userAuth?.token;
    
    const res = await axios.post(`${baseUrl}/api/posts`, post, {
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


const postSlices = createSlice({
  name: "posts",
  initialState:{},

  extraReducers: (builder) => {
    builder.addCase(createPostAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined
      state.serverErr = undefined
    })

    builder.addCase(createPostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.createdPost = action?.payload
      state.appErr = undefined
      state.serverErr = undefined
    })

    builder.addCase(createPostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
  }
})

export default postSlices.reducer;
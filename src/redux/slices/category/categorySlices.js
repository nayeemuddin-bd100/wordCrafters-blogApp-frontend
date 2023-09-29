import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "./../../../utils/baseUrl";

export const addCategoryAction = createAsyncThunk(
	"category/add",
	async (category, { rejectWithValue, getState }) => {
    try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.post(
				`${baseUrl}/api/category/`,
				{
					title: category?.title,
				},
				{
					headers: { "Content-Type": "application/json",Authorization: `Bearer ${jwtToken}` },
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

export const fetchCategoriesAction = createAsyncThunk(
	"category/category-list",
	async (category, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.get(
				`${baseUrl}/api/category/`,
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

const categorySlices = createSlice({
	name: "category",
	initialState: {},
  extraReducers: (builder) => {

		// add category
    builder.addCase(addCategoryAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;

    })

    builder.addCase(addCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    })

    builder.addCase(addCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;

		})


		// category list
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;

    })

    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    })

    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;

		})

  }
});


export default categorySlices.reducer
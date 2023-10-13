import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "./../../../utils/baseUrl";



// Add Category
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

// Fetch All Category
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


// Fetch Single Category
export const fetchSingleCategoriesAction = createAsyncThunk(
	"category/fetch-single-category",
	async (id, { rejectWithValue, getState }) => {
		
		try {
		
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.get(
				`${baseUrl}/api/category/${id}`,
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

// update Category
export const updateCategoriesAction = createAsyncThunk(
	"category/update-category",
	async (category, { rejectWithValue, getState,dispatch }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.put(`${baseUrl}/api/category/${category?.id}`,
				{title:category?.title},
				{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${jwtToken}`,
				},
			});

			return res.data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

// Delete Category
export const deleteCategoriesAction = createAsyncThunk(
	"category/delete-category",
	async (id, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.delete(`${baseUrl}/api/category/${id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${jwtToken}`,
				},
			});

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

			// reset
			state.updatedCategory = undefined;
			state.category = undefined;
    })

    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;

		})

		// Fetch single Category
    builder.addCase(fetchSingleCategoriesAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;

    })

    builder.addCase(fetchSingleCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categoryDetails = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    })

    builder.addCase(fetchSingleCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;

		})

		
		// Update Category
    builder.addCase(updateCategoriesAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;

    })

    builder.addCase(updateCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedCategory = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    })

    builder.addCase(updateCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;

		})


		// delete category
    builder.addCase(deleteCategoriesAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverErr = undefined;

    })

    builder.addCase(deleteCategoriesAction.fulfilled, (state, action) => {
			const deletedCategory = action?.payload?._id
		
      state.loading = false;
      state.categoryList = state.categoryList.filter(category => category._id !== deletedCategory)
			state.updatedCategory = deletedCategory;
      state.appErr = undefined;
			state.serverErr = undefined;
    })

    builder.addCase(deleteCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
		})

  }
});


export default categorySlices.reducer
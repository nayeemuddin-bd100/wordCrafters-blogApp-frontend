import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "./../../../utils/baseUrl";




//Reset update profile
export const resetUpdateProfileAction = createAction("users/reset-update-profile")

//  Register user
export const registerUsersAction = createAsyncThunk(
	"users/register",
	async (user, { rejectWithValue, getState, dispatch }) => {
		try {
			const res = await axios.post(`${baseUrl}/api/users/register/`, user, {
				headers: {
					"Content-Type": "application/json",
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

//  Login user
export const loginUserAction = createAsyncThunk(
	"users/login",
	async (user, { rejectWithValue }) => {
		try {
			const res = await axios.post(`${baseUrl}/api/users/login`, user, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			localStorage.setItem("userInfo", JSON.stringify(res.data));
			return res.data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}

			return rejectWithValue(error?.response?.data);
		}
	}
);

const getUserInfo = JSON.parse(localStorage.getItem("userInfo"));
//  Logout user
export const logoutUserAction = createAsyncThunk(
	"user/logout",
	async (payload, { rejectWithValue }) => {
		try {
			localStorage.removeItem("userInfo");
		} catch (error) {
			if (!error?.response) {
				throw error;
			}

			return rejectWithValue(error?.response?.data);
		}
	}
);

// user profile
export const userProfileAction = createAsyncThunk(
	"users/profile",
	async (id, { rejectWithValue, getState, dispatch }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.get(`${baseUrl}/api/users/profile/${id}/`, {
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

//change user profile photo
export const changeUserProfilePhotoAction = createAsyncThunk(
	"user/profile-photo-upload",
	async (image, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.put(
				`${baseUrl}/api/users/profile-photo-upload`,
				{ image },
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			);
			// Update user info in local storage with the new profile photo URL
			const updatedUserInfo = {
				...state?.users?.userAuth,
				profilePhoto: res?.data?.profilePhoto,
			};
			localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
			return res.data;
		} catch (error) {
			if (!error?.response) throw error;
			return rejectWithValue(error?.response?.data);
		}
	}
);

// update profile
export const updateProfileAction = createAsyncThunk(
	"users/update-profile",
	async (updatedData, { rejectWithValue, getState, dispatch }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.put(`${baseUrl}/api/users/update-user-info`,updatedData, {
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




const userSlices = createSlice({
	name: "user",
	initialState: {
		userAuth: getUserInfo,
	},
	extraReducers: (builder) => {
		/* Register */

		builder.addCase(registerUsersAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
			state.registered = undefined;
		});

		builder.addCase(registerUsersAction.fulfilled, (state, action) => {
			state.loading = false;
			state.registered = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(registerUsersAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
			state.registered = undefined;
		});

		/* Login */
		builder.addCase(loginUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(loginUserAction.fulfilled, (state, action) => {
			state.userAuth = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(loginUserAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
			undefined;
		});
		/* Logout */
		builder.addCase(logoutUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(logoutUserAction.fulfilled, (state, action) => {
			state.userAuth = undefined;
			state.profile = undefined;
			state.updatedProfile = undefined;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(logoutUserAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
			undefined;
		});

		/* User Profile */
		builder.addCase(userProfileAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(userProfileAction.fulfilled, (state, action) => {
			state.profile = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(userProfileAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		/* Change Profile photo */
		builder.addCase(changeUserProfilePhotoAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(changeUserProfilePhotoAction.fulfilled, (state, action) => {
			state.profile = action?.payload;
			state.profilePhoto = action?.payload?.profilePhoto;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(changeUserProfilePhotoAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		/* Update profile */
		builder.addCase(updateProfileAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(updateProfileAction.fulfilled, (state, action) => {
			state.updatedProfile = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(updateProfileAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		/* Reset update profile */
		builder.addCase(resetUpdateProfileAction, (state) => {
			state.updatedProfile = undefined;
		})
	},
});

export default userSlices.reducer;

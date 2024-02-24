import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "./../../../utils/baseUrl";

//Reset update profile
export const resetUpdateProfileAction = createAction(
	"users/reset-update-profile"
);
//Reset change pass action
export const resetChangePassAction = createAction("users/reset-change-pass");
//Reset forget pass action
export const resetForgetPassAction = createAction("users/reset-forget-pass");
//Reset forget (new pass) action
export const resetSetNewPassAction = createAction("users/reset-set-new-pass");
// update userAuth
export const updateAccVerifiedAction = createAction(
	"users/update-acc-verified"
);

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

// Change password
export const changePasswordAction = createAsyncThunk(
	"users/change-password",
	async (password, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.put(
				`${baseUrl}/api/users/update-password`,
				password,
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

// forget password
export const forgetPasswordAction = createAsyncThunk(
	"users/forget-password",
	async (email, { rejectWithValue }) => {
		try {
			const res = await axios.put(
				`${baseUrl}/api/users/forget-password-token`,
				email,
				{
					headers: {
						"Content-Type": "application/json",
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

// set new password
export const setNewPasswordAction = createAsyncThunk(
	"users/set-new-password",
	async (data, { rejectWithValue }) => {
		try {
			const res = await axios.put(`${baseUrl}/api/users/reset-password`, data, {
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

			const res = await axios.put(
				`${baseUrl}/api/users/update-user-info`,
				updatedData,
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

// Follow user
export const followUserAction = createAsyncThunk(
	"users/follow-user",
	async (followId, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.put(
				`${baseUrl}/api/users/follow`,
				{ followId },
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

// UnFollow user
export const UnFollowUserAction = createAsyncThunk(
	"users/unfollow-user",
	async (unFollowId, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.put(
				`${baseUrl}/api/users/unfollow`,
				{ unFollowId },
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

// fetch all users
export const fetchAllUserAction = createAsyncThunk(
	"users/fetch-all-user",
	async (_, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.get(`${baseUrl}/api/users`, {
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

// Block users
export const blockUserAction = createAsyncThunk(
	"users/block-user",
	async (id, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.put(
				`${baseUrl}/api/users/block-user/${id}`,
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

// UnBlock users
export const UnBlockUserAction = createAsyncThunk(
	"users/UnBlock-user",
	async (id, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.put(
				`${baseUrl}/api/users/unblock-user/${id}`,
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

// Delete users
export const deleteUserAction = createAsyncThunk(
	"users/delete-user",
	async (id, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const jwtToken = state?.users?.userAuth?.token;

			const res = await axios.delete(`${baseUrl}/api/users/${id}`, {
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
		// blockedUserState: [...getUserInfo.blockedUsers],
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
			state.blockedUserState = [...getUserInfo.blockedUsers];
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
			state.verify = undefined;
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

		/* Change Password */
		builder.addCase(changePasswordAction.pending, (state, action) => {
			state.changePassLoading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(changePasswordAction.fulfilled, (state, action) => {
			state.updatedPassUser = action?.payload;
			state.changePassLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(changePasswordAction.rejected, (state, action) => {
			state.changePassLoading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
		// reset change pass action
		builder.addCase(resetChangePassAction, (state) => {
			state.updatedPassUser = undefined;
		});

		/* forget Password */
		builder.addCase(forgetPasswordAction.pending, (state, action) => {
			state.forgetPassLoading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(forgetPasswordAction.fulfilled, (state, action) => {
			state.passwordToken = action?.payload;
			state.forgetPassLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(forgetPasswordAction.rejected, (state, action) => {
			state.forgetPassLoading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
		// reset forget pass action
		builder.addCase(resetForgetPassAction, (state) => {
			state.passwordToken = undefined;
		});

		/* set Password */
		builder.addCase(setNewPasswordAction.pending, (state, action) => {
			state.newPassLoading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(setNewPasswordAction.fulfilled, (state, action) => {
			state.newPassUser = action?.payload;
			state.newPassLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(setNewPasswordAction.rejected, (state, action) => {
			state.newPassLoading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
		// reset set new pass action
		builder.addCase(resetSetNewPassAction, (state) => {
			state.newPassUser = undefined;
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
			state.profilePhotoLoading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(changeUserProfilePhotoAction.fulfilled, (state, action) => {
			state.profile = action?.payload;
			state.profilePhoto = action?.payload?.profilePhoto;
			state.profilePhotoLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(changeUserProfilePhotoAction.rejected, (state, action) => {
			state.profilePhotoLoading = false;
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
		});

		/* Follow user */
		builder.addCase(followUserAction.pending, (state, action) => {
			state.followerLoading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(followUserAction.fulfilled, (state, action) => {
			state.followUser = action?.payload;
			state.unfollowUser = undefined;
			state.followerLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(followUserAction.rejected, (state, action) => {
			state.followerLoading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		/* Unfollow user */
		builder.addCase(UnFollowUserAction.pending, (state, action) => {
			state.followerLoading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(UnFollowUserAction.fulfilled, (state, action) => {
			state.unfollowUser = action?.payload;
			state.followUser = undefined;
			state.followerLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(UnFollowUserAction.rejected, (state, action) => {
			state.followerLoading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//update account verified
		builder.addCase(updateAccVerifiedAction, (state, action) => {
			const updatedUserInfo = {
				...state?.userAuth,
				isVerified: true,
			};
			localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
			state.userAuth = updatedUserInfo;
		});

		/* Fetch all user */
		builder.addCase(fetchAllUserAction.pending, (state, action) => {
			state.fetchAllUserLoading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(fetchAllUserAction.fulfilled, (state, action) => {
			state.allUsers = action?.payload;
			state.fetchAllUserLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(fetchAllUserAction.rejected, (state, action) => {
			state.fetchAllUserLoading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		/* Block user */
		builder.addCase(blockUserAction.pending, (state, action) => {
			state.blockUserLoading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(blockUserAction.fulfilled, (state, action) => {
			const blockedUserId = action?.payload?._id;
			if (blockedUserId) {
				state.blockedUserState = [...state.blockedUserState, blockedUserId];
			}
			state.blockUser = action?.payload;
			state.blockUserLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(blockUserAction.rejected, (state, action) => {
			state.blockUserLoading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		/* UnBlock user */
		builder.addCase(UnBlockUserAction.pending, (state, action) => {
			state.unBlockUserLoading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(UnBlockUserAction.fulfilled, (state, action) => {
			const unblockUserId = action?.payload?._id;
			if (unblockUserId) {
				state.blockedUserState = state.blockedUserState.filter(
					(id) => id !== unblockUserId
				);
			}
			state.unblockUser = action?.payload;
			state.unBlockUserLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(UnBlockUserAction.rejected, (state, action) => {
			state.unBlockUserLoading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
		/* Delete user */
		builder.addCase(deleteUserAction.pending, (state, action) => {
			state.deleteUserUserLoading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(deleteUserAction.fulfilled, (state, action) => {
			state.deleteUser = action?.payload;
			state.deleteUserUserLoading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(deleteUserAction.rejected, (state, action) => {
			state.deleteUserUserLoading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
	},
});

export default userSlices.reducer;

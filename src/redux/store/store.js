import { configureStore } from "@reduxjs/toolkit";
import categorySlices from "../slices/category/categorySlices";
import commentSlices from "../slices/comments/commentSlices";
import postSlices from "../slices/posts/postSlices";
import sendEmailSlices from "../slices/send-email/sendEmailSlices";
import usersSlices from "../slices/users/usersSlices";



const store = configureStore({
	reducer: {
		users: usersSlices,
		category: categorySlices,
		posts: postSlices,
		comments: commentSlices,
		mail: sendEmailSlices
	}
});

export default store;
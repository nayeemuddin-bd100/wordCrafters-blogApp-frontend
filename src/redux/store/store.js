import { configureStore } from "@reduxjs/toolkit";
import categorySlices from "../slices/category/categorySlices";
import commentSlices from "../slices/comments/commentSlices";
import postSlices from "../slices/posts/postSlices";
import usersSlices from "../slices/users/usersSlices";



const store = configureStore({
	reducer: {
		users: usersSlices,
		category: categorySlices,
		posts: postSlices,
		comments: commentSlices
	}
});

export default store;
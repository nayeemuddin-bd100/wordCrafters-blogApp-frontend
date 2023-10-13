import { configureStore } from "@reduxjs/toolkit";
import categorySlices from "../slices/category/categorySlices";
import postSlices from "../slices/posts/postSlices";
import usersSlices from "../slices/users/usersSlices";


const store = configureStore({
   reducer: {
      users: usersSlices,
      category: categorySlices,
      posts: postSlices
   }
})

export default store;
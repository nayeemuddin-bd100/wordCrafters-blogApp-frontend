import { configureStore } from "@reduxjs/toolkit";
import categorySlices from "../slices/category/categorySlices";
import usersSlices from "../slices/users/usersSlices";


const store = configureStore({
   reducer: {
      users: usersSlices,
      category: categorySlices
   }
})

export default store;
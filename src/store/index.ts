import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/usersSlice";
import categoryReducer from "./features/category/categorySlice";
import blogReducer from "./features/blog/blogSlice";
import astrologersReducer from "./features/astrologer/astrologersSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    categories: categoryReducer,
    blog: blogReducer,
    astrologers: astrologersReducer,
  },
});

export default store;

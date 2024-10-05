import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    categories: [],
    selectedBlog: null,
  },
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setSelectedBlog(state, action) {
      state.selectedBlog = action.payload;
    },
  },
});

export const { setBlogs, setCategories, setSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const astrologersSlice = createSlice({
  name: "astrologers",
  initialState: {
    data: [],
    totalPages: 0,
    currentPage: 1,
  },
  reducers: {
    setAstrologers: (state, action) => {
      state.data = action.payload.data;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    addAstrologer: (state, action) => {
      state.data.push(action.payload);
    },
    updateAstrologer: (state, action) => {
      const index = state.data.findIndex(
        (astrologer) => astrologer._id === action.payload._id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    removeAstrologer: (state, action) => {
      state.data = state.data.filter(
        (astrologer) => astrologer._id !== action.payload
      );
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setAstrologers,
  addAstrologer,
  updateAstrologer,
  removeAstrologer,
  setCurrentPage,
} = astrologersSlice.actions;

export default astrologersSlice.reducer;

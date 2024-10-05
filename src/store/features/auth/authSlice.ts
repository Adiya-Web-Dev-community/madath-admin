import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  email: string;
  token: string;
  role: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  email: "",
  token: "",
  role: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    clearAuth: (state) => {
      state.email = "";
      state.token = "";
      state.role = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setEmail, setToken, setRole, setIsAuthenticated, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;

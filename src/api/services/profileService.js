import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../client";

export const fetchUserProfile = createAsyncThunk(
  "profile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Get user", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/users/profile", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("update user", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updatePassword = createAsyncThunk(
  "profile/updatePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/users/update-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("update password", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

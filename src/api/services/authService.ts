import axiosInstance from "../client";

export const signIn = async (credentials) => {
  try {
    const response = await axiosInstance.post("/admin/login", credentials);
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const signUp = async (credentials) => {
  const response = await axiosInstance.post("/users/register", credentials);
  return response;
};

export const verifyOTP = async (verificationData) => {
  const response = await axiosInstance.post(
    "/users/verify-otp",
    verificationData
  );
  return response.data;
};

export const resendOTP = async (email) => {
  const response = await axiosInstance.post("/users/resend-otp", { email });
  return response.data;
};

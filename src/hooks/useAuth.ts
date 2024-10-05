import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import {
  resendOTP,
  signIn,
  signUp,
  verifyOTP,
} from "../api/services/authService";
import {
  clearAuth,
  // setId,
  setIsAuthenticated,
  setRole,
  setToken,
} from "@/store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { selectEmail } from "@/store/features/auth/authSelectors";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(selectEmail);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token in localStorage on component mount
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      // const cId = decodedToken.id;
      dispatch(setIsAuthenticated(true));
      dispatch(setToken(token));
      dispatch(setRole(role));
      // dispatch(setId(cId));
      localStorage.setItem("role", role);
    }
  }, []);

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      if (data.success) {
        const token = data.token;
        const decodedToken = jwtDecode(token);
        const role = decodedToken.role; // Extract role from token
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        dispatch(setToken(token));
        dispatch(setRole(role));
        dispatch(setIsAuthenticated(true));
        setAuthenticated(true);
        // Navigate based on role
        switch (role) {
          // case "customer":
          //   navigate("/");
          //   break;
          // case "supplier":
          //   navigate("/");
          //   break;
          case "admin":
            navigate("/");
            break;
          default:
            console.error("Unknown role:", role);
            navigate("/");
        }
      } else {
        // Handle unsuccessful sign-in
        console.error("Sign-in was not successful:", data.message);
      }
    },
    onError: (error) => {
      console.log(error);
      const errorMessage = error;
      if (errorMessage === "Please verify your account first") {
        handleResendOTP(email);
        navigate("/otp");
      }
    },
  });

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("Registration successful", data);
      navigate("/otp");
    },
    onError: (error) => {
      console.error("Sign-up failed:", error);
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      console.log("OTP verification successful", data);
      // You might want to automatically sign in the user here
      // or navigate them to the sign-in page
      navigate("/sign-in");
    },
    onError: (error) => {
      console.error("OTP verification failed:", error);
    },
  });

  const resendOTPMutation = useMutation({
    mutationFn: resendOTP,
    onSuccess: (data) => {
      console.log("OTP resend successful", data);
    },
    onError: (error) => {
      console.error("OTP resend failed:", error);
    },
  });

  const handleVerifyOTP = (verificationData) => {
    verifyOTPMutation.mutate(verificationData);
  };

  const handleSignIn = (credentials) => {
    signInMutation.mutate(credentials);
  };

  const handleSignUp = (credentials) => {
    signUpMutation.mutate(credentials);
  };

  const handleResendOTP = (email) => {
    resendOTPMutation.mutate(email);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(clearAuth());
    setAuthenticated(false);
    navigate("/sign-in");
  };

  return {
    handleSignIn,
    handleSignUp,
    handleLogOut,
    handleVerifyOTP,
    handleResendOTP,
    isAuthenticated,
    isSigningIn: signInMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isVerifyingOTP: verifyOTPMutation.isPending,
    isResendingOTP: resendOTPMutation.isPending,
    signInError: signInMutation.error,
    signUpError: signUpMutation.error,
    verifyOTPError: verifyOTPMutation.error,
    resendOTPError: resendOTPMutation.error,
    user: signInMutation.data?.user,
    token: signInMutation.data?.token || localStorage.getItem("token"),
    role: signInMutation.data?.role || localStorage.getItem("role"),
  };
};

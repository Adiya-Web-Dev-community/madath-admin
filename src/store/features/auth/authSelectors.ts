import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../types";
export const selectAuthState = (state: RootState) => state.auth;

export const selectEmail = createSelector(
  [selectAuthState],
  (auth) => auth.email
);

export const selectToken = createSelector(
  [selectAuthState],
  (auth) => auth.token
);

export const selectRole = createSelector(
  [selectAuthState],
  (auth) => auth.role
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

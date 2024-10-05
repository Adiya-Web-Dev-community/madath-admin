// src/store/selectors.js or src/redux/userSelectors.js

export const selectUser = (state) => state.user.user;
export const selectProfile = (state) => state.user.profile;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

// You can also create more complex selectors if needed
export const selectFullName = (state) => {
  const user = selectUser(state);
  return user ? `${user.firstName} ${user.lastName}` : "";
};

export const selectIsLoading = (state) => selectUserStatus(state) === "loading";

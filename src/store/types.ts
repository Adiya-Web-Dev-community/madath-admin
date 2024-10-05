// src/store/types.ts
import { AuthState } from "./features/auth/authSlice";

export interface RootState {
  auth: AuthState;
  // ... other slices
}

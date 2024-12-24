import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import userAccountReducer from "@/features/userAccount/userAccountSlice";
import profileCardReducer from "@/features/profileCard/profileCardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userAccount: userAccountReducer,
    profileCard: profileCardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

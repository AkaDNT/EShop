import { create } from "zustand";
import { AuthSlice, createAuthSlice } from "./slices/auth-slice";
import { createToastsSlice, ToastsSlice } from "./slices/toasts-slice";

type StoreState = AuthSlice & ToastsSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createToastsSlice(...a),
}));

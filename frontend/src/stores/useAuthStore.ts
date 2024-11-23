import { axiosInstance } from "@/lib/axios.ts";
import { create } from "zustand";
export interface authStoreState {
  isAdmin: boolean;
  isLoading: boolean;
  checkAdminStatus: () => Promise<void>;
  reset: () => void;
  error: string | null;
}
export const useAuthStore = create<authStoreState>((set) => ({
  isAdmin: false,
  isLoading: true,
  error: null,
  checkAdminStatus: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/admin/check");
      set({ isAdmin: response.data.content });
    } catch (error: any) {
      set({ error: error });
    } finally {
      set({ isLoading: false });
    }
  },
  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));

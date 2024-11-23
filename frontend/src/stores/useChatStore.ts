import { axiosInstance } from "@/lib/axios.ts";
import { User } from "@/types/User.ts";
import { create } from "zustand";
export interface chatStoreState {
  users: User[];
  fetchUsers: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}
export const useChatStore = create<chatStoreState>((set) => ({
  users: [],
  isLoading: true,
  error: null,
  fetchUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/users");
      set({ users: response.data.content });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      //todo always make use of the finally block to set isloading state to false
      set({ isLoading: false });
    }
  },
}));

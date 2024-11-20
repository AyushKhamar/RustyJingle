import { axiosInstance } from "@/lib/axios.ts";
import { Album } from "@/types/Album.ts";
import { Song } from "@/types/Song.ts";
import { create } from "zustand";

interface MusicStoreState {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
}
//todo another example of how to setup global state using zustand
export const useMusicStore = create<MusicStoreState>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/albums");
      set({ albums: response.data.content });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

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
  fetchAlbumById: (id: string) => Promise<void>;
  currentAlbum: Album | null;
  madeForYouSongs: Song[];
  featuredSongs: Song[];
  trendingSongs: Song[];
  fetchMadeForYouSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
}
//todo another example of how to setup global state using zustand
export const useMusicStore = create<MusicStoreState>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  featuredSongs: [],
  trendingSongs: [],
  madeForYouSongs: [],
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
  fetchAlbumById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data.content as Album });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/songs/trending`);
      set({ trendingSongs: response.data.content as Song[] });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/songs/made-for-you`);
      set({ madeForYouSongs: response.data.content as Song[] });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/songs/featured`);
      set({ featuredSongs: response.data.content as Song[] });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

import { Song } from "@/types/Song.ts";
import { create } from "zustand";

export interface usePlayStoreState {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  initialiseQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayStore = create<usePlayStoreState>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  //todo this pointer doesnt work with arrow functions so if we have arrow function then we will have to add a function called get() as a property to access the current state. we include it as an argument while defining the store with set.
  initialiseQueue(songs) {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex !== -1 ? get().currentIndex : 0,
    });
  },
  setCurrentSong(song) {
    if (!song) return;
    const songIndex = get().queue.findIndex((item) => item._id === song._id);
    set({
      currentSong: song,
      currentIndex: songIndex === -1 ? get().currentIndex : songIndex,
      isPlaying: true,
    });
  },
  playAlbum(songs, startIndex) {
    if (songs.length === 0) return;
    const song = songs[startIndex ?? 0];
    set({
      currentSong: song,
      queue: songs,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },
  togglePlay() {
    console.log("from toggle play", get().isPlaying);
    const willStartPlaying = !get().isPlaying;
    set({
      isPlaying: willStartPlaying,
    });
  },
  playNext() {
    const newIndex = get().currentIndex + 1;
    if (newIndex >= get().queue.length) set({ isPlaying: false });
    else {
      set({
        currentSong: get().queue[newIndex],
        currentIndex: newIndex,
        isPlaying: true,
      });
    }
  },
  playPrevious() {
    const newIndex = get().currentIndex - 1;
    if (newIndex < 0) set({ isPlaying: false });
    else {
      set({
        currentSong: get().queue[newIndex],
        currentIndex: newIndex,
        isPlaying: true,
      });
    }
  },
}));

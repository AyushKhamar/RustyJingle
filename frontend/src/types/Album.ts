import { Song } from "./Song.ts";

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageURL: string;
  releaseYear: number;
  songs: Song[];
}

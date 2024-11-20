export interface Song {
  _id: string;
  title: string;
  artist: string;
  imageURL: string;
  audioURL: string;
  albumId?: string; // Optional field
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

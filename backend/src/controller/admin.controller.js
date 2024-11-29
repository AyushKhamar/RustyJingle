import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import cloudinary from "../lib/cloudinary.js";
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
  try {
    // todo these contents are used in order to check if there are any audio or image files inside of the req.files object.
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload all files" });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;
    const audioURL = await uploadToCloudinary(audioFile);
    const imageURL = await uploadToCloudinary(imageFile);
    const song = await Song.create({
      title,
      artist,
      duration,
      albumId: albumId || null,
      audioURL,
      imageURL,
    });
    // await song.save();
    if (albumId)
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    res
      .status(201)
      .json({ success: true, message: "Song created", content: song });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error in creating song",
    });
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    await Song.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Some error while deleting the song" });
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    if (!title || !artist || !releaseYear || !req.files || !req.files.imageFile)
      res
        .status(400)
        .json({ success: false, message: "Please send all the attributes" });
    const imageFile = req.files.imageFile;
    const imageURL = await uploadToCloudinary(imageFile);
    const album = await Album.create({
      title,
      artist,
      releaseYear,
      imageURL,
      songs: [],
    });
    res.status(200).json({
      success: true,
      message: "Album created successfully",
      content: album,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Some error while creating album" });
    next(error);
  }
};
export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Album deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Some error while deleting the album" });
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ content: true });
};

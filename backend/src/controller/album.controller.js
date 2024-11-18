import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find({});
    res.status(200).json({ success: true, content: albums });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error while getting all albums",
    });
    next(error);
  }
};
export const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);
    if (!album)
      res.status(404).json({ success: false, message: "No such album exists" });
    res.status(200).json({ success: true, content: album });
  } catch (error) {
    res.status(500).json({
      success: false,
      content: "Some error while getting album by id",
    });
    next(error);
  }
};

import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    // todo -1 means descending i.e newest to oldest
    const songs = await Song.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, content: songs });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "some error while getting all songs" });
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // todo fetch 6 random songs by using mongodb aggregate pipeline
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageURL: 1,
          audioURL: 1,
        },
      },
    ]);

    res.status(200).json({ success: false, content: songs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error in getting featured songs",
    });
    next(error);
  }
};
export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageURL: 1,
          audioURL: 1,
        },
      },
    ]);
    res.status(200).json({ success: false, content: songs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error in getting made for you songs",
    });
    next(error);
  }
};
export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageURL: 1,
          audioURL: 1,
        },
      },
    ]);
    res.status(200).json({ success: false, content: songs });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error in getting trending songs",
    });
    next(error);
  }
};

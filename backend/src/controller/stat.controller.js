import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";
export const getStats = async (req, res, next) => {
  try {
    const AllSongs = await Song.find({});
    const totalSongs = AllSongs.length;
    const totalUsers = await User.countDocuments();
    const totalAlbums = await Album.countDocuments();
    const totalArtistSet = new Set();
    for (let song of AllSongs) totalArtistSet.add(song.artist);
    const totalArtist = totalArtistSet.size;

    res.status(200).json({
      success: true,
      content: {
        totalSongs,
        totalUsers,
        totalAlbums,
        totalArtists: totalArtist || 0,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Some error in getting the stats" });
    next(error);
  }
};

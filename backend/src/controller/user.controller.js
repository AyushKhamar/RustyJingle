import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } });
    res.status(200).json({ success: true, content: users });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Some error in getting all users" });
    next(error);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
      res.status(400).json({ success: false, message: "No such user exists" });
    res.status(200).json({ success: true, content: user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Some error in getting user by id" });
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const myId = req.auth.userId;
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ success: true, content: messages });
  } catch (error) {
    next(error);
  }
};

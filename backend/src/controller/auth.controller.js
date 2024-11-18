import { User } from "../models/user.model.js";
export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageURL } = req.body;
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      //signup
      await User.create({
        fullName: `${firstName} ${lastName}`,
        clerkId: id,
        imageURL,
      });
      res.status(200).json({
        success: true,
        message: "User created successfully",
        content: { firstName, lastName, imageURL, id },
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Some error in callback controller" });
    next(error);
  }
};

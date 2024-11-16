import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId)
    return res
      .status(401)
      .json({ success: false, message: "You are not logged in" });

  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
    if (!isAdmin)
      return res
        .status(403)
        .json({ success: false, message: "You are not authorised" });
    next();
  } catch (error) {
    res
      .status(500)
      .json({ successf: false, message: "Some error in admin verification" });
  }
};

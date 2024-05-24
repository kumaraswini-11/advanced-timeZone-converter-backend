import jwt from "jsonwebtoken";
import { prisma } from "../config/db.config.js";

// Middleware to verify token (Authentication process)
export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(403)
        .json({ message: "A token is required for authentication" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id },
      select: { id: true, userName: true, role: true, email: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error during token verification:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

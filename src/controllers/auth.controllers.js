import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../config/db.config.js";

// Configure cookie options for secure and HTTP-only cookies
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Mock Authentication
export const authenticateUser = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Both username and password are required." });
  }

  try {
    let user = await prisma.user.findUnique({
      where: { userName },
    });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: {
          userName,
          password: hashedPassword,
        },
      });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
      email: user.email,
    });

    return res.status(200).cookie("token", token, cookieOptions).json({
      message: "User authentication successful",
      data: user,
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

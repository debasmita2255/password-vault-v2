const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.pvUserToken;

  try {
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Authentication token missing." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    // Token is invalid or expired

    res.clearCookie("pvUserToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    return res.status(401).json({
      error: "Invalid or expired session. Please log in again.",
    });
  }
};

module.exports = authMiddleware;

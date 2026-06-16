const router = require("express").Router();
const {
  register,
  login,
  logout,
  getUserDetails,
  changePassword,
  deleteAccount,
} = require("../services/user");
const authMiddleware = require("../middleware/authMiddleware");

// public routes (no token needed)
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// protected route (requires valid token)
router.get("/userDetails", authMiddleware, getUserDetails);

// apis to handle actions in profile tab
router.post("/change-password", authMiddleware, changePassword);
router.delete("/delete", authMiddleware, deleteAccount);

module.exports = router;

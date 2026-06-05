const router = require("express").Router();
const { register, login, logout, getUserDetails } = require("../services/user");
const authMiddleware = require("../middleware/authMiddleware");

// public routes (no token needed)
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// protected route (requires valid token)
router.get("/userDetails", authMiddleware, getUserDetails);

module.exports = router;

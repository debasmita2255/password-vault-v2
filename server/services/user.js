const User = require("../models/user");
const Credentials = require("../models/credential");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    if (username.length < 5) {
      return res
        .status(400)
        .json({ error: "Username should have at least 5 characters!" });
    }
    if (password.length < 4) {
      return res
        .status(400)
        .json({ error: "Password should have at least 4 characters!" });
    }

    const checkUser = await User.findOne({ $or: [{ email }, { username }] });

    if (checkUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists!" });
    } else {
      const hashPass = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashPass });
      await newUser.save();
      return res.status(201).json({ success: "Registration successful!" });
    }
  } catch (error) {
    console.log("Registration Error: ", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: checkUser._id, email: checkUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
      );

      res.cookie("pvUserToken", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
      });

      return res.status(200).json({ success: "Logged in successfully!" });
    } else {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("pvUserToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    return res.status(200).json({ success: "Logged out successfully!" });
  } catch (error) {
    console.log("Logout Error:", error);
    return res
      .status(500)
      .json({ error: "Internal server error during logout!" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { user } = req;

    const getDetails = await User.findById(user._id)
      .populate("credentials")
      .select("-password");

    if (getDetails) {
      return res.status(200).json({
        success: true,
        user: getDetails, // returning the user object with populated credentials
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("Get User Details Error:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

module.exports = { register, login, logout, getUserDetails };

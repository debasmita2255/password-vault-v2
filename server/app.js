const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./connection/conn");

const userRoutes = require("./routes/user");
const credentialRoutes = require("./routes/credential");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Password Vault API is running...");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/credentials", credentialRoutes);

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});

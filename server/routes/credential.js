const express = require("express");
const router = express.Router();
const {
  addCredential,
  getCredentials,
  updateCredential,
  deleteCredential,
} = require("../services/credential");
const authMiddleware = require("../middleware/authMiddleware");

// all credential routes should be protected
router.use(authMiddleware);

router.post("/add", addCredential);
router.get("/getAll", getCredentials);
router.put("/update/:id", updateCredential);
router.delete("/delete/:id", deleteCredential);

module.exports = router;

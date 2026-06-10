const Credential = require("../models/credential");
const User = require("../models/user");

const addCredential = async (req, res) => {
  try {
    const { platform, loginId, encryptedPassword, websiteUrl, iv } = req.body;

    if (!platform || !loginId || !encryptedPassword || !iv) {
      return res.status(400).json({ error: "Required fields are missing!" });
    }

    const newCredential = new Credential({
      user: req.user.id,
      platform,
      loginId,
      encryptedPassword,
      websiteUrl,
      iv,
    });

    await newCredential.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { credentials: newCredential._id },
    });

    return res
      .status(201)
      .json({ success: "Credential saved safely!", credential: newCredential });
  } catch (error) {
    console.error("Add Credential Error: ", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

const getCredentials = async (req, res) => {
  try {
    const credentials = await Credential.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ success: true, credentials });
  } catch (error) {
    console.error("Get Credentials Error: ", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

const updateCredential = async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, loginId, encryptedPassword, websiteUrl, iv } = req.body;

    const updatedCredential = await Credential.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { platform, loginId, encryptedPassword, websiteUrl, iv },
      { new: true }, // returns the updated document
    );

    if (!updatedCredential) {
      return res
        .status(404)
        .json({ error: "Credential not found or unauthorized." });
    }

    return res
      .status(200)
      .json({ success: "Credential updated!", credential: updatedCredential });
  } catch (error) {
    console.error("Update Credential Error: ", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

const deleteCredential = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCredential = await Credential.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deletedCredential) {
      return res
        .status(404)
        .json({ error: "Credential not found or unauthorized." });
    }

    await User.findByIdAndUpdate(req.user.id, {
      $pull: { credentials: id },
    });

    return res
      .status(200)
      .json({ success: "Credential deleted successfully!" });
  } catch (error) {
    console.error("Delete Credential Error: ", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

module.exports = {
  addCredential,
  getCredentials,
  updateCredential,
  deleteCredential,
};

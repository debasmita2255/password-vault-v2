const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const credentialSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    platform: {
      // the name of the platform for which user wants to save credentials
      type: String,
      required: true,
      trim: true,
    },
    loginId: {
      // the username or email they use to log into that specific platform
      type: String,
      required: true,
      trim: true,
    },
    encryptedPassword: {
      // the password to log into that platform (stored after excryption)
      type: String,
      required: true,
    },
    websiteUrl: {
      // optionally save the url of that platform
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Credential", credentialSchema);

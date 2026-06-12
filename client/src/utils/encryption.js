import CryptoJS from "crypto-js";

// derive a consistent 256-bit key from the user's master password
const deriveKey = (masterPassword) => {
  return CryptoJS.SHA256(masterPassword);
};

// encrypts a raw password
// returns an object containing the ciphertext and the unique IV
export const encryptPassword = (plainTextPassword, masterPassword) => {
  const key = deriveKey(masterPassword);

  // generate a random 16-byte IV for this specific credential
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(plainTextPassword, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return {
    encryptedPassword: encrypted.toString(), // base64 ciphertext
    iv: CryptoJS.enc.Base64.stringify(iv), // base64 IV
  };
};

// decrypt an encrypted password back to plain text
export const decryptPassword = (
  encryptedPassword,
  ivBase64,
  masterPassword,
) => {
  try {
    const key = deriveKey(masterPassword);
    const iv = CryptoJS.enc.Base64.parse(ivBase64);

    const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error(
      "Decryption failed. Incorrect master password or corrupted data.",
    );
    return null;
  }
};

import CryptoJS from "crypto-js";

let cachedKey = null;
let cachedPassword = null;
let cachedSalt = null;

const deriveKey = (masterPassword, salt) => {
  if (!salt) {
    throw new Error(
      "CRITICAL: Cryptographic salt is missing. Halting encryption.",
    );
  }

  if (cachedKey && cachedPassword === masterPassword && cachedSalt === salt) {
    return cachedKey;
  }

  const key = CryptoJS.PBKDF2(masterPassword, salt, {
    keySize: 256 / 32,
    iterations: 100000,
  });

  cachedKey = key;
  cachedPassword = masterPassword;
  cachedSalt = salt;
  return key;
};

// encrypts a raw password
// returns an object containing the ciphertext and the unique IV
export const encryptPassword = (plainTextPassword, masterPassword, salt) => {
  const key = deriveKey(masterPassword, salt);

  // generate a random 16-byte IV for this specific credential
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(plainTextPassword, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return {
    encryptedPassword: encrypted.toString(),
    iv: CryptoJS.enc.Base64.stringify(iv),
  };
};

// decrypt an encrypted password back to plain text
export const decryptPassword = (
  encryptedPassword,
  ivBase64,
  masterPassword,
  salt,
) => {
  try {
    const key = deriveKey(masterPassword, salt);
    const iv = CryptoJS.enc.Base64.parse(ivBase64);

    const decrypted = CryptoJS.AES.decrypt(encryptedPassword, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed.");
    return null;
  }
};

const dotenv = require("dotenv");
dotenv.config();
const cryptojs = require("crypto-js");

// ============================================================
// ------------------------- Variables --------------------------

const EMAIL_CRYPTOJS_KEY = process.env.EMAIL_CRYPTOJS_KEY;

// ---------------------- Crypto functions -------------------------

const encryptEmail = (email, key) => {
  return cryptojs.AES.encrypt(email, key).toString();
};

const decryptEmail = (encryptEmail, key) => {
  const decrypted = cryptojs.AES.decrypt(encryptEmail, key);
  const emailDecrypted = decrypted.toString(cryptojs.enc.Utf8);
  return emailDecrypted;
};

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = { encryptEmail, decryptEmail, EMAIL_CRYPTOJS_KEY };

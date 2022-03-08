const dotenv = require("dotenv");
dotenv.config();
const cryptojs = require("crypto-js");

// ============================================================
// ------------------------- Variables --------------------------

const EMAIL_CRYPTOJS_KEY = process.env.EMAIL_CRYPTOJS_KEY;

// ---------------------- Crypto functions -------------------------

const encryptEmail = (email) => {
  return cryptojs.AES.encrypt(email, EMAIL_CRYPTOJS_KEY).toString();
};

const decryptEmail = (encryptEmail) => {
  return cryptojs.AES.decrypt(encryptEmail, EMAIL_CRYPTOJS_KEY).toString(
    cryptojs.enc.Utf8
  );
};

// ============================================================
// ------------------------- EXPORT ---------------------------

module.exports = { encryptEmail, decryptEmail };

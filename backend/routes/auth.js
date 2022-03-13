const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/auth.js");

const auth = require("../middlewares/auth.js");
const multer = require("../middlewares/multer-config.js");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);

module.exports = router;

const express = require("express");
const router = express.Router();
//Controllers
const userCtrl = require("../controllers/auth.js");
//Middlewares
const auth = require("../middlewares/auth.js");
const multer = require("../middlewares/multer-config.js");
//Routes
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;

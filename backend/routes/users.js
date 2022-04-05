const express = require("express");
const router = express.Router();
//Controllers
const usersCtrl = require("../controllers/users.js");
//Middlewares
const auth = require("../middlewares/auth.js");
const multer = require("../middlewares/multer-config.js");
//Routes
router.get("/:id", auth, usersCtrl.getOneUser);
router.get("/", auth, usersCtrl.getAllUsers);
router.delete("/:id", auth, usersCtrl.deleteOneUser);
router.put("/edit/:id", auth, multer, usersCtrl.editUser);

module.exports = router;

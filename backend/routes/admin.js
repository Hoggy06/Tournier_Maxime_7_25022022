// LIBRAIRIES
const express = require("express");
const router = express.Router();

// MIDDLEWARES
const auth = require("../middlewares/auth.js");
const multer = require("../middlewares/multer-config.js");

// CONTROLLERS
const userCtrl = require("../controllers/Users.js");
const postCtrl = require("../controllers/Posts.js");
const commentCtrl = require("../controllers/Comments.js");
const roleCtrl = require("../controllers/admin.js");

router.post("/users/:id/setAdmin", auth, roleCtrl.setAdmin);
router.get("/users", auth, userCtrl.getAllUsers);

router.delete("/users/:id", auth, userCtrl.deleteOneUser);
router.delete("/posts/:id", auth, multer, postCtrl.deletePost);
router.delete("/posts/:postId/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;

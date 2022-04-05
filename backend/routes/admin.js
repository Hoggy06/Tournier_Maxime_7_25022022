// LIBRAIRIES
const express = require("express");
const router = express.Router();

// MIDDLEWARES
const auth = require("../middlewares/auth.js");
const multer = require("../middlewares/multer-config.js");

// CONTROLLERS
const adminCtrl = require("../controllers/admin.js");
const userCtrl = require("../controllers/users.js");
const postCtrl = require("../controllers/posts.js");
const commentCtrl = require("../controllers/comments.js");
//ROUTES
router.post("/users/:id/setAdmin", auth, adminCtrl.setAdmin);
router.get("/users", auth, userCtrl.getAllUsers);

router.delete("/users/:id", auth, userCtrl.deleteOneUser);
router.delete("/posts/:id", auth, multer, postCtrl.deletePost);
router.delete("/posts/:postId/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;

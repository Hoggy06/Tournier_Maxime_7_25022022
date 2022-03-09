const express = require("express");
const router = express.Router();

const postsCtrl = require("../controllers/posts.js");
const commentsCtrl = require("../controllers/comments.js");

const auth = require("../middlewares/auth.js");
const multer = require("../middlewares/multer-config.js");

router.post("/", auth, multer, postsCtrl.createPost);
router.get("/", auth, postsCtrl.getAllPosts);
router.get("/:id", auth, postsCtrl.getOnePost);
router.put("/:id", auth, multer, postsCtrl.editPost);
router.delete("/:id", auth, multer, postsCtrl.deletePost);

router.post("/:postId/comments", auth, commentsCtrl.createComment);
router.get("/:postId/comment/:id", auth, commentsCtrl.getOneComment);
router.get("/:postId/comments", auth, commentsCtrl.getAllComments);
router.put("/:postId/comment/:id", auth, commentsCtrl.editComment);
router.delete("/:postId/comment/:id", auth, commentsCtrl.deleteComment);

module.exports = router;

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

router.post("/:postId/comment", auth, commentsCtrl.createComment);
router.get("/comments", auth, commentsCtrl.getAllComments);
router.get("/:postId/comment", auth, commentsCtrl.getOneComment);
router.put("/:postId/comment", auth, commentsCtrl.editComment);
router.delete("/:postId/comment", auth, commentsCtrl.deleteComment);

module.exports = router;

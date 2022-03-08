const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comments.js");

const auth = require("../middlewares/auth.js");

router.post("/", auth, commentCtrl.createComment);
//router.get("/", auth, commentCtrl.getAllComments);
//router.get("/:id", auth, commentCtrl.getOneComment);
//router.put("/:id", auth, commentCtrl.editComment);
//router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;

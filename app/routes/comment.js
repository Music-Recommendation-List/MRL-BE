const express = require("express");
const ctrlComment = require("../controller/comments/ctrl.comments");
const authMW = require("../middlewares/authMW");

const router = express.Router();

router.get("/comment/:postId", ctrlComment.commentList);

router.post("/comment/:postId", authMW, ctrlComment.commentWrite);

router.put("/comment/:commentId", authMW, ctrlComment.commentUpdate);

router.delete("/comment/:commentId", authMW, ctrlComment.commentDelete);

module.exports = router;

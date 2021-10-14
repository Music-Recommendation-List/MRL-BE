const express = require("express");
const router = express.Router();
const ctrlPost = require("../controller/posts/ctrl.posts");
const ctrlLike = require("../controller/posts/ctrl.like");
const authMW = require("../middlewares/authMW");

router.post("/posts", ctrlPost.getProcess.getPost); //게시글 조회
router.post("/posts/write", ctrlPost.postProcess.writePost); //게시글 등록
router.get("/posts/detail/:postId", ctrlPost.getProcess.detailPost); //게시글 상세 페이지
router.put("/posts/detail/:postId/edit", authMW, ctrlPost.postProcess.editPost); //게시글 수정
router.delete(
  "/posts/detail/:postId/edit",
  authMW,
  ctrlPost.postProcess.deletePost
); //게시글 삭제
router.post(
  "/posts/detail/:postId/like",
  authMW,
  ctrlLike.likeProcess.createLike
); //좋아요 추가
router.delete(
  "/posts/detail/:postId/like",
  authMW,
  ctrlLike.likeProcess.removeLike
); //좋아요 삭제

module.exports = router;

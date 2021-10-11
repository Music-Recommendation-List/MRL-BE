const express = require("express");
const router = express.Router();
const Boards = require("../schemas/Post");
// const Comment = require("../schemas/Comment");

//게시글 등록
router.post("/posts", async (req, res) => {
  try {
    // 로그인 유저 확인
    // const {userId } = res.locals.user;
    //body에 저장값을 받음
    const {
      postId,
      songName,
      userId,
      desc,
      singer,
      url,
      date,
      category1,
      category2,
      category3,
      likeUser,
    } = res.body;

    //db에 저장
    const boards = new Boards({
      postId,
      songName,
      userId,
      desc,
      singer,
      url,
      date,
      category1,
      category2,
      category3,
      likeUser,
    });
    await boards.save();
    res.status(201).send({ ok: true, results });
  } catch (err) {
    //에러 발생 시 message 핸들링
    console.log(err);
    res.status(400).send({
      message: "음악을 저장하는데 알 수 없는 문제가 발생했습니다.",
    });
  }
});

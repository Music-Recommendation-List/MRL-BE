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

//게시글 조회
router.post("/posts", async (req, res) => {
  try {
    const boards = await boards.find({});

    // const query1 = category1 === undefined ? {} : { category1: category1 };
    // const query2 = category2 === undefined ? {} : { category2: category2 };
    // const query3 = category3 === undefined ? {} : { category3: category3 };
    // const boards = await boards.find({ query1 && query2 && query3 })

    res.status(201).send({ ok: true, results });
  } catch (err) {
    //에러 발생 시 message 핸들링
    console.log(err);
    res.status(400).send({
      message: "음악을 불러오는데 알 수 없는 문제가 발생했습니다.",
    });
  }
});

//게시글 상세 페이지
router("/posts/detail/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const board = await Boards.findById(postId);

    if (!board) {
      // board 정보가 없을 때
      res.status(404).send({
        message:
          "게시글에 알 수 없는 문제가 발생했습니다. 관리자에게 문의해주세요.",
      });
    } else {
      res.send({ ok: true, results });
    }
  } catch (err) {
    //에러 발생 시 message 핸들링
    console.log(err);
    res.status(400).send({
      message: "게시글을 불러오는데 알 수 없는 문제가 발생했습니다.",
    });
  }
});

//게시글 수정
router.put("/posts/detail/:postId", async (req, res) => {
  try {
    // 로그인 유저 확인
    // const {userId } = res.locals.user;
    const { postId } = req.params;
    const { songName, desc, singer, url, category1, category2, category3 } =
      res.body;

    const isBoard = await Boards.findById(postId);
    if (isBoard.length) {
      await Boards.updateOne(
        { postId },
        {
          $set: {
            songName,
            desc,
            singer,
            url,
            category1,
            category2,
            category3,
          },
        }
      );
    }
    res.send({ ok: true, result });
  } catch (err) {
    res.status(400).send({
      message: "게시글을 수정하는데 알 수 없는 문제가 발생했습니다.",
    });
  }
});

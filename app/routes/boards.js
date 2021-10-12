const express = require("express");
const router = express.Router();
const Posts = require("../schemas/Post");
// const Comment = require("../schemas/Comment");

//게시글 등록
router.post("/posts", async (req, res) => {
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
  } = req.body;
  //db에 저장
  try {
    const posts = new Posts({
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
    await posts.save();
    res.status(201).send({ ok: true, results: boards });
  } catch (err) {
    //에러 발생 시 message 핸들링
    console.log(err);
    res.status(400).send({
      message: "음악을 저장하는데 알 수 없는 문제가 발생했습니다.",
    });
  }
});

//게시글 조회
router.get("/posts", async (req, res) => {
  const posts = await Posts.find({});
  // const query1 = category1 === undefined ? {} : { category1: category1 };
  // const query2 = category2 === undefined ? {} : { category2: category2 };
  // const query3 = category3 === undefined ? {} : { category3: category3 };
  // const boards = await boards.find({ query1 && query2 && query3 })
  try {
    res.status(201).send({ ok: true, results: posts });
  } catch (err) {
    //에러 발생 시 message 핸들링
    res.status(400).send({
      message: "음악을 불러오는데 알 수 없는 문제가 발생했습니다.",
    });
  }
});

//게시글 상세 페이지
router.get("/posts/detail/:postId", async (req, res) => {
  const { postId } = req.params;
  const posts = await Posts.findById(postId);
  try {
    if (!posts) {
      // boards 정보가 없을 때
      res.status(404).send({
        message:
          "게시글에 알 수 없는 문제가 발생했습니다. 관리자에게 문의해주세요.",
      });
    } else {
      res.send({ ok: true, results: posts });
    }
  } catch (err) {
    //에러 발생 시 message 핸들링
    console.log(err);
    res.status(400).send({
      message: "게시글을 불러오는데 알 수 없는 문제가 발생했습니다.",
    });
  }
});

router.post("/posts/detail/:postId/like", async (req, res) => {
  // const { userId } = res.locals.user;
  const { postId } = req.params;
  //테스트용 userId body로 받아보기
  const { userId } = req.body;
  const posts = await Posts.find({ _id: postId, likeUser: userId });
  try {
    if (posts.length == 0) {
      await Posts.updateOne({ _id: postId }, { $push: { likeUser: userId } });
      res.send({ ok: true });
    } else {
      res.send({
        message: "좋아요는 한번만 누를 수 있습니다.",
      });
    }
  } catch (err) {
    res.status(400).send({
      message: "게시글에 좋아요를 반영하는데 알 수 없는 문제가 발생했습니다.",
    });
  }
});

//게시글 수정
router.put("/posts/detail/:postId", async (req, res) => {
  // 로그인 유저 확인
  // const { userId } = res.locals.user;
  const { postId } = req.params;
  const { songName, desc, singer, url, category1, category2, category3 } =
    req.body;
  const posts = await Posts.findOne({ _id: postId });
  try {
    if (posts.length) {
      await Boards.updateOne(
        { _id: postId },
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
    res.send({ ok: true });
  } catch (err) {
    res.status(400).send({
      message: "게시글을 수정하는데 알 수 없는 문제가 발생했습니다.",
    });
  }
});

//게시글 삭제
router.delete("/posts/detail/:postId", async (req, res) => {
  // 로그인 유저 확인
  // const { userId } = res.locals.user;
  const { postId } = req.params;
  const posts = await Posts.findOne({ _id: postId });
  try {
    if (posts.length) {
      await Posts.deleteOne({ _id: postId });
    }
    // const isComment = await Comment.findById(postId);
    // if (isComment.length > 0) {
    //   await Comment.deleteMany({ postId });
    // }
    res.send({ ok: true });
  } catch (err) {
    res.status(400).send({
      message: "게시글을 삭제하는데 알 수 없는 문제가 발생했습니다.",
    });
  }
});

module.exports = router;

const { Post } = require("../../models");
const { Op } = require("sequelize");
const Comment = require("../../schemas/Comment");

const getProcess = {
  //게시글 조회
  getPost: async (req, res) => {
    try {
      const { category1, category2, category3 } = req.body;
      const query1 = category1 === undefined ? {} : { category1: category1 };
      const query2 = category2 === undefined ? {} : { category2: category2 };
      const query3 = category3 === undefined ? {} : { category3: category3 };
      const post = await Post.findAll({
        order: [["date", "DESC"]],
        where: {
          [Op.and]: [query1, query2, query3],
        },
      });
      res.status(201).send({ ok: true, result: post });
    } catch (err) {
      //에러 발생 시 message 핸들링
      res.status(400).send({
        ok: false,
        message: "음악을 불러오는데 알 수 없는 문제가 발생했습니다.",
      });
    }
  },

  //게시글 상세 페이지
  detailPost: async (req, res) => {
    try {
      const { postId } = req.params;
      const post = await Post.findByPk(postId);
      if (post) {
        res.send({ ok: true, result: post });
      } else {
        // boards 정보가 없을 때
        res.status(400).send({
          ok: false,
          message:
            "게시글에 알 수 없는 문제가 발생했습니다. 관리자에게 문의해주세요.",
        });
      }
    } catch (err) {
      //에러 발생 시 message 핸들링
      console.log(err);
      res.status(400).send({
        message: "게시글을 불러오는데 알 수 없는 문제가 발생했습니다.",
      });
    }
  },
};

const postProcess = {
  //게시글 등록
  writePost: async (req, res) => {
    try {
      console.log("데이터를 이제 받아서 db에 접근해볼께요");
      // 로그인 유저 확인
      const { userId } = res.locals.targetUserInfo;
      console.log("userId:", userId);
      //body에 저장값을 받음
      const { songName, desc, singer, url, category1, category2, category3 } =
        req.body;
      date = new Date();
      //db에 저장
      const post = await Post.create({
        songName,
        userId,
        desc,
        singer,
        url,
        date,
        category1,
        category2,
        category3,
      });
      console.log("db 저장완료");
      res
        .status(200)
        .send({ ok: true, result: post, message: "음악을 저장했습니다!" });
    } catch (err) {
      //에러 발생 시 message 핸들링
      console.log(err);
      res.status(400).send({
        ok: false,
        message: "음악을 저장하는데 알 수 없는 문제가 발생했습니다.",
      });
    }
  },

  //게시글 수정
  editPost: async (req, res) => {
    try {
      // 로그인 유저 확인
      const { userId } = res.locals.targetUserInfo;
      console.log("userId:", userId);
      const { postId } = req.params;
      const { songName, desc, singer, url, category1, category2, category3 } =
        req.body;

      await Post.update(
        {
          songName,
          desc,
          singer,
          url,
          category1,
          category2,
          category3,
        },
        {
          where: { postId: postId },
        }
      );
      res.send({ ok: true, message: "게시글을 수정했습니다" });
    } catch (err) {
      res.status(400).send({
        ok: false,
        message: "게시글을 수정하는데 알 수 없는 문제가 발생했습니다.",
      });
    }
  },

  //게시글 삭제
  deletePost: async (req, res) => {
    try {
      // 로그인 유저 확인
      const { userId } = res.locals.targetUserInfo;
      console.log("userId:", userId);
      const { postId } = req.params;
      const post = await Post.findByPk(postId);
      await post.destroy({
        where: { postId: postId },
      });

      res.send({
        ok: true,
        message: "게시글을 삭제했습니다.",
      });
    } catch (err) {
      res.status(400).send({
        ok: false,
        message: "게시글을 삭제하는데 알 수 없는 문제가 발생했습니다.",
      });
    }
  },
};

module.exports = {
  getProcess,
  postProcess,
};

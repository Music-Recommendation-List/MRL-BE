const Posts = require("../../schemas/Post");

const likeProcess = {
  //좋아요 생성
  createLike: async (req, res) => {
    try {
      // const { userId } = res.locals.user;
      const { postId } = req.params;
      //테스트용 userId body로 받아보기
      const { userId } = req.body;
      const posts = await Posts.find({
        $and: [{ _id: postId }, { likeUser: userId }],
      });

      if (posts.length == 0) {
        await Posts.updateOne({ _id: postId }, { $push: { likeUser: userId } });
        res.send({ ok: true });
      } else {
        res.send({
          ok: false,
          message: "좋아요는 한번만 누를 수 있습니다.",
        });
      }
    } catch (err) {
      res.status(400).send({
        ok: false,
        message: "게시글에 좋아요를 반영하는데 알 수 없는 문제가 발생했습니다.",
      });
    }
  },

  removeLike: async (req, res) => {
    try {
      // const { userId } = res.locals.user;
      const { postId } = req.params;
      //테스트용 userId body로 받아보기
      const { userId } = req.body;
      const posts = await Posts.find({ _id: postId, likeUser: userId });
      if (!posts.length == 0) {
        await Posts.updateOne({ _id: postId }, { $pull: { likeUser: userId } });
        res.send({ ok: true });
      } else {
        res.send({
          ok: false,
          message: "좋아요 취소는 좋아요를 누른 상태에서만 실행 가능합니다",
        });
      }
    } catch (err) {
      res.status(400).send({
        ok: false,
        message:
          "게시글에 좋아요 취소를 반영하는데 알 수 없는 문제가 발생했습니다.",
      });
    }
  },
};

module.exports = {
  likeProcess,
};

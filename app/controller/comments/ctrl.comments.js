const { Comment } = require("../../models");
const { Op } = require("sequelize");

const ctrlComment = {
  commentList: async (req, res) => {
    const { postId } = req.params;
    const comments = await Comment.findAll({
      order: [["date", "DESC"]],
      where: { postId },
    });

    res.send({ ok: true, result: comments });
  },

  commentWrite: async (req, res) => {
    try {
      const { postId } = req.params;
      const { contents } = req.body;
      const { userId } = res.locals.targetUserInfo;
      const date = new Date();
      await Comment.create({
        postId,
        userId,
        contents,
        date,
      });
      res.send({
        ok: true,
        message: "댓글이 작성되었습니다.",
      });
    } catch (error) {
      res.status(400).send({ ok: false, message: "댓글 작성에 실패했습니다" });
    }
  },

  commentUpdate: async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.targetUserInfo;
    const { contents } = req.body;
    const comment = await Comment.findByPk(commentId);
    if (userId == comment.userId) {
      await Comment.update({ contents }, { where: { commentId } });
      res.send({
        ok: true,
        message: "댓글이 수정되었습니다.",
      });
    } else {
      res
        .status(400)
        .send({ ok: false, message: "댓글 작성자만 사용 가능한 기능입니다." });
    }
  },

  commentDelete: async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.targetUserInfo;
    const comment = await Comment.findByPk(commentId);
    if (userId == comment.userId) {
      await Comment.destroy({ where: { commentId } });
      res.send({
        ok: true,
        message: "댓글이 삭제되었습니다.",
      });
    } else {
      res
        .status(400)
        .send({ ok: false, message: "댓글 작성자만 사용 가능한 기능입니다." });
    }
  },
};

module.exports = ctrlComment;

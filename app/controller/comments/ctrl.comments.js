const Comment = require("../../schemas/Comment");

const ctrlComment = {
  commentList: async (req, res) => {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).sort("-date");

    console.log(postId);
    console.log("comments.length : " + comments.length);

    res.send({ ok: true, result: comments });
  },

  commentWrite: async (req, res) => {
    console.log(1);
    try {
      const { postId } = req.params;
      const { contents } = req.body;
      const { userId } = res.locals.targetUserInfo;
      const date = new Date();

      console.log(postId);
      console.log(contents);
      console.log(userId);

      await Comment.create({
        postId,
        contents,
        userId,
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

    const isExist = await Comment.find({ commentId, userId });

    if (isExist) {
      await Comment.updateOne({ commentId, userId }, { $set: { contents } });
      res.send({ ok: true, message: "댓글을 수정했습니다" });
      return;
    }
    res.state(400).send({ ok: false, message: "댓글 수정에 실패했습니다" });
  },

  commentDelete: async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.targetUserInfo;
    const { contents } = req.body;

    const isExist = await Comment.find({ commentId, userId });

    if (isExist) {
      await Comment.updateOne({ commentId, userId }, { $set: { contents } });
      res.send({ ok: true, message: "댓글을 수정했습니다" });
      return;
    }
    res.state(400).send({ ok: false, message: "댓글 수정에 실패했습니다" });
  },
};

module.exports = ctrlComment;

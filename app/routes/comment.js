const express = require("express");
const Comment = require('../schemas/Comment');

const router = express.Router();

router.get('/comment/:postId', async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ postId }).sort('-date');

  console.log(postId);
  console.log("comments.length : " + comments.length);

  res.send({ ok: true, result: comments });
});


router.post('/comment/:postId', async (req, res) => {
  console.log(1);
  try {
    const { postId } = req.params;
    const { contents } = req.body;
    // const { userId } = res.locals;
    const date = new Date();
    const userId = 'kkkkk';

    console.log(postId);
    console.log(contents);
    console.log(userId);

    await Comment.create({
      postId, contents, userId, date,
    });
    res.send({
      ok: true, result: "commentCreate", message: '댓글이 작성되었습니다.'
    });
  } catch (error) {
    res.status(400).send({ ok: false, message: '댓글 작성에 실패했습니다' });
  }
})


router.put('/comment/:commentId', async (req, res) => {
  const { commentId } = req.params;
  // const { userId } = res.locals;
  const { contents } = req.body;
  const userId = 'kkkkk';

  const isExist = await Comment.find({ commentId, userId });

  if (isExist) {
    await Comment.updateOne(
      { commentId, userId },
      { $set: { contents } },
    );
    res.send({ ok: true, "result": "commentUpdate", message: '댓글을 수정했습니다' });
    return;
  }
  res.state(400).send({ ok: false, message: '댓글 수정에 실패했습니다' });
});

router.delete('/comment/:commentId', async (req, res) => {
  const { commentId } = req.params;
  // const { userId } = res.locals;
  const userId = 'kkkkk';

  console.log(userId);
  console.log(commentId);
  try {
    const isExist = await Comment.findOne({ commentId, userId });
    if (isExist) {
      await Comment.deleteOne({ commentId });
      res.send({ ok: true, result: "commentRemove", message: '댓글이 삭제되었습니다.' });
    }
  } catch (error) {
    res.status(400).send({ ok: false, message: '댓글 삭제에 실패했습니다' });
  }
});


module.exports = router;

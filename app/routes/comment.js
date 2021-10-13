const express = require("express");
const Comment = require('../schemas/Comment');
const ctrlComment = require('../controller/comments/ctrl.comments');

const router = express.Router();

router.get('/comment/:postId', ctrlComment.commentList);

router.post('/comment/:postId', ctrlComment.commentWrite);


router.put('/comment/:commentId', ctrlComment.commentUpdate);

router.delete('/comment/:commentId', ctrlComment.commentDelete);


module.exports = router;
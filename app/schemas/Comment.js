import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
  },
  contents: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

CommentSchema.virtual('uid').get(function () {
  return this._id.toHexString();
});
CommentSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Comment', CommentSchema);
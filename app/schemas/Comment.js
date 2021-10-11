const mongoose = require("mongoose");

const { Schema } = mongoose;

const CommentSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  contents: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

CommentSchema.virtual("commentId").get(function () {
  return this._id.toHexString();
});
CommentSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Comment", CommentSchema);

const mongoose = require("mongoose");

const { Schema } = mongoose;
const PostSchema = new Schema({
  songName: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  singer: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  category1: {
    type: String,
  },
  category2: {
    type: String,
  },
  category3: {
    type: String,
  },
});

PostSchema.virtual("postId").get(function () {
  return this._id.toHexString();
});
PostSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Post", PostSchema);

import mongoose from 'mongoose';

const { Schema } = mongoose;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPwd: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  views: {
    type: Number,
  },
});

PostSchema.virtual('uid').get(function () {
  return this._id.toHexString();
});
PostSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.model('Post', PostSchema);

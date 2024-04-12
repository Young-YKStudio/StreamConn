import mongoose from "mongoose";
import User from './User'

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    body: String,

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },

    commentOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { select: 'nickname' },
    },
  }, { timestamps: true }
)

commentSchema.plugin(require('mongoose-autopopulate'));

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema)
export default Comment
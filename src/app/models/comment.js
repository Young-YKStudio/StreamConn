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

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  }, {timestamps: true})
  
commentSchema.plugin(require('mongoose-autopopulate'))
const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema)
export default Comment
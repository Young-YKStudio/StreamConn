import mongoose from "mongoose";

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    body: String,
    // postid: String,
    // userid: String,

    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }, {timestamps: true})

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema)
export default Comment
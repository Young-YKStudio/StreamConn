import mongoose from "mongoose";

const Schema = mongoose.Schema

const commentSchema = new Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },

  comment: {
    type: String,
  },

  userid: {
    type: String,
  }
}, {timestamps: true})

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema)
export default Comment
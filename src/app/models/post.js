import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    title: String,
    body: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],
  }, {timestamps: true}
)

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)
export default Post
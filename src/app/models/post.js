import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    body: String,

    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  }, {timestamps: true}
)

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)
export default Post
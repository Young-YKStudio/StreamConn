import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    body: String,

    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
    },

    postOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { select: 'nickname' },
    },

    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    }],

  }, { timestamps: true }
)

postSchema.plugin(require('mongoose-autopopulate'));

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)
export default Post
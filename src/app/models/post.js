import mongoose from 'mongoose'
import Comment from './comment'

const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    title: String,
    body: String,
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true
    },
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      autopopulate: true
    }],
  }, {timestamps: true, toObject: {virtuals: true}}
)

postSchema.plugin(require('mongoose-autopopulate'))
// postSchema.pre('find', (next) => {
//   this.populate({path: 'comments', model: Comment})
//   next()
// })

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)
export default Post
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const channelSchema = new Schema(
  {
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isPrivate: Boolean,
    type: String,
  },{timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", channelSchema)
export default User
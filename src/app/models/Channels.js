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
    channelName: {
      type: String,
      required: true
    },
    channelOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isPrivate: {
      type: Boolean,
      default: false
    },
    channelType: {
      type: String,
      default: 'Text'
    },
  },{timestamps: true}
)

const Channel = mongoose.models.Channel || mongoose.model("Channel", channelSchema)
export default Channel
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false
    },
    follows: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    introduction: String,
    isUpdated: {
      type: Boolean,
      default: false,
    },
    profile: String,
    locale: String,
    isStreamer: Boolean,
    platforms: [
      {
        name: String,
        href: String,
      }
    ],
    nickname: {
      type: String,
      unique: true,
    },
    blockedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    moderators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
      }
    ]
  },{timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
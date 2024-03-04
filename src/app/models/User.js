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
    follows: [],
    followers: [],
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
    }
  },{timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
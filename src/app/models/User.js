import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    email : {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    collections: {},
    account: String,
    session: String,
    user: String,
    verificationToken: String,
  },{timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
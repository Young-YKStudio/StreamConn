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
  },{timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const uploadSchema = new Schema({
  name: String,
  uploadedUser : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: String,
  key: String,
  type: String,
  size: Number,
},{timestamps: true})

const Upload = mongoose.models.Upload || mongoose.model('Upload', uploadSchema)
export default Upload
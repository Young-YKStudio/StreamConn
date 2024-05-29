import mongoose from 'mongoose'

const Schema = mongoose.Schema

const IGDBSchema = new Schema(
  {
    token: {
      type: String
    }
  }, {timestamps: true}
)

const IGDBToken = mongoose.models.IGDBToken || mongoose.model("IGDBToken", IGDBSchema)

export default IGDBToken
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true
    },

    teamOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    teamModerators: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

    teamMembers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],

    isPrivate: {
      type: Boolean,
      default: false
    },

    // posts: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Post'
    // }],

    // collarborations: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Collarboration'
    // }],

    // teamType: {
    //   type: String,
    //   default: 'Text'
    // },
  }, { timestamps: true }
)

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema)
export default Team
import mongoose from 'mongoose'
import Channel from './Channels';

const Schema = mongoose.Schema

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
    },

    teamOwnerNickname: {
      type: String,
      required: true,
    },

    teamOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
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

    channels: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      autopopulate: true,
    }],

    collaborations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collarboration',
      autopopulate: true,
    }],

    followers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    
    // teamType: {
    //   type: String,
    //   default: 'Text'
    // },
  }, { timestamps: true }
)

teamSchema.plugin(require('mongoose-autopopulate'));

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema)
export default Team
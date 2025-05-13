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
      minLength: 6,
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
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
        moderator: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        allowedChannels: [
          {
            channel: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Channel',
            },
            modLevel: String,
          }
        ], 
        modType: String,
      }
    ],
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
      }
    ],
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
      }
    ],
    connects: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ],
    uploadedFiles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload'
      }
    ],
    invitationSent: [
      {
        collaboInvitation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'CollaboInvitation'
        },
        collaboEvent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Collarboration'
        },
        invitationSentTo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        status: {
          type: String,
          default: 'pending'
        }
      }
    ],
    invitationReceived: [
      {
        collaboInvitation: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'CollaboInvitation'
        },
        collaboEvent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Collarboration'
        },
        invitationReceivedFrom: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        status: {
          type: String,
          default: 'pending'
        }
      }
    ],
    resetPasswordToken: String,
    resetTokenExpire: Date,
  },{timestamps: true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User

// intro profile nickname password, password reset - account settings
// blocked users, moderatoers, connects, follow - security options
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const collaboInvitationSchema = new Schema(
  {
    collabEvent : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collarboration'
    },
    invitedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    invitationStatus: {
      type: String,
      default: 'pending'
    }
  }, { timeseries: true }
)

const CollaboInvitation = mongoose.models.CollaboInvitation || mongoose.models('CollaboInvitation', collaboInvitationSchema)

export default CollaboInvitation
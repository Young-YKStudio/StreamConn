import mongoose from 'mongoose';

const Schema = mongoose.Schema

const collarborationSchema = new Schema(
  {
    eventName: String,
    eventOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { select: 'nickname' }
    },
    eventPlatforms: String,
    streamingPlatforms: [],
    eventTags: [],
    eventDateStart: Date,
    eventDateEnd: Date,
    eventEntryDue: Date,
    eventDescription: String,
    eventImage: String,
    collarboratedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      invitationStatus: String,
      autopopulate: { select: 'nickname' }
    }],
    eventMaxNum: Number,
  }, { timestamps: true}
)

collarborationSchema.plugin(require('mongoose-autopopulate'))

const Collarboration = mongoose.models.Collarboration || mongoose.model('Collarboration', collarborationSchema)
export default Collarboration
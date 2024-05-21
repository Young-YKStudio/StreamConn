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
    eventPlatforms: [],
    streamingPlatforms: [],
    eventTags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EventTags',
    }],
    eventDateStart: Date,
    eventDateEnd: Date,
    eventEntryDue: Date,
    eventDescription: String,
    eventImage: String,
    collarboratedUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { select: 'nickname' }
    }],
    eventMaxNum: Number,
    isPrivate: {
      type: Boolean,
      default: false
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
    },
    eventStatus: {
      type: String,
      default: 'pending'
    }
  }, { timestamps: true}
)

collarborationSchema.plugin(require('mongoose-autopopulate'))

const Collarboration = mongoose.models.Collarboration || mongoose.model('Collarboration', collarborationSchema)
export default Collarboration

// for creation : eventName,  eventDateStart, eventDateEnd, eventDescription, isPrivate
// for addingCollaborationMember : collarbaratedUsers, eventMaxNum
// for finish setting: eventPlatforms, streamingPlatforms, eventImage, event Tags,
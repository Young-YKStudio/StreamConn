import mongoose from 'mongoose'

const Schema = mongoose.Schema

const calendarSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  
    start: {
      type: Date,
      required: true,
    },
  
    end: {
      type: Date,
      required: true,
    },

    calendarOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    // posts: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Post'
    // }],

    // collarborations: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Collarboration'
    // }],

    // channelName: {
    //   type: String,
    //   required: true
    // },

    // channelOwner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User'
    // },

    // channelModerators: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User'
    // }],

    // isPrivate: {
    //   type: Boolean,
    //   default: false
    // },

    // channelType: {
    //   type: String,
    //   default: 'Text'
    // },

  }, { timestamps: true }
)

const Calendar = mongoose.models.Calendar || mongoose.model("Calendar", calendarSchema)
export default Calendar
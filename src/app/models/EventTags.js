import mongoose from 'mongoose'

const Schema = mongoose.Schema

const eventTagsSchema = new Schema({
  tagName: String,
  taggedCollarborationEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collarboration'
  }],
  taggedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {timestamps: true})

const EventTags = mongoose.models.EventTags || mongoose.model('EventTags', eventTagsSchema)

export default EventTags
import mongoose from 'mongoose';

const Schema = mongoose.Schema

const collarborationSchema = new Schema(
  {
    name: String,
    
    collarborationOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { select: 'nickname' }
    },

  }, { timestamps: true}
)

collarborationSchema.plugin(require('mongoose-autopopulate'))

const Collarboration = mongoose.models.Collarboration || mongoose.model('Collarboration', collarborationSchema)
export default Collarboration
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    title: String
  },{timestamps: true}
)

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema)
export default Task
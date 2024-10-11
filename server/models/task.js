import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  dueTime: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'High'],
    default: 'High'
  },
  urgency: {
    type: String,
    enum: ['Urgent', 'Not Urgent'],
    default: 'Urgent'
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true
  }
});

const Task = mongoose.model('Task', taskSchema);
export default Task;


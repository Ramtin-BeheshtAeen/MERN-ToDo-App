import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;

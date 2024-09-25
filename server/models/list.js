import mongoose from "mongoose";
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task"
    }
  ],
  container: {
    type: Schema.Types.ObjectId,
    ref: "Container",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const List = mongoose.model("List", listSchema);
export default List;

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const containerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

const Container = mongoose.model("Container", containerSchema);
export default Container;

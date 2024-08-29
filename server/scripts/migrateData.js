import { Mongoose } from "mongoose";
import connectDB from "../Db.js";
import User from "../models/user.js";
import Container from "../models/container.js";
import List from "../models/list.js";
import Task from "../models/task.js";

const migrateData = async () => {
  connectDB();
  const users = await User.find();

  for (const user of users) {
    //Create New Container For Each User:
    const container = new Container({
      name: "Main Container",
      user: user._id,
    });
    await container.save();

    //Create New List For Each User:
    const list = new List({
        name: "Main List",
        container: container._id
    })
    await list.save();

    //Update tasks to reference the new list:
    const tasks = await Task.find({user: user._id})
    for (const task of tasks){
        task.list = list._id
        await task.save()        
    }

    //Update User To Reference The New Container:
    user.containers = [container._id]
    await user.save()

  }
  console.log("Migration Success")
  Mongoose.disconnect()
};

//This Migration is Done For Adding Container And List to existing Data:
migrateData().catch((err) => console.error(err));


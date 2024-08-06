
import mongoose from "mongoose";
import User from'../models/user.js'
import Task from'../models/task.js'

async function createRandomUser() {
    const user = new User({
        email: "test@test.com",
        password: "1234"
    });
    await user.save();
    return user;
}
  
async function createRandomTask(userId) {
    const task = new Task({
      title: "Clean the Rome",
      description: "Clean it Fast",
      dueDate: new Date('2024-08-07'),
      priority: "Low",
      status: "Pending",
      user: userId
    });
    
    await task.save();
  
    const user = await User.findById(userId);
    user.tasks.push(task._id);
    await user.save();
  
    return task;
}
  
async function populateDatabase() {
    const user = await createRandomUser();
    console.log('Created user:', user);
  
    const task = await createRandomTask(user._id);
    console.log('Created task for user:', task);
}
    
    mongoose.connection.close();

  
export default populateDatabase
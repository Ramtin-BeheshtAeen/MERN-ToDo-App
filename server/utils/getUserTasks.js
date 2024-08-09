import User from'../models/user.js'
import Task from'../models/task.js'

async function getUserTasks(userId){
    try{
        //The .exec() method in Mongoose is used to execute a
        //query and return a promise. This is particularly useful
        //when you want to use async/await syntax for handling asynchronous
        //operations.
        const userWithTasks = User.findById(userId).populate('tasks').exec()
        if (!userWithTasks) {
            console.log('User Not Find')
            return;
        }

    } catch (err) {
        console.error('Error fetching user tasks:', error);
    }
}

export default getUserTasks
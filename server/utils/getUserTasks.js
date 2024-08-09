import User from'../models/user.js'
import Task from'../models/task.js'

async function getUserTasks(userId){
    try{
        console.log(`'File: getuserTasks.js \n Searching for user with ID: ${userId}`)
        //The .exec() method in Mongoose is used to execute a
        //query and return a promise. This is particularly useful
        //when you want to use async/await syntax for handling asynchronous
        //operations.
        const userWithTasks = await User.findById(userId).populate('tasks').exec()
        if (!userWithTasks) {
            console.log('File: getuserTasks.js \n  User Not Find')
            return null;
        }

        console.log("File: getuserTasks.js \n Success")
        return userWithTasks.tasks

    } catch (err) {
        console.error('File: getuserTasks.js \n ,Error fetching user tasks:', err);
    }
}

export default getUserTasks
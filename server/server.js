const PORT  = process.env.PORT ?? 8000
import express from 'express'
import connectDB  from './Db.js';
const faker = require('faker');
const User = require('./models/user'); 
const Task = require('./models/task');
const app = express()

// connectDB()


//get all to-do:
app.get('/todo/:userEmail', (req, res) => {
    //destruct the Param:
    const {userEmail} = req.params
    console.log(userEmail)
})



app.get('test/addRandomUserAndTasks', (req, res) => {
    res.send("Working on it")
    async function createRandomUser() {
        const user = new User({
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password() // Remember to hash this in a real application
        });
        await user.save();
        return user;
      }
      
    async function createRandomTask(userId) {
        const task = new Task({
          title: faker.lorem.words(),
          description: faker.lorem.sentence(),
          dueDate: faker.date.future(),
          priority: faker.random.arrayElement(['Low', 'Medium', 'High']),
          status: faker.random.arrayElement(['Pending', 'In Progress', 'Completed']),
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
    
    populateDatabase().catch(err => console.error(err));
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

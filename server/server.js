const PORT  = process.env.PORT ?? 8000
import express from 'express'
import cors from 'cors';

import connectDB  from './Db.js'
import populateDatabase  from './test/addRandomDataToDb.js'
import getUserTasks from './utils/getuserTasks.js'


const app = express()
app.use(cors())
app.use(express.json())

connectDB()


//get all to-do of a specific user:
app.get('/todo/:userId', async (req, res) => {
    //destruct the Param:
    const {userId} = req.params
    try {
      const tasks = await getUserTasks(userId)
      res.json(tasks)
    }catch(err){
      res.status(500).json({ error: 'Error fetching user tasks' })
    }
})


//add new to-do:
app.post("/post-to-do/:userId", (req, res) => {
  
  const data = req.body
  console.log(data)
  res.json(data)
  
  // const { } = req.body
  // try{
  //   const task = new Task({
  //     title: ,
  //     description: ,
  //     dueDate: new Date(),
  //     priority: ,
  //     status: ,
  //     user: userId
  //   });
    
  //   await task.save();
  
  //   const user = await User.findById(userId);
  //   user.tasks.push(task._id);
  //   await user.save();

  // }catch (err){
  //   console.log("\n err in server.js line 34 \n")
  //   console.log(err)
  // }
})





//Testing:
app.get('/test/addRandomUserAndTasks', async (req, res) => {
    try {
        await populateDatabase();
        res.send('Database populated with random user and tasks');
      } catch (err) {
        console.error(err);
        res.status(500).send('Error populating database');
      }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

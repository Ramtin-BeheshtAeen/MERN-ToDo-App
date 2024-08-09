const PORT  = process.env.PORT ?? 8000
import express from 'express'

import connectDB  from './Db.js'
import populateDatabase  from './test/addRandomDataToDb.js'
import getUserTasks from './utils/getUserTasks.js'


const app = express()

connectDB()


//get all to-do:
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

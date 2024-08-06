const PORT  = process.env.PORT ?? 8000
import express from 'express'

import connectDB  from './Db.js'
import populateDatabase  from './test/addRandomDataToDb.js'


const app = express()

connectDB()


//get all to-do:
app.get('/todo/:userEmail', (req, res) => {
    //destruct the Param:
    const {userEmail} = req.params
    console.log(userEmail)
})

//Testing:
app.get('/test/addRandomUserAndTasks', async (req, res) => {
    res.send("Working on it")
    try {
        await populateDatabase();
        res.send('Database populated with random user and tasks');
      } catch (err) {
        console.error(err);
        res.status(500).send('Error populating database');
      }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))

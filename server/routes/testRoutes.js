
import express from "express";
const router = express.Router();

router.get('/test', (req, res)=>{
    res.send("Worked")
  }) 


//Testing:
router.get("/test/addRandomUserAndTasks", async (req, res) => {
    try {
      await populateDatabase();
      res.send("Database populated with random user and tasks");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error populating database");
    }
  });

export default router;
const PORT = process.env.PORT ?? 8000;

import express from "express";
import cors from "cors";


import connectDB from "./Db.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import containerRoutes from "./routes/containerRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import listRoutes from "./routes/listRoutes.js"


const app = express();
app.use(cors());
app.use(express.json());

connectDB();


app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/containers", containerRoutes);
app.use("/test", testRoutes);
app.use("/list", listRoutes);


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

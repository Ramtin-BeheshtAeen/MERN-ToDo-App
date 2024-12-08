import mongoose from "mongoose";

export default function connectDB() {
  //Ethernet adapter vEthernet (WSL): 172.23.192.1
  // const url = "mongodb://172.25.240.1:27017/to_do_app";
  const url = process.env.MONGODB_URI
  
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;

  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}



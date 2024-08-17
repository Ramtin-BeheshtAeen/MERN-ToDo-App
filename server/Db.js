import mongoose from "mongoose";

export default function connectDB() {
  // const url = "mongodb://172.26.112.1:27017/to_do_app";
  //Ethernet adapter vEthernet (WSL): 172.23.192.1
  const url = "mongodb://172.20.0.1:27017/to_do_app";
  
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



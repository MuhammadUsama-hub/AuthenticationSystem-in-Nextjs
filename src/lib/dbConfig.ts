import mongoose from "mongoose";
import { exitCode } from "process";

const dbConnect = async (url: string) => {
  try {
    await mongoose.connect(url);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb Connected");
    });

    connection.on("error", (err) => {
      console.log("DB connection error  due to  :" + err);
      process.exit(1); //exit with a faliure code
    });
  } catch (error) {
    console.log("SomeThing went Wrong in db connection" + "\n" + error);
  }
};

export { dbConnect };

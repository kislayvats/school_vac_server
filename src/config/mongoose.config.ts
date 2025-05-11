import mongoose, { ConnectOptions } from "mongoose";
import config from ".";

export default () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(
    config.mongoose.url,
    config.mongoose.options as ConnectOptions
  );
  mongoose.connection.on("connected", function () {
    console.log("Mongoose default connection open");
  });

  // If the connection throws an error
  mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection error: " + err);
  });

  // When the connection is disconnected
  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection disconnected");
  });

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", function () {
    mongoose.connection.close();
  });
};

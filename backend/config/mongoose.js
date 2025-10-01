const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Nidhiraj:UpC42iMeOnxYNRlu@cluster0.g9h5m4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Successfully connected to the DataBase 🥞");
  } catch (error) {
    console.log("Error Connecting to the Database", error);
  }
};
module.exports = connectDB;

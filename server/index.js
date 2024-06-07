require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI, connectionParams)
      .then(() => console.log("Database connected successfully!"));
  } catch (error) {
    console.log(`DB connection error: ${error.message}`);
  }
};

connectDB();

const PORT_NAME = process.env.PORT || 3000;
app.listen(PORT_NAME, () => {
  console.log(`Server is listening to PORT ${PORT_NAME}`);
});

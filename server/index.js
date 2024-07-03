require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.route");
const leaderboardRoutes = require("./routes/leaderboard.route");
const buddiesRoutes = require("./routes/buddies.route");
const codeRoomRoutes = require("./routes/codeRoom.route");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  console.log(req.path, res.method);
  next();
});

// Routes
app.use("/", userRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/buddies", buddiesRoutes);
app.use("/codeRoom", codeRoomRoutes);

// Database

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

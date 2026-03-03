const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const leaderboardRoutes = require("./routes/leaderboard.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/leaderboard", leaderboardRoutes);

mongoose.connect("mongodb://localhost:27017/leaderboard");

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
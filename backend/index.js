const express = require("express");
const mongoose = require("mongoose");
const { connectRedis } = require("./config/redis");
const cors = require("cors");
const leaderboardRoutes = require("./routes/leaderboard.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/leaderboard", leaderboardRoutes);

const startServer = async () => {
  await connectRedis();

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

startServer();
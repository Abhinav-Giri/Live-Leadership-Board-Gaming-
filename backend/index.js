require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const connectDB = require("./config/db");
const { connectRedis } = require("./config/redis");
const cors = require("cors");
const leaderboardRoutes = require("./routes/leaderboard.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working");
});

// app.use("/leaderboard", leaderboardRoutes);

const startServer = async () => {
  try {
    // console.log("REDIS_URL:", process.env.REDIS_URL);
    // console.log("MONGO_URI:", process.env.MONGO_URI);
    await connectRedis();
    await connectDB();
    //seeding data
    //   await redisClient.zAdd("leaderboard", [
    //   { score: 100, value: "alice" },
    //   { score: 200, value: "bob" },
    //   { score: 150, value: "carol" },
    // ]);
    app.use("/leaderboard", leaderboardRoutes);
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err);
  }
};

startServer();

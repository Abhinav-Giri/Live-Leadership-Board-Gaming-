const express = require("express");
const router = express.Router();
const leaderboard = require("../services/Leaderboard");

// Seed some data for testing
// leaderboard.updateScore("alice", 100);
// leaderboard.updateScore("bob", 200);
// leaderboard.updateScore("carol", 150);

//Update score
router.post("/update", async (req, res) => {
  const { user_id, delta } = req.body;
  try {
    const score = await leaderboard.updateScore(user_id, delta);
    res.json({ user_id, score });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get top K
router.get("/top/:k", async (req, res) => {
  try {
    const result = await leaderboard.getTopK(parseInt(req.params.k));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get rank
router.get("/rank/:user_id", async (req, res) => {
  try {
    const rank = await leaderboard.getRank(req.params.user_id);
    res.json({ rank });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Get range
router.get("/range", async (req, res) => {
  const { start, end } = req.query;
  try {
    const result = await leaderboard.getPlayersInRange(
      parseInt(start),
      parseInt(end),
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

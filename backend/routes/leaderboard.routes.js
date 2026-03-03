const express = require("express");
const router = express.Router();
const Leaderboard = require("../services/Leaderboard");

const lb = new Leaderboard();

/**
 * Update score
 */
router.post("/update", (req, res) => {
  const { user_id, delta } = req.body;
  lb.update_score(user_id, delta);
  res.json({ message: "Score updated" });
});

/**
 * Get top K
 */
router.get("/top/:k", (req, res) => {
  const k = parseInt(req.params.k);
  res.json(lb.get_top_k(k));
});

/**
 * Get rank
 */
router.get("/rank/:user_id", (req, res) => {
  const rank = lb.get_rank(req.params.user_id);
  res.json({ rank });
});

/**
 * Get range
 */
router.get("/range", (req, res) => {
  const { start, end } = req.query;
  res.json(lb.get_players_in_range(Number(start), Number(end)));
});

module.exports = router;
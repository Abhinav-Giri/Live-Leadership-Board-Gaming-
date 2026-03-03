const { redisClient } = require("../config/redis");

const LEADERBOARD_KEY = "leaderboard";

class LeaderboardService {
  async updateScore(user_id, delta) {
    const newScore = await redisClient.zIncrBy(LEADERBOARD_KEY, delta, user_id);

    // Clamp negative score to 0
    if (newScore < 0) {
      await redisClient.zAdd(LEADERBOARD_KEY, {
        score: 0,
        value: user_id,
      });
      return 0;
    }

    return newScore;
  }

  async getTopK(k) {
    const result = await redisClient.zRangeWithScores(
      LEADERBOARD_KEY,
      0,
      k - 1,
      { REV: true },
    );

    return result.map((item, index) => ({
      rank: index + 1,
      user_id: item.value,
      score: item.score,
    }));
  }

  async getRank(user_id) {
    const rank = await redisClient.zRevRank(LEADERBOARD_KEY, user_id);

    if (rank === null) {
      return null; // Player does not exist
    }

    return rank + 1;
  }

  async getPlayersInRange(start, end) {
    const result = await redisClient.zRangeWithScores(
      LEADERBOARD_KEY,
      start - 1,
      end - 1,
      { REV: true },
    );

    return result.map((item, index) => ({
      rank: start + index,
      user_id: item.value,
      score: item.score,
    }));
  }
}

module.exports = new LeaderboardService();

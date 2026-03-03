const { redisClient } = require("../config/redis");

/**
 * Leaderboard implemented using Redis Sorted Set.
 * Key: leaderboard
 *
 * Sorted by:
 *   score ASC internally (Redis default)
 *   We use ZREVRANGE for descending order
 */

const LEADERBOARD_KEY = "leaderboard";

class LeaderboardService {
  /**
   * Update score atomically.
   * Uses ZINCRBY (atomic in Redis).
   * O(log n)
   */
  async updateScore(user_id, delta) {
    // Increment score
    const newScore = await redisClient.zIncrBy(
      LEADERBOARD_KEY,
      delta,
      user_id
    );

    // Clamp to zero if negative
    if (newScore < 0) {
      await redisClient.zAdd(LEADERBOARD_KEY, {
        score: 0,
        value: user_id,
      });
    }

    return Math.max(0, newScore);
  }

  /**
   * Get top K players
   * O(log n + k)
   */
  async getTopK(k) {
    const result = await redisClient.zRevRangeWithScores(
      LEADERBOARD_KEY,
      0,
      k - 1
    );

    return result.map((item) => ({
      user_id: item.value,
      score: item.score,
    }));
  }

  /**
   * Get rank (1-based)
   * O(log n)
   */
  async getRank(user_id) {
    const rank = await redisClient.zRevRank(
      LEADERBOARD_KEY,
      user_id
    );

    if (rank === null) return -1;

    return rank + 1;
  }

  /**
   * Get players in rank range
   */
  async getPlayersInRange(start, end) {
    const result = await redisClient.zRevRangeWithScores(
      LEADERBOARD_KEY,
      start - 1,
      end - 1
    );

    return result.map((item) => ({
      user_id: item.value,
      score: item.score,
    }));
  }
}

module.exports = new LeaderboardService();
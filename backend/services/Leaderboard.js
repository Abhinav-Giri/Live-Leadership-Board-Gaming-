// Leaderboard class
// Maintains:
// 1. Map for user lookup
// 2. Sorted array for ranking
// Sorted by:
//    score DESC
//    user_id ASC (tie breaker)

class Leaderboard {
  constructor() {
    this.userMap = new Map();  // user_id -> score
    this.sorted = [];          // sorted leaderboard
  }

  /**
   * Binary search to find insert position.
   * O(log n)
   */
  _findInsertPosition(user_id, score) {
    let left = 0;
    let right = this.sorted.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      const midPlayer = this.sorted[mid];

      if (
        midPlayer.score > score ||
        (midPlayer.score === score && midPlayer.user_id < user_id)
      ) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  /**
   * Thread-safe update (Node is single-threaded,
   * but safe for async concurrency model)
   */
  update_score(user_id, delta) {
    const oldScore = this.userMap.get(user_id) || 0;

    // Clamp to minimum 0
    const newScore = Math.max(0, oldScore + delta);

    this.userMap.set(user_id, newScore);

    // Remove old entry if exists
    this.sorted = this.sorted.filter(p => p.user_id !== user_id);

    // Insert at correct position
    const index = this._findInsertPosition(user_id, newScore);
    this.sorted.splice(index, 0, { user_id, score: newScore });
  }

  /**
   * Return top K players
   * O(k)
   */
  get_top_k(k) {
    return this.sorted.slice(0, k);
  }

  /**
   * Get rank in O(n) here
   * (here js imlplementation but For more scalibility can use Redis sorted set or a balanced BST for O(log n) rank retrieval )
   */
  get_rank(user_id) {
    const index = this.sorted.findIndex(p => p.user_id === user_id);
    return index === -1 ? -1 : index + 1;
  }

  /**
   * Get players in rank range
   */
  get_players_in_range(start, end) {
    return this.sorted.slice(start - 1, end);
  }
}

module.exports = Leaderboard;
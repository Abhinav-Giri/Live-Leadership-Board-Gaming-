class Leaderboard {
  constructor() {
    this.userMap = new Map();
    this.sorted = [];
  }

  _compare(a, b) {
    if (a.score !== b.score) return b.score - a.score;
    return a.user_id.localeCompare(b.user_id);
  }

  _findInsertIndex(player) {
    let left = 0;
    let right = this.sorted.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (this._compare(player, this.sorted[mid]) > 0) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }

  update_score(user_id, delta) {
    const oldScore = this.userMap.get(user_id) || 0;
    const newScore = Math.max(0, oldScore + delta);

    this.userMap.set(user_id, newScore);

    // Remove existing
    this.sorted = this.sorted.filter(p => p.user_id !== user_id);

    const newPlayer = { user_id, score: newScore };
    const index = this._findInsertIndex(newPlayer);

    this.sorted.splice(index, 0, newPlayer);
  }

  get_top_k(k) {
    return this.sorted.slice(0, k);
  }

  get_rank(user_id) {
    const index = this.sorted.findIndex(p => p.user_id === user_id);
    return index === -1 ? -1 : index + 1;
  }

  get_players_in_range(start, end) {
    return this.sorted.slice(start - 1, end);
  }
}

module.exports = Leaderboard;
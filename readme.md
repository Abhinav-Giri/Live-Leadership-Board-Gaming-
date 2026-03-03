# 🚀 Real-Time Leaderboard (MERN + Redis)

A production-grade real-time leaderboard system built using:

- Node.js
- Express.js
- Redis (Sorted Sets)
- React

Supports:
- O(log n) score updates
- O(log n) rank lookup
- O(k) top-K retrieval
- Massive concurrent updates
- 500k+ players scalability

---

## 🏗 Architecture

React UI
   |
Express API
   |
Redis (Sorted Set - ZSET)

Redis handles ranking and concurrency using atomic operations.

---

## ⚡ Features

- Update player score (delta-based)
- Clamp score to 0 (no negative scores)
- Get top K players
- Get player rank
- Get players by rank range
- Fully thread-safe (Redis atomic ops)

---

## 📦 Installation

### 1️⃣ Clone project

```bash
git clone <your-repo-url>
npm i
terminal 1: cd frontend; npm run dev
terminal 2: cd backend; node index.js
Set endpoints of .env file by setting the endpoints of redis and mongodb server
```

## 🧪 API Endpoints

### Update Score

POST `/leaderboard/update`

```
{
  "user_id": "alice",
  "delta": 100
}
```

---

### Get Top K

GET `/leaderboard/top/5`

---

### Get Rank

GET `/leaderboard/rank/alice`

---

### Get Range

GET `/leaderboard/range?start=1&end=5`

---

## 📊 Time Complexity

| Operation | Complexity |
|-----------|------------|
| update_score | O(log n) |
| get_rank | O(log n) |
| get_top_k | O(log n + k) |
| get_range | O(log n + k) |

---

## 🧠 Why Redis?

Redis Sorted Sets:
- Atomic operations
- Built-in ranking
- High throughput
- Production ready for gaming systems
- Used in real-world competitive platforms

---

## 🏁 Production Considerations

- Redis Cluster for scaling
- Periodic persistence snapshots
- Horizontal API scaling
- Load balancing

---

Note: For scale and concurrency, I would use Redis Sorted Sets in production. For deeper control, I would implement an augmented balanced BST storing subtree sizes to enable O(log n) rank queries. For historical queries, I would implement event sourcing with periodic snapshots or persistent data structures.

## 👨‍💻 Author

Abhinav Giri  
Software Development Engineer
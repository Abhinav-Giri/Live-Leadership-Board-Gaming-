import axios from "axios";
import { useState } from "react";

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTop = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/leaderboard/top/5");
      setPlayers(res.data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateScore = async () => {
    await axios.post("http://localhost:5000/leaderboard/update", {
      user_id: "alice",
      delta: 80
    });
    fetchTop();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Real-Time Leaderboard</h2>

      <button onClick={fetchTop}>Load Top 5</button>
      <button onClick={updateScore} style={{ marginLeft: "10px" }}>
        Add 80 Points to Alice
      </button>

      {loading && <p>Loading...</p>}

      <ul>
        {players.map((p, index) => (
          <li key={p.user_id}>
            {index + 1}. {p.user_id} - {p.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
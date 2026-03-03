import axios from "axios";
import { useState } from "react";

function App() {
  const [players, setPlayers] = useState([]);

  const seedData = async () => {
    await axios.post("http://localhost:5000/leaderboard/update", {
      user_id: "alice",
      delta: 100,
    });

    await axios.post("http://localhost:5000/leaderboard/update", {
      user_id: "bob",
      delta: 200,
    });

    await axios.post("http://localhost:5000/leaderboard/update", {
      user_id: "carol",
      delta: 150,
    });
  };

  const loadTop = async () => {
    const res = await axios.get(
      "http://localhost:5000/leaderboard/top/5"
    );
    setPlayers(res.data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Production Leaderboard (Redis Powered)</h2>

      <button onClick={seedData}>Seed Data</button>
      <button onClick={loadTop} style={{ marginLeft: 10 }}>
        Load Top 5
      </button>

      <ul>
        {players.map((p, i) => (
          <li key={p.user_id}>
            {i + 1}. {p.user_id} - {p.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
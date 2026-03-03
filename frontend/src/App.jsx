import { useState } from "react";
import Leaderboard from "./components/Leaderboard";
import Controls from "./components/Controls";
import { seedPlayers, fetchTopPlayers } from "./api/leaderboardApi";

function App() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSeed = async () => {
    try {
      setLoading(true);
      setError("");

      await seedPlayers();
      const data = await fetchTopPlayers(5);
      setPlayers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to seed data");
    } finally {
      setLoading(false);
    }
  };

  const handleLoad = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await fetchTopPlayers(3);
      setPlayers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch leaderboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>🏆 Live Leaderboard</h1>

      <Controls
        onSeed={handleSeed}
        onLoad={handleLoad}
        loading={loading}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Leaderboard players={players} />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial",
  },
};

export default App;
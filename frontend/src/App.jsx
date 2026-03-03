import { useState } from "react";
import "./App.css";

import UpdateScore from "./components/UpdateScore";
import TopK from "./components/TopK";
import Rank from "./components/Rank";
import Range from "./components/Range";
import LeaderboardTable from "./components/LeaderboardTable";

import {
  updateScoreAPI,
  getTopKAPI,
  getRankAPI,
  getRangeAPI,
} from "./api/leaderboardApi";

function App() {
  const [players, setPlayers] = useState([]);
  const [rankResult, setRankResult] = useState(null);

  const handleUpdate = async (userId, delta) => {
    await updateScoreAPI(userId, delta);
    const res = await getTopKAPI(5);
    setPlayers(res.data);
  };

  const handleTopK = async (k) => {
    const res = await getTopKAPI(k);
    setPlayers(res.data);
  };

  const handleGetRank = async (userId) => {
  try {
    const res = await getRankAPI(userId);
    setRankResult(`Rank: ${res.data.rank}`);
  } catch (err) {
    console.log('Error:',err.message)
    setRankResult("Player does not exist");
  }
};
  const handleRange = async (start, end) => {
    const res = await getRangeAPI(start, end);
    setPlayers(res.data);
  };

  return (
    <div className="container">
      <h1>🏆 Real-Time Leaderboard</h1>

      <UpdateScore onUpdate={handleUpdate} />
      <TopK onFetch={handleTopK} />
      <Rank onGetRank={handleGetRank} rankResult={rankResult} />
      <Range onFetchRange={handleRange} />
      <LeaderboardTable players={players} />
    </div>
  );
}

export default App;
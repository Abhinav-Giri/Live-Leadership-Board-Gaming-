import { useState } from "react";

function Rank({ onGetRank, rankResult }) {
  const [userId, setUserId] = useState("");

  return (
    <div className="card">
      <h3>Get Player Rank</h3>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={() => onGetRank(userId)}>Get Rank</button>

      {rankResult && <p className="result">{rankResult}</p>}
    </div>
  );
}

export default Rank;

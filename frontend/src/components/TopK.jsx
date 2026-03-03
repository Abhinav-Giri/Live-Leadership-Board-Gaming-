import { useState } from "react";

function TopK({ onFetch }) {
  const [k, setK] = useState(5);

  return (
    <div className="card">
      <h3>Get Top K</h3>
      <input
        type="number"
        value={k}
        onChange={(e) => setK(e.target.value)}
      />
      <button onClick={() => onFetch(k)}>Fetch</button>
    </div>
  );
}

export default TopK;
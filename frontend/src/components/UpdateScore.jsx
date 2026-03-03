import { useState } from "react";

function UpdateScore({ onUpdate }) {
  const [userId, setUserId] = useState("");
  const [delta, setDelta] = useState("");

  const handleSubmit = () => {
    if (!userId || delta === "") return;
    onUpdate(userId, Number(delta));
    setUserId("");
    setDelta("");
  };

  return (
    <div className="card">
      <h3>Update Score</h3>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Delta (+/-)"
        value={delta}
        onChange={(e) => setDelta(e.target.value)}
      />
      <button onClick={handleSubmit}>Update</button>
    </div>
  );
}

export default UpdateScore;
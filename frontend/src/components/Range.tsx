import { useState } from "react";

interface RangeProps {
  onFetchRange: (start: string, end: string) => void;
}

function Range({ onFetchRange }: RangeProps) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div className="card">
      <h3>Get Players in Rank Range</h3>
      <input
        type="number"
        placeholder="Start"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input
        type="number"
        placeholder="End"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />
      <button onClick={() => onFetchRange(start, end)}>
        Fetch
      </button>
    </div>
  );
}

export default Range;
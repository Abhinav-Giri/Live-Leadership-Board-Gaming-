const Controls = ({ onSeed, onLoad, loading }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <button onClick={onSeed} disabled={loading}>
        Seed Data
      </button>

      <button
        onClick={onLoad}
        disabled={loading}
        style={{ marginLeft: "10px" }}
      >
        Load Top 3
      </button>
    </div>
  );
};

export default Controls;
const Leaderboard = ({ players }) => {
  if (!players.length) {
    return <p>No players available.</p>;
  }

  return (
    <div style={styles.card}>
      {players.map((player, index) => (
        <div key={player.user_id} style={styles.row}>
          <span>#{index + 1}</span>
          <span>{player.user_id}</span>
          <span>{player.score}</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  card: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f4f4f4",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
  },
};

export default Leaderboard;
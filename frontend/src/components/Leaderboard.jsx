const Leaderboard = ({ players }) => {
  if (!players.length) {
    return <p>No players available.</p>;
  }

  return (
    <div className="card">
      {players.map((player, index) => (
        <div key={player.user_id}  className="row">
          <span>#{index + 1}</span>
          <span>{player.user_id}</span>
          <span>{player.score}</span>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;
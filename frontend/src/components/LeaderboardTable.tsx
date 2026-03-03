interface Player {
  user_id: string;
  rank?: number;
  score: number;
}

interface LeaderboardTableProps {
  players: Player[];
}

function LeaderboardTable({ players }: LeaderboardTableProps) {
  return (
    <div className="card">
      <h3>Leaderboard</h3>
      {players.length === 0 && <p>No players available</p>}

      {players.map((player, index) => (
        <div key={player.user_id} className="row">
        <span>#{player.rank ?? index + 1}</span>
          <span>{player.user_id}</span>
          <span>{player.score}</span>
        </div>
      ))}
    </div>
  );
}

export default LeaderboardTable;
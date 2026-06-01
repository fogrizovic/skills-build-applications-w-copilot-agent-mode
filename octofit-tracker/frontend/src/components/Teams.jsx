import { useEffect, useState } from 'react';
import { normalizeApiResponse } from '../api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(ENDPOINT)
      .then((res) => res.json())
      .then((data) => setTeams(normalizeApiResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load teams'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      <p>API: <code>{ENDPOINT}</code></p>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {teams.length === 0 ? (
            <li>No teams found.</li>
          ) : (
            teams.map((team, index) => (
              <li key={team._id || team.id || index}>
                {team.name || `Team ${index + 1}`} ({team.memberIds?.length ?? 0} members)
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
};

export default Teams;

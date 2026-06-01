import { useEffect, useState } from 'react';
import { normalizeApiResponse } from '../api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(ENDPOINT)
      .then((res) => res.json())
      .then((data) => setEntries(normalizeApiResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load leaderboard'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>API: <code>{ENDPOINT}</code></p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {entries.length === 0 ? (
            <li>No leaderboard entries found.</li>
          ) : (
            entries.map((entry, index) => (
              <li key={entry._id || entry.id || index}>
                {entry.subjectType || 'entry'} {entry.subjectId || ''}: {entry.points ?? '0'} points
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
};

export default Leaderboard;

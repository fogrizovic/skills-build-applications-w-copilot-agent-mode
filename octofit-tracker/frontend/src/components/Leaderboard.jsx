import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeApiResponse } from '../api';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/leaderboard`)
      .then((res) => res.json())
      .then((data) => setEntries(normalizeApiResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load leaderboard'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>API: <code>{`${API_BASE_URL}/leaderboard`}</code></p>
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

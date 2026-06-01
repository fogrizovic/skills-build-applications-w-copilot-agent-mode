import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeApiResponse } from '../api';

const Activities = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/activities`)
      .then((res) => res.json())
      .then((data) => setItems(normalizeApiResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load activities'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      <p>API: <code>{`${API_BASE_URL}/activities`}</code></p>
      {loading && <p>Loading activities...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {items.length === 0 ? (
            <li>No activities found.</li>
          ) : (
            items.map((activity, index) => (
              <li key={activity._id || activity.id || index}>
                {activity.type || 'Activity'} — {activity.durationMinutes || activity.duration || 'n/a'} minutes
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
};

export default Activities;

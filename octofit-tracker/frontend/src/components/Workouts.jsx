import { useEffect, useState } from 'react';
import { normalizeApiResponse } from '../api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(ENDPOINT)
      .then((res) => res.json())
      .then((data) => setWorkouts(normalizeApiResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load workouts'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      <p>API: <code>{ENDPOINT}</code></p>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {workouts.length === 0 ? (
            <li>No workouts found.</li>
          ) : (
            workouts.map((workout, index) => (
              <li key={workout._id || workout.id || index}>
                {workout.name || `Workout ${index + 1}`} — {workout.exercises?.length ?? 0} exercises
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
};

export default Workouts;

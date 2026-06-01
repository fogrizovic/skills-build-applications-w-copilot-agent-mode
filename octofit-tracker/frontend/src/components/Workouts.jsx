import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeApiResponse } from '../api';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/workouts`)
      .then((res) => res.json())
      .then((data) => setWorkouts(normalizeApiResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load workouts'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      <p>API: <code>{`${API_BASE_URL}/workouts`}</code></p>
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

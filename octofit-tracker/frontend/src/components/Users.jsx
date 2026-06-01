import { useEffect, useState } from 'react';
import { API_BASE_URL, normalizeApiResponse } from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(normalizeApiResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      <p>API: <code>{`${API_BASE_URL}/users`}</code></p>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {users.length === 0 ? (
            <li>No users found.</li>
          ) : (
            users.map((user) => (
              <li key={user._id || user.id || user.email || Math.random()}>
                {user.name || user.email || JSON.stringify(user)}
              </li>
            ))
          )}
        </ul>
      )}
    </section>
  );
};

export default Users;

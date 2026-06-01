import { useEffect, useState } from 'react';
import { normalizeApiResponse } from '../api';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(ENDPOINT)
      .then((res) => res.json())
      .then((data) => setUsers(normalizeApiResponse(data)))
      .catch((err) => setError(err.message || 'Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      <p>API: <code>{ENDPOINT}</code></p>
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

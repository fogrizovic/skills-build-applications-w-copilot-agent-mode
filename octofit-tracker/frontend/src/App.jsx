import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { API_BASE_URL, codespaceName } from './api';
import './App.css';

const navLinks = [
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
];

const Home = () => (
  <section>
    <h1>OctoFit Tracker</h1>
    <p>
      This React 19 presentation tier uses Vite environment variables to build a Codespaces-aware API base URL.
    </p>
    <p>
      API base URL: <code>{API_BASE_URL}</code>
    </p>
    <p>
      Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces support. When unset, the app falls back to <code>http://localhost:8000</code>.
    </p>
    <p>
      Running in: <strong>{codespaceName ? 'Codespaces' : 'Localhost'}</strong>
    </p>
  </section>
);

function App() {
  return (
    <div className="app-shell">
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/" end>
                Home
              </NavLink>
            </li>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

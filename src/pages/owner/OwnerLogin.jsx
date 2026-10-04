import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './OwnerPO.css';

const OWNER_USERNAME = "omegaowner";
const OWNER_PASSWORD = "Omega@2026";

export default function OwnerLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState(OWNER_USERNAME);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function login(e) {
    e.preventDefault();

    setBusy(true);
    setError("");

    if (username !== OWNER_USERNAME || password !== OWNER_PASSWORD) {
      setError("Invalid owner password.");
      setBusy(false);
      return;
    }

    sessionStorage.setItem("omega_owner_authenticated", "true");

    const next =
      new URLSearchParams(location.search).get("next") ||
      "/owner/purchase-order";

    navigate(next, { replace: true });
  }

  return (
    <main className="login-shell">
      <form className="login-card" onSubmit={login}>
        <div className="owner-kicker">OMEGA SOLAR POWER SYSTEMS</div>

        <h1>Owner Access</h1>

        <p>Purchase Order Automation</p>

        <label className="field-label">Owner Username</label>

        <input
          className="field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />

        <label className="field-label" style={{ marginTop: 14 }}>
          Owner Password
        </label>

        <input
          className="field"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
        />

        <button
          className="primary-btn"
          disabled={busy || !username || !password}
          type="submit"
        >
          {busy ? "Signing in..." : "Open Purchase Order Automation"}
        </button>

        {error && <div className="message error">{error}</div>}
      </form>
    </main>
  );
}

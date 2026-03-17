import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAdminSession } from "../utils/adminAuth.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Login failed");
      setAdminSession(data.token, data.admin?.email || email);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "75vh",
        display: "grid",
        placeItems: "center",
        padding: "30px 16px",
        background: "linear-gradient(145deg, #f6fbff 0%, #fff7ee 100%)",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          border: "1px solid #d8e4ee",
          borderRadius: "16px",
          padding: "22px",
          boxShadow: "0 16px 34px rgba(15,23,42,0.1)",
        }}
      >
        <h1 style={{ margin: "0 0 6px", fontSize: "1.8rem", color: "#123c52" }}>
          Admin Sign In
        </h1>
        <p style={{ margin: "0 0 16px", color: "#64748b" }}>
          Login to access notice backend controls.
        </p>

        <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "12px",
            padding: "10px",
            border: "1px solid #cfdbe5",
            borderRadius: "10px",
          }}
        />

        <label style={{ display: "block", marginBottom: "8px", fontWeight: 600 }}>
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "14px",
            padding: "10px",
            border: "1px solid #cfdbe5",
            borderRadius: "10px",
          }}
        />

        {error && (
          <p
            style={{
              margin: "0 0 12px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              borderRadius: "8px",
              padding: "8px 10px",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "10px",
            padding: "10px 12px",
            color: "#fff",
            fontWeight: 700,
            background: "linear-gradient(135deg, #1a6b7a, #2d8c9f)",
            cursor: "pointer",
          }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}

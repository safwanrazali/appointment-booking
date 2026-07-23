import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    setLoading(false);

    if (!data.success) {
      setError("Invalid username or password");
      return;
    }

    window.location.href = "/admin";
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center mesh-bg"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #060f24 0%, #10254a 55%, #0b3f57 100%)",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: 420, position: "relative", zIndex: 1 }}
      >
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-3"
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #14c7d9, #4c6fff)",
            }}
          >
            <i className="bi bi-shield-lock-fill fs-3 text-white" />
          </div>
          <h3 className="text-white fw-bold mb-1">Admin Console</h3>
          <p className="text-white-50 small mb-0">
            PTPKM Appointment Booking Platform
          </p>
        </div>

        <div className="card shadow-lg border-0">
          <div className="card-body p-4">
            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2">
                <i className="bi bi-exclamation-triangle-fill" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small text-muted">Username</label>
                <input
                  className="form-control"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label small text-muted">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
                disabled={loading}
              >
                <i className="bi bi-box-arrow-in-right" />
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

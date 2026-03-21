import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lg-root {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Left panel ── */
  .lg-left {
    background: #faf9f7;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2.5rem;
    order: 1;
  }

  .lg-form-wrap {
    width: 100%;
    max-width: 380px;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lg-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    margin-bottom: 2.5rem;
    display: block;
  }

  .lg-form-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #0e0e0e;
    margin-bottom: 0.4rem;
  }

  .lg-form-sub {
    font-size: 0.85rem;
    color: #9e9a92;
    margin-bottom: 2rem;
    font-weight: 300;
  }

  .lg-form-sub a {
    color: #0e0e0e;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid #d4af64;
    padding-bottom: 1px;
  }

  .lg-field {
    margin-bottom: 1.1rem;
  }

  .lg-label {
    display: block;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b6860;
    margin-bottom: 0.4rem;
    font-weight: 500;
  }

  .lg-input-wrap {
    position: relative;
  }

  .lg-input {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #fff;
    border: 1px solid #e2ddd6;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    color: #0e0e0e;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-weight: 300;
  }

  .lg-input.has-toggle {
    padding-right: 2.75rem;
  }

  .lg-input::placeholder { color: #c5bfb6; }

  .lg-input:focus {
    border-color: #d4af64;
    box-shadow: 0 0 0 3px rgba(212,175,100,0.12);
  }

  .lg-input.error {
    border-color: #c0392b;
    box-shadow: 0 0 0 3px rgba(192,57,43,0.08);
  }

  .lg-toggle {
    position: absolute;
    right: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #9e9a92;
    font-size: 0.75rem;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    letter-spacing: 0.05em;
    padding: 0;
    transition: color 0.15s;
  }

  .lg-toggle:hover { color: #0e0e0e; }

  .lg-field-error {
    font-size: 0.75rem;
    color: #c0392b;
    margin-top: 0.35rem;
    font-weight: 400;
  }

  .lg-api-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 6px;
    padding: 0.75rem 1rem;
    font-size: 0.82rem;
    color: #c0392b;
    margin-bottom: 1rem;
    font-weight: 400;
  }

  .lg-submit {
    width: 100%;
    padding: 0.85rem 1rem;
    background: #0e0e0e;
    color: #f5f0e8;
    border: none;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    cursor: pointer;
    margin-top: 0.5rem;
    transition: background 0.2s, transform 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .lg-submit:hover:not(:disabled) { background: #1e1e1e; }
  .lg-submit:active:not(:disabled) { transform: scale(0.99); }
  .lg-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  .lg-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(245,240,232,0.3);
    border-top-color: #f5f0e8;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Right panel ── */
  .lg-right {
    background: #0e0e0e;
    color: #f5f0e8;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    overflow: hidden;
    order: 2;
  }

  .lg-right::before {
    content: '';
    position: absolute;
    top: -80px; left: -80px;
    width: 320px; height: 320px;
    border-radius: 50%;
    border: 60px solid rgba(212,175,100,0.06);
    pointer-events: none;
  }

  .lg-right::after {
    content: '';
    position: absolute;
    bottom: 40px; right: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    border: 40px solid rgba(212,175,100,0.04);
    pointer-events: none;
  }

  .lg-quote-mark {
    font-family: 'Playfair Display', serif;
    font-size: 5rem;
    color: #d4af64;
    opacity: 0.3;
    line-height: 1;
    margin-bottom: -1rem;
  }

  .lg-quote {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.4rem, 2.5vw, 1.9rem);
    line-height: 1.4;
    font-style: italic;
    color: #f5f0e8;
    margin-bottom: 1.5rem;
    max-width: 340px;
  }

  .lg-quote-author {
    font-size: 0.78rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    margin-bottom: 3rem;
  }

  .lg-divider {
    width: 40px;
    height: 1px;
    background: #d4af64;
    opacity: 0.4;
    margin-bottom: 2rem;
  }

  .lg-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .lg-stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #f5f0e8;
    line-height: 1;
    margin-bottom: 0.3rem;
  }

  .lg-stat-label {
    font-size: 0.75rem;
    color: #5a5855;
    font-weight: 300;
    letter-spacing: 0.05em;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .lg-root { grid-template-columns: 1fr; }
    .lg-right { display: none; }
    .lg-left { min-height: 100vh; padding: 2rem 1.5rem; order: 1; }
  }
`;

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: "" }));
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setLoading(true);
    setApiError("");
    try {
      const { data } = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });
      // Save JWT token
      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", form.email);
      // Redirect to posts listing
      navigate("/posts");
    } catch (err) {
      const msg = err?.response?.data?.message;
      setApiError(msg || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="lg-root">
        {/* Left — form */}
        <div className="lg-left">
          <div className="lg-form-wrap">
            <span className="lg-logo">Inkwell</span>

            <h2 className="lg-form-title">Welcome back</h2>
            <p className="lg-form-sub">
              No account yet? <a href="/register">Create one</a>
            </p>

            {apiError && <div className="lg-api-error">{apiError}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="lg-field">
                <label className="lg-label" htmlFor="lg-email">Email address</label>
                <input
                  id="lg-email"
                  className={`lg-input${errors.email ? " error" : ""}`}
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  autoComplete="email"
                />
                {errors.email && <p className="lg-field-error">{errors.email}</p>}
              </div>

              <div className="lg-field">
                <label className="lg-label" htmlFor="lg-password">Password</label>
                <div className="lg-input-wrap">
                  <input
                    id="lg-password"
                    className={`lg-input has-toggle${errors.password ? " error" : ""}`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={form.password}
                    onChange={handleChange("password")}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="lg-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? "hide" : "show"}
                  </button>
                </div>
                {errors.password && <p className="lg-field-error">{errors.password}</p>}
              </div>

              <button className="lg-submit" type="submit" disabled={loading}>
                {loading ? (
                  <><div className="lg-spinner" /> Signing in…</>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right — decorative panel */}
        <div className="lg-right">
          <div className="lg-quote-mark">"</div>
          <p className="lg-quote">
            The scariest moment is always just before you start.
          </p>
          <p className="lg-quote-author">— Stephen King</p>
          <div className="lg-divider" />
          <div className="lg-stats">
            <div>
              <p className="lg-stat-num">∞</p>
              <p className="lg-stat-label">Stories waiting to be told</p>
            </div>
            <div>
              <p className="lg-stat-num">1</p>
              <p className="lg-stat-label">Voice that is uniquely yours</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
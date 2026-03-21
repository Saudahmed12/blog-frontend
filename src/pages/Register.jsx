import { useState } from "react";

import api from '../api/axiosInstance';
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .reg-root {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Left panel ── */
  .reg-left {
    background: #0e0e0e;
    color: #f5f0e8;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
  }

  .reg-left::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 320px; height: 320px;
    border-radius: 50%;
    border: 60px solid rgba(212,175,100,0.07);
    pointer-events: none;
  }

  .reg-left::after {
    content: '';
    position: absolute;
    bottom: 60px; left: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    border: 40px solid rgba(212,175,100,0.05);
    pointer-events: none;
  }

  .reg-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
  }

  .reg-hero {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0;
  }

  .reg-eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #d4af64;
    margin-bottom: 1.25rem;
    font-weight: 400;
  }

  .reg-headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 3.5vw, 3rem);
    line-height: 1.15;
    font-weight: 700;
    color: #f5f0e8;
    margin-bottom: 1.5rem;
  }

  .reg-headline em {
    font-style: italic;
    color: #d4af64;
  }

  .reg-desc {
    font-size: 0.9rem;
    line-height: 1.8;
    color: #9e9a92;
    max-width: 340px;
    font-weight: 300;
  }

  .reg-divider {
    width: 40px;
    height: 1px;
    background: #d4af64;
    margin: 2rem 0;
    opacity: 0.6;
  }

  .reg-features {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .reg-feature {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.82rem;
    color: #7a7670;
    font-weight: 300;
  }

  .reg-feature-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #d4af64;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .reg-footer-note {
    font-size: 0.72rem;
    color: #4a4845;
    letter-spacing: 0.05em;
  }

  /* ── Right panel ── */
  .reg-right {
    background: #faf9f7;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 2.5rem;
  }

  .reg-form-wrap {
    width: 100%;
    max-width: 400px;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .reg-form-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #0e0e0e;
    margin-bottom: 0.4rem;
  }

  .reg-form-sub {
    font-size: 0.85rem;
    color: #9e9a92;
    margin-bottom: 2rem;
    font-weight: 300;
  }

  .reg-form-sub a {
    color: #0e0e0e;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid #d4af64;
    padding-bottom: 1px;
  }

  .reg-field {
    margin-bottom: 1.1rem;
  }

  .reg-label {
    display: block;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #6b6860;
    margin-bottom: 0.4rem;
    font-weight: 500;
  }

  .reg-input {
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

  .reg-input::placeholder { color: #c5bfb6; }

  .reg-input:focus {
    border-color: #d4af64;
    box-shadow: 0 0 0 3px rgba(212,175,100,0.12);
  }

  .reg-input.error {
    border-color: #c0392b;
    box-shadow: 0 0 0 3px rgba(192,57,43,0.08);
  }

  .reg-field-error {
    font-size: 0.75rem;
    color: #c0392b;
    margin-top: 0.35rem;
    font-weight: 400;
  }

  .reg-strength {
    margin-top: 0.5rem;
    display: flex;
    gap: 4px;
  }

  .reg-strength-bar {
    height: 3px;
    flex: 1;
    border-radius: 2px;
    background: #e2ddd6;
    transition: background 0.3s;
  }

  .reg-strength-bar.active-1 { background: #c0392b; }
  .reg-strength-bar.active-2 { background: #e67e22; }
  .reg-strength-bar.active-3 { background: #27ae60; }
  .reg-strength-bar.active-4 { background: #d4af64; }

  .reg-strength-label {
    font-size: 0.72rem;
    color: #9e9a92;
    margin-top: 0.3rem;
    font-weight: 300;
  }

  .reg-submit {
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

  .reg-submit:hover:not(:disabled) { background: #1e1e1e; }
  .reg-submit:active:not(:disabled) { transform: scale(0.99); }
  .reg-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  .reg-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(245,240,232,0.3);
    border-top-color: #f5f0e8;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .reg-api-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 6px;
    padding: 0.75rem 1rem;
    font-size: 0.82rem;
    color: #c0392b;
    margin-bottom: 1rem;
    font-weight: 400;
  }

  .reg-success {
    text-align: center;
    animation: fadeUp 0.4s ease both;
  }

  .reg-success-icon {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: #f0fdf4;
    border: 1.5px solid #86efac;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.25rem;
    font-size: 1.4rem;
  }

  .reg-success-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    color: #0e0e0e;
    margin-bottom: 0.5rem;
  }

  .reg-success-sub {
    font-size: 0.85rem;
    color: #9e9a92;
    line-height: 1.7;
    font-weight: 300;
    margin-bottom: 1.5rem;
  }

  .reg-login-link {
    display: inline-block;
    padding: 0.7rem 1.5rem;
    border: 1px solid #0e0e0e;
    border-radius: 6px;
    font-size: 0.85rem;
    color: #0e0e0e;
    text-decoration: none;
    font-weight: 500;
    transition: background 0.2s;
  }
  .reg-login-link:hover { background: #0e0e0e; color: #f5f0e8; }

  /* Responsive */
  @media (max-width: 768px) {
    .reg-root { grid-template-columns: 1fr; }
    .reg-left { display: none; }
    .reg-right { min-height: 100vh; padding: 2rem 1.5rem; }
  }
`;

function getPasswordStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match";
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
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setSuccess(true);
    } catch (err) {
      setApiError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="reg-root">
        {/* Left panel */}
        <div className="reg-left">
          <div className="reg-logo">Inkwell</div>

          <div className="reg-hero">
            <p className="reg-eyebrow">Join the community</p>
            <h1 className="reg-headline">
              Write with<br /><em>intention.</em><br />Read with depth.
            </h1>
            <p className="reg-desc">
              A quiet corner of the internet for thoughtful writing. Share ideas that matter, discover voices worth hearing.
            </p>
            <div className="reg-divider" />
            <ul className="reg-features">
              <li className="reg-feature"><span className="reg-feature-dot" />Publish posts with categories &amp; tags</li>
              <li className="reg-feature"><span className="reg-feature-dot" />Save drafts and publish when ready</li>
              <li className="reg-feature"><span className="reg-feature-dot" />Filter and discover writing by topic</li>
            </ul>
          </div>

          <p className="reg-footer-note">© 2025 Inkwell — All rights reserved</p>
        </div>

        {/* Right panel */}
        <div className="reg-right">
          <div className="reg-form-wrap">
            {success ? (
              <div className="reg-success">
                <div className="reg-success-icon">✓</div>
                <h2 className="reg-success-title">You're in.</h2>
                <p className="reg-success-sub">
                  Your account has been created.<br />Head to login to start writing.
                </p>
                <a href="/login" className="reg-login-link">Go to login</a>
              </div>
            ) : (
              <>
                <h2 className="reg-form-title">Create account</h2>
                <p className="reg-form-sub">
                  Already have one? <a href="/login">Sign in</a>
                </p>

                {apiError && <div className="reg-api-error">{apiError}</div>}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="reg-field">
                    <label className="reg-label" htmlFor="name">Full name</label>
                    <input
                      id="name"
                      className={`reg-input${errors.name ? " error" : ""}`}
                      type="text"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={handleChange("name")}
                      autoComplete="name"
                    />
                    {errors.name && <p className="reg-field-error">{errors.name}</p>}
                  </div>

                  <div className="reg-field">
                    <label className="reg-label" htmlFor="email">Email address</label>
                    <input
                      id="email"
                      className={`reg-input${errors.email ? " error" : ""}`}
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      autoComplete="email"
                    />
                    {errors.email && <p className="reg-field-error">{errors.email}</p>}
                  </div>

                  <div className="reg-field">
                    <label className="reg-label" htmlFor="password">Password</label>
                    <input
                      id="password"
                      className={`reg-input${errors.password ? " error" : ""}`}
                      type="password"
                      placeholder="Min. 8 characters"
                      value={form.password}
                      onChange={handleChange("password")}
                      autoComplete="new-password"
                    />
                    {form.password && (
                      <>
                        <div className="reg-strength">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`reg-strength-bar${strength >= i ? ` active-${strength}` : ""}`}
                            />
                          ))}
                        </div>
                        <p className="reg-strength-label">{strengthLabels[strength]}</p>
                      </>
                    )}
                    {errors.password && <p className="reg-field-error">{errors.password}</p>}
                  </div>

                  <div className="reg-field">
                    <label className="reg-label" htmlFor="confirm">Confirm password</label>
                    <input
                      id="confirm"
                      className={`reg-input${errors.confirm ? " error" : ""}`}
                      type="password"
                      placeholder="Repeat your password"
                      value={form.confirm}
                      onChange={handleChange("confirm")}
                      autoComplete="new-password"
                    />
                    {errors.confirm && <p className="reg-field-error">{errors.confirm}</p>}
                  </div>

                  <button className="reg-submit" type="submit" disabled={loading}>
                    {loading ? (
                      <><div className="reg-spinner" /> Creating account…</>
                    ) : (
                      "Create account"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
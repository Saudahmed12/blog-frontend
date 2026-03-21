import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .tg-root {
    min-height: 100vh;
    background: #faf9f7;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Navbar ── */
  .tg-nav {
    background: #0e0e0e;
    padding: 0 2.5rem;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .tg-nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .tg-nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    cursor: pointer;
  }

  .tg-nav-sep { width: 1px; height: 16px; background: #2a2a2a; }

  .tg-nav-crumb {
    font-size: 0.78rem;
    color: #5a5855;
    font-weight: 300;
  }

  .tg-nav-btn {
    padding: 0.4rem 1rem;
    border-radius: 5px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    background: transparent;
    border: 1px solid #3a3a3a;
    color: #9e9a92;
  }
  .tg-nav-btn:hover { border-color: #5a5855; color: #f5f0e8; }

  /* ── Page header ── */
  .tg-header {
    background: #0e0e0e;
    padding: 2.5rem 2.5rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .tg-header::before {
    content: '';
    position: absolute;
    top: -40px; right: 10%;
    width: 180px; height: 180px;
    border-radius: 50%;
    border: 35px solid rgba(212,175,100,0.06);
    pointer-events: none;
  }

  .tg-header::after {
    content: '';
    position: absolute;
    bottom: -30px; right: -30px;
    width: 130px; height: 130px;
    border-radius: 50%;
    border: 25px solid rgba(212,175,100,0.04);
    pointer-events: none;
  }

  .tg-eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }

  .tg-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 700;
    color: #f5f0e8;
    margin-bottom: 0.5rem;
  }

  .tg-subtitle {
    font-size: 0.85rem;
    color: #5a5855;
    font-weight: 300;
    max-width: 480px;
    line-height: 1.6;
  }

  /* ── Body ── */
  .tg-body {
    max-width: 820px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
  }

  /* ── Create card ── */
  .tg-create-card {
    background: #fff;
    border: 1px solid #ede9e3;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 2rem;
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .tg-card-header {
    padding: 0.9rem 1.5rem;
    border-bottom: 1px solid #f0ece6;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tg-card-header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .tg-card-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #d4af64;
    flex-shrink: 0;
  }

  .tg-card-label {
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b6860;
    font-weight: 500;
  }

  .tg-card-hint {
    font-size: 0.7rem;
    color: #b0aba4;
    font-weight: 300;
  }

  .tg-card-body {
    padding: 1.25rem 1.5rem;
  }

  /* ── Tag input area ── */
  .tg-input-area {
    border: 1px solid #e2ddd6;
    border-radius: 8px;
    background: #faf9f7;
    transition: border-color 0.2s, box-shadow 0.2s;
    margin-bottom: 0.75rem;
  }

  .tg-input-area:focus-within {
    border-color: #d4af64;
    box-shadow: 0 0 0 3px rgba(212,175,100,0.1);
    background: #fff;
  }

  .tg-input-area.err { border-color: #c0392b; }

  .tg-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 0.6rem 0.75rem 0;
  }

  .tg-chip {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.22rem 0.6rem;
    background: #0e0e0e;
    color: #f5f0e8;
    border-radius: 5px;
    font-size: 0.72rem;
    font-weight: 400;
    animation: chipIn 0.2s ease both;
  }

  @keyframes chipIn {
    from { opacity: 0; transform: scale(0.85); }
    to   { opacity: 1; transform: scale(1); }
  }

  .tg-chip-remove {
    background: none;
    border: none;
    color: #9e9a92;
    cursor: pointer;
    font-size: 0.8rem;
    padding: 0;
    line-height: 1;
    transition: color 0.15s;
  }
  .tg-chip-remove:hover { color: #f5f0e8; }

  .tg-text-input {
    width: 100%;
    padding: 0.6rem 0.75rem;
    background: transparent;
    border: none;
    outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    color: #0e0e0e;
    font-weight: 300;
  }

  .tg-text-input::placeholder { color: #c5bfb6; }

  .tg-input-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.75rem 0.6rem;
  }

  .tg-input-tip {
    font-size: 0.68rem;
    color: #b0aba4;
    font-weight: 300;
  }

  .tg-input-count {
    font-size: 0.68rem;
    color: #b0aba4;
    font-weight: 300;
  }

  .tg-input-count.warn { color: #e67e22; }
  .tg-input-count.full { color: #c0392b; }

  .tg-field-err {
    font-size: 0.72rem;
    color: #c0392b;
    margin-bottom: 0.5rem;
  }

  .tg-form-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  .tg-submit-btn {
    padding: 0.65rem 1.25rem;
    background: #0e0e0e;
    border: none;
    border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    color: #f5f0e8;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .tg-submit-btn:hover:not(:disabled) { background: #1e1e1e; }
  .tg-submit-btn:active:not(:disabled) { transform: scale(0.98); }
  .tg-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .tg-clear-btn {
    padding: 0.65rem 1rem;
    background: transparent;
    border: 1px solid #e2ddd6;
    border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: #9e9a92;
    cursor: pointer;
    transition: all 0.15s;
  }
  .tg-clear-btn:hover { border-color: #b0aba4; color: #0e0e0e; }

  .tg-spinner {
    width: 13px; height: 13px;
    border: 2px solid rgba(245,240,232,0.3);
    border-top-color: #f5f0e8;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .tg-api-err {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 7px;
    padding: 0.7rem 1rem;
    font-size: 0.8rem;
    color: #c0392b;
    margin-bottom: 0.75rem;
  }

  .tg-success-banner {
    background: #f0fdf4;
    border: 1px solid #86efac;
    border-radius: 7px;
    padding: 0.7rem 1rem;
    font-size: 0.8rem;
    color: #166534;
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  /* ── List section ── */
  .tg-list-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .tg-list-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #0e0e0e;
  }

  .tg-list-count {
    font-size: 0.78rem;
    color: #9e9a92;
    font-weight: 300;
  }

  /* ── Tag cloud display ── */
  .tg-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-bottom: 1.5rem;
  }

  .tg-tag-pill {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.85rem;
    background: #fff;
    border: 1px solid #ede9e3;
    border-radius: 8px;
    transition: border-color 0.15s, transform 0.15s;
    animation: fadeUp 0.3s ease both;
  }

  .tg-tag-pill:hover {
    border-color: #d4af64;
    transform: translateY(-1px);
  }

  .tg-tag-name {
    font-size: 0.82rem;
    color: #0e0e0e;
    font-weight: 400;
  }

  .tg-tag-name::before {
    content: '#';
    color: #d4af64;
    font-weight: 500;
    margin-right: 1px;
  }

  .tg-tag-count {
    font-size: 0.68rem;
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
    background: #f5f3ef;
    color: #9e9a92;
    font-weight: 400;
  }

  .tg-tag-del {
    background: none;
    border: none;
    cursor: pointer;
    color: #c5bfb6;
    font-size: 0.8rem;
    padding: 0;
    line-height: 1;
    transition: color 0.15s;
    display: flex;
    align-items: center;
  }
  .tg-tag-del:hover { color: #c0392b; }

  /* ── Empty state ── */
  .tg-empty {
    text-align: center;
    padding: 3rem 2rem;
    background: #fff;
    border: 1px dashed #e2ddd6;
    border-radius: 12px;
  }

  .tg-empty-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: #0e0e0e;
    margin-bottom: 0.4rem;
  }

  .tg-empty-sub {
    font-size: 0.82rem;
    color: #9e9a92;
    font-weight: 300;
  }

  /* ── Skeleton ── */
  .tg-skel-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }

  .tg-skel-pill {
    height: 34px;
    border-radius: 8px;
    background: #f0ece6;
    animation: shimmer 1.4s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* ── Delete modal ── */
  .tg-modal-bg {
    position: fixed;
    inset: 0;
    background: rgba(14,14,14,0.65);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: fadeIn 0.15s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .tg-modal {
    background: #fff;
    border-radius: 12px;
    padding: 1.75rem;
    width: 100%;
    max-width: 380px;
    margin: 1rem;
  }

  .tg-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #0e0e0e;
    margin-bottom: 0.5rem;
  }

  .tg-modal-sub {
    font-size: 0.83rem;
    color: #7a7670;
    font-weight: 300;
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }

  .tg-modal-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  .tg-modal-cancel {
    padding: 0.55rem 1.1rem;
    border: 1px solid #e2ddd6;
    border-radius: 6px;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: #6b6860;
    cursor: pointer;
    transition: all 0.15s;
  }
  .tg-modal-cancel:hover { border-color: #0e0e0e; color: #0e0e0e; }

  .tg-modal-confirm {
    padding: 0.55rem 1.1rem;
    border: none;
    border-radius: 6px;
    background: #c0392b;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    color: #fff;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.15s;
  }
  .tg-modal-confirm:hover { background: #a93226; }
  .tg-modal-confirm:disabled { opacity: 0.6; cursor: not-allowed; }

  @media (max-width: 640px) {
    .tg-nav { padding: 0 1.25rem; }
    .tg-header { padding: 2rem 1.25rem 1.75rem; }
    .tg-body { padding: 1.75rem 1.25rem; }
    .tg-form-actions { flex-direction: column; }
    .tg-submit-btn, .tg-clear-btn { width: 100%; justify-content: center; }
  }
`;

export default function Tags() {
  const navigate = useNavigate();

  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [pendingTags, setPendingTags] = useState([]); // tags typed but not yet submitted
  const [fieldError, setFieldError] = useState("");
  const [apiError, setApiError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name, postCount }
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/tags");
      setTags(data);
    } catch (_) {
      setApiError("Failed to load tags.");
    } finally {
      setLoading(false);
    }
  };

  // When user presses Enter or comma, add the typed word as a pending tag chip
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addPendingTag();
    }
    if (e.key === "Backspace" && inputValue === "" && pendingTags.length > 0) {
      setPendingTags((prev) => prev.slice(0, -1));
    }
  };

  const addPendingTag = () => {
    const val = inputValue.trim().replace(/,/g, "");
    if (!val) return;

    if (val.length < 2) { setFieldError("Each tag must be at least 2 characters"); return; }
    if (val.length > 30) { setFieldError("Each tag must be under 30 characters"); return; }
    if (!/^[\w\s-]+$/.test(val)) { setFieldError("Only letters, numbers, spaces and hyphens allowed"); return; }
    if (pendingTags.includes(val.toLowerCase())) { setFieldError("Tag already added"); return; }
    if (pendingTags.length >= 10) { setFieldError("Maximum 10 tags per request"); return; }

    setPendingTags((prev) => [...prev, val.toLowerCase()]);
    setInputValue("");
    setFieldError("");
  };

  const removePending = (tag) => {
    setPendingTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleCreate = async () => {
    // Add any remaining typed text as a tag first
    const val = inputValue.trim().replace(/,/g, "");
    let finalTags = [...pendingTags];
    if (val) {
      if (val.length < 2) { setFieldError("Each tag must be at least 2 characters"); return; }
      if (val.length > 30) { setFieldError("Tag must be under 30 characters"); return; }
      finalTags = [...finalTags, val.toLowerCase()];
    }

    if (finalTags.length === 0) {
      setFieldError("Add at least one tag name");
      return;
    }

    setCreating(true);
    setApiError("");
    setSuccessMsg("");

    try {
      const { data } = await api.post("/tags", { names: finalTags });
      setTags((prev) => [...prev, ...data]);
      setPendingTags([]);
      setInputValue("");
      setSuccessMsg(
        `${data.length} tag${data.length > 1 ? "s" : ""} created successfully`
      );
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setApiError(
        err?.response?.data?.message || "Failed to create tags. Please try again."
      );
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/tags/${deleteTarget.id}`);
      setTags((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (_) {
      setApiError("Failed to delete tag.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  const countClass =
    pendingTags.length >= 10 ? "full" : pendingTags.length >= 8 ? "warn" : "";

  return (
    <>
      <style>{styles}</style>
      <div className="tg-root">

        {/* Navbar */}
        <nav className="tg-nav">
          <div className="tg-nav-left">
            <span className="tg-nav-logo" onClick={() => navigate("/posts")}>
              Inkwell
            </span>
            <div className="tg-nav-sep" />
            <span className="tg-nav-crumb">Tags</span>
          </div>
          <button className="tg-nav-btn" onClick={() => navigate("/posts")}>
            ← Back to posts
          </button>
        </nav>

        {/* Header */}
        <div className="tg-header">
          <p className="tg-eyebrow">Manage</p>
          <h1 className="tg-title">Tags</h1>
          <p className="tg-subtitle">
            Tags help readers find related content. A post can have up to 10 tags.
            You can create multiple tags at once by typing and pressing Enter or comma.
          </p>
        </div>

        <div className="tg-body">

          {/* Create card */}
          <div className="tg-create-card">
            <div className="tg-card-header">
              <div className="tg-card-header-left">
                <div className="tg-card-dot" />
                <span className="tg-card-label">Create tags</span>
              </div>
              <span className="tg-card-hint">Type a name and press Enter or comma to add</span>
            </div>
            <div className="tg-card-body">
              {successMsg && (
                <div className="tg-success-banner">
                  <span>✓</span> {successMsg}
                </div>
              )}
              {apiError && <div className="tg-api-err">{apiError}</div>}

              <div className={`tg-input-area${fieldError ? " err" : ""}`}>
                {pendingTags.length > 0 && (
                  <div className="tg-chips">
                    {pendingTags.map((tag) => (
                      <span key={tag} className="tg-chip">
                        #{tag}
                        <button
                          type="button"
                          className="tg-chip-remove"
                          onClick={() => removePending(tag)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <input
                  className="tg-text-input"
                  type="text"
                  placeholder={
                    pendingTags.length === 0
                      ? "e.g. machine-learning, python, webdev…"
                      : "Add another tag…"
                  }
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setFieldError("");
                  }}
                  onKeyDown={handleKeyDown}
                  onBlur={addPendingTag}
                  disabled={pendingTags.length >= 10}
                />
                <div className="tg-input-footer">
                  <span className="tg-input-tip">
                    {fieldError
                      ? <span style={{ color: "#c0392b" }}>{fieldError}</span>
                      : "Press Enter or comma to add each tag · 2–30 chars each"}
                  </span>
                  <span className={`tg-input-count ${countClass}`}>
                    {pendingTags.length} / 10
                  </span>
                </div>
              </div>

              <div className="tg-form-actions">
                {pendingTags.length > 0 && (
                  <button
                    className="tg-clear-btn"
                    onClick={() => { setPendingTags([]); setInputValue(""); setFieldError(""); }}
                  >
                    Clear all
                  </button>
                )}
                <button
                  className="tg-submit-btn"
                  onClick={handleCreate}
                  disabled={creating || (pendingTags.length === 0 && !inputValue.trim())}
                >
                  {creating ? (
                    <><div className="tg-spinner" /> Creating…</>
                  ) : (
                    `Create ${pendingTags.length > 1 ? `${pendingTags.length} tags` : "tag"}`
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="tg-list-header">
            <h2 className="tg-list-title">All tags</h2>
            {!loading && (
              <span className="tg-list-count">
                {tags.length} {tags.length === 1 ? "tag" : "tags"}
              </span>
            )}
          </div>

          {loading ? (
            <div className="tg-skel-cloud">
              {[80, 110, 70, 95, 120, 85, 100, 75].map((w, i) => (
                <div
                  key={i}
                  className="tg-skel-pill"
                  style={{ width: `${w}px`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          ) : tags.length === 0 ? (
            <div className="tg-empty">
              <h3 className="tg-empty-title">No tags yet</h3>
              <p className="tg-empty-sub">
                Create your first tags above to start labelling your posts.
              </p>
            </div>
          ) : (
            <div className="tg-cloud">
              {tags.map((tag, i) => (
                <div
                  className="tg-tag-pill"
                  key={tag.id}
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  <span className="tg-tag-name">{tag.name}</span>
                  <span className="tg-tag-count">{tag.postCount}</span>
                  <button
                    className="tg-tag-del"
                    onClick={() => setDeleteTarget(tag)}
                    title="Delete tag"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete modal */}
        {deleteTarget && (
          <div className="tg-modal-bg" onClick={() => setDeleteTarget(null)}>
            <div className="tg-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="tg-modal-title">Delete "#{deleteTarget.name}"?</h3>
              <p className="tg-modal-sub">
                This will permanently remove the tag.
                {deleteTarget.postCount > 0 && (
                  <> It is currently used by <strong>{deleteTarget.postCount}</strong>{" "}
                  {deleteTarget.postCount === 1 ? "post" : "posts"}.</>
                )}
              </p>
              <div className="tg-modal-actions">
                <button
                  className="tg-modal-cancel"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>
                <button
                  className="tg-modal-confirm"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting…" : "Yes, delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
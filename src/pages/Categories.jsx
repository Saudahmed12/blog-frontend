import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .cat-root {
    min-height: 100vh;
    background: #faf9f7;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Navbar ── */
  .cat-nav {
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

  .cat-nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .cat-nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    cursor: pointer;
  }

  .cat-nav-sep { width: 1px; height: 16px; background: #2a2a2a; }

  .cat-nav-crumb {
    font-size: 0.78rem;
    color: #5a5855;
    font-weight: 300;
  }

  .cat-nav-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .cat-nav-btn {
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
  .cat-nav-btn:hover { border-color: #5a5855; color: #f5f0e8; }

  /* ── Page header ── */
  .cat-header {
    background: #0e0e0e;
    padding: 2.5rem 2.5rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .cat-header::after {
    content: '';
    position: absolute;
    bottom: -50px; right: -50px;
    width: 200px; height: 200px;
    border-radius: 50%;
    border: 40px solid rgba(212,175,100,0.05);
    pointer-events: none;
  }

  .cat-eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }

  .cat-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 700;
    color: #f5f0e8;
    margin-bottom: 0.5rem;
  }

  .cat-subtitle {
    font-size: 0.85rem;
    color: #5a5855;
    font-weight: 300;
  }

  /* ── Body ── */
  .cat-body {
    max-width: 760px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
  }

  /* ── Create form card ── */
  .cat-create-card {
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

  .cat-card-header {
    padding: 0.9rem 1.5rem;
    border-bottom: 1px solid #f0ece6;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .cat-card-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #d4af64;
    flex-shrink: 0;
  }

  .cat-card-label {
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b6860;
    font-weight: 500;
  }

  .cat-card-body {
    padding: 1.25rem 1.5rem;
  }

  .cat-form-row {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .cat-input-wrap {
    flex: 1;
  }

  .cat-input {
    width: 100%;
    padding: 0.7rem 1rem;
    background: #faf9f7;
    border: 1px solid #e2ddd6;
    border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    color: #0e0e0e;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    font-weight: 300;
  }

  .cat-input::placeholder { color: #c5bfb6; }
  .cat-input:focus {
    border-color: #d4af64;
    box-shadow: 0 0 0 3px rgba(212,175,100,0.1);
    background: #fff;
  }
  .cat-input.err { border-color: #c0392b; box-shadow: 0 0 0 3px rgba(192,57,43,0.08); }

  .cat-field-err {
    font-size: 0.72rem;
    color: #c0392b;
    margin-top: 0.35rem;
  }

  .cat-hint {
    font-size: 0.7rem;
    color: #b0aba4;
    margin-top: 0.35rem;
    font-weight: 300;
  }

  .cat-submit-btn {
    padding: 0.7rem 1.25rem;
    background: #0e0e0e;
    border: none;
    border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    color: #f5f0e8;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, transform 0.1s;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
  .cat-submit-btn:hover:not(:disabled) { background: #1e1e1e; }
  .cat-submit-btn:active:not(:disabled) { transform: scale(0.98); }
  .cat-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  .cat-spinner {
    width: 13px; height: 13px;
    border: 2px solid rgba(245,240,232,0.3);
    border-top-color: #f5f0e8;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .cat-api-err {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 7px;
    padding: 0.7rem 1rem;
    font-size: 0.8rem;
    color: #c0392b;
    margin-top: 0.75rem;
  }

  /* ── List section ── */
  .cat-list-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .cat-list-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #0e0e0e;
  }

  .cat-list-count {
    font-size: 0.78rem;
    color: #9e9a92;
    font-weight: 300;
  }

  /* ── Category rows ── */
  .cat-list {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .cat-row {
    background: #fff;
    border: 1px solid #ede9e3;
    border-radius: 10px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    transition: border-color 0.15s;
    animation: fadeUp 0.3s ease both;
  }

  .cat-row:hover { border-color: #d4af64; }

  .cat-row-left {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    min-width: 0;
  }

  .cat-row-icon {
    width: 34px; height: 34px;
    border-radius: 8px;
    background: #f5f0e8;
    border: 1px solid #e8e0d0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 700;
    color: #8a6f2e;
    flex-shrink: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .cat-row-info {
    min-width: 0;
  }

  .cat-row-name {
    font-size: 0.92rem;
    font-weight: 500;
    color: #0e0e0e;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cat-row-meta {
    font-size: 0.72rem;
    color: #9e9a92;
    font-weight: 300;
    margin-top: 0.1rem;
  }

  .cat-row-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
  }

  .cat-post-count {
    font-size: 0.72rem;
    padding: 0.2rem 0.65rem;
    border-radius: 999px;
    background: #f5f3ef;
    color: #6b6860;
    font-weight: 400;
    white-space: nowrap;
  }

  .cat-delete-btn {
    padding: 0.35rem 0.75rem;
    border-radius: 6px;
    background: transparent;
    border: 1px solid #e2ddd6;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    color: #9e9a92;
    cursor: pointer;
    transition: all 0.15s;
    font-weight: 400;
  }
  .cat-delete-btn:hover { border-color: #c0392b; color: #c0392b; background: #fef2f2; }

  /* ── Empty state ── */
  .cat-empty {
    text-align: center;
    padding: 3rem 2rem;
    background: #fff;
    border: 1px dashed #e2ddd6;
    border-radius: 12px;
  }

  .cat-empty-icon {
    width: 44px; height: 44px;
    border-radius: 10px;
    background: #f5f0e8;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
  }

  .cat-empty-title {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: #0e0e0e;
    margin-bottom: 0.4rem;
  }

  .cat-empty-sub {
    font-size: 0.82rem;
    color: #9e9a92;
    font-weight: 300;
  }

  /* ── Skeleton ── */
  .cat-skel {
    background: #fff;
    border: 1px solid #ede9e3;
    border-radius: 10px;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.85rem;
  }

  .cat-skel-icon {
    width: 34px; height: 34px;
    border-radius: 8px;
    background: #f0ece6;
    flex-shrink: 0;
    animation: shimmer 1.4s ease-in-out infinite;
  }

  .cat-skel-lines { flex: 1; }

  .cat-skel-line {
    height: 12px;
    border-radius: 4px;
    background: #f0ece6;
    margin-bottom: 6px;
    animation: shimmer 1.4s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* ── Delete modal ── */
  .cat-modal-bg {
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

  .cat-modal {
    background: #fff;
    border-radius: 12px;
    padding: 1.75rem;
    width: 100%;
    max-width: 380px;
    margin: 1rem;
  }

  .cat-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #0e0e0e;
    margin-bottom: 0.5rem;
  }

  .cat-modal-sub {
    font-size: 0.83rem;
    color: #7a7670;
    font-weight: 300;
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }

  .cat-modal-warn {
    background: #fef9ec;
    border: 1px solid #fde68a;
    border-radius: 7px;
    padding: 0.65rem 0.9rem;
    font-size: 0.78rem;
    color: #92400e;
    margin-bottom: 1.25rem;
    font-weight: 300;
    line-height: 1.5;
  }

  .cat-modal-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  .cat-modal-cancel {
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
  .cat-modal-cancel:hover { border-color: #0e0e0e; color: #0e0e0e; }

  .cat-modal-confirm {
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
  .cat-modal-confirm:hover { background: #a93226; }
  .cat-modal-confirm:disabled { opacity: 0.6; cursor: not-allowed; }

  @media (max-width: 640px) {
    .cat-nav { padding: 0 1.25rem; }
    .cat-header { padding: 2rem 1.25rem 1.75rem; }
    .cat-body { padding: 1.75rem 1.25rem; }
    .cat-form-row { flex-direction: column; }
    .cat-submit-btn { width: 100%; justify-content: center; }
  }
`;

export default function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [nameError, setNameError] = useState("");
  const [apiError, setApiError] = useState("");
  const [creating, setCreating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name, postCount }
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (_) {
      setApiError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const validateName = (val) => {
    if (!val.trim()) return "Category name is required";
    if (val.trim().length < 2) return "Name must be at least 2 characters";
    if (val.trim().length > 50) return "Name must be under 50 characters";
    if (!/^[\w\s-]+$/.test(val.trim())) return "Only letters, numbers, spaces and hyphens allowed";
    return "";
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const err = validateName(newName);
    if (err) { setNameError(err); return; }

    setCreating(true);
    setApiError("");
    try {
      const { data } = await api.post("/categories", { name: newName.trim() });
      setCategories((prev) => [...prev, data]);
      setNewName("");
    } catch (err) {
      setApiError(
        err?.response?.data?.message || "Failed to create category. Please try again."
      );
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/categories/${deleteTarget.id}`);
      setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (_) {
      setApiError("Failed to delete category.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  const getInitials = (name = "") => name.slice(0, 2).toUpperCase();

  return (
    <>
      <style>{styles}</style>
      <div className="cat-root">

        {/* Navbar */}
        <nav className="cat-nav">
          <div className="cat-nav-left">
            <span className="cat-nav-logo" onClick={() => navigate("/posts")}>
              Inkwell
            </span>
            <div className="cat-nav-sep" />
            <span className="cat-nav-crumb">Categories</span>
          </div>
          <div className="cat-nav-right">
            <button className="cat-nav-btn" onClick={() => navigate("/posts")}>
              ← Back to posts
            </button>
          </div>
        </nav>

        {/* Header */}
        <div className="cat-header">
          <p className="cat-eyebrow">Manage</p>
          <h1 className="cat-title">Categories</h1>
          <p className="cat-subtitle">
            Organise your blog posts into categories. Each post can belong to one category.
          </p>
        </div>

        <div className="cat-body">

          {/* Create form */}
          <div className="cat-create-card">
            <div className="cat-card-header">
              <div className="cat-card-dot" />
              <span className="cat-card-label">New category</span>
            </div>
            <div className="cat-card-body">
              <form onSubmit={handleCreate} noValidate>
                <div className="cat-form-row">
                  <div className="cat-input-wrap">
                    <input
                      className={`cat-input${nameError ? " err" : ""}`}
                      type="text"
                      placeholder="e.g. Technology, Lifestyle, Science…"
                      value={newName}
                      onChange={(e) => {
                        setNewName(e.target.value);
                        setNameError("");
                        setApiError("");
                      }}
                      maxLength={50}
                    />
                    {nameError && <p className="cat-field-err">{nameError}</p>}
                    {!nameError && (
                      <p className="cat-hint">
                        Letters, numbers, spaces and hyphens only · 2–50 characters
                      </p>
                    )}
                  </div>
                  <button
                    className="cat-submit-btn"
                    type="submit"
                    disabled={creating}
                  >
                    {creating ? (
                      <><div className="cat-spinner" /> Creating…</>
                    ) : (
                      "Add category"
                    )}
                  </button>
                </div>
                {apiError && <div className="cat-api-err">{apiError}</div>}
              </form>
            </div>
          </div>

          {/* List */}
          <div className="cat-list-header">
            <h2 className="cat-list-title">All categories</h2>
            {!loading && (
              <span className="cat-list-count">
                {categories.length} {categories.length === 1 ? "category" : "categories"}
              </span>
            )}
          </div>

          {loading ? (
            <div className="cat-list">
              {[1, 2, 3].map((i) => (
                <div className="cat-skel" key={i}>
                  <div className="cat-skel-icon" />
                  <div className="cat-skel-lines">
                    <div className="cat-skel-line" style={{ width: "40%" }} />
                    <div className="cat-skel-line" style={{ width: "25%", marginBottom: 0 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="cat-empty">
              <div className="cat-empty-icon">◈</div>
              <h3 className="cat-empty-title">No categories yet</h3>
              <p className="cat-empty-sub">
                Create your first category above to start organising your posts.
              </p>
            </div>
          ) : (
            <div className="cat-list">
              {categories.map((cat, i) => (
                <div
                  className="cat-row"
                  key={cat.id}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className="cat-row-left">
                    <div className="cat-row-icon">{getInitials(cat.name)}</div>
                    <div className="cat-row-info">
                      <div className="cat-row-name">{cat.name}</div>
                      <div className="cat-row-meta">
                        {cat.postCount} {cat.postCount === 1 ? "post" : "posts"}
                      </div>
                    </div>
                  </div>
                  <div className="cat-row-right">
                    <span className="cat-post-count">
                      {cat.postCount} {cat.postCount === 1 ? "post" : "posts"}
                    </span>
                    <button
                      className="cat-delete-btn"
                      onClick={() => setDeleteTarget(cat)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete confirmation modal */}
        {deleteTarget && (
          <div className="cat-modal-bg" onClick={() => setDeleteTarget(null)}>
            <div className="cat-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="cat-modal-title">Delete "{deleteTarget.name}"?</h3>
              <p className="cat-modal-sub">
                This will permanently remove the category from your blog.
              </p>
              {deleteTarget.postCount > 0 && (
                <div className="cat-modal-warn">
                  This category is used by {deleteTarget.postCount}{" "}
                  {deleteTarget.postCount === 1 ? "post" : "posts"}. Deleting it
                  may affect those posts depending on your backend configuration.
                </div>
              )}
              <div className="cat-modal-actions">
                <button
                  className="cat-modal-cancel"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>
                <button
                  className="cat-modal-confirm"
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
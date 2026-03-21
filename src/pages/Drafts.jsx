import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .dr-root {
    min-height: 100vh;
    background: #faf9f7;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Navbar ── */
  .dr-nav {
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

  .dr-nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .dr-nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    cursor: pointer;
  }

  .dr-nav-sep { width: 1px; height: 16px; background: #2a2a2a; }

  .dr-nav-crumb {
    font-size: 0.78rem;
    color: #5a5855;
    font-weight: 300;
  }

  .dr-nav-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .dr-btn {
    padding: 0.4rem 1rem;
    border-radius: 5px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.03em;
  }

  .dr-btn.ghost {
    background: transparent;
    border: 1px solid #3a3a3a;
    color: #9e9a92;
  }
  .dr-btn.ghost:hover { border-color: #5a5855; color: #f5f0e8; }

  .dr-btn.gold {
    background: #d4af64;
    border: 1px solid #d4af64;
    color: #0e0e0e;
  }
  .dr-btn.gold:hover { background: #c49d52; }

  /* ── Hero ── */
  .dr-hero {
    background: #0e0e0e;
    padding: 2.5rem 2.5rem 2rem;
    position: relative;
    overflow: hidden;
  }

  .dr-hero::before {
    content: '';
    position: absolute;
    top: -60px; right: 5%;
    width: 220px; height: 220px;
    border-radius: 50%;
    border: 45px solid rgba(212,175,100,0.05);
    pointer-events: none;
  }

  .dr-hero::after {
    content: '';
    position: absolute;
    bottom: -40px; right: -40px;
    width: 160px; height: 160px;
    border-radius: 50%;
    border: 30px solid rgba(212,175,100,0.04);
    pointer-events: none;
  }

  .dr-hero-eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }

  .dr-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 700;
    color: #f5f0e8;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }

  .dr-hero-title em {
    font-style: italic;
    color: #d4af64;
  }

  .dr-hero-sub {
    font-size: 0.85rem;
    color: #5a5855;
    font-weight: 300;
    max-width: 460px;
    line-height: 1.6;
  }

  /* ── Main ── */
  .dr-main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2.5rem 2.5rem;
  }

  .dr-section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #ede9e3;
  }

  .dr-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #0e0e0e;
  }

  .dr-count {
    font-size: 0.78rem;
    color: #9e9a92;
    font-weight: 300;
  }

  /* ── Grid ── */
  .dr-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.25rem;
  }

  /* ── Draft card ── */
  .dr-card {
    background: #fff;
    border: 1px solid #ede9e3;
    border-radius: 10px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    animation: cardIn 0.4s ease both;
    transition: border-color 0.2s, transform 0.2s;
    position: relative;
  }

  .dr-card:hover { border-color: #c5bfb6; transform: translateY(-2px); }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .dr-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.85rem;
  }

  .dr-card-badges {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .dr-draft-badge {
    font-size: 0.62rem;
    padding: 0.18rem 0.6rem;
    border-radius: 999px;
    background: #f5f3ef;
    color: #9e9a92;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    border: 1px solid #e8e4de;
  }

  .dr-cat-badge {
    font-size: 0.62rem;
    padding: 0.18rem 0.6rem;
    border-radius: 999px;
    background: #f5f0e8;
    color: #8a6f2e;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .dr-card-date {
    font-size: 0.68rem;
    color: #b0aba4;
    font-weight: 300;
  }

  .dr-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #0e0e0e;
    line-height: 1.35;
    margin-bottom: 0.6rem;
    cursor: pointer;
    transition: color 0.15s;
  }
  .dr-card-title:hover { color: #5a5855; }

  .dr-card-excerpt {
    font-size: 0.82rem;
    color: #7a7670;
    line-height: 1.7;
    font-weight: 300;
    flex: 1;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .dr-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
    margin-bottom: 1rem;
  }

  .dr-tag {
    font-size: 0.65rem;
    padding: 0.12rem 0.45rem;
    border-radius: 3px;
    background: #f5f3ef;
    color: #9e9a92;
  }

  .dr-card-footer {
    padding-top: 0.85rem;
    border-top: 1px solid #f0ece6;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .dr-action-btn {
    flex: 1;
    padding: 0.45rem 0;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    text-align: center;
    border: 1px solid #e2ddd6;
    background: transparent;
    color: #6b6860;
  }
  .dr-action-btn:hover { border-color: #0e0e0e; color: #0e0e0e; }

  .dr-action-btn.publish {
    background: #0e0e0e;
    border-color: #0e0e0e;
    color: #f5f0e8;
  }
  .dr-action-btn.publish:hover { background: #1e1e1e; }

  .dr-action-btn.danger:hover { border-color: #c0392b; color: #c0392b; }

  /* ── Reading time chip ── */
  .dr-reading-time {
    font-size: 0.68rem;
    color: #b0aba4;
    font-weight: 300;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    margin-left: auto;
  }

  /* ── Empty state ── */
  .dr-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 5rem 2rem;
  }

  .dr-empty-icon {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    color: #e2ddd6;
    margin-bottom: 1.25rem;
    line-height: 1;
  }

  .dr-empty-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem;
    color: #0e0e0e;
    margin-bottom: 0.5rem;
  }

  .dr-empty-sub {
    font-size: 0.85rem;
    color: #9e9a92;
    font-weight: 300;
    margin-bottom: 1.75rem;
    line-height: 1.6;
  }

  .dr-empty-btn {
    padding: 0.7rem 1.5rem;
    background: #0e0e0e;
    color: #f5f0e8;
    border: none;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
  }
  .dr-empty-btn:hover { background: #1e1e1e; }

  /* ── Loading skeleton ── */
  .dr-skeleton {
    background: #fff;
    border: 1px solid #ede9e3;
    border-radius: 10px;
    padding: 1.5rem;
  }

  .dr-skel-line {
    background: #f0ece6;
    border-radius: 4px;
    margin-bottom: 0.65rem;
    animation: shimmer 1.4s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* ── Error ── */
  .dr-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 1rem 1.25rem;
    font-size: 0.85rem;
    color: #c0392b;
    margin-bottom: 1.5rem;
    grid-column: 1 / -1;
  }

  /* ── Delete modal ── */
  .dr-modal-bg {
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

  .dr-modal {
    background: #fff;
    border-radius: 12px;
    padding: 1.75rem;
    width: 100%;
    max-width: 380px;
    margin: 1rem;
  }

  .dr-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #0e0e0e;
    margin-bottom: 0.5rem;
  }

  .dr-modal-sub {
    font-size: 0.83rem;
    color: #7a7670;
    font-weight: 300;
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }

  .dr-modal-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  .dr-modal-cancel {
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
  .dr-modal-cancel:hover { border-color: #0e0e0e; color: #0e0e0e; }

  .dr-modal-confirm {
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
  .dr-modal-confirm:hover { background: #a93226; }
  .dr-modal-confirm:disabled { opacity: 0.6; cursor: not-allowed; }

  @media (max-width: 640px) {
    .dr-nav { padding: 0 1.25rem; }
    .dr-hero { padding: 2rem 1.25rem 1.75rem; }
    .dr-main { padding: 1.75rem 1.25rem; }
    .dr-grid { grid-template-columns: 1fr; }
  }
`;

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function SkeletonCard() {
  return (
    <div className="dr-skeleton">
      <div className="dr-skel-line" style={{ width: "30%", height: "12px" }} />
      <div className="dr-skel-line" style={{ width: "80%", height: "18px" }} />
      <div className="dr-skel-line" style={{ width: "100%", height: "12px" }} />
      <div className="dr-skel-line" style={{ width: "90%", height: "12px" }} />
      <div className="dr-skel-line" style={{ width: "55%", height: "12px" }} />
    </div>
  );
}

export default function Drafts() {
  const navigate = useNavigate();

  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [publishing, setPublishing] = useState(null); // postId being published

  // Redirect if not logged in
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/posts/drafts");
      setDrafts(data);
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login");
      } else {
        setError("Failed to load drafts. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/posts/${deleteTarget}`);
      setDrafts((prev) => prev.filter((d) => d.id !== deleteTarget));
      setDeleteTarget(null);
    } catch (_) {
      setError("Failed to delete draft.");
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  // Publish a draft — updates status to PUBLISHED via PUT
  const handlePublish = async (draft) => {
    setPublishing(draft.id);
    try {
      await api.put(`/posts/${draft.id}`, {
        id: draft.id,
        title: draft.title,
        content: draft.content,
        categoryId: draft.category?.id,
        tagIds: draft.tags?.map((t) => t.id) || [],
        status: "PUBLISHED",
      });
      setDrafts((prev) => prev.filter((d) => d.id !== draft.id));
    } catch (_) {
      setError("Failed to publish draft. Please try again.");
    } finally {
      setPublishing(null);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="dr-root">

        {/* Navbar */}
        <nav className="dr-nav">
          <div className="dr-nav-left">
            <span className="dr-nav-logo" onClick={() => navigate("/posts")}>
              Inkwell
            </span>
            <div className="dr-nav-sep" />
            <span className="dr-nav-crumb">My drafts</span>
          </div>
          <div className="dr-nav-right">
            <button
              className="dr-btn ghost"
              onClick={() => navigate("/posts")}
            >
              ← All posts
            </button>
            <button
              className="dr-btn gold"
              onClick={() => navigate("/posts/new")}
            >
              + New post
            </button>
          </div>
        </nav>

        {/* Hero */}
        <div className="dr-hero">
          <p className="dr-hero-eyebrow">Private</p>
          <h1 className="dr-hero-title">
            My <em>drafts</em>
          </h1>
          <p className="dr-hero-sub">
            Posts saved as drafts are only visible to you. Edit and publish them whenever they're ready.
          </p>
        </div>

        {/* Main */}
        <div className="dr-main">
          <div className="dr-section-header">
            <h2 className="dr-section-title">Unpublished drafts</h2>
            {!loading && (
              <span className="dr-count">
                {drafts.length} {drafts.length === 1 ? "draft" : "drafts"}
              </span>
            )}
          </div>

          <div className="dr-grid">
            {loading ? (
              [1, 2, 3].map((i) => <SkeletonCard key={i} />)
            ) : error ? (
              <div className="dr-error">{error}</div>
            ) : drafts.length === 0 ? (
              <div className="dr-empty">
                <div className="dr-empty-icon">✦</div>
                <h3 className="dr-empty-title">No drafts yet</h3>
                <p className="dr-empty-sub">
                  When you save a post as a draft it will appear here.<br />
                  Only you can see your drafts.
                </p>
                <button
                  className="dr-empty-btn"
                  onClick={() => navigate("/posts/new")}
                >
                  Start writing
                </button>
              </div>
            ) : (
              drafts.map((draft, i) => (
                <div
                  className="dr-card"
                  key={draft.id}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="dr-card-top">
                    <div className="dr-card-badges">
                      <span className="dr-draft-badge">Draft</span>
                      {draft.category && (
                        <span className="dr-cat-badge">{draft.category.name}</span>
                      )}
                    </div>
                    <span className="dr-card-date">{formatDate(draft.updatedAt || draft.createdAt)}</span>
                  </div>

                  <h3
                    className="dr-card-title"
                    onClick={() => navigate(`/posts/${draft.id}/edit`)}
                  >
                    {draft.title}
                  </h3>

                  <p className="dr-card-excerpt">{draft.content}</p>

                  {draft.tags?.length > 0 && (
                    <div className="dr-card-tags">
                      {draft.tags.slice(0, 4).map((tag) => (
                        <span key={tag.id} className="dr-tag">#{tag.name}</span>
                      ))}
                      {draft.tags.length > 4 && (
                        <span className="dr-tag">+{draft.tags.length - 4}</span>
                      )}
                    </div>
                  )}

                  <div className="dr-card-footer">
                    <button
                      className="dr-action-btn danger"
                      onClick={() => setDeleteTarget(draft.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="dr-action-btn"
                      onClick={() => navigate(`/posts/${draft.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      className="dr-action-btn publish"
                      onClick={() => handlePublish(draft)}
                      disabled={publishing === draft.id}
                    >
                      {publishing === draft.id ? "Publishing…" : "Publish"}
                    </button>
                    <span className="dr-reading-time">
                      {draft.readingTime} min
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Delete modal */}
        {deleteTarget && (
          <div className="dr-modal-bg" onClick={() => setDeleteTarget(null)}>
            <div className="dr-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="dr-modal-title">Delete this draft?</h3>
              <p className="dr-modal-sub">
                This draft will be permanently deleted. This action cannot be undone.
              </p>
              <div className="dr-modal-actions">
                <button
                  className="dr-modal-cancel"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>
                <button
                  className="dr-modal-confirm"
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
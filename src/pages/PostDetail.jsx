import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pd-root {
    min-height: 100vh;
    background: #faf9f7;
    font-family: 'DM Sans', sans-serif;
  }

  .pd-nav {
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

  .pd-nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .pd-nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    cursor: pointer;
  }

  .pd-nav-sep { width: 1px; height: 16px; background: #2a2a2a; }

  .pd-back {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    color: #5a5855;
    cursor: pointer;
    font-weight: 300;
    background: none;
    border: none;
    transition: color 0.15s;
    font-family: 'DM Sans', sans-serif;
  }
  .pd-back:hover { color: #9e9a92; }

  .pd-nav-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .pd-btn {
    padding: 0.4rem 1rem;
    border-radius: 5px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.03em;
  }
  .pd-btn.ghost {
    background: transparent;
    border: 1px solid #3a3a3a;
    color: #9e9a92;
  }
  .pd-btn.ghost:hover { border-color: #5a5855; color: #f5f0e8; }
  .pd-btn.gold {
    background: #d4af64;
    border: 1px solid #d4af64;
    color: #0e0e0e;
  }
  .pd-btn.gold:hover { background: #c49d52; }
  .pd-btn.danger {
    background: transparent;
    border: 1px solid #3a3a3a;
    color: #9e6060;
  }
  .pd-btn.danger:hover { border-color: #c0392b; color: #c0392b; }

  .pd-hero {
    background: #0e0e0e;
    padding: 3rem 2.5rem 2.5rem;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pd-hero::after {
    content: '';
    position: absolute;
    bottom: -50px; right: -50px;
    width: 200px; height: 200px;
    border-radius: 50%;
    border: 40px solid rgba(212,175,100,0.05);
    pointer-events: none;
  }

  .pd-hero-meta {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.25rem;
    flex-wrap: wrap;
  }

  .pd-cat-badge {
    font-size: 0.68rem;
    padding: 0.22rem 0.65rem;
    border-radius: 999px;
    background: rgba(212,175,100,0.15);
    color: #d4af64;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .pd-draft-badge {
    font-size: 0.68rem;
    padding: 0.22rem 0.65rem;
    border-radius: 999px;
    background: rgba(255,255,255,0.08);
    color: #5a5855;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .pd-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    color: #f5f0e8;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    max-width: 700px;
  }

  .pd-hero-byline {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    flex-wrap: wrap;
  }

  .pd-author {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .pd-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: rgba(212,175,100,0.15);
    border: 1px solid rgba(212,175,100,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.68rem;
    font-weight: 500;
    color: #d4af64;
    flex-shrink: 0;
  }

  .pd-author-name {
    font-size: 0.85rem;
    color: #f5f0e8;
    font-weight: 400;
  }

  .pd-byline-sep {
    width: 3px; height: 3px;
    border-radius: 50%;
    background: #3a3a3a;
  }

  .pd-byline-detail {
    font-size: 0.78rem;
    color: #5a5855;
    font-weight: 300;
  }

  .pd-author-bar {
    background: #fff;
    border-bottom: 1px solid #ede9e3;
    padding: 0.85rem 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: fadeUp 0.4s ease 0.1s both;
  }

  .pd-author-bar-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.78rem;
    color: #9e9a92;
    font-weight: 300;
  }

  .pd-author-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #d4af64;
  }

  .pd-author-bar-right {
    display: flex;
    gap: 0.6rem;
  }

  .pd-content-wrap {
    max-width: 720px;
    margin: 0 auto;
    padding: 3rem 2rem;
    animation: fadeUp 0.5s ease 0.15s both;
  }

  .pd-content {
    font-size: 1.05rem;
    line-height: 1.9;
    color: #2a2a2a;
    font-weight: 300;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .pd-tags-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid #ede9e3;
  }

  .pd-tags-label {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #b0aba4;
    font-weight: 500;
    margin-bottom: 0.75rem;
  }

  .pd-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .pd-tag {
    padding: 0.3rem 0.85rem;
    border-radius: 5px;
    background: #f5f3ef;
    border: 1px solid #e8e4de;
    font-size: 0.78rem;
    color: #6b6860;
    font-weight: 400;
  }

  .pd-footer {
    max-width: 720px;
    margin: 0 auto;
    padding: 0 2rem 3rem;
    animation: fadeUp 0.5s ease 0.2s both;
  }

  .pd-footer-card {
    background: #0e0e0e;
    border-radius: 10px;
    padding: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  .pd-footer-eyebrow {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    margin-bottom: 0.4rem;
  }

  .pd-footer-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    color: #f5f0e8;
    font-weight: 700;
  }

  .pd-footer-btn {
    padding: 0.6rem 1.25rem;
    background: #d4af64;
    border: none;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    color: #0e0e0e;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s;
    flex-shrink: 0;
  }
  .pd-footer-btn:hover { background: #c49d52; }

  .pd-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    gap: 1rem;
    color: #9e9a92;
    font-size: 0.88rem;
    font-weight: 300;
  }

  .pd-load-spin {
    width: 24px; height: 24px;
    border: 2px solid #e2ddd6;
    border-top-color: #d4af64;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .pd-error {
    max-width: 480px;
    margin: 4rem auto;
    text-align: center;
    padding: 0 2rem;
  }

  .pd-error-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    color: #0e0e0e;
    margin-bottom: 0.5rem;
  }

  .pd-error-sub {
    font-size: 0.85rem;
    color: #9e9a92;
    font-weight: 300;
    margin-bottom: 1.5rem;
  }

  .pd-modal-bg {
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

  .pd-modal {
    background: #fff;
    border-radius: 12px;
    padding: 1.75rem;
    width: 100%;
    max-width: 380px;
    margin: 1rem;
  }

  .pd-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 700;
    color: #0e0e0e;
    margin-bottom: 0.5rem;
  }

  .pd-modal-sub {
    font-size: 0.83rem;
    color: #7a7670;
    font-weight: 300;
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }

  .pd-modal-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  .pd-modal-cancel {
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
  .pd-modal-cancel:hover { border-color: #0e0e0e; color: #0e0e0e; }

  .pd-modal-confirm {
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
  .pd-modal-confirm:hover { background: #a93226; }
  .pd-modal-confirm:disabled { opacity: 0.6; cursor: not-allowed; }

  @media (max-width: 640px) {
    .pd-nav { padding: 0 1.25rem; }
    .pd-hero { padding: 2rem 1.25rem 1.75rem; }
    .pd-author-bar { padding: 0.75rem 1.25rem; }
    .pd-content-wrap { padding: 2rem 1.25rem; }
    .pd-footer { padding: 0 1.25rem 2rem; }
    .pd-footer-card { flex-direction: column; gap: 1rem; }
  }
`;

function getInitials(name = "") {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

function getCurrentUserId() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded.userId || null;
  } catch (_) {
    return null;
  }
}

export default function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const token = localStorage.getItem("token");
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await api.get(`/posts/${postId}`);
        setPost(data);
      } catch (err) {
        setError(
          err?.response?.status === 404
            ? "Post not found."
            : "Failed to load post. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/posts/${postId}`);
      navigate("/posts");
    } catch (_) {
      setError("Failed to delete post.");
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Single declaration — post is loaded by this point in the render
  const isAuthor = Boolean(post && currentUserId && post.author?.id === currentUserId);

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="pd-root">
          <nav className="pd-nav">
            <span className="pd-nav-logo" onClick={() => navigate("/posts")}>Inkwell</span>
          </nav>
          <div className="pd-loading">
            <div className="pd-load-spin" />
            <span>Loading post…</span>
          </div>
        </div>
      </>
    );
  }

  if (error && !post) {
    return (
      <>
        <style>{styles}</style>
        <div className="pd-root">
          <nav className="pd-nav">
            <span className="pd-nav-logo" onClick={() => navigate("/posts")}>Inkwell</span>
          </nav>
          <div className="pd-error">
            <h2 className="pd-error-title">Oops.</h2>
            <p className="pd-error-sub">{error}</p>
            <button className="pd-btn gold" onClick={() => navigate("/posts")}>
              Back to posts
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="pd-root">

        <nav className="pd-nav">
          <div className="pd-nav-left">
            <span className="pd-nav-logo" onClick={() => navigate("/posts")}>
              Inkwell
            </span>
            <div className="pd-nav-sep" />
            <button className="pd-back" onClick={() => navigate("/posts")}>
              ← All posts
            </button>
          </div>
          <div className="pd-nav-right">
            {isAuthor && (
              <>
                <button
                  className="pd-btn danger"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </button>
                <button
                  className="pd-btn gold"
                  onClick={() => navigate(`/posts/${postId}/edit`)}
                >
                  Edit post
                </button>
              </>
            )}
            {!token && (
              <button className="pd-btn ghost" onClick={() => navigate("/login")}>
                Sign in
              </button>
            )}
          </div>
        </nav>

        {isAuthor && (
          <div className="pd-author-bar">
            <div className="pd-author-bar-left">
              <div className="pd-author-dot" />
              <span>This is your post</span>
            </div>
            <div className="pd-author-bar-right">
              <button
                className="pd-btn danger"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
              <button
                className="pd-btn gold"
                onClick={() => navigate(`/posts/${postId}/edit`)}
              >
                Edit post
              </button>
            </div>
          </div>
        )}

        <div className="pd-hero">
          <div className="pd-hero-meta">
            {post.category && (
              <span className="pd-cat-badge">{post.category.name}</span>
            )}
            {post.status === "DRAFT" && (
              <span className="pd-draft-badge">Draft</span>
            )}
          </div>
          <h1 className="pd-hero-title">{post.title}</h1>
          <div className="pd-hero-byline">
            <div className="pd-author">
              <div className="pd-avatar">{getInitials(post.author?.name)}</div>
              <span className="pd-author-name">{post.author?.name}</span>
            </div>
            <div className="pd-byline-sep" />
            <span className="pd-byline-detail">{formatDate(post.createdAt)}</span>
            <div className="pd-byline-sep" />
            <span className="pd-byline-detail">{post.readingTime} min read</span>
          </div>
        </div>

        <div className="pd-content-wrap">
          <div className="pd-content">{post.content}</div>
          {post.tags?.length > 0 && (
            <div className="pd-tags-section">
              <p className="pd-tags-label">Tagged under</p>
              <div className="pd-tags">
                {post.tags.map((tag) => (
                  <span key={tag.id} className="pd-tag">#{tag.name}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pd-footer">
          <div className="pd-footer-card">
            <div>
              <p className="pd-footer-eyebrow">Keep reading</p>
              <p className="pd-footer-title">Discover more from the journal</p>
            </div>
            <button className="pd-footer-btn" onClick={() => navigate("/posts")}>
              Browse all posts
            </button>
          </div>
        </div>

        {showDeleteModal && (
          <div className="pd-modal-bg" onClick={() => setShowDeleteModal(false)}>
            <div className="pd-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="pd-modal-title">Delete this post?</h3>
              <p className="pd-modal-sub">
                This action cannot be undone. The post will be permanently removed.
              </p>
              <div className="pd-modal-actions">
                <button
                  className="pd-modal-cancel"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="pd-modal-confirm"
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
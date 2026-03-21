import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pl-root {
    min-height: 100vh;
    background: #faf9f7;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Navbar ── */
  .pl-nav {
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

  .pl-nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    text-decoration: none;
  }

  .pl-nav-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .pl-nav-btn {
    padding: 0.4rem 1rem;
    border-radius: 5px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.03em;
    text-decoration: none;
  }

  .pl-nav-btn.outline {
    background: transparent;
    border: 1px solid #3a3a3a;
    color: #9e9a92;
  }
  .pl-nav-btn.outline:hover { border-color: #d4af64; color: #d4af64; }

  .pl-nav-btn.primary {
    background: #d4af64;
    border: 1px solid #d4af64;
    color: #0e0e0e;
  }
  .pl-nav-btn.primary:hover { background: #c49d52; border-color: #c49d52; }

  .pl-nav-user {
    font-size: 0.78rem;
    color: #5a5855;
    font-weight: 300;
  }

  /* ── Hero header ── */
  .pl-hero {
    background: #0e0e0e;
    padding: 3rem 2.5rem 2.5rem;
    position: relative;
    overflow: hidden;
  }

  .pl-hero::after {
    content: '';
    position: absolute;
    bottom: -60px; right: -60px;
    width: 240px; height: 240px;
    border-radius: 50%;
    border: 50px solid rgba(212,175,100,0.05);
    pointer-events: none;
  }

  .pl-hero-eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #d4af64;
    margin-bottom: 0.75rem;
    font-weight: 400;
  }

  .pl-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    color: #f5f0e8;
    line-height: 1.15;
    margin-bottom: 0.75rem;
  }

  .pl-hero-title em {
    font-style: italic;
    color: #d4af64;
  }

  .pl-hero-sub {
    font-size: 0.88rem;
    color: #5a5855;
    font-weight: 300;
    max-width: 460px;
    line-height: 1.7;
  }

  /* ── Filters ── */
  .pl-filters {
    padding: 1.25rem 2.5rem;
    background: #fff;
    border-bottom: 1px solid #ede9e3;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .pl-filter-label {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #9e9a92;
    font-weight: 500;
    margin-right: 0.25rem;
  }

  .pl-filter-chip {
    padding: 0.35rem 0.85rem;
    border-radius: 999px;
    border: 1px solid #e2ddd6;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    color: #6b6860;
    cursor: pointer;
    transition: all 0.15s;
    font-weight: 400;
  }

  .pl-filter-chip:hover { border-color: #d4af64; color: #0e0e0e; }
  .pl-filter-chip.active { background: #0e0e0e; border-color: #0e0e0e; color: #f5f0e8; }

  .pl-filter-sep {
    width: 1px;
    height: 16px;
    background: #e2ddd6;
    margin: 0 0.25rem;
  }

  /* ── Main content ── */
  .pl-main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2.5rem 2.5rem;
  }

  .pl-section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .pl-section-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #0e0e0e;
  }

  .pl-count {
    font-size: 0.78rem;
    color: #9e9a92;
    font-weight: 300;
  }

  /* ── Post grid ── */
  .pl-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.25rem;
  }

  .pl-card {
    background: #fff;
    border: 1px solid #ede9e3;
    border-radius: 10px;
    padding: 1.5rem;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s;
    display: flex;
    flex-direction: column;
    animation: cardIn 0.4s ease both;
    text-decoration: none;
  }

  .pl-card:hover {
    border-color: #d4af64;
    transform: translateY(-2px);
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pl-card-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.85rem;
    flex-wrap: wrap;
  }

  .pl-cat-badge {
    font-size: 0.68rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: #f5f0e8;
    color: #8a6f2e;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .pl-draft-badge {
    font-size: 0.68rem;
    padding: 0.2rem 0.6rem;
    border-radius: 999px;
    background: #f1efeb;
    color: #9e9a92;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .pl-card-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #0e0e0e;
    line-height: 1.3;
    margin-bottom: 0.6rem;
  }

  .pl-card-excerpt {
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

  .pl-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.85rem;
    border-top: 1px solid #f0ece6;
  }

  .pl-card-author {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .pl-avatar {
    width: 24px; height: 24px;
    border-radius: 50%;
    background: #f5f0e8;
    border: 1px solid #e2ddd6;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    font-weight: 500;
    color: #8a6f2e;
    flex-shrink: 0;
  }

  .pl-author-name {
    font-size: 0.75rem;
    color: #6b6860;
    font-weight: 400;
  }

  .pl-card-time {
    font-size: 0.72rem;
    color: #b0aba4;
    font-weight: 300;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .pl-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 0.85rem;
  }

  .pl-tag {
    font-size: 0.65rem;
    padding: 0.15rem 0.5rem;
    border-radius: 3px;
    background: #f5f3ef;
    color: #9e9a92;
    font-weight: 400;
  }

  /* ── Card actions (for author) ── */
  .pl-card-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid #f0ece6;
  }

  .pl-action-btn {
    flex: 1;
    padding: 0.4rem 0;
    border-radius: 5px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    border: 1px solid #e2ddd6;
    background: transparent;
    color: #6b6860;
    text-align: center;
  }

  .pl-action-btn:hover { border-color: #0e0e0e; color: #0e0e0e; }
  .pl-action-btn.danger:hover { border-color: #c0392b; color: #c0392b; }

  /* ── Empty state ── */
  .pl-empty {
    text-align: center;
    padding: 4rem 2rem;
    grid-column: 1 / -1;
  }

  .pl-empty-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    opacity: 0.3;
  }

  .pl-empty-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    color: #0e0e0e;
    margin-bottom: 0.5rem;
  }

  .pl-empty-sub {
    font-size: 0.85rem;
    color: #9e9a92;
    font-weight: 300;
    margin-bottom: 1.5rem;
  }

  .pl-empty-btn {
    display: inline-block;
    padding: 0.65rem 1.5rem;
    background: #0e0e0e;
    color: #f5f0e8;
    border-radius: 6px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    border: none;
    text-decoration: none;
    transition: background 0.15s;
  }
  .pl-empty-btn:hover { background: #1e1e1e; }

  /* ── Loading skeleton ── */
  .pl-skeleton {
    background: #fff;
    border: 1px solid #ede9e3;
    border-radius: 10px;
    padding: 1.5rem;
  }

  .pl-skel-line {
    background: #f0ece6;
    border-radius: 4px;
    margin-bottom: 0.6rem;
    animation: shimmer 1.4s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  /* ── Error state ── */
  .pl-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    font-size: 0.85rem;
    color: #c0392b;
    margin-bottom: 1.5rem;
  }

  /* ── Confirm modal ── */
  .pl-modal-bg {
    position: fixed;
    inset: 0;
    background: rgba(14,14,14,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    animation: fadeIn 0.15s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .pl-modal {
    background: #fff;
    border-radius: 10px;
    padding: 1.75rem;
    width: 100%;
    max-width: 380px;
    margin: 1rem;
  }

  .pl-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #0e0e0e;
    margin-bottom: 0.5rem;
  }

  .pl-modal-sub {
    font-size: 0.83rem;
    color: #7a7670;
    font-weight: 300;
    line-height: 1.6;
    margin-bottom: 1.25rem;
  }

  .pl-modal-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }

  .pl-modal-cancel {
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
  .pl-modal-cancel:hover { border-color: #0e0e0e; color: #0e0e0e; }

  .pl-modal-confirm {
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
  .pl-modal-confirm:hover { background: #a93226; }
  .pl-modal-confirm:disabled { opacity: 0.6; cursor: not-allowed; }

  @media (max-width: 640px) {
    .pl-nav { padding: 0 1.25rem; }
    .pl-hero { padding: 2rem 1.25rem 1.75rem; }
    .pl-filters { padding: 1rem 1.25rem; }
    .pl-main { padding: 1.75rem 1.25rem; }
    .pl-grid { grid-template-columns: 1fr; }
  }
`;

function SkeletonCard() {
  return (
    <div className="pl-skeleton">
      <div className="pl-skel-line" style={{ width: "40%", height: "14px" }} />
      <div className="pl-skel-line" style={{ width: "85%", height: "18px" }} />
      <div className="pl-skel-line" style={{ width: "100%", height: "12px" }} />
      <div className="pl-skel-line" style={{ width: "90%", height: "12px" }} />
      <div className="pl-skel-line" style={{ width: "60%", height: "12px" }} />
    </div>
  );
}

function getInitials(name = "") {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

export default function PostList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCat, setActiveCat] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Decode logged-in user from token
  const token = localStorage.getItem("token");
  let currentUserId = null;
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      currentUserId = decoded.userId; // now a UUID, matches post.author.id
    } catch (_) { }
  }


  const fetchPosts = async (categoryId = null) => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (categoryId) params.categoryId = categoryId;
      const { data } = await api.get("/posts", { params });
      setPosts(data);
    } catch (err) {
      setError("Failed to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (_) { }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const handleCategoryFilter = (catId) => {
    const next = activeCat === catId ? null : catId;
    setActiveCat(next);
    fetchPosts(next);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/posts/${deleteTarget}`);
      setPosts((prev) => prev.filter((p) => p.id !== deleteTarget));
      setDeleteTarget(null);
    } catch (_) {
      setError("Failed to delete post.");
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <style>{styles}</style>
      <div className="pl-root">

        {/* Navbar */}
        <nav className="pl-nav">
          <span className="pl-nav-logo">Inkwell</span>
          <div className="pl-nav-right">
            {token ? (
              <>
                <button
                  className="pl-nav-btn primary"
                  onClick={() => navigate("/posts/new")}
                >
                  + New post
                </button>
                <button className="pl-nav-btn outline" onClick={() => navigate("/drafts")}>
                  My drafts
                </button>
                <button className="pl-nav-btn outline"
                  onClick={() => navigate("/categories")}>
                  Categories
                </button>
                <button className="pl-nav-btn outline" onClick={() => navigate("/tags")}>
                  Tags
                </button>
                <button
                  className="pl-nav-btn outline"
                  onClick={handleLogout}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="pl-nav-btn outline">Sign in</a>
                <a href="/register" className="pl-nav-btn primary">Join</a>
              </>
            )}
          </div>
        </nav>

        {/* Hero */}
        <div className="pl-hero">
          <p className="pl-hero-eyebrow">The Inkwell journal</p>
          <h1 className="pl-hero-title">
            Ideas worth <em>reading.</em>
          </h1>
          <p className="pl-hero-sub">
            Discover thoughtful writing from our community. Filter by category or browse everything below.
          </p>
        </div>

        {/* Category filters */}
        {categories.length > 0 && (
          <div className="pl-filters">
            <span className="pl-filter-label">Filter</span>
            <button
              className={`pl-filter-chip${!activeCat ? " active" : ""}`}
              onClick={() => handleCategoryFilter(null)}
            >
              All
            </button>
            <div className="pl-filter-sep" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`pl-filter-chip${activeCat === cat.id ? " active" : ""}`}
                onClick={() => handleCategoryFilter(cat.id)}
              >
                {cat.name}
                <span style={{ marginLeft: "0.3rem", opacity: 0.5, fontSize: "0.65rem" }}>
                  {cat.postCount}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Posts */}
        <div className="pl-main">
          <div className="pl-section-header">
            <h2 className="pl-section-title">
              {activeCat
                ? categories.find((c) => c.id === activeCat)?.name
                : "All posts"}
            </h2>
            {!loading && (
              <span className="pl-count">{posts.length} {posts.length === 1 ? "post" : "posts"}</span>
            )}
          </div>

          {error && <div className="pl-error">{error}</div>}

          <div className="pl-grid">
            {loading ? (
              [1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonCard key={i} />
              ))
            ) : posts.length === 0 ? (
              <div className="pl-empty">
                <div className="pl-empty-icon">✦</div>
                <h3 className="pl-empty-title">No posts yet</h3>
                <p className="pl-empty-sub">
                  {activeCat
                    ? "No posts in this category. Try another filter."
                    : "Be the first to write something."}
                </p>
                {token && (
                  <button
                    className="pl-empty-btn"
                    onClick={() => navigate("/posts/new")}
                  >
                    Write the first post
                  </button>
                )}
              </div>
            ) : (
              posts.map((post, i) => {
                const isAuthor = currentUserId && post.author?.id === currentUserId;
                return (
                  <div
                    key={post.id}
                    className="pl-card"
                    style={{ animationDelay: `${i * 0.05}s` }}
                    onClick={() => navigate(`/posts/${post.id}`)}
                  >
                    <div className="pl-card-meta">
                      {post.category && (
                        <span className="pl-cat-badge">{post.category.name}</span>
                      )}
                      {post.status === "DRAFT" && (
                        <span className="pl-draft-badge">Draft</span>
                      )}
                    </div>

                    <h3 className="pl-card-title">{post.title}</h3>
                    <p className="pl-card-excerpt">{post.content}</p>

                    {post.tags?.length > 0 && (
                      <div className="pl-tags">
                        {post.tags.slice(0, 4).map((tag) => (
                          <span key={tag.id} className="pl-tag">#{tag.name}</span>
                        ))}
                        {post.tags.length > 4 && (
                          <span className="pl-tag">+{post.tags.length - 4}</span>
                        )}
                      </div>
                    )}

                    <div className="pl-card-footer">
                      <div className="pl-card-author">
                        <div className="pl-avatar">
                          {getInitials(post.author?.name)}
                        </div>
                        <span className="pl-author-name">{post.author?.name}</span>
                      </div>
                      <div className="pl-card-time">
                        <span>{post.readingTime} min</span>
                        <span>·</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>

                    {isAuthor && (
                      <div
                        className="pl-card-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="pl-action-btn"
                          onClick={() => navigate(`/posts/${post.id}/edit`)}
                        >
                          Edit
                        </button>
                        <button
                          className="pl-action-btn danger"
                          onClick={() => setDeleteTarget(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Delete confirmation modal */}
        {deleteTarget && (
          <div className="pl-modal-bg" onClick={() => setDeleteTarget(null)}>
            <div className="pl-modal" onClick={(e) => e.stopPropagation()}>
              <h3 className="pl-modal-title">Delete this post?</h3>
              <p className="pl-modal-sub">
                This action cannot be undone. The post will be permanently removed.
              </p>
              <div className="pl-modal-actions">
                <button
                  className="pl-modal-cancel"
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </button>
                <button
                  className="pl-modal-confirm"
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
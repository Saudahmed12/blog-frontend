import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pf-root {
    min-height: 100vh;
    background: #faf9f7;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Navbar ── */
  .pf-nav {
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

  .pf-nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .pf-nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    text-decoration: none;
  }

  .pf-nav-sep {
    width: 1px;
    height: 16px;
    background: #2a2a2a;
  }

  .pf-nav-crumb {
    font-size: 0.78rem;
    color: #5a5855;
    font-weight: 300;
  }

  .pf-nav-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .pf-btn {
    padding: 0.4rem 1rem;
    border-radius: 5px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.03em;
  }

  .pf-btn.ghost {
    background: transparent;
    border: 1px solid #3a3a3a;
    color: #9e9a92;
  }
  .pf-btn.ghost:hover { border-color: #5a5855; color: #f5f0e8; }

  .pf-btn.gold {
    background: #d4af64;
    border: 1px solid #d4af64;
    color: #0e0e0e;
  }
  .pf-btn.gold:hover { background: #c49d52; border-color: #c49d52; }
  .pf-btn.gold:disabled { opacity: 0.55; cursor: not-allowed; }

  .pf-btn.dark {
    background: #0e0e0e;
    border: 1px solid #0e0e0e;
    color: #f5f0e8;
  }
  .pf-btn.dark:hover { background: #1e1e1e; }
  .pf-btn.dark:disabled { opacity: 0.55; cursor: not-allowed; }

  /* ── Layout ── */
  .pf-body {
    max-width: 860px;
    margin: 0 auto;
    padding: 2.5rem 2rem;
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pf-header {
    margin-bottom: 2rem;
  }

  .pf-eyebrow {
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #d4af64;
    font-weight: 400;
    margin-bottom: 0.5rem;
  }

  .pf-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #0e0e0e;
  }

  /* ── Form card ── */
  .pf-card {
    background: #fff;
    border: 1px solid #ede9e3;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 1.25rem;
  }

  .pf-card-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #f0ece6;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .pf-card-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #d4af64;
    flex-shrink: 0;
  }

  .pf-card-label {
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b6860;
    font-weight: 500;
  }

  .pf-card-body {
    padding: 1.5rem;
  }

  /* ── Fields ── */
  .pf-field {
    margin-bottom: 1.25rem;
  }

  .pf-field:last-child { margin-bottom: 0; }

  .pf-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.4rem;
  }

  .pf-label-text {
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #6b6860;
    font-weight: 500;
  }

  .pf-label-hint {
    font-size: 0.7rem;
    color: #b0aba4;
    font-weight: 300;
  }

  .pf-input {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #faf9f7;
    border: 1px solid #e2ddd6;
    border-radius: 7px;
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
    color: #0e0e0e;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    font-weight: 400;
  }

  .pf-input::placeholder { color: #c5bfb6; font-style: italic; }
  .pf-input:focus {
    border-color: #d4af64;
    box-shadow: 0 0 0 3px rgba(212,175,100,0.1);
    background: #fff;
  }
  .pf-input.err { border-color: #c0392b; box-shadow: 0 0 0 3px rgba(192,57,43,0.08); }

  .pf-textarea {
    width: 100%;
    padding: 1rem;
    background: #faf9f7;
    border: 1px solid #e2ddd6;
    border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.92rem;
    color: #0e0e0e;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    resize: vertical;
    min-height: 280px;
    line-height: 1.8;
    font-weight: 300;
  }

  .pf-textarea::placeholder { color: #c5bfb6; font-style: italic; }
  .pf-textarea:focus {
    border-color: #d4af64;
    box-shadow: 0 0 0 3px rgba(212,175,100,0.1);
    background: #fff;
  }
  .pf-textarea.err { border-color: #c0392b; }

  .pf-select {
    width: 100%;
    padding: 0.75rem 1rem;
    background: #faf9f7;
    border: 1px solid #e2ddd6;
    border-radius: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    color: #0e0e0e;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239e9a92' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
  }

  .pf-select:focus {
    border-color: #d4af64;
    box-shadow: 0 0 0 3px rgba(212,175,100,0.1);
    background-color: #fff;
  }
  .pf-select.err { border-color: #c0392b; }

  /* ── Tag picker ── */
  .pf-tag-picker {
    border: 1px solid #e2ddd6;
    border-radius: 7px;
    background: #faf9f7;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .pf-tag-picker:focus-within {
    border-color: #d4af64;
    box-shadow: 0 0 0 3px rgba(212,175,100,0.1);
    background: #fff;
  }

  .pf-tag-picker.err { border-color: #c0392b; }

  .pf-tag-selected {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 0.6rem 0.75rem 0;
    min-height: 0;
  }

  .pf-tag-chip {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.6rem;
    background: #0e0e0e;
    color: #f5f0e8;
    border-radius: 4px;
    font-size: 0.72rem;
    font-weight: 400;
  }

  .pf-tag-remove {
    background: none;
    border: none;
    color: #9e9a92;
    cursor: pointer;
    font-size: 0.75rem;
    padding: 0;
    line-height: 1;
    transition: color 0.15s;
  }
  .pf-tag-remove:hover { color: #f5f0e8; }

  .pf-tag-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    padding: 0.6rem 0.75rem;
  }

  .pf-tag-option {
    padding: 0.25rem 0.65rem;
    border-radius: 4px;
    border: 1px solid #e2ddd6;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.72rem;
    color: #6b6860;
    cursor: pointer;
    transition: all 0.15s;
  }

  .pf-tag-option:hover { border-color: #0e0e0e; color: #0e0e0e; }
  .pf-tag-option.selected { background: #0e0e0e; border-color: #0e0e0e; color: #f5f0e8; }

  .pf-tag-empty {
    font-size: 0.78rem;
    color: #b0aba4;
    font-style: italic;
    padding: 0.5rem 0.75rem;
    font-weight: 300;
  }

  /* ── Status toggle ── */
  .pf-status-row {
    display: flex;
    gap: 0.75rem;
  }

  

  .pf-status-opt:hover { border-color: #b0aba4; }


  


  /* ── Field error ── */
  .pf-field-err {
    font-size: 0.73rem;
    color: #c0392b;
    margin-top: 0.35rem;
    font-weight: 400;
  }

  /* ── API error ── */
  .pf-api-err {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 8px;
    padding: 0.85rem 1.1rem;
    font-size: 0.83rem;
    color: #c0392b;
    margin-bottom: 1.25rem;
  }

  /* ── Bottom actions ── */
  .pf-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    background: #fff;
    border: 1px solid #ede9e3;
    border-radius: 12px;
  }

  .pf-actions-right {
    display: flex;
    gap: 0.75rem;
  }

  .pf-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(14,14,14,0.15);
    border-top-color: #0e0e0e;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
  }

  .pf-spinner.light {
    border-color: rgba(245,240,232,0.3);
    border-top-color: #f5f0e8;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .pf-char-count {
    font-size: 0.7rem;
    color: #b0aba4;
    text-align: right;
    margin-top: 0.35rem;
    font-weight: 300;
  }

  .pf-char-count.warn { color: #e67e22; }
  .pf-char-count.over { color: #c0392b; }

  @media (max-width: 640px) {
    .pf-nav { padding: 0 1.25rem; }
    .pf-body { padding: 1.5rem 1rem; }
    .pf-status-row { flex-direction: column; }
    .pf-actions { flex-direction: column; gap: 0.75rem; }
    .pf-actions-right { width: 100%; }
    .pf-btn { flex: 1; text-align: center; }
  }
`;

function getCharCountClass(len, max) {
    if (len > max) return "over";
    if (len > max * 0.9) return "warn";
    return "";
}

export default function PostForm() {
    const navigate = useNavigate();
    const { postId } = useParams(); // present on /posts/:postId/edit
    const isEdit = Boolean(postId);

    const [form, setForm] = useState({
        title: "",
        content: "",
        categoryId: "",
        tagIds: [],
        status: "PUBLISHED",
    });

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState("");
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEdit);

    // Load categories and tags on mount
    useEffect(() => {
        const loadMeta = async () => {
            try {
                const [catRes, tagRes] = await Promise.all([
                    api.get("/categories"),
                    api.get("/tags"),
                ]);
                setCategories(catRes.data);
                setTags(tagRes.data);
            } catch (_) { }
        };
        loadMeta();
    }, []);

    // If editing, load post and pre-fill form
    useEffect(() => {
        if (!isEdit) return;
        const loadPost = async () => {
            try {
                const { data } = await api.get(`/posts/${postId}`);
                setForm({
                    title: data.title || "",
                    content: data.content || "",
                    categoryId: data.category?.id || "",
                    tagIds: data.tags?.map((t) => t.id) || [],
                    status: data.status || "PUBLISHED",
                });
            } catch (_) {
                setApiError("Failed to load post.");
            } finally {
                setInitialLoading(false);
            }
        };
        loadPost();
    }, [postId, isEdit]);

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = "Title is required";
        else if (form.title.length < 3) e.title = "Title must be at least 3 characters";
        else if (form.title.length > 200) e.title = "Title must be under 200 characters";
        if (!form.content.trim()) e.content = "Content is required";
        else if (form.content.length < 10) e.content = "Content must be at least 10 characters";
        if (!form.categoryId) e.categoryId = "Please select a category";
        if (form.tagIds.length > 10) e.tagIds = "Maximum 10 tags allowed";
        return e;
    };

    const handleChange = (field) => (e) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        if (errors[field]) setErrors((er) => ({ ...er, [field]: "" }));
        setApiError("");
    };

    const toggleTag = (tagId) => {
        setForm((f) => {
            const has = f.tagIds.includes(tagId);
            if (has) return { ...f, tagIds: f.tagIds.filter((id) => id !== tagId) };
            if (f.tagIds.length >= 10) return f;
            return { ...f, tagIds: [...f.tagIds, tagId] };
        });
        if (errors.tagIds) setErrors((er) => ({ ...er, tagIds: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const e2 = validate();
        if (Object.keys(e2).length) { setErrors(e2); return; }

        setLoading(true);
        setApiError("");

        const payload = {
            id: postId,
            title: form.title,
            content: form.content,
            categoryId: form.categoryId,
            tagIds: form.tagIds,
            status: form.status,
        };

        try {
            if (isEdit) {
                await api.put(`/posts/${postId}`, payload);
            } else {
                await api.post("/posts", payload);
            }
            navigate("/posts");
        } catch (err) {
            setApiError(
                err?.response?.data?.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const saveDraft = () => {
        setForm((f) => ({ ...f, status: "DRAFT" }));
        // Trigger submit after state update
        setTimeout(() => {
            document.getElementById("pf-form").requestSubmit();
        }, 0);
    };

    if (initialLoading) {
        return (
            <>
                <style>{styles}</style>
                <div className="pf-root">
                    <nav className="pf-nav">
                        <div className="pf-nav-left">
                            <span className="pf-nav-logo">Inkwell</span>
                        </div>
                    </nav>
                    <div className="pf-body">
                        <div style={{ textAlign: "center", padding: "4rem 0", color: "#9e9a92", fontSize: "0.88rem" }}>
                            Loading post…
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const selectedTags = tags.filter((t) => form.tagIds.includes(t.id));
    const availableTags = tags.filter((t) => !form.tagIds.includes(t.id));

    return (
        <>
            <style>{styles}</style>
            <div className="pf-root">
                {/* Navbar */}
                <nav className="pf-nav">
                    <div className="pf-nav-left">
                        <span className="pf-nav-logo">Inkwell</span>
                        <div className="pf-nav-sep" />
                        <span className="pf-nav-crumb">
                            {isEdit ? "Editing post" : "New post"}
                        </span>
                    </div>
                    <div className="pf-nav-right">
                        <button
                            className="pf-btn ghost"
                            type="button"
                            onClick={() => navigate("/posts")}
                        >
                            Discard
                        </button>
                    </div>
                </nav>

                <div className="pf-body">
                    <div className="pf-header">
                        <p className="pf-eyebrow">{isEdit ? "Edit post" : "Create post"}</p>
                        <h1 className="pf-title">
                            {isEdit ? "Update your writing" : "Write something worth reading"}
                        </h1>
                    </div>

                    {apiError && <div className="pf-api-err">{apiError}</div>}

                    <form id="pf-form" onSubmit={handleSubmit} noValidate>
                        {/* Title + Content */}
                        <div className="pf-card">
                            <div className="pf-card-header">
                                <div className="pf-card-dot" />
                                <span className="pf-card-label">Content</span>
                            </div>
                            <div className="pf-card-body">
                                <div className="pf-field">
                                    <div className="pf-label">
                                        <span className="pf-label-text">Title</span>
                                        <span className="pf-label-hint">3 – 200 chars</span>
                                    </div>
                                    <input
                                        className={`pf-input${errors.title ? " err" : ""}`}
                                        type="text"
                                        placeholder="Give your post a compelling title…"
                                        value={form.title}
                                        onChange={handleChange("title")}
                                        maxLength={200}
                                    />
                                    <div className={`pf-char-count ${getCharCountClass(form.title.length, 200)}`}>
                                        {form.title.length} / 200
                                    </div>
                                    {errors.title && <p className="pf-field-err">{errors.title}</p>}
                                </div>

                                <div className="pf-field">
                                    <div className="pf-label">
                                        <span className="pf-label-text">Content</span>
                                        <span className="pf-label-hint">10 – 50,000 chars</span>
                                    </div>
                                    <textarea
                                        className={`pf-textarea${errors.content ? " err" : ""}`}
                                        placeholder="Start writing your post here…"
                                        value={form.content}
                                        onChange={(e) => setForm(f => ({ ...f, content: e.target.value }))}
                                        maxLength={50000}
                                    />
                                    <div className={`pf-char-count ${getCharCountClass(form.content.length, 50000)}`}>
                                        {form.content.length.toLocaleString()} / 50,000
                                    </div>
                                    {errors.content && <p className="pf-field-err">{errors.content}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Category + Tags */}
                        <div className="pf-card">
                            <div className="pf-card-header">
                                <div className="pf-card-dot" />
                                <span className="pf-card-label">Organisation</span>
                            </div>
                            <div className="pf-card-body">
                                <div className="pf-field">
                                    <div className="pf-label">
                                        <span className="pf-label-text">Category</span>
                                        <span className="pf-label-hint">Pick one</span>
                                    </div>
                                    <select
                                        className={`pf-select${errors.categoryId ? " err" : ""}`}
                                        value={form.categoryId}
                                        onChange={handleChange("categoryId")}
                                    >
                                        <option value="">Select a category…</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.categoryId && (
                                        <p className="pf-field-err">{errors.categoryId}</p>
                                    )}
                                </div>

                                <div className="pf-field">
                                    <div className="pf-label">
                                        <span className="pf-label-text">Tags</span>
                                        <span className="pf-label-hint">
                                            {form.tagIds.length} / 10 selected
                                        </span>
                                    </div>
                                    <div className={`pf-tag-picker${errors.tagIds ? " err" : ""}`}>
                                        {selectedTags.length > 0 && (
                                            <div className="pf-tag-selected">
                                                {selectedTags.map((tag) => (
                                                    <span key={tag.id} className="pf-tag-chip">
                                                        #{tag.name}
                                                        <button
                                                            type="button"
                                                            className="pf-tag-remove"
                                                            onClick={() => toggleTag(tag.id)}
                                                        >
                                                            ×
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <div className="pf-tag-options">
                                            {availableTags.length === 0 && selectedTags.length === 0 ? (
                                                <span className="pf-tag-empty">No tags available. Create some first.</span>
                                            ) : availableTags.length === 0 ? (
                                                <span className="pf-tag-empty">All tags selected</span>
                                            ) : (
                                                availableTags.map((tag) => (
                                                    <button
                                                        key={tag.id}
                                                        type="button"
                                                        className="pf-tag-option"
                                                        onClick={() => toggleTag(tag.id)}
                                                        disabled={form.tagIds.length >= 10}
                                                    >
                                                        #{tag.name}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                    {errors.tagIds && (
                                        <p className="pf-field-err">{errors.tagIds}</p>
                                    )}
                                </div>
                            </div>
                        </div>


                        {/* Bottom actions */}
                        <div className="pf-actions">
                            <button
                                type="button"
                                className="pf-btn ghost"
                                onClick={() => navigate("/posts")}
                            >
                                Cancel
                            </button>
                            <div className="pf-actions-right">
                                <button
                                    type="submit"
                                    className="pf-btn dark"
                                    disabled={loading}
                                    onClick={() => setForm((f) => ({ ...f, status: "DRAFT" }))}
                                >
                                    {loading && form.status === "DRAFT" ? (
                                        <><span className="pf-spinner light" />Saving…</>
                                    ) : (
                                        "Save as draft"
                                    )}
                                </button>
                                <button
                                    type="submit"
                                    className="pf-btn gold"
                                    disabled={loading}
                                    onClick={() => setForm((f) => ({ ...f, status: "PUBLISHED" }))}
                                >
                                    {loading && form.status === "PUBLISHED" ? (
                                        <><span className="pf-spinner" />{isEdit ? "Updating…" : "Publishing…"}</>
                                    ) : (
                                        isEdit ? "Update post" : "Publish post"
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
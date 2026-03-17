import { useEffect, useMemo, useState } from "react";
import { FaDownload, FaFileAlt, FaFolderOpen } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const FALLBACK = {
  badge: "Digital Desk",
  title: "Downloads Center",
  subtitle: "Structured documents for admissions, academics, and school administration.",
  stats: [
    { value: "120+", label: "Files Ready" },
    { value: "08", label: "Categories" },
    { value: "Weekly", label: "Updates" },
    { value: "24x7", label: "Access" },
  ],
  categories: [
    { category: "Admissions", items: [{ name: "Admission Form", type: "PDF", size: "1.2 MB" }] },
    { category: "Academics", items: [{ name: "Exam Date Sheet", type: "PDF", size: "0.9 MB" }] },
  ],
};

export default function DownloadsPage() {
  const [data, setData] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/page-content/downloads`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData({ ...FALLBACK, ...json });
      } catch {
        setError("Live content unavailable. Showing demo download categories.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data.categories || [];
    return (data.categories || [])
      .map((category) => ({
        ...category,
        items: (category.items || []).filter((item) => item.name?.toLowerCase().includes(q)),
      }))
      .filter((c) => c.items.length);
  }, [data.categories, query]);

  return (
    <>
      <style>{`
        .dl-page { min-height:80vh; padding:30px 14px 70px; background:linear-gradient(160deg,#f8fbff 0%,#eef4fa 100%); font-family:'Jost',sans-serif; }
        .dl-wrap { max-width:1120px; margin:0 auto; display:grid; gap:12px; }
        .dl-hero { border-radius:16px; padding:18px; color:#fff; background:linear-gradient(130deg,#0f172a,#0f766e,#1d4ed8); box-shadow:0 14px 28px rgba(15,23,42,.2); }
        .dl-hero h1 { margin:0; font-size:clamp(1.45rem,2.8vw,2.2rem); }
        .dl-hero p { margin:8px 0 0; color:rgba(255,255,255,.9); }
        .dl-badge { display:inline-block; margin-bottom:8px; border:1px solid rgba(255,255,255,.35); border-radius:999px; padding:4px 9px; font-size:.75rem; }
        .dl-stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:9px; }
        .dl-stat { border:1px solid #dbe5ee; border-radius:12px; background:#fff; text-align:center; padding:10px; }
        .dl-stat strong { display:block; color:#0f3d59; font-size:1.2rem; }
        .dl-stat span { color:#64748b; font-size:.83rem; }
        .dl-search { border:1px solid #d5e0ea; border-radius:11px; padding:9px 10px; font:inherit; width:100%; }
        .dl-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:10px; }
        .dl-card { border:1px solid #dbe5ee; border-radius:14px; background:#fff; box-shadow:0 10px 22px rgba(15,23,42,.06); padding:12px; }
        .dl-card h3 { margin:0 0 10px; color:#0f3d59; display:flex; align-items:center; gap:8px; }
        .dl-item { border:1px solid #e2e8f0; border-radius:10px; background:#f8fbff; padding:9px; margin-bottom:8px; }
        .dl-item strong { display:block; color:#0f172a; font-size:.95rem; }
        .dl-meta { font-size:.82rem; color:#64748b; margin:4px 0 7px; }
        .dl-btn { border:1px solid #cddae5; border-radius:8px; padding:6px 9px; display:inline-flex; gap:7px; align-items:center; color:#0f3d59; text-decoration:none; font-weight:700; font-size:.84rem; }
        .dl-err, .dl-empty { border-radius:11px; padding:10px; }
        .dl-err { border:1px solid #fde68a; background:#fffbeb; color:#92400e; }
        .dl-empty { border:1px dashed #cbd5e1; background:#f8fbff; color:#64748b; }
        @media (max-width:920px) { .dl-stats { grid-template-columns:repeat(2,minmax(0,1fr)); } }
      `}</style>

      <main className="dl-page">
        <div className="dl-wrap">
          <header className="dl-hero">
            <span className="dl-badge">{data.badge}</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
          </header>

          {loading && <p>Loading downloads...</p>}
          {!loading && error && <div className="dl-err">{error}</div>}

          <section className="dl-stats">
            {data.stats?.map((item) => (
              <article key={`${item.label}-${item.value}`} className="dl-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </section>

          <input
            className="dl-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search document name..."
          />

          {!filteredCategories.length && <div className="dl-empty">No documents match your search.</div>}
          <section className="dl-grid">
            {filteredCategories.map((group) => (
              <article className="dl-card" key={group.category}>
                <h3><FaFolderOpen color="#1f7ae0" />{group.category}</h3>
                {group.items?.map((item) => (
                  <div key={item.name} className="dl-item">
                    <strong><FaFileAlt style={{ marginRight: 6, color: "#64748b" }} />{item.name}</strong>
                    <div className="dl-meta">{item.type || "FILE"} | {item.size || "-"}</div>
                    <a href="#" className="dl-btn" onClick={(e) => e.preventDefault()}>
                      <FaDownload /> Download
                    </a>
                  </div>
                ))}
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

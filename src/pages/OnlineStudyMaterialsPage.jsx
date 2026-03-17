import { useCallback, useEffect, useMemo, useState } from "react";
import { FaBookOpen, FaDownload, FaFileAlt, FaFilter, FaSearch } from "react-icons/fa";
import { getWsEndpoint } from "../utils/realtime.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const WS_ENDPOINT = getWsEndpoint(API_BASE);

const FALLBACK_MATERIALS = [
  {
    _id: "m1",
    title: "Mathematics Revision Set - Class X",
    classLevel: "Class X",
    subject: "Mathematics",
    description: "Important board-level questions with solutions.",
    fileUrl: "#",
    fileName: "Math-X-Revision.pdf",
  },
  {
    _id: "m2",
    title: "Physics Formula Handbook",
    classLevel: "Class XI-XII",
    subject: "Physics",
    description: "Quick reference notes for concepts and formulas.",
    fileUrl: "#",
    fileName: "Physics-Handbook.pdf",
  },
];

function withApiBase(url) {
  if (!url || url === "#") return "#";
  return url.startsWith("http") ? url : `${API_BASE}${url}`;
}

export default function OnlineStudyMaterialsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const loadMaterials = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/api/study-materials?limit=500`);
      if (!res.ok) throw new Error(`Failed to load materials (${res.status})`);
      const data = await res.json();
      setRows(Array.isArray(data) && data.length ? data : FALLBACK_MATERIALS);
    } catch {
      setRows(FALLBACK_MATERIALS);
      setError("Live materials unavailable. Showing demo resources.");
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let socket = null;
    let reconnectTimer = null;
    let unmounted = false;

    const connect = () => {
      if (unmounted) return;
      socket = new WebSocket(WS_ENDPOINT);
      socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload?.event === "material:changed") loadMaterials(false);
        } catch {
          // ignore
        }
      };
      socket.onclose = () => {
        if (unmounted) return;
        reconnectTimer = setTimeout(connect, 3000);
      };
    };

    loadMaterials(true);
    connect();
    const poll = setInterval(() => loadMaterials(false), 120000);

    return () => {
      unmounted = true;
      clearInterval(poll);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (socket && socket.readyState === WebSocket.OPEN) socket.close();
    };
  }, [loadMaterials]);

  const subjects = useMemo(() => {
    const set = new Set(rows.map((r) => r.subject || "General"));
    return ["all", ...Array.from(set)];
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((row) => {
      const text = `${row.title || ""} ${row.subject || ""} ${row.classLevel || ""} ${row.description || ""}`.toLowerCase();
      const matchSearch = !q || text.includes(q);
      const matchSubject = subjectFilter === "all" || (row.subject || "General") === subjectFilter;
      return matchSearch && matchSubject;
    });
  }, [rows, search, subjectFilter]);

  return (
    <>
      <style>{`
        .sm-page { min-height: 80vh; padding: 30px 14px 70px; background: linear-gradient(145deg,#f7fbff 0%,#eef4fa 100%); font-family:'Jost',sans-serif; }
        .sm-wrap { max-width: 1140px; margin: 0 auto; display:grid; gap:12px; }
        .sm-head { border-radius: 16px; padding: 16px; color:#fff; background: linear-gradient(125deg,#0f172a,#1d4ed8,#0f766e); box-shadow:0 16px 28px rgba(15,23,42,.22); }
        .sm-head h1 { margin:0; font-size:clamp(1.45rem,2.8vw,2.1rem); }
        .sm-head p { margin:7px 0 0; color:rgba(255,255,255,.88); }
        .sm-tools { display:grid; gap:10px; grid-template-columns:1fr 260px; }
        .sm-field { position:relative; }
        .sm-field svg { position:absolute; left:11px; top:12px; color:#64748b; }
        .sm-field input, .sm-field select { width:100%; border:1px solid #d5e0ea; border-radius:11px; padding:9px 10px 9px 31px; font:inherit; background:#fff; }
        .sm-grid { display:grid; gap:10px; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); }
        .sm-card { border:1px solid #dbe5ee; border-radius:14px; padding:12px; background:#fff; box-shadow:0 10px 22px rgba(15,23,42,.06); display:grid; gap:7px; }
        .sm-title { display:flex; gap:8px; align-items:flex-start; }
        .sm-title h3 { margin:0; color:#0f172a; font-size:1rem; }
        .sm-meta { font-size:.85rem; color:#475569; display:flex; gap:8px; flex-wrap:wrap; }
        .sm-chip { border-radius:999px; padding:4px 8px; border:1px solid #bfdbfe; background:#eff6ff; color:#1e3a8a; font-weight:700; }
        .sm-card p { margin:0; color:#64748b; font-size:.9rem; line-height:1.45; }
        .sm-btn { display:inline-flex; align-items:center; gap:7px; border:1px solid #cddae5; border-radius:8px; padding:7px 10px; text-decoration:none; color:#0f3d59; font-weight:700; width: fit-content; }
        .sm-empty,.sm-err { border-radius:11px; padding:11px; }
        .sm-empty { border:1px dashed #cbd5e1; background:#f8fbff; color:#64748b; }
        .sm-err { border:1px solid #fde68a; background:#fffbeb; color:#92400e; }
        @media (max-width: 860px) { .sm-tools { grid-template-columns:1fr; } }
      `}</style>

      <main className="sm-page">
        <div className="sm-wrap">
          <header className="sm-head">
            <h1>Online Study Materials</h1>
            <p>Smart digital library for notes, worksheets, sample papers, and revision packs.</p>
          </header>

          <section className="sm-tools">
            <label className="sm-field">
              <FaSearch />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search material..." />
            </label>
            <label className="sm-field">
              <FaFilter />
              <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
                {subjects.map((s) => (
                  <option key={s} value={s}>{s === "all" ? "All Subjects" : s}</option>
                ))}
              </select>
            </label>
          </section>

          {loading && <p>Loading materials...</p>}
          {!loading && error && <div className="sm-err">{error}</div>}
          {!loading && !filteredRows.length && <div className="sm-empty">No study material found.</div>}

          <section className="sm-grid">
            {filteredRows.map((row) => (
              <article key={row._id} className="sm-card">
                <div className="sm-title">
                  <FaBookOpen color="#1f7ae0" />
                  <h3>{row.title || "Untitled Resource"}</h3>
                </div>
                <div className="sm-meta">
                  <span className="sm-chip">{row.classLevel || "All Classes"}</span>
                  <span className="sm-chip">{row.subject || "General"}</span>
                </div>
                <p>{row.description || "Resource description will be updated by academic team."}</p>
                <a href={withApiBase(row.fileUrl)} target="_blank" rel="noreferrer" className="sm-btn">
                  <FaDownload /> {row.fileName || "Open Material"}
                </a>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

import { useCallback, useEffect, useMemo, useState } from "react";
import { FaClock, FaFilter, FaSearch } from "react-icons/fa";
import { getWsEndpoint } from "../utils/realtime.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const WS_ENDPOINT = getWsEndpoint(API_BASE);

const FALLBACK_TIMINGS = [
  { _id: "t1", section: "Primary (I-V)", startTime: "08:00 AM", endTime: "01:30 PM", notes: "Saturday till 12:00 PM" },
  { _id: "t2", section: "Middle (VI-VIII)", startTime: "07:45 AM", endTime: "02:00 PM", notes: "Assembly at 07:35 AM" },
  { _id: "t3", section: "Senior (IX-XII)", startTime: "07:30 AM", endTime: "02:15 PM", notes: "Remedial 2:20 PM to 3:00 PM" },
];

function asDate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function SchoolTimingsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const loadTimings = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/api/school-timings`);
      if (!res.ok) throw new Error(`Failed to load timings (${res.status})`);
      const data = await res.json();
      setRows(Array.isArray(data) && data.length ? data : FALLBACK_TIMINGS);
    } catch {
      setRows(FALLBACK_TIMINGS);
      setError("Live timings unavailable. Showing demo schedule.");
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
          if (payload?.event === "timing:changed") loadTimings(false);
        } catch {
          // ignore
        }
      };
      socket.onclose = () => {
        if (unmounted) return;
        reconnectTimer = setTimeout(connect, 3000);
      };
    };

    loadTimings(true);
    connect();
    const poll = setInterval(() => loadTimings(false), 120000);

    return () => {
      unmounted = true;
      clearInterval(poll);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (socket && socket.readyState === WebSocket.OPEN) socket.close();
    };
  }, [loadTimings]);

  const sections = useMemo(() => ["all", ...new Set(rows.map((r) => r.section || "General"))], [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((row) => {
      const text = `${row.section || ""} ${row.startTime || ""} ${row.endTime || ""} ${row.notes || ""}`.toLowerCase();
      return (!q || text.includes(q)) && (filter === "all" || row.section === filter);
    });
  }, [rows, search, filter]);

  const latestUpdated = useMemo(() => {
    const dates = rows.map((r) => (r.effectiveFrom ? new Date(r.effectiveFrom) : null)).filter(Boolean);
    if (!dates.length) return "Not specified";
    return asDate(new Date(Math.max(...dates.map((d) => d.getTime()))));
  }, [rows]);

  return (
    <>
      <style>{`
        .st-page { min-height: 80vh; padding: 30px 14px 70px; background: radial-gradient(circle at top right,#e8f0ff 0%,#f8fbff 44%,#eef4fa 100%); font-family:'Jost',sans-serif; }
        .st-wrap { max-width: 1140px; margin: 0 auto; display:grid; gap: 12px; }
        .st-head { border-radius: 16px; padding: 16px; background: linear-gradient(130deg,#1d4ed8,#0f766e,#0f172a); color:#fff; box-shadow: 0 16px 28px rgba(15,23,42,.24); }
        .st-head h1 { margin:0; font-size: clamp(1.45rem,2.8vw,2.1rem); }
        .st-head p { margin:7px 0 0; color: rgba(255,255,255,.88); }
        .st-head small { display:inline-block; margin-top:8px; opacity:.9; }
        .st-tools { display:grid; gap:10px; grid-template-columns: 1fr 280px; }
        .st-input { position:relative; }
        .st-input svg { position:absolute; left:10px; top:12px; color:#64748b; }
        .st-input input, .st-input select { width:100%; border:1px solid #d5e0ea; border-radius: 11px; padding: 9px 10px 9px 31px; background:#fff; font:inherit; }
        .st-layout { display:grid; gap: 12px; grid-template-columns: 310px 1fr; }
        .st-card, .st-table { background:#fff; border:1px solid #dbe5ee; border-radius:14px; box-shadow: 0 12px 24px rgba(15,23,42,.06); }
        .st-card { padding: 14px; }
        .st-card h3 { margin:0 0 10px; color:#0f3d59; }
        .st-tile { border:1px solid #dce8f4; border-radius:12px; padding:10px; margin-bottom:8px; background:#f8fbff; }
        .st-tile strong { display:block; color:#0f172a; }
        .st-tile span { color:#475569; font-size:.9rem; }
        .st-table { overflow:auto; }
        .st-table table { width:100%; border-collapse: collapse; min-width: 700px; }
        .st-table th { background:#edf4fb; color:#1e3a56; text-align:left; font-size:.88rem; padding:10px; border-bottom:1px solid #dbe5ee; }
        .st-table td { padding:10px; border-top:1px solid #eef2f7; color:#334155; font-size:.9rem; }
        .st-empty, .st-err { border-radius: 12px; padding: 11px; }
        .st-empty { border:1px dashed #cbd5e1; background:#f8fbff; color:#64748b; }
        .st-err { border:1px solid #fde68a; background:#fffbeb; color:#92400e; }
        @media (max-width: 980px) { .st-layout, .st-tools { grid-template-columns: 1fr; } }
      `}</style>

      <main className="st-page">
        <div className="st-wrap">
          <section className="st-head">
            <h1>School Timings</h1>
            <p>Live section-wise schedule managed from admin panel and auto-refreshed for visitors.</p>
            <small>Latest effective update: {latestUpdated}</small>
          </section>

          <section className="st-tools">
            <label className="st-input">
              <FaSearch />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search section or note..." />
            </label>
            <label className="st-input">
              <FaFilter />
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                {sections.map((section) => (
                  <option key={section} value={section}>{section === "all" ? "All Sections" : section}</option>
                ))}
              </select>
            </label>
          </section>

          {loading && <p>Loading timings...</p>}
          {!loading && error && <div className="st-err">{error}</div>}

          <section className="st-layout">
            <aside className="st-card">
              <h3>Quick Slots</h3>
              {filteredRows.slice(0, 4).map((row) => (
                <article className="st-tile" key={row._id}>
                  <strong>{row.section || "Section"}</strong>
                  <span><FaClock style={{ marginRight: 6 }} />{row.startTime || "-"} - {row.endTime || "-"}</span>
                </article>
              ))}
              {!filteredRows.length && <div className="st-empty">No timing rows found.</div>}
            </aside>

            <div className="st-table">
              <table>
                <thead>
                  <tr>
                    <th>Section</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Effective From</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <tr key={row._id}>
                      <td>{row.section || "-"}</td>
                      <td>{row.startTime || "-"}</td>
                      <td>{row.endTime || "-"}</td>
                      <td>{row.effectiveFrom ? asDate(row.effectiveFrom) : "-"}</td>
                      <td>{row.notes || "Standard school timing policy."}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

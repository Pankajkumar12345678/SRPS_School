import { useCallback, useEffect, useMemo, useState } from "react";
import { FaCalendarAlt, FaFilter, FaSearch } from "react-icons/fa";
import { getWsEndpoint } from "../utils/realtime.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const WS_ENDPOINT = getWsEndpoint(API_BASE);

const FALLBACK_HOLIDAYS = [
  {
    _id: "demo-1",
    title: "Ram Navami",
    type: "Festival",
    date: "2026-03-26T00:00:00.000Z",
    description: "School will remain closed. Special assembly notes will be shared in advance.",
  },
  {
    _id: "demo-2",
    title: "Annual Sports Day",
    type: "Event Holiday",
    date: "2026-04-18T00:00:00.000Z",
    description: "Regular classes suspended due to campus-wide sports day program.",
  },
];

function asDate(value) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function HolidayListPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const loadHolidays = useCallback(async (showLoader = false) => {
    try {
      if (showLoader) setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/api/holiday-updates?limit=300`);
      if (!res.ok) throw new Error(`Failed to load holidays (${res.status})`);
      const data = await res.json();
      const normalized = (Array.isArray(data) && data.length ? data : FALLBACK_HOLIDAYS)
        .filter((row) => row?.title)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      setRows(normalized);
    } catch {
      setRows(FALLBACK_HOLIDAYS);
      setError("Live data unavailable. Showing demo holiday content.");
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
          if (payload?.event === "holiday:changed") loadHolidays(false);
        } catch {
          // ignore
        }
      };
      socket.onclose = () => {
        if (unmounted) return;
        reconnectTimer = setTimeout(connect, 3000);
      };
    };

    loadHolidays(true);
    connect();
    const poll = setInterval(() => loadHolidays(false), 120000);

    return () => {
      unmounted = true;
      clearInterval(poll);
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (socket && socket.readyState === WebSocket.OPEN) socket.close();
    };
  }, [loadHolidays]);

  const typeOptions = useMemo(() => {
    const set = new Set(rows.map((r) => r.type || "Holiday"));
    return ["all", ...Array.from(set)];
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((row) => {
      const matchText =
        !q ||
        (row.title || "").toLowerCase().includes(q) ||
        (row.description || "").toLowerCase().includes(q);
      const matchType = filter === "all" || (row.type || "Holiday") === filter;
      return matchText && matchType;
    });
  }, [rows, search, filter]);

  const stats = useMemo(() => {
    const now = new Date();
    const upcoming = rows.filter((r) => new Date(r.date) >= now).length;
    return {
      total: rows.length,
      upcoming,
      festivals: rows.filter((r) => String(r.type || "").toLowerCase().includes("festival")).length,
    };
  }, [rows]);

  return (
    <>
      <style>{`
        .hl-page { min-height: 80vh; padding: 30px 14px 70px; background: linear-gradient(160deg,#f8fbff 0%,#eef4fa 100%); font-family:'Jost',sans-serif; }
        .hl-wrap { max-width: 1120px; margin: 0 auto; }
        .hl-hero { border-radius: 16px; padding: 18px; color: #fff; background: linear-gradient(120deg,#0e7490,#0f766e,#2563eb); box-shadow: 0 14px 28px rgba(15,23,42,.18); }
        .hl-hero h1 { margin: 0; font-size: clamp(1.5rem,2.8vw,2.2rem); }
        .hl-hero p { margin: 8px 0 0; color: rgba(255,255,255,.9); }
        .hl-stats { margin-top: 14px; display: grid; gap: 10px; grid-template-columns: repeat(3,minmax(0,1fr)); }
        .hl-stat { border: 1px solid rgba(255,255,255,.22); border-radius: 12px; padding: 10px; background: rgba(255,255,255,.14); }
        .hl-stat strong { display: block; font-size: 1.2rem; }
        .hl-tools { margin: 14px 0; display: grid; gap: 10px; grid-template-columns: 1fr 240px; }
        .hl-field { position: relative; }
        .hl-field svg { position: absolute; left: 11px; top: 12px; color: #5b6b7c; }
        .hl-field input, .hl-field select { width: 100%; border: 1px solid #d3dee8; border-radius: 11px; padding: 9px 10px 9px 32px; font: inherit; background: #fff; }
        .hl-grid { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill,minmax(260px,1fr)); }
        .hl-card { border: 1px solid #dbe5ee; border-radius: 14px; padding: 12px; background: #fff; box-shadow: 0 10px 22px rgba(15,23,42,.06); }
        .hl-row { display:flex; justify-content:space-between; gap:8px; align-items:flex-start; margin-bottom:6px; }
        .hl-chip { border-radius: 999px; padding: 4px 9px; font-size: .76rem; font-weight: 700; color:#0f3d59; background:#e6f3ff; border:1px solid #bfdbfe; }
        .hl-card h3 { margin: 0; color:#0f172a; font-size:1.02rem; }
        .hl-date { color:#475569; font-weight:600; font-size:.88rem; margin: 4px 0 8px; display:inline-flex; gap:7px; align-items:center; }
        .hl-card p { margin:0; color:#64748b; line-height:1.45; font-size:.9rem; }
        .hl-empty, .hl-err { border-radius:12px; padding:11px; margin-top:8px; }
        .hl-empty { border:1px dashed #cbd5e1; color:#64748b; background:#f8fbff; }
        .hl-err { border:1px solid #fde68a; color:#92400e; background:#fffbeb; }
        @media (max-width: 860px) { .hl-stats, .hl-tools { grid-template-columns: 1fr; } }
      `}</style>

      <main className="hl-page">
        <div className="hl-wrap">
          <section className="hl-hero">
            <h1>Holiday List</h1>
            <p>Session updates with festival holidays, event closures, and emergency announcements.</p>
            <div className="hl-stats">
              <article className="hl-stat"><strong>{stats.total}</strong><span>Total Holidays</span></article>
              <article className="hl-stat"><strong>{stats.upcoming}</strong><span>Upcoming</span></article>
              <article className="hl-stat"><strong>{stats.festivals}</strong><span>Festival Holidays</span></article>
            </div>
          </section>

          <section className="hl-tools">
            <label className="hl-field">
              <FaSearch />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search holiday..." />
            </label>
            <label className="hl-field">
              <FaFilter />
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                {typeOptions.map((type) => (
                  <option key={type} value={type}>{type === "all" ? "All Types" : type}</option>
                ))}
              </select>
            </label>
          </section>

          {loading && <p>Loading holidays...</p>}
          {!loading && error && <div className="hl-err">{error}</div>}
          {!loading && filteredRows.length === 0 && <div className="hl-empty">No holiday records found.</div>}

          <section className="hl-grid">
            {filteredRows.map((row) => (
              <article key={row._id} className="hl-card">
                <div className="hl-row">
                  <h3>{row.title}</h3>
                  <span className="hl-chip">{row.type || "Holiday"}</span>
                </div>
                <span className="hl-date"><FaCalendarAlt /> {asDate(row.date)}</span>
                <p>{row.description || "Official holiday circular details will be updated soon."}</p>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

import { useEffect, useState } from "react";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const FALLBACK = {
  badge: "Academic Desk",
  title: "Academic Calendar",
  subtitle: "Yearly teaching, assessment, and PTM timeline with class-level clarity.",
  stats: [
    { value: "04", label: "Terms" },
    { value: "06", label: "Major Exams" },
    { value: "12", label: "PTM Windows" },
    { value: "18", label: "Events" },
  ],
  cards: [
    { title: "Term Mapping", description: "Classroom teaching targets with milestone checks." },
    { title: "Assessment Flow", description: "Unit tests to annual exams with revision slots." },
    { title: "Parent Coordination", description: "Periodic PTM schedule for academic alignment." },
  ],
  timeline: [
    { phase: "April - July", heading: "Term I", detail: "Foundation, orientation, baseline checks." },
    { phase: "August - November", heading: "Term II", detail: "Mid-year assessment and action plans." },
    { phase: "December - March", heading: "Term III", detail: "Final prep, practical completion, annual exams." },
  ],
  highlights: ["Syllabus checkpoints", "PTM schedule", "Exam mapping", "Activity integration"],
};

export default function AcademicCalendarPage() {
  const [data, setData] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/page-content/academic-calendar`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData({ ...FALLBACK, ...json });
      } catch {
        setError("Live content unavailable. Showing demo academic calendar.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <style>{`
        .ac-page { min-height: 80vh; padding: 30px 14px 70px; background: linear-gradient(160deg,#f8fbff 0%,#eef4fa 100%); font-family:'Jost',sans-serif; }
        .ac-wrap { max-width: 1120px; margin: 0 auto; display:grid; gap:12px; }
        .ac-hero { border-radius:16px; padding:18px; color:#fff; background: linear-gradient(125deg,#0f172a,#1d4ed8,#0e7490); box-shadow:0 16px 28px rgba(15,23,42,.22); }
        .ac-badge { display:inline-block; font-size:.75rem; border:1px solid rgba(255,255,255,.3); border-radius:999px; padding:4px 9px; margin-bottom:8px; }
        .ac-hero h1 { margin:0; font-size:clamp(1.5rem,2.8vw,2.2rem); }
        .ac-hero p { margin:8px 0 0; color:rgba(255,255,255,.9); }
        .ac-stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:9px; }
        .ac-stat { background:#fff; border:1px solid #dbe5ee; border-radius:12px; padding:10px; text-align:center; }
        .ac-stat strong { display:block; color:#0f3d59; font-size:1.2rem; }
        .ac-stat span { color:#64748b; font-size:.84rem; }
        .ac-grid { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
        .ac-card, .ac-time { border:1px solid #dbe5ee; border-radius:14px; background:#fff; box-shadow:0 10px 22px rgba(15,23,42,.06); padding:12px; }
        .ac-card h3, .ac-time h3 { margin:0 0 9px; color:#0f3d59; }
        .ac-item { border:1px solid #e2e8f0; border-radius:11px; padding:10px; margin-bottom:8px; background:#f8fbff; }
        .ac-item h4 { margin:0; color:#0f172a; font-size:1rem; }
        .ac-item p { margin:4px 0 0; color:#64748b; font-size:.9rem; }
        .ac-phase { font-size:.79rem; font-weight:700; color:#1e3a8a; margin-bottom:4px; }
        .ac-highlight { display:grid; gap:7px; margin-top:8px; }
        .ac-highlight div { display:flex; align-items:center; gap:8px; color:#334155; font-size:.9rem; }
        .ac-err { border:1px solid #fde68a; background:#fffbeb; color:#92400e; border-radius:10px; padding:10px; }
        @media (max-width: 920px) { .ac-stats { grid-template-columns:repeat(2,minmax(0,1fr)); } .ac-grid { grid-template-columns:1fr; } }
      `}</style>

      <main className="ac-page">
        <div className="ac-wrap">
          <section className="ac-hero">
            <span className="ac-badge">{data.badge}</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
          </section>

          {loading && <p>Loading academic calendar...</p>}
          {!loading && error && <div className="ac-err">{error}</div>}

          <section className="ac-stats">
            {data.stats?.map((item) => (
              <article key={`${item.label}-${item.value}`} className="ac-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </section>

          <section className="ac-grid">
            <article className="ac-card">
              <h3>Key Academic Components</h3>
              {data.cards?.map((card) => (
                <div key={card.title} className="ac-item">
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              ))}
              <div className="ac-highlight">
                {data.highlights?.map((h) => (
                  <div key={h}><FaCheckCircle color="#16a34a" />{h}</div>
                ))}
              </div>
            </article>

            <article className="ac-time">
              <h3><FaCalendarAlt style={{ marginRight: 8 }} />Session Timeline</h3>
              {data.timeline?.map((item) => (
                <div key={`${item.phase}-${item.heading}`} className="ac-item">
                  <div className="ac-phase">{item.phase}</div>
                  <h4>{item.heading}</h4>
                  <p>{item.detail}</p>
                </div>
              ))}
            </article>
          </section>
        </div>
      </main>
    </>
  );
}

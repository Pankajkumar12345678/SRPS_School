import { useEffect, useState } from "react";
import { FaCheckCircle, FaTshirt } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const FALLBACK = {
  badge: "Student Services",
  title: "School Uniform Guide",
  subtitle: "Regular, sports, and winter uniform standards for discipline and student identity.",
  stats: [
    { value: "03", label: "Uniform Modes" },
    { value: "02", label: "Seasonal Sets" },
    { value: "06", label: "House Colors" },
    { value: "100%", label: "Discipline Goal" },
  ],
  kits: [
    { name: "Regular Uniform", details: "Class-day standard dress with tie, belt, and ID card." },
    { name: "Sports Uniform", details: "House t-shirt, track lower, sports shoes, and cap." },
    { name: "Winter Uniform", details: "Sweater/blazer with approved warm layering." },
  ],
  compliance: ["ID card compulsory", "No non-uniform jackets", "Neat hair and shoes", "House badge on activity day"],
};

export default function SchoolUniformPage() {
  const [data, setData] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/page-content/school-uniform`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData({ ...FALLBACK, ...json });
      } catch {
        setError("Live content unavailable. Showing demo uniform policy.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <style>{`
        .su-page { min-height:80vh; padding:30px 14px 70px; background:linear-gradient(165deg,#fffaf0 0%,#fff 42%,#eef5ff 100%); font-family:'Jost',sans-serif; }
        .su-wrap { max-width:1120px; margin:0 auto; display:grid; gap:12px; }
        .su-hero { border-radius:16px; padding:18px; background:linear-gradient(130deg,#f59e0b,#ea580c,#2563eb); color:#fff; box-shadow:0 14px 28px rgba(15,23,42,.18); }
        .su-hero h1 { margin:0; font-size:clamp(1.45rem,2.7vw,2.15rem); }
        .su-hero p { margin:7px 0 0; color:rgba(255,255,255,.9); }
        .su-badge { display:inline-block; font-size:.75rem; border:1px solid rgba(255,255,255,.34); border-radius:999px; padding:4px 9px; margin-bottom:8px; }
        .su-stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:9px; }
        .su-stat { border:1px solid #e2e8f0; border-radius:12px; background:#fff; text-align:center; padding:10px; }
        .su-stat strong { display:block; color:#0f3d59; font-size:1.2rem; }
        .su-stat span { color:#64748b; font-size:.83rem; }
        .su-layout { display:grid; grid-template-columns:1.25fr .9fr; gap:12px; }
        .su-card { border:1px solid #dbe5ee; border-radius:14px; padding:12px; background:#fff; box-shadow:0 10px 22px rgba(15,23,42,.06); }
        .su-card h3 { margin:0 0 10px; color:#0f3d59; }
        .su-kit { border:1px solid #e2e8f0; border-radius:11px; padding:10px; margin-bottom:8px; background:#f8fbff; }
        .su-kit strong { display:flex; align-items:center; gap:8px; color:#0f172a; }
        .su-kit p { margin:6px 0 0; color:#64748b; font-size:.9rem; }
        .su-check { display:grid; gap:8px; }
        .su-check div { display:flex; gap:8px; align-items:flex-start; color:#334155; font-size:.9rem; border:1px solid #eef2f7; border-radius:10px; padding:9px; background:#fff; }
        .su-err { border:1px solid #fde68a; background:#fffbeb; color:#92400e; border-radius:10px; padding:10px; }
        @media (max-width: 920px) { .su-stats { grid-template-columns:repeat(2,minmax(0,1fr)); } .su-layout { grid-template-columns:1fr; } }
      `}</style>

      <main className="su-page">
        <div className="su-wrap">
          <header className="su-hero">
            <span className="su-badge">{data.badge}</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
          </header>

          {loading && <p>Loading uniform guide...</p>}
          {!loading && error && <div className="su-err">{error}</div>}

          <section className="su-stats">
            {data.stats?.map((item) => (
              <article key={`${item.label}-${item.value}`} className="su-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </section>

          <section className="su-layout">
            <article className="su-card">
              <h3>Uniform Kits</h3>
              {data.kits?.map((kit) => (
                <div className="su-kit" key={kit.name}>
                  <strong><FaTshirt color="#1f7ae0" />{kit.name}</strong>
                  <p>{kit.details}</p>
                </div>
              ))}
            </article>

            <article className="su-card">
              <h3>Compliance Checklist</h3>
              <div className="su-check">
                {data.compliance?.map((line) => (
                  <div key={line}><FaCheckCircle color="#16a34a" />{line}</div>
                ))}
              </div>
            </article>
          </section>
        </div>
      </main>
    </>
  );
}

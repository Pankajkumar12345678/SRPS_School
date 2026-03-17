import { useEffect, useState } from "react";
import { FaCheckCircle, FaFileAlt, FaPhoneAlt } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const FALLBACK = {
  badge: "Office Helpdesk",
  title: "Transfer Certificate",
  subtitle: "Clear process for request submission, verification, approval, and certificate handover.",
  stats: [
    { value: "03", label: "Core Steps" },
    { value: "02", label: "Checks" },
    { value: "5-7", label: "Working Days" },
    { value: "100%", label: "Record Accuracy" },
  ],
  steps: [
    { step: "Step 1", heading: "Apply", detail: "Submit signed TC request with student details." },
    { step: "Step 2", heading: "Verify", detail: "Academic and no-dues validation by school office." },
    { step: "Step 3", heading: "Issue", detail: "Final approval and certificate handover." },
  ],
  requiredDocs: ["Application letter", "Student details", "No dues", "Contact number"],
};

export default function TransferCertificatePage() {
  const [data, setData] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/page-content/transfer-certificate`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData({ ...FALLBACK, ...json });
      } catch {
        setError("Live content unavailable. Showing demo transfer process.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <style>{`
        .tc-page { min-height:80vh; padding:30px 14px 70px; background:linear-gradient(155deg,#f8fbff 0%,#eef4fa 100%); font-family:'Jost',sans-serif; }
        .tc-wrap { max-width:1120px; margin:0 auto; display:grid; gap:12px; }
        .tc-hero { border-radius:16px; padding:18px; color:#fff; background:linear-gradient(125deg,#1e293b,#0f766e,#2563eb); box-shadow:0 14px 28px rgba(15,23,42,.2); }
        .tc-badge { display:inline-block; margin-bottom:8px; border:1px solid rgba(255,255,255,.35); border-radius:999px; padding:4px 9px; font-size:.75rem; }
        .tc-hero h1 { margin:0; font-size:clamp(1.45rem,2.8vw,2.2rem); }
        .tc-hero p { margin:8px 0 0; color:rgba(255,255,255,.9); }
        .tc-stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:9px; }
        .tc-stat { border:1px solid #dbe5ee; border-radius:12px; background:#fff; text-align:center; padding:10px; }
        .tc-stat strong { display:block; color:#0f3d59; font-size:1.2rem; }
        .tc-stat span { color:#64748b; font-size:.83rem; }
        .tc-layout { display:grid; grid-template-columns:1.2fr .95fr; gap:12px; }
        .tc-card { border:1px solid #dbe5ee; border-radius:14px; background:#fff; padding:12px; box-shadow:0 10px 22px rgba(15,23,42,.06); }
        .tc-card h3 { margin:0 0 10px; color:#0f3d59; }
        .tc-step { border-left:4px solid #1f7ae0; border:1px solid #e2e8f0; border-left-width:4px; border-radius:10px; padding:10px; margin-bottom:8px; background:#f8fbff; }
        .tc-step strong { color:#1e3a8a; font-size:.78rem; }
        .tc-step h4 { margin:4px 0; color:#0f172a; }
        .tc-step p { margin:0; color:#64748b; font-size:.9rem; }
        .tc-doc { display:flex; gap:8px; align-items:flex-start; border:1px solid #eef2f7; border-radius:10px; padding:9px; margin-bottom:8px; color:#334155; background:#fff; }
        .tc-help { border:1px dashed #cbd5e1; border-radius:11px; padding:10px; color:#475569; background:#f8fbff; }
        .tc-err { border:1px solid #fde68a; background:#fffbeb; color:#92400e; border-radius:10px; padding:10px; }
        @media (max-width: 920px) { .tc-stats { grid-template-columns:repeat(2,minmax(0,1fr)); } .tc-layout { grid-template-columns:1fr; } }
      `}</style>

      <main className="tc-page">
        <div className="tc-wrap">
          <header className="tc-hero">
            <span className="tc-badge">{data.badge}</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
          </header>

          {loading && <p>Loading transfer certificate details...</p>}
          {!loading && error && <div className="tc-err">{error}</div>}

          <section className="tc-stats">
            {data.stats?.map((item) => (
              <article className="tc-stat" key={`${item.label}-${item.value}`}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </section>

          <section className="tc-layout">
            <article className="tc-card">
              <h3><FaFileAlt style={{ marginRight: 8 }} />Process Flow</h3>
              {data.steps?.map((step) => (
                <div className="tc-step" key={`${step.step}-${step.heading}`}>
                  <strong>{step.step}</strong>
                  <h4>{step.heading}</h4>
                  <p>{step.detail}</p>
                </div>
              ))}
            </article>

            <article className="tc-card">
              <h3>Required Documents</h3>
              {data.requiredDocs?.map((doc) => (
                <div className="tc-doc" key={doc}><FaCheckCircle color="#16a34a" />{doc}</div>
              ))}
              <div className="tc-help">
                <FaPhoneAlt style={{ marginRight: 7 }} />
                For status update: Contact school office during working hours.
              </div>
            </article>
          </section>
        </div>
      </main>
    </>
  );
}

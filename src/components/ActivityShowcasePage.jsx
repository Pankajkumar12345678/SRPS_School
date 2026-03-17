import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaRunning } from "react-icons/fa";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function ActivityShowcasePage({ slug, fallback }) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/page-content/${slug}`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        setData({ ...fallback, ...json });
      } catch {
        setError("Live content unavailable. Showing demo content.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const safeStats = useMemo(() => data.stats || [], [data.stats]);
  const safeFocusAreas = useMemo(() => data.focusAreas || [], [data.focusAreas]);
  const safeEvents = useMemo(() => data.events || [], [data.events]);
  const safeHighlights = useMemo(() => data.highlights || [], [data.highlights]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@300;400;500;600;700&display=swap');
        :root {
          --ap-primary: #1B6B7A;
          --ap-primary-dark: #134F5C;
          --ap-accent: #E8B97A;
          --ap-accent-dark: #C9943A;
          --ap-bg: #FAF9F6;
          --ap-muted: #6B7280;
        }
        .ap-page {
          min-height: 80vh;
          background: var(--ap-bg);
          font-family: 'Jost', sans-serif;
        }
        .ap-hero {
          position: relative;
          background: linear-gradient(135deg, var(--ap-primary-dark) 0%, var(--ap-primary) 100%);
          padding: 95px 24px 78px;
          text-align: center;
          overflow: hidden;
        }
        .ap-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: url('${fallback.heroImage || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1950&q=80"}') center/cover;
          opacity: 0.1;
        }
        .ap-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
        }
        .ap-badge {
          display: inline-block;
          background: var(--ap-accent);
          color: var(--ap-primary-dark);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 999px;
          margin-bottom: 18px;
        }
        .ap-hero h1 {
          margin: 0 0 12px;
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.3rem, 4.8vw, 3.9rem);
          line-height: 1.12;
        }
        .ap-hero p {
          margin: 0 auto;
          color: rgba(255,255,255,0.82);
          max-width: 700px;
          font-size: 1.03rem;
          font-weight: 300;
        }
        .ap-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 72px 24px 82px;
          display: grid;
          gap: 24px;
        }
        .ap-stats {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .ap-stat {
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          background: #fff;
          text-align: center;
          padding: 14px 10px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
        }
        .ap-stat strong {
          display: block;
          color: var(--ap-primary-dark);
          font-size: 1.36rem;
          font-family: 'Cormorant Garamond', serif;
        }
        .ap-stat span {
          color: var(--ap-muted);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }
        .ap-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: 1fr 1fr;
          align-items: start;
        }
        .ap-card {
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          background: #fff;
          box-shadow: 0 10px 28px rgba(15, 23, 42, 0.07);
          padding: 18px;
        }
        .ap-card h3 {
          margin: 0 0 12px;
          color: var(--ap-primary-dark);
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ap-item {
          border: 1px solid #e8eef4;
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 10px;
          background: linear-gradient(140deg,#f9fcff,#ffffff);
        }
        .ap-item h4 {
          margin: 0;
          color: #0f172a;
          font-size: 1.02rem;
          font-weight: 600;
        }
        .ap-item p {
          margin: 5px 0 0;
          color: #5b6577;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .ap-item small {
          color: var(--ap-accent-dark);
          font-weight: 700;
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .ap-chip-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .ap-chip {
          border-radius: 999px;
          padding: 6px 11px;
          border: 1px solid #f2d9b4;
          background: #fdf4e7;
          color: #9a6a2e;
          font-size: 0.8rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .ap-quote {
          border: 1px solid rgba(232, 185, 122, 0.5);
          border-radius: 14px;
          padding: 18px;
          background: linear-gradient(120deg,#fff8ef,#fff);
          color: var(--ap-primary-dark);
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.28rem;
          text-align: center;
          font-style: italic;
        }
        .ap-note {
          border: 1px solid #fde68a;
          background: #fffbeb;
          color: #92400e;
          border-radius: 10px;
          padding: 10px;
        }
        .ap-empty {
          border: 1px dashed #cbd5e1;
          color: #64748b;
          border-radius: 10px;
          padding: 10px;
          background: #f8fbff;
        }
        @media (max-width: 940px) {
          .ap-wrap { padding: 54px 18px 68px; }
          .ap-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .ap-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <main className="ap-page">
        <header className="ap-hero">
          <motion.div
            className="ap-hero-inner"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="ap-badge">{data.badge || "School Activities"}</span>
            <h1>{data.title || "Activity Page"}</h1>
            <p>{data.subtitle || "Activity details will be updated soon."}</p>
          </motion.div>
        </header>

        <div className="ap-wrap">
          {loading && <p>Loading page content...</p>}
          {!loading && error && <div className="ap-note">{error}</div>}

          <section className="ap-stats">
            {safeStats.map((stat) => (
              <motion.article
                className="ap-stat"
                key={`${stat.label}-${stat.value}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                viewport={{ once: true }}
              >
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </motion.article>
            ))}
          </section>

          <section className="ap-grid">
            <motion.article
              className="ap-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true }}
            >
              <h3><FaRunning style={{ marginRight: 8 }} />Focus Areas</h3>
              {safeFocusAreas.length === 0 && <div className="ap-empty">Focus area details will be updated.</div>}
              {safeFocusAreas.map((item) => (
                <div className="ap-item" key={item.title}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
              {safeHighlights.length > 0 && (
                <div className="ap-chip-wrap">
                  {safeHighlights.map((line) => (
                    <span className="ap-chip" key={line}>
                      <FaCheckCircle style={{ marginRight: 6 }} />
                      {line}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>

            <motion.article
              className="ap-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              viewport={{ once: true }}
            >
              <h3>Upcoming Activity Timeline</h3>
              {safeEvents.length === 0 && <div className="ap-empty">Event schedule will be updated soon.</div>}
              {safeEvents.map((event) => (
                <div className="ap-item" key={`${event.title}-${event.date}`}>
                  <small>{event.date || "Date TBD"} | {event.type || "Activity"}</small>
                  <h4>{event.title}</h4>
                  <p>{event.description}</p>
                </div>
              ))}
            </motion.article>
          </section>

          {data.quote && <div className="ap-quote">"{data.quote}"</div>}
        </div>
      </main>
    </>
  );
}

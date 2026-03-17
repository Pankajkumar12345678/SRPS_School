import { motion } from "framer-motion";
import { FaCheckCircle, FaShieldAlt, FaUserNinja } from "react-icons/fa";
import usePageContent from "../hooks/usePageContent.js";

const fallback = {
  badge: "Activities Wing",
  title: "Martial Arts",
  subtitle: "Self-defense and discipline training framework with certified supervision and stage demonstrations.",
  focusAreas: [],
  events: [],
  highlights: [],
  quote: "Martial arts builds courage with character.",
};

export default function MartialArtsPage() {
  const { data, loading, error } = usePageContent("martial-arts", fallback);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@300;400;500;600;700&display=swap');
        .ma-page { font-family:'Jost',sans-serif; background:#faf9f6; color:#0f3640; min-height:80vh; }
        .ma-hero { position:relative; padding:90px 22px 72px; text-align:center; background:linear-gradient(135deg,#134F5C,#1B6B7A); overflow:hidden; }
        .ma-hero::before { content:""; position:absolute; inset:0; background:url("https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1800&q=80") center/cover; opacity:.12; }
        .ma-hero-inner { max-width:900px; margin:0 auto; position:relative; z-index:1; }
        .ma-badge { display:inline-block; background:#E8B97A; color:#134F5C; border-radius:999px; padding:6px 14px; font-size:.68rem; font-weight:700; letter-spacing:.14em; text-transform:uppercase; margin-bottom:14px; }
        .ma-hero h1 { margin:0 0 10px; color:#fff; font-family:'Cormorant Garamond',serif; font-size:clamp(2.2rem,4.7vw,3.7rem); }
        .ma-hero p { margin:0 auto; color:rgba(255,255,255,.82); max-width:680px; }
        .ma-wrap { max-width:1150px; margin:0 auto; padding:64px 22px 80px; display:grid; gap:20px; }
        .ma-note { border:1px solid #fde68a; background:#fffbeb; color:#92400e; border-radius:10px; padding:10px; }
        .ma-grid { display:grid; gap:18px; grid-template-columns:1.1fr .9fr; }
        .ma-card { background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:16px; box-shadow:0 8px 24px rgba(15,23,42,.06); }
        .ma-card h2 { margin:0 0 12px; font-family:'Cormorant Garamond',serif; color:#134F5C; font-size:1.7rem; display:flex; gap:9px; align-items:center; }
        .ma-item { border:1px solid #e8eef4; border-radius:11px; background:#f8fbff; padding:11px; margin-bottom:8px; }
        .ma-item h3 { margin:0; font-size:1.02rem; color:#0f172a; }
        .ma-item p { margin:5px 0 0; color:#5b6577; font-size:.9rem; line-height:1.5; }
        .ma-item small { color:#C9943A; font-size:.73rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em; }
        .ma-hl { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
        .ma-chip { border:1px solid #f2d9b4; background:#fdf4e7; color:#9a6a2e; border-radius:999px; padding:6px 10px; font-size:.8rem; font-weight:700; display:inline-flex; align-items:center; gap:6px; }
        .ma-quote { background:linear-gradient(120deg,#fff8ef,#fff); border:1px solid rgba(232,185,122,.5); border-radius:13px; padding:16px; text-align:center; color:#134F5C; font-family:'Cormorant Garamond',serif; font-size:1.24rem; font-style:italic; }
        @media (max-width:940px){ .ma-grid{grid-template-columns:1fr;} }
      `}</style>
      <main className="ma-page">
        <section className="ma-hero">
          <motion.div className="ma-hero-inner" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="ma-badge">{data.badge}</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
          </motion.div>
        </section>
        <section className="ma-wrap">
          {loading && <p>Loading page content...</p>}
          {!loading && error && <div className="ma-note">{error}</div>}
          <div className="ma-grid">
            <article className="ma-card">
              <h2><FaUserNinja /> Training Modules</h2>
              {data.focusAreas?.map((x) => (
                <div className="ma-item" key={x.title}>
                  <h3>{x.title}</h3>
                  <p>{x.description}</p>
                </div>
              ))}
              <div className="ma-hl">
                {data.highlights?.map((h) => (
                  <span className="ma-chip" key={h}><FaCheckCircle />{h}</span>
                ))}
              </div>
            </article>
            <article className="ma-card">
              <h2><FaShieldAlt /> Event Timeline</h2>
              {data.events?.map((x) => (
                <div className="ma-item" key={`${x.date}-${x.title}`}>
                  <small>{x.date} | {x.type}</small>
                  <h3>{x.title}</h3>
                  <p>{x.description}</p>
                </div>
              ))}
            </article>
          </div>
          {data.quote && <div className="ma-quote">"{data.quote}"</div>}
        </section>
      </main>
    </>
  );
}

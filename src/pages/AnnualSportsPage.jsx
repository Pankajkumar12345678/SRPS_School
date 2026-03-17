import { FaCheckCircle, FaFlagCheckered, FaRunning, FaTrophy } from "react-icons/fa";
import usePageContent from "../hooks/usePageContent.js";

const fallback = {
  badge: "Sports Department",
  title: "Annual Sports",
  subtitle: "Inter-house sports ecosystem focused on teamwork, stamina, strategy, and sportsmanship.",
  stats: [],
  focusAreas: [],
  events: [],
  highlights: [],
  quote: "Sports shape attitude as much as ability.",
};

export default function AnnualSportsPage() {
  const { data, loading, error } = usePageContent("annual-sports", fallback);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@300;400;500;600;700&display=swap');
        .as-page{font-family:'Jost',sans-serif;background:#faf9f6;color:#12353f;min-height:80vh;}
        .as-hero{padding:92px 22px 70px;background:linear-gradient(135deg,#134F5C,#1B6B7A);text-align:center;position:relative;overflow:hidden;}
        .as-hero:before{content:"";position:absolute;inset:0;background:url("https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1800&q=80") center/cover;opacity:.12;}
        .as-hero-inner{position:relative;z-index:1;max-width:900px;margin:0 auto;}
        .as-badge{display:inline-block;background:#E8B97A;color:#134F5C;border-radius:999px;padding:6px 14px;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px;}
        .as-hero h1{margin:0 0 10px;color:#fff;font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,4.7vw,3.8rem);}
        .as-hero p{margin:0 auto;max-width:700px;color:rgba(255,255,255,.84);}
        .as-wrap{max-width:1160px;margin:0 auto;padding:60px 22px 82px;display:grid;gap:18px;}
        .as-note{border:1px solid #fde68a;background:#fffbeb;color:#92400e;border-radius:10px;padding:10px;}
        .as-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;}
        .as-stat{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:11px;text-align:center;box-shadow:0 6px 22px rgba(15,23,42,.06);}
        .as-stat strong{display:block;color:#134F5C;font-family:'Cormorant Garamond',serif;font-size:1.35rem;}
        .as-stat span{font-size:.8rem;color:#6b7280;text-transform:uppercase;letter-spacing:.05em;font-weight:600;}
        .as-main{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .as-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:15px;box-shadow:0 8px 24px rgba(15,23,42,.06);}
        .as-card h2{margin:0 0 10px;font-family:'Cormorant Garamond',serif;color:#134F5C;font-size:1.65rem;display:flex;gap:8px;align-items:center;}
        .as-line{border-left:3px solid #E8B97A;padding-left:10px;margin-bottom:10px;}
        .as-line h3{margin:0;font-size:1rem;color:#0f172a;}
        .as-line p{margin:4px 0 0;color:#5b6577;font-size:.9rem;}
        .as-line small{color:#C9943A;font-weight:700;text-transform:uppercase;font-size:.72rem;}
        .as-list{display:grid;gap:8px;}
        .as-pill{border:1px solid #f2d9b4;background:#fdf4e7;color:#9a6a2e;border-radius:10px;padding:8px 10px;font-size:.84rem;font-weight:700;display:flex;align-items:center;gap:7px;}
        .as-quote{background:linear-gradient(120deg,#fff8ef,#fff);border:1px solid rgba(232,185,122,.5);border-radius:12px;padding:15px;text-align:center;color:#134F5C;font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-style:italic;}
        @media(max-width:950px){.as-stats{grid-template-columns:repeat(2,minmax(0,1fr));}.as-main{grid-template-columns:1fr;}}
      `}</style>
      <main className="as-page">
        <section className="as-hero">
          <div className="as-hero-inner">
            <span className="as-badge">{data.badge}</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
          </div>
        </section>
        <section className="as-wrap">
          {loading && <p>Loading page content...</p>}
          {!loading && error && <div className="as-note">{error}</div>}
          <div className="as-stats">
            {data.stats?.map((s) => (
              <div className="as-stat" key={`${s.label}-${s.value}`}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="as-main">
            <article className="as-card">
              <h2><FaFlagCheckered /> Sports Calendar</h2>
              {data.events?.map((x) => (
                <div className="as-line" key={`${x.date}-${x.title}`}>
                  <small>{x.date} | {x.type}</small>
                  <h3>{x.title}</h3>
                  <p>{x.description}</p>
                </div>
              ))}
            </article>
            <article className="as-card">
              <h2><FaRunning /> Program Focus</h2>
              <div className="as-list">
                {data.focusAreas?.map((x) => (
                  <div className="as-pill" key={x.title}><FaCheckCircle />{x.title}</div>
                ))}
                {data.highlights?.map((x) => (
                  <div className="as-pill" key={x}><FaTrophy />{x}</div>
                ))}
              </div>
            </article>
          </div>
          {data.quote && <div className="as-quote">"{data.quote}"</div>}
        </section>
      </main>
    </>
  );
}

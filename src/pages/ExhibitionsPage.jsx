import { FaCheckCircle, FaLightbulb, FaPalette, FaProjectDiagram } from "react-icons/fa";
import usePageContent from "../hooks/usePageContent.js";

const fallback = {
  badge: "Innovation Cell",
  title: "Exhibitions",
  subtitle: "Model, art, and concept display platform where students present ideas with clarity and confidence.",
  focusAreas: [],
  events: [],
  highlights: [],
  quote: "Exhibitions convert classroom learning into visible impact.",
};

export default function ExhibitionsPage() {
  const { data, loading, error } = usePageContent("exhibitions", fallback);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@300;400;500;600;700&display=swap');
        .ex-page{font-family:'Jost',sans-serif;background:#faf9f6;color:#12353f;min-height:80vh;}
        .ex-hero{padding:88px 22px 70px;background:linear-gradient(135deg,#134F5C,#1B6B7A);text-align:center;position:relative;overflow:hidden;}
        .ex-hero:before{content:"";position:absolute;inset:0;background:url("https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1800&q=80") center/cover;opacity:.12;}
        .ex-in{position:relative;z-index:1;max-width:920px;margin:0 auto;}
        .ex-badge{display:inline-block;background:#E8B97A;color:#134F5C;border-radius:999px;padding:6px 14px;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:12px;}
        .ex-hero h1{margin:0 0 10px;color:#fff;font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,4.7vw,3.8rem);}
        .ex-hero p{margin:0 auto;max-width:720px;color:rgba(255,255,255,.84);}
        .ex-wrap{max-width:1160px;margin:0 auto;padding:62px 22px 82px;display:grid;gap:20px;}
        .ex-note{border:1px solid #fde68a;background:#fffbeb;color:#92400e;border-radius:10px;padding:10px;}
        .ex-layout{display:grid;grid-template-columns:1fr .95fr;gap:18px;}
        .ex-card{background:#fff;border:1px solid #e2e8f0;border-radius:15px;padding:16px;box-shadow:0 8px 24px rgba(15,23,42,.06);}
        .ex-card h2{margin:0 0 11px;color:#134F5C;font-size:1.62rem;font-family:'Cormorant Garamond',serif;display:flex;align-items:center;gap:8px;}
        .ex-box{border:1px solid #e8eef4;border-radius:11px;padding:11px;background:#f8fbff;margin-bottom:9px;}
        .ex-box h3{margin:0;font-size:1rem;color:#0f172a;}
        .ex-box p{margin:5px 0 0;color:#5b6577;font-size:.9rem;line-height:1.5;}
        .ex-date{display:inline-block;color:#C9943A;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px;}
        .ex-tags{display:flex;flex-wrap:wrap;gap:8px;}
        .ex-tag{border:1px solid #f2d9b4;background:#fdf4e7;color:#9a6a2e;border-radius:999px;padding:6px 10px;font-size:.8rem;font-weight:700;display:flex;gap:6px;align-items:center;}
        .ex-quote{background:linear-gradient(120deg,#fff8ef,#fff);border:1px solid rgba(232,185,122,.5);border-radius:13px;padding:15px;text-align:center;color:#134F5C;font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-style:italic;}
        @media(max-width:940px){.ex-layout{grid-template-columns:1fr;}}
      `}</style>
      <main className="ex-page">
        <section className="ex-hero">
          <div className="ex-in">
            <span className="ex-badge">{data.badge}</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
          </div>
        </section>
        <section className="ex-wrap">
          {loading && <p>Loading page content...</p>}
          {!loading && error && <div className="ex-note">{error}</div>}
          <div className="ex-layout">
            <article className="ex-card">
              <h2><FaProjectDiagram /> Exhibition Tracks</h2>
              {data.focusAreas?.map((x) => (
                <div className="ex-box" key={x.title}>
                  <h3>{x.title}</h3>
                  <p>{x.description}</p>
                </div>
              ))}
            </article>
            <article className="ex-card">
              <h2><FaLightbulb /> Curated Schedule</h2>
              {data.events?.map((x) => (
                <div className="ex-box" key={`${x.date}-${x.title}`}>
                  <span className="ex-date">{x.date} | {x.type}</span>
                  <h3>{x.title}</h3>
                  <p>{x.description}</p>
                </div>
              ))}
            </article>
          </div>
          <article className="ex-card">
            <h2><FaPalette /> Highlights</h2>
            <div className="ex-tags">
              {data.highlights?.map((h) => (
                <span className="ex-tag" key={h}><FaCheckCircle />{h}</span>
              ))}
            </div>
          </article>
          {data.quote && <div className="ex-quote">"{data.quote}"</div>}
        </section>
      </main>
    </>
  );
}

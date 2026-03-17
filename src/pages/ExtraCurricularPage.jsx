import { FaCheckCircle, FaPuzzlePiece, FaStar } from "react-icons/fa";
import usePageContent from "../hooks/usePageContent.js";

const fallback = {
  badge: "Holistic Growth",
  title: "Extra Curricular",
  subtitle: "Club-based skill development beyond academics for confidence, creativity, and leadership.",
  focusAreas: [],
  events: [],
  highlights: [],
  quote: "Extra-curricular work transforms talent into character.",
};

export default function ExtraCurricularPage() {
  const { data, loading, error } = usePageContent("extra-curricular", fallback);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@300;400;500;600;700&display=swap');
        .ec-page{font-family:'Jost',sans-serif;background:#faf9f6;color:#123742;min-height:80vh;}
        .ec-hero{padding:90px 22px 72px;background:linear-gradient(135deg,#134F5C,#1B6B7A);text-align:center;position:relative;overflow:hidden;}
        .ec-hero:before{content:"";position:absolute;inset:0;background:url("https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1800&q=80") center/cover;opacity:.12;}
        .ec-in{position:relative;z-index:1;max-width:900px;margin:0 auto;}
        .ec-badge{display:inline-block;background:#E8B97A;color:#134F5C;border-radius:999px;padding:6px 14px;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px;}
        .ec-hero h1{margin:0 0 10px;color:#fff;font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,4.7vw,3.8rem);}
        .ec-hero p{margin:0 auto;max-width:700px;color:rgba(255,255,255,.84);}
        .ec-wrap{max-width:1160px;margin:0 auto;padding:62px 22px 82px;display:grid;gap:20px;}
        .ec-note{border:1px solid #fde68a;background:#fffbeb;color:#92400e;border-radius:10px;padding:10px;}
        .ec-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
        .ec-card{background:#fff;border:1px solid #e2e8f0;border-radius:15px;padding:16px;box-shadow:0 8px 24px rgba(15,23,42,.06);}
        .ec-card h2{margin:0 0 12px;font-family:'Cormorant Garamond',serif;color:#134F5C;font-size:1.64rem;display:flex;gap:8px;align-items:center;}
        .ec-item{border:1px solid #e8eef4;border-radius:11px;background:#f8fbff;padding:11px;margin-bottom:9px;}
        .ec-item h3{margin:0;font-size:1rem;color:#0f172a;}
        .ec-item p{margin:5px 0 0;color:#5b6577;font-size:.9rem;line-height:1.5;}
        .ec-item small{color:#C9943A;font-weight:700;font-size:.72rem;text-transform:uppercase;letter-spacing:.04em;}
        .ec-tags{display:flex;flex-wrap:wrap;gap:8px;}
        .ec-tag{border:1px solid #f2d9b4;background:#fdf4e7;color:#9a6a2e;border-radius:999px;padding:6px 10px;font-size:.8rem;font-weight:700;display:inline-flex;gap:6px;align-items:center;}
        .ec-quote{background:linear-gradient(120deg,#fff8ef,#fff);border:1px solid rgba(232,185,122,.5);border-radius:13px;padding:15px;text-align:center;color:#134F5C;font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-style:italic;}
        @media(max-width:940px){.ec-grid{grid-template-columns:1fr;}}
      `}</style>
      <main className="ec-page">
        <section className="ec-hero">
          <div className="ec-in">
            <span className="ec-badge">{data.badge}</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
          </div>
        </section>
        <section className="ec-wrap">
          {loading && <p>Loading page content...</p>}
          {!loading && error && <div className="ec-note">{error}</div>}
          <div className="ec-grid">
            <article className="ec-card">
              <h2><FaPuzzlePiece /> Club Pillars</h2>
              {data.focusAreas?.map((x) => (
                <div className="ec-item" key={x.title}>
                  <h3>{x.title}</h3>
                  <p>{x.description}</p>
                </div>
              ))}
            </article>
            <article className="ec-card">
              <h2><FaStar /> Activity Calendar</h2>
              {data.events?.map((x) => (
                <div className="ec-item" key={`${x.date}-${x.title}`}>
                  <small>{x.date} | {x.type}</small>
                  <h3>{x.title}</h3>
                  <p>{x.description}</p>
                </div>
              ))}
            </article>
          </div>
          <article className="ec-card">
            <h2><FaCheckCircle /> Skill Outcomes</h2>
            <div className="ec-tags">
              {data.highlights?.map((h) => (
                <span className="ec-tag" key={h}><FaCheckCircle />{h}</span>
              ))}
            </div>
          </article>
          {data.quote && <div className="ec-quote">"{data.quote}"</div>}
        </section>
      </main>
    </>
  );
}

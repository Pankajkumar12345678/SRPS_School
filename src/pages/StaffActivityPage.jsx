import { FaCheckCircle, FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import usePageContent from "../hooks/usePageContent.js";

const fallback = {
  badge: "Faculty Development",
  title: "Staff Activity",
  subtitle: "Professional upskilling, wellness, and collaborative teaching initiatives for school staff.",
  focusAreas: [],
  events: [],
  highlights: [],
  quote: "Empowered teachers create empowered classrooms.",
};

export default function StaffActivityPage() {
  const { data, loading, error } = usePageContent("staff-activity", fallback);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@300;400;500;600;700&display=swap');
        .sf-page{font-family:'Jost',sans-serif;background:#faf9f6;color:#123742;min-height:80vh;}
        .sf-hero{padding:90px 22px 72px;background:linear-gradient(135deg,#134F5C,#1B6B7A);text-align:center;position:relative;overflow:hidden;}
        .sf-hero:before{content:"";position:absolute;inset:0;background:url("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1800&q=80") center/cover;opacity:.12;}
        .sf-in{position:relative;z-index:1;max-width:900px;margin:0 auto;}
        .sf-badge{display:inline-block;background:#E8B97A;color:#134F5C;border-radius:999px;padding:6px 14px;font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px;}
        .sf-hero h1{margin:0 0 10px;color:#fff;font-family:'Cormorant Garamond',serif;font-size:clamp(2.2rem,4.7vw,3.8rem);}
        .sf-hero p{margin:0 auto;max-width:700px;color:rgba(255,255,255,.84);}
        .sf-wrap{max-width:1160px;margin:0 auto;padding:62px 22px 82px;display:grid;gap:20px;}
        .sf-note{border:1px solid #fde68a;background:#fffbeb;color:#92400e;border-radius:10px;padding:10px;}
        .sf-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;}
        .sf-card{background:#fff;border:1px solid #e2e8f0;border-radius:15px;padding:16px;box-shadow:0 8px 24px rgba(15,23,42,.06);}
        .sf-card h2{margin:0 0 12px;font-family:'Cormorant Garamond',serif;color:#134F5C;font-size:1.64rem;display:flex;gap:8px;align-items:center;}
        .sf-entry{border:1px solid #e8eef4;border-radius:11px;background:#f8fbff;padding:11px;margin-bottom:9px;}
        .sf-entry h3{margin:0;font-size:1rem;color:#0f172a;}
        .sf-entry p{margin:5px 0 0;color:#5b6577;font-size:.9rem;line-height:1.5;}
        .sf-entry small{color:#C9943A;font-weight:700;font-size:.72rem;text-transform:uppercase;letter-spacing:.04em;}
        .sf-badges{display:flex;flex-wrap:wrap;gap:8px;}
        .sf-badge2{border:1px solid #f2d9b4;background:#fdf4e7;color:#9a6a2e;border-radius:999px;padding:6px 10px;font-size:.8rem;font-weight:700;display:inline-flex;gap:6px;align-items:center;}
        .sf-quote{background:linear-gradient(120deg,#fff8ef,#fff);border:1px solid rgba(232,185,122,.5);border-radius:13px;padding:15px;text-align:center;color:#134F5C;font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-style:italic;}
        @media(max-width:940px){.sf-grid{grid-template-columns:1fr;}}
      `}</style>
      <main className="sf-page">
        <section className="sf-hero">
          <div className="sf-in">
            <span className="sf-badge">{data.badge}</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
          </div>
        </section>
        <section className="sf-wrap">
          {loading && <p>Loading page content...</p>}
          {!loading && error && <div className="sf-note">{error}</div>}
          <div className="sf-grid">
            <article className="sf-card">
              <h2><FaChalkboardTeacher /> Development Pillars</h2>
              {data.focusAreas?.map((x) => (
                <div className="sf-entry" key={x.title}>
                  <h3>{x.title}</h3>
                  <p>{x.description}</p>
                </div>
              ))}
            </article>
            <article className="sf-card">
              <h2><FaUsers /> Activity Timeline</h2>
              {data.events?.map((x) => (
                <div className="sf-entry" key={`${x.date}-${x.title}`}>
                  <small>{x.date} | {x.type}</small>
                  <h3>{x.title}</h3>
                  <p>{x.description}</p>
                </div>
              ))}
            </article>
          </div>
          <article className="sf-card">
            <h2><FaCheckCircle /> Growth Outcomes</h2>
            <div className="sf-badges">
              {data.highlights?.map((h) => (
                <span className="sf-badge2" key={h}><FaCheckCircle />{h}</span>
              ))}
            </div>
          </article>
          {data.quote && <div className="sf-quote">"{data.quote}"</div>}
        </section>
      </main>
    </>
  );
}

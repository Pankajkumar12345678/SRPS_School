import { motion } from "framer-motion";
import Hero from "../components/Hero.jsx";
import Stats from "../components/Stats.jsx";
import WhyUs from "../components/Why_Us.jsx";
import About from "../components/About.jsx";
import Amenities from "../components/Amenities.jsx";
import Testimonials from "../components/Testimonials.jsx";
import Notices from "../components/Notices.jsx";
import Map from "../components/Map.jsx";
import ATLSection from "../components/ATLSection.jsx";
import PrincipalDesk from "../components/PrincipalDesk.jsx";

const showcaseCards = [
  {
    title: "Smart Classrooms",
    text: "Interactive panels, projector-based lessons, and blended teaching methods for conceptual clarity.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Creative Arts Studio",
    text: "Hands-on learning for music, visual arts, and theatre with guided mentorship and annual showcases.",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Sports Excellence Arena",
    text: "Structured fitness, athletics, and team-sport training with regular inter-house competitions.",
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80",
  },
];

const homeJourney = [
  { title: "Discover", desc: "Parents explore curriculum, facilities, and school values through guided interactions." },
  { title: "Apply", desc: "Simple, transparent process for application, document submission, and counselling support." },
  { title: "Onboard", desc: "Student orientation, class mapping, and an early success plan with teachers." },
  { title: "Grow", desc: "Continuous progress tracking with academics, co-curricular growth, and leadership pathways." },
];

const innovationTracks = [
  { label: "Academics", value: "STEM + Humanities", color: "#f97316" },
  { label: "Competency", value: "Life Skills + Communication", color: "#16a34a" },
  { label: "Technology", value: "Coding + Robotics + AI Basics", color: "#eab308" },
  { label: "Wellness", value: "Sports + Mental Wellbeing", color: "#ef4444" },
];

function HomeEnhancements() {
  const fadeUp = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  return (
    <section className="homex-wrap">
      <style>{`
        .homex-wrap { position: relative; background: linear-gradient(180deg, #f6fbff 0%, #eff6ff 45%, #fffaf2 100%); padding: 32px 14px 70px; overflow: hidden; }
        .homex-wrap:before, .homex-wrap:after { content:""; position:absolute; filter: blur(38px); pointer-events:none; opacity:.38; }
        .homex-wrap:before { width: 320px; height: 320px; background: #fbbf24; top: -90px; right: -120px; }
        .homex-wrap:after { width: 300px; height: 300px; background: #34d399; bottom: -120px; left: -90px; }
        .homex-shell { max-width: 1240px; margin: 0 auto; display: grid; gap: 16px; }
        .homex-card { border: 1px solid #d9e5f1; border-radius: 18px; background: #fff; box-shadow: 0 14px 34px rgba(15,23,42,.08); overflow: hidden; position:relative; z-index:1; }
        .homex-spot { display:grid; grid-template-columns:1.2fr .8fr; gap:12px; padding: 16px; background: linear-gradient(130deg, #0f766e, #2563eb 58%, #7c3aed); color:#fff; }
        .homex-spot h2 { margin:0; font-size: clamp(1.2rem, 2.6vw, 1.8rem); }
        .homex-spot p { margin:8px 0 0; opacity:.92; line-height:1.5; font-size:.92rem; }
        .homex-pill-wrap { display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }
        .homex-pill { border:1px solid rgba(255,255,255,.35); border-radius:999px; padding:5px 10px; font-size:.78rem; font-weight:700; background:rgba(255,255,255,.13); }
        .homex-spot-right { border:1px solid rgba(255,255,255,.24); border-radius:14px; padding:12px; background:rgba(255,255,255,.08); backdrop-filter: blur(7px); }
        .homex-spot-right h3 { margin:0 0 8px; font-size:1rem; }
        .homex-kpis { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; }
        .homex-kpi { border:1px solid rgba(255,255,255,.26); border-radius:10px; padding:8px; background:rgba(255,255,255,.12); }
        .homex-kpi strong { display:block; font-size:1.05rem; }
        .homex-kpi span { font-size:.77rem; opacity:.9; }
        .homex-head { padding: 20px 20px 14px; border-bottom: 1px solid #edf2f7; }
        .homex-head h2 { margin: 0; color: #0f3d59; font-size: clamp(1.24rem, 2.5vw, 1.7rem); }
        .homex-head p { margin: 6px 0 0; color: #64748b; font-size: .95rem; }
        .homex-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 12px; padding: 14px; }
        .homex-media { border: 1px solid #dfe9f3; border-radius: 14px; overflow: hidden; background: #fff; }
        .homex-media:nth-child(2) { transform: translateY(8px); }
        .homex-media img { width: 100%; height: 190px; object-fit: cover; display: block; }
        .homex-media-b { padding: 12px; }
        .homex-media-b h3 { margin: 0 0 5px; color: #113b56; font-size: 1.03rem; }
        .homex-media-b p { margin: 0; color: #64748b; font-size: .88rem; line-height: 1.45; }
        .homex-diagram { padding: 16px; display: grid; gap: 10px; }
        .homex-step { display: grid; grid-template-columns: 40px 1fr; gap: 10px; align-items: start; }
        .homex-dot { width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center; font-weight: 800; color: #fff; background: linear-gradient(135deg, #f59e0b, #ef4444); box-shadow: 0 6px 14px rgba(239,68,68,.35); }
        .homex-step h4 { margin: 0; color: #102a43; font-size: .96rem; }
        .homex-step p { margin: 4px 0 0; color: #64748b; font-size: .86rem; }
        .homex-track { padding: 14px; display: grid; gap: 8px; }
        .homex-track-row { border: 1px solid #e5edf6; border-radius: 12px; overflow: hidden; background: #fff; }
        .homex-track-top { display: flex; justify-content: space-between; gap: 10px; align-items: center; padding: 10px 12px; font-weight: 700; color: #1f3c56; font-size: .9rem; }
        .homex-track-bar { height: 7px; }
        .homex-data { padding: 14px; display:grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .homex-data-card { border:1px solid #e2e8f0; border-radius:14px; background:#fff; padding:12px; }
        .homex-data-card h3 { margin:0 0 7px; color:#113b56; font-size:1rem; }
        .homex-ring { width: 124px; height:124px; margin: 6px auto 10px; border-radius:50%; background: conic-gradient(#f97316 0 34%, #16a34a 34% 63%, #eab308 63% 82%, #ef4444 82% 100%); display:grid; place-items:center; }
        .homex-ring:before { content:""; width:84px; height:84px; border-radius:50%; background:#fff; border:1px solid #e2e8f0; }
        .homex-leg { display:grid; gap:5px; font-size:.82rem; color:#475569; }
        .homex-leg span { display:flex; align-items:center; gap:7px; }
        .homex-dot-l { width:10px; height:10px; border-radius:50%; }
        .homex-two { display: grid; grid-template-columns: 1.1fr .9fr; gap: 12px; padding: 14px; }
        .homex-panel { border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; background: linear-gradient(145deg, #ffffff, #f8fbff); }
        .homex-panel h3 { margin: 0 0 8px; color: #113b56; font-size: 1.02rem; }
        .homex-list { margin: 0; padding-left: 16px; display: grid; gap: 6px; color: #475569; font-size: .88rem; }
        .homex-cta { padding: 16px; display: grid; grid-template-columns: 1fr auto auto; gap: 10px; align-items: center; background: linear-gradient(135deg, #0f766e, #2563eb); color: #fff; }
        .homex-cta h3 { margin: 0; font-size: 1.1rem; }
        .homex-cta p { margin: 5px 0 0; opacity: .9; font-size: .9rem; }
        .homex-btn { border: none; border-radius: 10px; padding: 9px 12px; font-weight: 800; cursor: pointer; font-size: .85rem; }
        .homex-btn.light { background: #fff; color: #113b56; }
        .homex-btn.warn { background: #facc15; color: #422006; }
        @media (max-width: 1024px) {
          .homex-grid, .homex-two, .homex-cta, .homex-spot, .homex-data { grid-template-columns: 1fr; }
          .homex-media:nth-child(2) { transform: none; }
        }
      `}</style>

      <div className="homex-shell">
        <motion.article className="homex-card" {...fadeUp}>
          <div className="homex-spot">
            <div>
              <h2>Future-Ready Learning Ecosystem</h2>
              <p>Modern classroom delivery, strong mentor support, project-based activities, and student wellbeing initiatives in one integrated school journey.</p>
              <div className="homex-pill-wrap">
                <span className="homex-pill">CBSE Aligned</span>
                <span className="homex-pill">Skill Focused</span>
                <span className="homex-pill">Parent Connected</span>
                <span className="homex-pill">Competition Ready</span>
              </div>
            </div>
            <div className="homex-spot-right">
              <h3>Academic Snapshot</h3>
              <div className="homex-kpis">
                <div className="homex-kpi"><strong>24+</strong><span>Smart Labs & Rooms</span></div>
                <div className="homex-kpi"><strong>35+</strong><span>Programs & Clubs</span></div>
                <div className="homex-kpi"><strong>12+</strong><span>Olympiad Streams</span></div>
                <div className="homex-kpi"><strong>100%</strong><span>Student Support Cells</span></div>
              </div>
            </div>
          </div>
        </motion.article>

        <motion.article className="homex-card" {...fadeUp}>
          <div className="homex-head">
            <h2>Campus Experience Gallery</h2>
            <p>Placeholder visuals and highlights. Replace these images/content with your real media anytime.</p>
          </div>
          <div className="homex-grid">
            {showcaseCards.map((card) => (
              <div key={card.title} className="homex-media">
                <img src={card.image} alt={card.title} />
                <div className="homex-media-b">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article className="homex-card" {...fadeUp}>
          <div className="homex-head">
            <h2>Student Growth Journey</h2>
            <p>Diagram-style roadmap to communicate your school journey in a user-friendly format.</p>
          </div>
          <div className="homex-diagram">
            {homeJourney.map((step, idx) => (
              <div key={step.title} className="homex-step">
                <div className="homex-dot">{idx + 1}</div>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article className="homex-card" {...fadeUp}>
          <div className="homex-head">
            <h2>Innovation Tracks</h2>
            <p>Balanced development framework with academics, skill, technology and wellness.</p>
          </div>
          <div className="homex-track">
            {innovationTracks.map((track, i) => (
              <div key={track.label} className="homex-track-row">
                <div className="homex-track-top">
                  <span>{track.label}</span>
                  <span>{track.value}</span>
                </div>
                <div className="homex-track-bar" style={{ width: `${65 + i * 8}%`, background: track.color }} />
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article className="homex-card" {...fadeUp}>
          <div className="homex-head">
            <h2>Performance & Engagement Diagram</h2>
            <p>Visual infographic block to present yearly goals, outcomes, and participation metrics.</p>
          </div>
          <div className="homex-data">
            <div className="homex-data-card">
              <h3>Development Mix</h3>
              <div className="homex-ring" />
              <div className="homex-leg">
                <span><i className="homex-dot-l" style={{background:"#f97316"}} /> Academics</span>
                <span><i className="homex-dot-l" style={{background:"#16a34a"}} /> Co-curricular</span>
                <span><i className="homex-dot-l" style={{background:"#eab308"}} /> Competitions</span>
                <span><i className="homex-dot-l" style={{background:"#ef4444"}} /> Wellness</span>
              </div>
            </div>
            <div className="homex-data-card">
              <h3>Monthly Focus Timeline</h3>
              <ul className="homex-list">
                <li>April–May: Foundation assessments + orientation track</li>
                <li>July–August: Project fair + concept reinforcement</li>
                <li>September–October: Mid-term review + skill mapping</li>
                <li>November–December: Olympiad prep + mentoring cycles</li>
                <li>January–March: Final mastery roadmap + celebration week</li>
              </ul>
            </div>
          </div>
        </motion.article>

        <motion.article className="homex-card" {...fadeUp}>
          <div className="homex-head">
            <h2>Parent Information Hub</h2>
            <p>Quick, structured communication zones for parents and students.</p>
          </div>
          <div className="homex-two">
            <div className="homex-panel">
              <h3>Academic & Performance Snapshot</h3>
              <ul className="homex-list">
                <li>Weekly curriculum goals and concept checkpoints</li>
                <li>Class-wise assessment planner and homework tracker</li>
                <li>Teacher mentoring notes and improvement suggestions</li>
                <li>Skill indicators for communication and leadership</li>
              </ul>
            </div>
            <div className="homex-panel">
              <h3>Safety & Operations</h3>
              <ul className="homex-list">
                <li>Transport routes with real-time parent notification model</li>
                <li>Medical and emergency response protocol highlights</li>
                <li>Campus discipline framework and attendance alerts</li>
                <li>Structured student wellbeing and counselling support</li>
              </ul>
            </div>
          </div>
        </motion.article>

        <motion.article className="homex-card" {...fadeUp}>
          <div className="homex-cta">
            <div>
              <h3>Admissions, Activities & Digital Learning Updates</h3>
              <p>Keep this section for your future dynamic CMS/API content: events, forms, notices, and announcements.</p>
            </div>
            <button className="homex-btn light">Explore Programs</button>
            <button className="homex-btn warn">Download Brochure</button>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <ATLSection />
      <WhyUs />
      <About />
      <Amenities />
      <PrincipalDesk />
      <Testimonials />
      <Notices />
      <HomeEnhancements />
      <Map />
    </>
  );
};

export default Home;

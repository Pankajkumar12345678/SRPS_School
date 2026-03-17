import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaQuoteLeft,
  FaStar,
  FaCalendarAlt,
  FaAward,
  FaGraduationCap,
  FaBook,
  FaHeart,
  FaTrophy,
  FaUsers,
  FaHistory,
} from "react-icons/fa";

// ═══════════════════════════════════════════════════════════════════════════
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Jost:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;700&display=swap');

:root {
  --td:#134F5C; --t:#1B6B7A; --tm:#2a8a9a; --tl:#d6edf0; --tp:#edf7f9;
  --g:#E8B97A;  --gb:#F5D08A; --gd:#C9943A; --gp:#fdf4e7;
  --cr:#FAF7F2; --w:#FFFFFF;
  --tx:#0f3640; --mu:#6b8f96;
}

*{box-sizing:border-box;}
.head{font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--w);}
.head h1,.head h2,.head h3,.head h4{font-family:'Cormorant Garamond',serif;}

.sec{padding:5rem 1.25rem;}
.inner{max-width:1100px;margin:0 auto;}
.center{text-align:center;}

.chip{display:inline-flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gd);margin-bottom:.7rem;}
.chip::before{content:'';display:block;width:22px;height:2px;background:var(--g);border-radius:2px;}
.sec-h{font-size:clamp(1.8rem,3vw,2.6rem);color:var(--td);margin-bottom:1rem;line-height:1.15;}
.sec-sub{color:var(--mu);font-size:.97rem;line-height:1.75;max-width:620px;display:block;}

/* ── HERO ── */
.hero{position:relative;background:var(--td);padding:6rem 1rem 5rem;overflow:hidden;text-align:center;}
.hero::before{content:'';position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1950&q=80') center/cover;opacity:.1;}
.hero-badge{display:inline-block;background:var(--g);color:var(--td);font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:.35rem 1.1rem;border-radius:2rem;margin-bottom:1.25rem;}
.hero h1{font-size:clamp(2rem,4.5vw,3.2rem);color:var(--w);line-height:1.15;margin-bottom:1rem;}
.hero p{color:rgba(255,255,255,.75);font-size:1.05rem;max-width:560px;margin:0 auto;font-weight:300;}
.hero-arc{position:absolute;bottom:-2px;left:0;right:0;height:70px;background:var(--w);clip-path:ellipse(55% 100% at 50% 100%);}

/* ── PROFILE ── */
.profile-sec{background:var(--cr);}
.profile-grid{display:grid;grid-template-columns:350px 1fr;gap:4rem;align-items:center;}
@media(max-width:800px){.profile-grid{grid-template-columns:1fr;}}
.profile-img{position:relative;}
.profile-img img{width:100%;border-radius:1.25rem;box-shadow:0 24px 64px rgba(19,79,92,.18);}
.profile-img::before{content:'';position:absolute;top:-15px;left:-15px;width:60px;height:60px;border:3px solid var(--g);border-radius:50%;z-index:-1;}
.profile-img::after{content:'';position:absolute;bottom:-15px;right:-15px;width:80px;height:80px;background:var(--g);border-radius:.75rem;z-index:-1;opacity:.3;}
.profile-content h2{font-size:1.8rem;color:var(--td);margin-bottom:.5rem;}
.profile-role{color:var(--gd);font-weight:600;font-size:1rem;margin-bottom:1.5rem;}
.profile-text{color:#5a7c85;line-height:1.9;font-size:.98rem;margin-bottom:1rem;}
.profile-years{display:flex;align-items:center;gap:.5rem;color:var(--mu);font-size:.9rem;margin-top:1.5rem;}
.profile-years svg{color:var(--g);}

/* ── TIMELINE ── */
.timeline-sec{background:var(--w);}
.timeline{position:relative;max-width:800px;margin:3rem auto 0;}
.timeline::before{content:'';position:absolute;left:50%;transform:translateX(-50%);width:2px;height:100%;background:var(--tl);top:0;}
.timeline-item{display:flex;gap:2rem;margin-bottom:2.5rem;position:relative;}
.timeline-item:nth-child(odd){flex-direction:row-reverse;}
.timeline-item:nth-child(odd) .timeline-content{text-align:right;}
@media(max-width:600px){.timeline::before{left:20px;}.timeline-item{flex-direction:column !important;padding-left:50px;}.timeline-item .timeline-content{text-align:left !important;}}
.timeline-dot{position:absolute;left:50%;transform:translateX(-50%);width:20px;height:20px;background:var(--g);border-radius:50%;border:4px solid var(--w);box-shadow:0 0 0 2px var(--g);z-index:1;}
@media(max-width:600px){.timeline-dot{left:20px;}}
.timeline-content{background:var(--cr);border-radius:1rem;padding:1.5rem;flex:1;box-shadow:0 4px 16px rgba(19,79,92,.08);}
.timeline-year{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:var(--td);font-weight:700;margin-bottom:.5rem;}
.timeline-content p{color:var(--mu);font-size:.9rem;line-height:1.7;margin:0;}

/* ── ACHIEVEMENTS ── */
.ach-sec{background:var(--cr);}
.ach-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;margin-top:3rem;}
.ach-card{background:var(--w);border-radius:1rem;padding:2rem;text-align:center;transition:transform .3s,box-shadow .3s;}
.ach-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(19,79,92,.1);}
.ach-icon{width:70px;height:70px;border-radius:50%;background:var(--tl);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.8rem;color:var(--t);}
.ach-card h4{font-size:1.15rem;color:var(--td);margin-bottom:.5rem;}
.ach-card p{color:var(--mu);font-size:.9rem;line-height:1.7;margin:0;}

/* ── LEGACY ── */
.legacy-sec{background:var(--w);}
.legacy-card{background:var(--cr);border-radius:1.25rem;padding:3rem;text-align:center;max-width:800px;margin:0 auto;}
.legacy-card h2{font-size:1.8rem;color:var(--td);margin-bottom:1rem;}
.legacy-card p{color:#5a7c85;line-height:1.9;font-size:1rem;margin-bottom:1.5rem;}
.legacy-sign{color:var(--gd);font-size:1.1rem;font-weight:600;font-family:'Cormorant Garamond',serif;}

/* ── QUOTE ── */
.quote-sec{background:linear-gradient(135deg,var(--t) 0%,#0a2e36 100%);padding:5rem 1.25rem;text-align:center;}
.quote-icon{font-size:3rem;color:var(--g);margin-bottom:1.5rem;}
.quote-text{font-family:'Cormorant Garamond',serif;font-size:clamp(1.3rem,3vw,1.9rem);color:var(--w);line-height:1.7;max-width:800px;margin:0 auto 1rem;font-style:italic;}
.quote-author{color:var(--g);font-weight:600;}

/* ── TRIBUTE ── */
.tribute-sec{background:var(--cr);text-align:center;padding:4rem 1.25rem;}
.tribute-sec h2{font-size:clamp(1.5rem,3vw,2rem);color:var(--td);margin-bottom:1rem;}
.tribute-sec p{color:var(--mu);max-width:600px;margin:0 auto;font-size:1.05rem;line-height:1.8;}

/* ── EXPLORE MORE ── */
.explore-sec{padding:4rem 1.25rem;background:var(--w);}
.explore-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin-top:2rem;}
.explore-card{background:var(--cr);border-radius:1rem;padding:1.75rem;text-align:center;text-decoration:none;transition:transform .3s,box-shadow .3s;}
.explore-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(19,79,92,.12);}
.explore-icon{font-size:2.5rem;margin-bottom:1rem;}
.explore-card h4{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:var(--td);margin-bottom:.5rem;}
.explore-card p{color:var(--mu);font-size:.85rem;line-height:1.6;margin:0;}

@media(max-width:768px){
  .profile-img{margin-bottom:2rem;}
}
`;

// ═══════════════════════════════════════════════════════════════════════════
function useA() {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });
  return [ref, inView];
}

// ═══════════════════════════════════════════════════════════════════════════
export default function FormerHeadmistressPage() {
  const [r1, v1] = useA();
  const [r2, v2] = useA();

  return (
    <>
      <style>{css}</style>
      <div className="head">
        {/* ── HERO ── */}
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <span className="hero-badge">Tribute</span>
            <h1>Former Headmistress</h1>
            <p>
              Honoring the visionary leader who laid the foundation of
              excellence.
            </p>
          </motion.div>
          <div className="hero-arc" />
        </section>

        {/* ── PROFILE ── */}
        <section className="sec profile-sec">
          <div className="inner" ref={r1}>
            <div className="profile-grid">
              <motion.div
                className="profile-img"
                initial={{ opacity: 0, x: -40 }}
                animate={v1 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Former Headmistress"
                />
              </motion.div>
              <motion.div
                className="profile-content"
                initial={{ opacity: 0, x: 40 }}
                animate={v1 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="chip">
                  <FaStar /> Leadership
                </span>
                <h2>Mrs. Sarojini Devi</h2>
                <div className="profile-role">
                  Former Headmistress (2012 - 2019)
                </div>
                <p className="profile-text">
                  Mrs. Sarojini Devi served as the first Headmistress of Shree
                  Ram Public School from its inception in 2012 until her
                  retirement in 2019. Under her visionary leadership, the school
                  grew from just 50 students to over 800, establishing itself as
                  one of the most respected educational institutions in the
                  region.
                </p>
                <p className="profile-text">
                  Her commitment to academic excellence, discipline, and
                  holistic development set the standards that continue to guide
                  our institution today. She believed that every child deserves
                  quality education and worked tirelessly to make that vision a
                  reality.
                </p>
                <p className="profile-text">
                  Her innovative teaching methods, compassionate nature, and
                  unwavering dedication made her a beloved figure among
                  students, parents, and teachers alike.
                </p>
                <div className="profile-years">
                  <FaCalendarAlt /> 7 Years of Distinguished Service (2012-2019)
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="sec timeline-sec">
          <div className="inner center">
            <span className="chip">
              <FaHistory /> Journey
            </span>
            <h2 className="sec-h">Her Journey at SRPS</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              The milestones she achieved during her tenure.
            </span>

            <div className="timeline">
              {[
                {
                  y: "2012",
                  d: "Founded Shree Ram Public School with 50 students and 5 teachers. Established the vision and mission.",
                },
                {
                  y: "2013",
                  d: "First batch of Class X appeared for CBSE board exams with 100% pass rate.",
                },
                {
                  y: "2015",
                  d: "Received CBSE affiliation for senior secondary. Introduced Science and Commerce streams.",
                },
                {
                  y: "2017",
                  d: "School won 'Best School Award' from District Education Department.",
                },
                {
                  y: "2019",
                  d: "Retired after 7 years of exemplary service. Legacy continues through her students and teachers.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="timeline-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-year">{item.y}</div>
                    <p>{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ACHIEVEMENTS ── */}
        <section className="sec ach-sec">
          <div className="inner center">
            <span className="chip">
              <FaAward /> Recognitions
            </span>
            <h2 className="sec-h">Her Achievements</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              The numerous accolades and contributions that define her legacy.
            </span>

            <div className="ach-grid">
              {[
                {
                  icon: <FaGraduationCap />,
                  t: "Academic Excellence",
                  d: "Maintained 100% board pass rate throughout her tenure.",
                },
                {
                  icon: <FaTrophy />,
                  t: "Best Principal Award",
                  d: "Received District Best Principal Award in 2017.",
                },
                {
                  icon: <FaBook />,
                  t: "Curriculum Development",
                  d: "Designed innovative teaching methodologies still in use.",
                },
                {
                  icon: <FaUsers />,
                  t: "Community Building",
                  d: "Built a strong teacher and parent community.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="ach-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="ach-icon">{item.icon}</div>
                  <h4>{item.t}</h4>
                  <p>{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEGACY ── */}
        <section className="sec legacy-sec">
          <div className="inner">
            <motion.div
              className="legacy-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="chip">
                <FaHeart /> Her Legacy
              </span>
              <h2>Continuing Her Vision</h2>
              <p>
                Mrs. Sarojini Devi's vision continues to inspire us every day.
                The values she instilled — integrity, compassion, and excellence
                — remain the cornerstone of Shree Ram Public School. Her
                students have gone on to achieve success in various fields, from
                engineering and medicine to arts and sports.
              </p>
              <p>
                Every brick in our campus, every tree in our garden, and every
                tradition we follow carries her touch. She didn't just build a
                school — she created a family.
              </p>
              <div className="legacy-sign">— The SRPS Family</div>
            </motion.div>
          </div>
        </section>

        {/* ── QUOTE ── */}
        <section className="quote-sec">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="quote-icon">
              <FaQuoteLeft />
            </div>
            <p className="quote-text">
              "Education is not just about filling minds; it's about lighting
              fires. Every child has a spark — our job is to fan it into flame."
            </p>
            <div className="quote-author">— Mrs. Sarojini Devi</div>
          </motion.div>
        </section>

        {/* ── TRIBUTE ── */}
        <section className="tribute-sec">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>A Tribute to Our Founder</h2>
            <p>
              We are deeply grateful to Mrs. Sarojini Devi for her invaluable
              contributions to Shree Ram Public School. Her leadership, vision,
              and dedication have shaped countless young minds and created a
              legacy that will endure for generations to come.
            </p>
          </motion.div>
        </section>

        {/* ── EXPLORE MORE ── */}
        <section className="explore-sec">
          <div className="inner center">
            <span className="chip">Discover More</span>
            <h2 className="sec-h">Explore Our School</h2>
            <div className="explore-grid">
              <a href="/retired-teachers" className="explore-card">
                <div className="explore-icon">👨‍🏫</div>
                <h4>Retired Teachers</h4>
                <p>Honoring our legends</p>
              </a>
              <a href="/school-anthem" className="explore-card">
                <div className="explore-icon">🎵</div>
                <h4>School Anthem</h4>
                <p>Our pride - the school anthem</p>
              </a>
              <a href="/aims" className="explore-card">
                <div className="explore-icon">🎯</div>
                <h4>Our Aims</h4>
                <p>Learn about our educational objectives</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

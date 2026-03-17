import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaBullseye,
  FaGraduationCap,
  FaUsers,
  FaLightbulb,
  FaHandsHelping,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

// ═══════════════════════════════════════════════════════════════════════════
//  GLOBAL CSS
// ═══════════════════════════════════════════════════════════════════════════
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Jost:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;700&display=swap');

:root {
  --td:#134F5C; --t:#1B6B7A; --tm:#2a8a9a; --tl:#d6edf0; --tp:#edf7f9;
  --g:#E8B97A;  --gb:#F5D08A; --gd:#C9943A; --gp:#fdf4e7;
  --cr:#FAF7F2; --w:#FFFFFF;
  --tx:#0f3640; --mu:#6b8f96; --br:rgba(19,79,92,.1);
}

*{box-sizing:border-box;}
.aims{font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--w);}
.aims h1,.aims h2,.aims h3,.aims h4{font-family:'Cormorant Garamond',serif;}

.sec{padding:5rem 1.25rem;}
.inner{max-width:1140px;margin:0 auto;}
.center{text-align:center;}

.chip{display:inline-flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gd);margin-bottom:.7rem;}
.chip::before{content:'';display:block;width:22px;height:2px;background:var(--g);border-radius:2px;}
.sec-h{font-size:clamp(1.8rem,3vw,2.6rem);color:var(--td);margin-bottom:1rem;line-height:1.15;}
.sec-sub{color:var(--mu);font-size:.97rem;line-height:1.75;max-width:620px;display:block;}

/* ── HERO ── */
.hero{position:relative;background:var(--t);padding:6rem 1rem 5rem;overflow:hidden;text-align:center;}
.hero::before{content:'';position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1950&q=80') center/cover;opacity:.1;}
.hero-badge{display:inline-block;background:var(--g);color:var(--td);font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:.35rem 1.1rem;border-radius:2rem;margin-bottom:1.25rem;}
.hero h1{font-size:clamp(2rem,4.5vw,3.2rem);color:var(--w);line-height:1.15;margin-bottom:1rem;}
.hero p{color:rgba(255,255,255,.75);font-size:1.05rem;max-width:560px;margin:0 auto;font-weight:300;}
.hero-arc{position:absolute;bottom:-2px;left:0;right:0;height:70px;background:var(--w);clip-path:ellipse(55% 100% at 50% 100%);}

/* ── AIMS GRID ── */
.aims-sec{background:var(--cr);}
.aims-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;margin-top:3rem;}
.aim-card{background:var(--w);border-radius:1.25rem;padding:2.5rem;box-shadow:0 8px 32px rgba(19,79,92,.06);transition:all .3s;text-align:left;position:relative;overflow:hidden;}
.aim-card::before{content:'';position:absolute;top:0;left:0;width:5px;height:100%;background:var(--g);transition:width .3s;}
.aim-card:nth-child(2)::before{background:var(--t);}
.aim-card:nth-child(3)::before{background:#2a8a60;}
.aim-card:nth-child(4)::before{background:#7B6FD4;}
.aim-card:hover{transform:translateY(-5px);box-shadow:0 16px 48px rgba(19,79,92,.12);}
.aim-card:hover::before{width:8px;}
.aim-num{font-family:'Cormorant Garamond',serif;font-size:3.5rem;color:var(--tl);font-weight:700;line-height:1;margin-bottom:1rem;}
.aim-card h3{font-size:1.35rem;color:var(--td);margin-bottom:.75rem;}
.aim-card p{color:#5a7c85;line-height:1.75;font-size:.93rem;margin-bottom:1rem;}
.aim-list{list-style:none;padding:0;margin:0;}
.aim-list li{display:flex;align-items:flex-start;gap:.75rem;margin-bottom:.6rem;font-size:.9rem;color:var(--mu);}
.aim-list li svg{color:var(--g);margin-top:.25rem;flex-shrink:0;}

/* ── OBJECTIVES ── */
.obj-sec{background:var(--w);}
.obj-list{max-width:800px;margin:3rem auto 0;}
.obj-item{display:flex;gap:1.5rem;padding:1.5rem;background:var(--cr);border-radius:1rem;margin-bottom:1rem;transition:transform .3s,box-shadow .3s;}
.obj-item:hover{transform:translateX(8px);box-shadow:0 8px 24px rgba(19,79,92,.1);}
.obj-icon{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;}
.obj-icon:nth-child(1){background:rgba(27,107,122,.12);color:var(--t);}
.obj-icon:nth-child(2){background:rgba(232,185,122,.2);color:var(--gd);}
.obj-icon:nth-child(3){background:rgba(42,138,96,.12);color:#2a8a60;}
.obj-icon:nth-child(4){background:rgba(123,111,212,.12);color:#7B6FD4;}
.obj-content h4{font-size:1.15rem;color:var(--td);margin-bottom:.35rem;}
.obj-content p{color:var(--mu);font-size:.9rem;line-height:1.7;margin:0;}

/* ── STATS ── */
.stats-sec{background:linear-gradient(135deg,var(--td) 0%,#0a2e36 100%);padding:4rem 1.25rem;}
.stats-grid{display:flex;justify-content:center;gap:3rem;flex-wrap:wrap;text-align:center;}
.stat-item{}
.stat-n{font-family:'Cormorant Garamond',serif;font-size:3rem;color:var(--g);font-weight:700;line-height:1;}
.stat-l{font-size:.8rem;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.1em;}

/* ── CTA ── */
.cta-sec{padding:4rem 1.25rem;background:var(--cr);text-align:center;}
.cta-sec h2{font-size:clamp(1.5rem,3vw,2rem);color:var(--td);margin-bottom:.75rem;}
.cta-sec p{color:var(--mu);max-width:500px;margin:0 auto 1.5rem;}

/* ── EXPLORE MORE ── */
.explore-sec{padding:4rem 1.25rem;background:var(--w);}
.explore-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin-top:2rem;}
.explore-card{background:var(--cr);border-radius:1rem;padding:1.75rem;text-align:center;text-decoration:none;transition:transform .3s,box-shadow .3s;}
.explore-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(19,79,92,.12);}
.explore-icon{font-size:2.5rem;margin-bottom:1rem;}
.explore-card h4{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:var(--td);margin-bottom:.5rem;}
.explore-card p{color:var(--mu);font-size:.85rem;line-height:1.6;margin:0;}

@media(max-width:768px){
  .aims-grid{grid-template-columns:1fr;}
  .obj-item{flex-direction:column;gap:1rem;}
  .stats-grid{gap:2rem;}
}
`;

// ═══════════════════════════════════════════════════════════════════════════
function useA() {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });
  return [ref, inView];
}

// ═══════════════════════════════════════════════════════════════════════════
export default function AimsPage() {
  const [r1, v1] = useA();
  const [r2, v2] = useA();

  return (
    <>
      <style>{css}</style>
      <div className="aims">
        {/* ── HERO ── */}
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <span className="hero-badge">Our Goals</span>
            <h1>Our Aims</h1>
            <p>
              The objectives that drive our educational approach and shape the
              future of every student.
            </p>
          </motion.div>
          <div className="hero-arc" />
        </section>

        {/* ── AIMS GRID ── */}
        <section className="sec aims-sec">
          <div className="inner center" ref={r1}>
            <span className="chip">
              <FaBullseye /> Our Purpose
            </span>
            <h2 className="sec-h">What We Strive For</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Our aims are designed to develop the complete potential of each
              child — academically, socially, and emotionally.
            </span>

            <div className="aims-grid">
              {[
                {
                  n: "01",
                  t: "Academic Excellence",
                  d: "To provide high-quality education that meets national standards and prepares students for competitive examinations.",
                  l: [
                    "CBSE curriculum implementation",
                    "Qualified and dedicated faculty",
                    "Modern teaching methodologies",
                    "Regular assessment and feedback",
                  ],
                },
                {
                  n: "02",
                  t: "Holistic Development",
                  d: "To nurture not just minds but characters — focusing on physical fitness, creative arts, and emotional well-being.",
                  l: [
                    "Sports and athletics programs",
                    "Music, dance, and art classes",
                    "Leadership opportunities",
                    "Character building activities",
                  ],
                },
                {
                  n: "03",
                  t: "Inclusive Education",
                  d: "To ensure every child has equal access to quality education regardless of their background or abilities.",
                  l: [
                    "Affordable fee structure",
                    "Scholarship programs",
                    "Special support for weak students",
                    "Differentiated learning approaches",
                  ],
                },
                {
                  n: "04",
                  t: "Community Service",
                  d: "To instill a sense of social responsibility and empathy in students from an early age.",
                  l: [
                    "Regular community projects",
                    "Environmental awareness",
                    "Charity initiatives",
                    "NCC and scout activities",
                  ],
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="aim-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={v1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="aim-num">{item.n}</div>
                  <h3>{item.t}</h3>
                  <p>{item.d}</p>
                  <ul className="aim-list">
                    {item.l.map((li, i) => (
                      <li key={i}>
                        <FaCheckCircle /> {li}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OBJECTIVES ── */}
        <section className="sec obj-sec">
          <div className="inner center" ref={r2}>
            <span className="chip">
              <FaGraduationCap /> Key Objectives
            </span>
            <h2 className="sec-h">Our Strategic Goals</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              A focused approach to achieving excellence in education through
              measurable objectives.
            </span>

            <div className="obj-list">
              {[
                {
                  icon: <FaUsers />,
                  t: "Student-Centric Learning",
                  d: "Every lesson is designed keeping in mind the diverse learning needs of our students. We believe in personalized attention and mentorship.",
                },
                {
                  icon: <FaLightbulb />,
                  t: "Innovation in Education",
                  d: "Integrating technology and modern pedagogical approaches to make learning engaging, interactive, and future-ready.",
                },
                {
                  icon: <FaHandsHelping />,
                  t: "Parental Engagement",
                  d: "Building strong home-school partnerships to ensure consistent support for student growth and development.",
                },
                {
                  icon: <FaStar />,
                  t: "Character Development",
                  d: "Instilling values of honesty, discipline, and compassion to shape responsible citizens of tomorrow.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="obj-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="obj-icon">{item.icon}</div>
                  <div className="obj-content">
                    <h4>{item.t}</h4>
                    <p>{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="stats-sec">
          <div className="stats-grid">
            {[
              { n: "1000+", l: "Students" },
              { n: "70+", l: "Teachers" },
              { n: "13+", l: "Years" },
              { n: "98%", l: "Pass Rate" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stat-n">{item.n}</div>
                <div className="stat-l">{item.l}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-sec">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Be Part of Our Journey</h2>
            <p>
              Join Shree Ram Public School and help us shape a brighter future
              for the next generation.
            </p>
            <a
              href="/admissions"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: ".5rem",
                background: "var(--g)",
                color: "var(--td)",
                padding: "0.9rem 2.5rem",
                borderRadius: "3rem",
                fontWeight: "700",
                textDecoration: "none",
                fontSize: ".95rem",
                letterSpacing: ".04em",
                transition: "background .3s",
              }}
            >
              Enquire Now <FaArrowRight />
            </a>
          </motion.div>
        </section>

        {/* ── EXPLORE MORE ── */}
        <section className="explore-sec">
          <div className="inner center">
            <span className="chip">Discover More</span>
            <h2 className="sec-h">Explore Our School</h2>
            <div className="explore-grid">
              <a href="/vision-mission" className="explore-card">
                <div className="explore-icon">👁️</div>
                <h4>Vision & Mission</h4>
                <p>Learn about our guiding principles</p>
              </a>
              <a href="/rules-regulations" className="explore-card">
                <div className="explore-icon">📋</div>
                <h4>Rules & Regulations</h4>
                <p>View school guidelines and policies</p>
              </a>
              <a href="/important-procedure" className="explore-card">
                <div className="explore-icon">📝</div>
                <h4>Important Procedures</h4>
                <p>Admission and other important processes</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

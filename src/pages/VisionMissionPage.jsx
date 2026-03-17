import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaEye,
  FaBullseye,
  FaLightbulb,
  FaStar,
  FaQuoteLeft,
  FaSchool,
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
.vm{font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--w);}
.vm h1,.vm h2,.vm h3,.vm h4{font-family:'Cormorant Garamond',serif;}

.sec{padding:5rem 1.25rem;}
.inner{max-width:1140px;margin:0 auto;}
.center{text-align:center;}

.chip{display:inline-flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gd);margin-bottom:.7rem;}
.chip::before{content:'';display:block;width:22px;height:2px;background:var(--g);border-radius:2px;}
.sec-h{font-size:clamp(1.8rem,3vw,2.6rem);color:var(--td);margin-bottom:1rem;line-height:1.15;}
.sec-sub{color:var(--mu);font-size:.97rem;line-height:1.75;max-width:620px;display:block;}

/* ── HERO ── */
.hero{position:relative;background:var(--td);padding:6rem 1rem 5rem;overflow:hidden;text-align:center;}
.hero::before{content:'';position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1950&q=80') center/cover;opacity:.12;}
.hero-badge{display:inline-block;background:var(--g);color:var(--td);font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:.35rem 1.1rem;border-radius:2rem;margin-bottom:1.25rem;}
.hero h1{font-size:clamp(2rem,4.5vw,3.2rem);color:var(--w);line-height:1.15;margin-bottom:1rem;}
.hero p{color:rgba(255,255,255,.75);font-size:1.05rem;max-width:560px;margin:0 auto;font-weight:300;}
.hero-arc{position:absolute;bottom:-2px;left:0;right:0;height:70px;background:var(--w);clip-path:ellipse(55% 100% at 50% 100%);}

/* ── VISION MISSION CARDS ── */
.vm-sec{background:var(--cr);}
.vm-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:2rem;margin-top:3rem;}
.vm-card{background:var(--w);border-radius:1.25rem;padding:2.5rem;box-shadow:0 8px 32px rgba(19,79,92,.08);transition:transform .3s,box-shadow .3s;text-align:center;}
.vm-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(19,79,92,.14);}
.vm-icon{width:80px;height:80px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;font-size:2rem;}
.vm-icon.v{background:linear-gradient(135deg,rgba(27,107,122,.15),rgba(27,107,122,.05));color:var(--t);}
.vm-icon.m{background:linear-gradient(135deg,rgba(232,185,122,.25),rgba(232,185,122,.05));color:var(--gd);}
.vm-icon.i{background:linear-gradient(135deg,rgba(42,138,96,.15),rgba(42,138,96,.05));color:#2a8a60;}
.vm-card h3{font-size:1.5rem;color:var(--td);margin-bottom:1rem;}
.vm-card p{color:#5a7c85;line-height:1.8;font-size:.95rem;}

/* ── VALUES SECTION ── */
.val-sec{background:var(--w);}
.val-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin-top:3rem;}
.val-card{background:var(--cr);border-radius:1rem;padding:2rem;text-align:center;border-top:4px solid var(--g);}
.val-card:nth-child(2){border-top-color:var(--t);}
.val-card:nth-child(3){border-top-color:#2a8a60;}
.val-card:nth-child(4){border-top-color:#7B6FD4;}
.val-card h4{font-size:1.2rem;color:var(--td);margin-bottom:.5rem;}
.val-card p{color:var(--mu);font-size:.9rem;line-height:1.7;}

/* ── QUOTE SECTION ── */
.quote-sec{background:linear-gradient(160deg,var(--td) 0%,#0f3640 100%);padding:5rem 1.25rem;text-align:center;position:relative;overflow:hidden;}
.quote-sec::before{content:'"';position:absolute;top:-40px;left:5%;font-family:'Cormorant Garamond',serif;font-size:20rem;color:rgba(232,185,122,.05);line-height:1;pointer-events:none;}
.quote-sec h2{color:var(--w);font-size:clamp(1.6rem,3vw,2.2rem);margin-bottom:1.5rem;}
.quote-sec p{color:rgba(255,255,255,.75);font-size:1.05rem;line-height:1.9;max-width:700px;margin:0 auto;font-style:italic;font-family:'Cormorant Garamond',serif;}
.quote-author{color:var(--g);font-size:.9rem;margin-top:1.5rem;font-weight:600;}

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
  .vm-grid{grid-template-columns:1fr;}
  .val-grid{grid-template-columns:1fr;}
}
`;

// ═══════════════════════════════════════════════════════════════════════════
//  HELPER HOOK
// ═══════════════════════════════════════════════════════════════════════════
function useA() {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });
  return [ref, inView];
}

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════
export default function VisionMissionPage() {
  const [r1, v1] = useA();
  const [r2, v2] = useA();

  return (
    <>
      <style>{css}</style>
      <div className="vm">
        {/* ── HERO ── */}
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <span className="hero-badge">Our Foundation</span>
            <h1>Vision & Mission</h1>
            <p>
              The guiding principles that shape every aspect of education at
              Shree Ram Public School.
            </p>
          </motion.div>
          <div className="hero-arc" />
        </section>

        {/* ── VISION MISSION VALUES ── */}
        <section className="sec vm-sec">
          <div className="inner center" ref={r1}>
            <span className="chip">What Drives Us</span>
            <h2 className="sec-h">Our Core Pillars</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Three fundamental principles that define our educational
              philosophy and guide our journey forward.
            </span>

            <div className="vm-grid">
              <motion.div
                className="vm-card"
                initial={{ opacity: 0, y: 30 }}
                animate={v1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="vm-icon v">
                  <FaEye />
                </div>
                <h3>Our Vision</h3>
                <p>
                  To be the most trusted centre of learning in rural Haryana — a
                  school where every child's unique potential is discovered,
                  nurtured, and celebrated, and where the spirit of curiosity
                  never fades.
                </p>
              </motion.div>

              <motion.div
                className="vm-card"
                initial={{ opacity: 0, y: 30 }}
                animate={v1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="vm-icon m">
                  <FaBullseye />
                </div>
                <h3>Our Mission</h3>
                <p>
                  To provide holistic, student-centric education that cultivates
                  academic excellence, creative thinking, and ethical character
                  — preparing well-rounded individuals capable of contributing
                  meaningfully to an ever-changing world.
                </p>
              </motion.div>

              <motion.div
                className="vm-card"
                initial={{ opacity: 0, y: 30 }}
                animate={v1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="vm-icon i">
                  <FaLightbulb />
                </div>
                <h3>Our Philosophy</h3>
                <p>
                  We believe that education is not just about textbooks and
                  examinations — it is the art of igniting a lifelong love of
                  learning. Every child carries a spark of genius, and our
                  responsibility is to fan that flame.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section className="sec val-sec">
          <div className="inner center" ref={r2}>
            <span className="chip">
              <FaStar /> Our Values
            </span>
            <h2 className="sec-h">Core Values We Instill</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              These five values are not slogans on a wall — they are lived daily
              in our classrooms, corridors, and community service initiatives.
            </span>

            <div className="val-grid">
              {[
                {
                  t: "Integrity",
                  d: "Honesty and strong moral principles in all actions and decisions.",
                },
                {
                  t: "Compassion",
                  d: "Empathy and care for others, fostering a supportive community.",
                },
                {
                  t: "Excellence",
                  d: "Striving for the highest standards in academics and beyond.",
                },
                {
                  t: "Respect",
                  d: "Valuing diverse perspectives and treating everyone with dignity.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="val-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4>{item.t}</h4>
                  <p>{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUOTE ── */}
        <section className="quote-sec">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <FaQuoteLeft
              style={{
                fontSize: "2.5rem",
                color: "var(--g)",
                marginBottom: "1.5rem",
              }}
            />
            <h2>
              Education is the most powerful weapon which you can use to change
              the world.
            </h2>
            <p>— Nelson Mandela</p>
            <div className="quote-author">— Shree Ram Public School</div>
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-sec">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Join Our Community</h2>
            <p>
              Experience the Shree Ram difference and give your child the gift
              of quality education.
            </p>
            <a
              href="/admissions"
              style={{
                display: "inline-block",
                background: "var(--g)",
                color: "var(--td)",
                padding: "0.9rem 2.5rem",
                borderRadius: "3rem",
                fontWeight: "700",
                textDecoration: "none",
                fontSize: "0.95rem",
                letterSpacing: ".04em",
                transition: "background .3s",
              }}
            >
              Enquire Now
            </a>
          </motion.div>
        </section>

        {/* ── EXPLORE MORE ── */}
        <section className="explore-sec">
          <div className="inner center">
            <span className="chip">Discover More</span>
            <h2 className="sec-h">Explore Our School</h2>
            <div className="explore-grid">
              <a href="/aims" className="explore-card">
                <div className="explore-icon">🎯</div>
                <h4>Our Aims</h4>
                <p>Learn about our educational objectives and goals</p>
              </a>
              <a href="/rules-regulations" className="explore-card">
                <div className="explore-icon">📋</div>
                <h4>Rules & Regulations</h4>
                <p>View school guidelines and policies</p>
              </a>
              <a href="/message-parents" className="explore-card">
                <div className="explore-icon">👨‍👩‍👧</div>
                <h4>For Parents</h4>
                <p>Message from the principal to parents</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

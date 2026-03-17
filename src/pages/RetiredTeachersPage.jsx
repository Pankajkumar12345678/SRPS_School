import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaUserTie,
  FaStar,
  FaQuoteLeft,
  FaAward,
  FaGraduationCap,
  FaSchool,
  FaHeart,
  FaHandsHelping,
  FaCalendarAlt,
  FaUsers,
  FaBookOpen,
  FaLightbulb,
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
.retired{font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--w);}
.retired h1,.retired h2,.retired h3,.retired h4{font-family:'Cormorant Garamond',serif;}

.sec{padding:5rem 1.25rem;}
.inner{max-width:1100px;margin:0 auto;}
.center{text-align:center;}

.chip{display:inline-flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gd);margin-bottom:.7rem;}
.chip::before{content:'';display:block;width:22px;height:2px;background:var(--g);border-radius:2px;}
.sec-h{font-size:clamp(1.8rem,3vw,2.6rem);color:var(--td);margin-bottom:1rem;line-height:1.15;}
.sec-sub{color:var(--mu);font-size:.97rem;line-height:1.75;max-width:620px;display:block;}

/* ── HERO ── */
.hero{position:relative;background:var(--t);padding:6rem 1rem 5rem;overflow:hidden;text-align:center;}
.hero::before{content:'';position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1950&q=80') center/cover;opacity:.1;}
.hero-badge{display:inline-block;background:var(--g);color:var(--td);font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:.35rem 1.1rem;border-radius:2rem;margin-bottom:1.25rem;}
.hero h1{font-size:clamp(2rem,4.5vw,3.2rem);color:var(--w);line-height:1.15;margin-bottom:1rem;}
.hero p{color:rgba(255,255,255,.75);font-size:1.05rem;max-width:560px;margin:0 auto;font-weight:300;}
.hero-arc{position:absolute;bottom:-2px;left:0;right:0;height:70px;background:var(--w);clip-path:ellipse(55% 100% at 50% 100%);}

/* ── INTRO ── */
.intro-sec{background:var(--cr);}
.intro-card{background:var(--w);border-radius:1.25rem;padding:3rem;max-width:800px;margin:0 auto;text-align:center;box-shadow:0 8px 32px rgba(19,79,92,.08);}
.intro-card p{color:#5a7c85;line-height:1.9;font-size:1rem;margin-bottom:1rem;}
.intro-card p:last-child{margin-bottom:0;}

/* ── TEACHERS GRID ── */
.teachers-sec{background:var(--w);}
.teachers-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;margin-top:3rem;}
.teacher-card{background:var(--cr);border-radius:1.25rem;padding:2rem;text-align:center;transition:transform .3s,box-shadow .3s;position:relative;overflow:hidden;}
.teacher-card:hover{transform:translateY(-8px);box-shadow:0 20px 50px rgba(19,79,92,.15);}
.teacher-card::before{content:'';position:absolute;top:0;left:0;right:0;height:5px;background:linear-gradient(90deg,var(--t),var(--g));}
.teacher-img{width:120px;height:120px;border-radius:50%;object-fit:cover;margin:0 auto 1.5rem;border:4px solid var(--tl);box-shadow:0 8px 24px rgba(19,79,92,.15);}
.teacher-card h3{font-size:1.3rem;color:var(--td);margin-bottom:.25rem;}
.teacher-subject{color:var(--gd);font-weight:600;font-size:.9rem;margin-bottom:.5rem;}
.teacher-years{color:var(--mu);font-size:.85rem;margin-bottom:1rem;display:flex;align-items:center;justify-content:center;gap:.5rem;}
.teacher-text{color:var(--mu);font-size:.9rem;line-height:1.7;margin:0;}
.teacher-badge{position:absolute;top:15px;right:15px;background:var(--g);color:var(--td);font-size:.65rem;font-weight:700;padding:.3rem .7rem;border-radius:1rem;letter-spacing:.05em;}

/* ── STATS ── */
.stats-sec{background:linear-gradient(135deg,var(--td) 0%,#0a2e36 100%);padding:4rem 1.25rem;}
.stats-grid{display:flex;justify-content:center;gap:4rem;flex-wrap:wrap;text-align:center;}
.stat-item{}
.stat-n{font-family:'Cormorant Garamond',serif;font-size:3.5rem;color:var(--g);font-weight:700;line-height:1;}
.stat-l{font-size:.9rem;color:rgba(255,255,255,.7);text-transform:uppercase;letter-spacing:.1em;margin-top:.5rem;}

/* ── TRIBUTE ── */
.tribute-sec{background:var(--cr);}
.tribute-card{background:var(--w);border-radius:1.25rem;padding:3rem;max-width:800px;margin:0 auto;text-align:center;}
.tribute-card h2{font-size:1.8rem;color:var(--td);margin-bottom:1rem;}
.tribute-card p{color:#5a7c85;line-height:1.9;font-size:1rem;margin-bottom:1.5rem;}
.tribute-sign{color:var(--gd);font-size:1.1rem;font-weight:600;font-family:'Cormorant Garamond',serif;}

/* ── QUOTE ── */
.quote-sec{background:linear-gradient(135deg,var(--t) 0%,#0a2e36 100%);padding:5rem 1.25rem;text-align:center;}
.quote-icon{font-size:3rem;color:var(--g);margin-bottom:1.5rem;}
.quote-text{font-family:'Cormorant Garamond',serif;font-size:clamp(1.3rem,3vw,1.9rem);color:var(--w);line-height:1.7;max-width:800px;margin:0 auto 1rem;font-style:italic;}
.quote-author{color:var(--g);font-weight:600;}

/* ── THANK YOU ── */
.thank-sec{background:var(--w);text-align:center;padding:4rem 1.25rem;}
.thank-sec h2{font-size:clamp(1.5rem,3vw,2rem);color:var(--td);margin-bottom:1rem;}
.thank-sec p{color:var(--mu);max-width:500px;margin:0 auto;font-size:1.05rem;line-height:1.8;}

/* ── EXPLORE MORE ── */
.explore-sec{padding:4rem 1.25rem;background:var(--cr);}
.explore-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin-top:2rem;}
.explore-card{background:var(--w);border-radius:1rem;padding:1.75rem;text-align:center;text-decoration:none;transition:transform .3s,box-shadow .3s;}
.explore-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(19,79,92,.12);}
.explore-icon{font-size:2.5rem;margin-bottom:1rem;}
.explore-card h4{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:var(--td);margin-bottom:.5rem;}
.explore-card p{color:var(--mu);font-size:.85rem;line-height:1.6;margin:0;}

@media(max-width:768px){
  .stats-grid{gap:2.5rem;}
}
`;

// ═══════════════════════════════════════════════════════════════════════════
function useA() {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });
  return [ref, inView];
}

// ═══════════════════════════════════════════════════════════════════════════
const TEACHERS = [
  {
    name: "Mrs. Kamlesh Devi",
    subject: "Mathematics",
    years: "2012 - 2023",
    img: "https://randomuser.me/api/portraits/women/32.jpg",
    desc: "Dedicated 11 years to teaching mathematics. Her unique methods made complex concepts simple for students.",
  },
  {
    name: "Mr. Rajesh Kumar",
    subject: "Science",
    years: "2014 - 2022",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    desc: "Brought science to life through interactive experiments. Inspired many students to pursue science streams.",
  },
  {
    name: "Mrs. Sunita Rani",
    subject: "English",
    years: "2013 - 2021",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
    desc: "Master of literature and language. Her elocution competitions produced many district-level winners.",
  },
  {
    name: "Mr. Vijay Singh",
    subject: "Social Studies",
    years: "2015 - 2024",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    desc: "Made history come alive through storytelling. Students still remember his captivating lessons.",
  },
  {
    name: "Mrs. Asha Devi",
    subject: "Hindi",
    years: "2012 - 2020",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    desc: "Promoted Hindi language and culture. Her poetry sessions were beloved by all students.",
  },
  {
    name: "Mr. Amarjeet Singh",
    subject: "Physical Education",
    years: "2016 - 2023",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
    desc: "Built the sports culture at SRPS. Our students won multiple district-level championships under his guidance.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
export default function RetiredTeachersPage() {
  const [r1, v1] = useA();

  return (
    <>
      <style>{css}</style>
      <div className="retired">
        {/* ── HERO ── */}
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <span className="hero-badge">Honoring Legends</span>
            <h1>Retired Teachers</h1>
            <p>
              Celebrating the educators who dedicated their lives to shaping
              young minds.
            </p>
          </motion.div>
          <div className="hero-arc" />
        </section>

        {/* ── INTRODUCTION ── */}
        <section className="sec intro-sec">
          <div className="inner">
            <motion.div
              className="intro-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="chip">
                <FaUserTie /> Our Esteemed Faculty
              </span>
              <p>
                At Shree Ram Public School, we take pride in our dedicated
                faculty members who have served with distinction over the years.
                Many have retired after giving their best years to education and
                shaping thousands of lives.
              </p>
              <p>
                These educators didn't just teach subjects — they inspired
                dreams, built characters, and created lasting impressions on
                every student they taught. Their legacy continues through the
                success stories of their students.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── TEACHERS GRID ── */}
        <section className="sec teachers-sec">
          <div className="inner center" ref={r1}>
            <span className="chip">
              <FaUsers /> Our Heroes
            </span>
            <h2 className="sec-h">Retired Teachers</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              The pillars of our institution who served with dedication and
              love.
            </span>

            <div className="teachers-grid">
              {TEACHERS.map((teacher, idx) => (
                <motion.div
                  key={idx}
                  className="teacher-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={v1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="teacher-badge">Retired</div>
                  <img
                    src={teacher.img}
                    alt={teacher.name}
                    className="teacher-img"
                  />
                  <h3>{teacher.name}</h3>
                  <div className="teacher-subject">{teacher.subject}</div>
                  <div className="teacher-years">
                    <FaCalendarAlt /> {teacher.years}
                  </div>
                  <p className="teacher-text">{teacher.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="stats-sec">
          <div className="stats-grid">
            {[
              { n: "6", l: "Retired Teachers" },
              { n: "50+", l: "Combined Years" },
              { n: "2000+", l: "Students Taught" },
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

        {/* ── TRIBUTE ── */}
        <section className="sec tribute-sec">
          <div className="inner">
            <motion.div
              className="tribute-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="chip">
                <FaHeart /> Our Gratitude
              </span>
              <h2>Thank You, Teachers!</h2>
              <p>
                To our retired teachers — thank you for your endless patience,
                unwavering dedication, and genuine love for teaching. You didn't
                just teach lessons; you taught life. You shaped personalities,
                built confidence, and inspired generations.
              </p>
              <p>
                Your footprints are everywhere in this institution. Every
                successful student, every award, every achievement bears your
                mark. You are the true heroes of Shree Ram Public School.
              </p>
              <div className="tribute-sign">— The SRPS Family</div>
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
              "A good teacher is like a candle — it consumes itself to light the
              way for others."
            </p>
            <div className="quote-author">— Unknown</div>
          </motion.div>
        </section>

        {/* ── THANK YOU ── */}
        <section className="thank-sec">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Your Legacy Lives On</h2>
            <p>
              Though you may have retired from formal teaching, your influence
              continues through every student whose life you touched. The values
              you instilled, the knowledge you shared, and the love you gave
              continue to bloom in the lives of thousands.
            </p>
          </motion.div>
        </section>

        {/* ── EXPLORE MORE ── */}
        <section className="explore-sec">
          <div className="inner center">
            <span className="chip">Discover More</span>
            <h2 className="sec-h">Explore Our School</h2>
            <div className="explore-grid">
              <a href="/former-headmistress" className="explore-card">
                <div className="explore-icon">🏆</div>
                <h4>Former Headmistress</h4>
                <p>Tribute to our visionary leader</p>
              </a>
              <a href="/school-anthem" className="explore-card">
                <div className="explore-icon">🎵</div>
                <h4>School Anthem</h4>
                <p>Our pride - the school anthem</p>
              </a>
              <a href="/vision-mission" className="explore-card">
                <div className="explore-icon">👁️</div>
                <h4>Vision & Mission</h4>
                <p>Our guiding principles</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

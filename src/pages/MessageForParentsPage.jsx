import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaQuoteLeft,
  FaChild,
  FaBookOpen,
  FaHeart,
  FaPhone,
  FaEnvelope,
  FaHandshake,
  FaLightbulb,
  FaUsers,
  FaCalendarAlt,
  FaHome,
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
  --tx:#0f3640; --mu:#6b8f96;
}

*{box-sizing:border-box;}
.msg{font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--w);}
.msg h1,.msg h2,.msg h3,.msg h4{font-family:'Cormorant Garamond',serif;}

.sec{padding:5rem 1.25rem;}
.inner{max-width:1100px;margin:0 auto;}
.center{text-align:center;}

.chip{display:inline-flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gd);margin-bottom:.7rem;}
.chip::before{content:'';display:block;width:22px;height:2px;background:var(--g);border-radius:2px;}
.sec-h{font-size:clamp(1.8rem,3vw,2.6rem);color:var(--td);margin-bottom:1rem;line-height:1.15;}
.sec-sub{color:var(--mu);font-size:.97rem;line-height:1.75;max-width:620px;display:block;}

/* ── HERO ── */
.hero{position:relative;background:var(--td);padding:6rem 1rem 5rem;overflow:hidden;text-align:center;}
.hero::before{content:'';position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&w=1950&q=80') center/cover;opacity:.1;}
.hero-badge{display:inline-block;background:var(--g);color:var(--td);font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:.35rem 1.1rem;border-radius:2rem;margin-bottom:1.25rem;}
.hero h1{font-size:clamp(2rem,4.5vw,3.2rem);color:var(--w);line-height:1.15;margin-bottom:1rem;}
.hero p{color:rgba(255,255,255,.75);font-size:1.05rem;max-width:560px;margin:0 auto;font-weight:300;}
.hero-arc{position:absolute;bottom:-2px;left:0;right:0;height:70px;background:var(--w);clip-path:ellipse(55% 100% at 50% 100%);}

/* ── MESSAGE SECTION ── */
.msg-sec{background:var(--cr);}
.msg-grid{display:grid;grid-template-columns:1fr 1.2fr;gap:4rem;align-items:center;}
@media(max-width:850px){.msg-grid{grid-template-columns:1fr;}}
.msg-img{position:relative;}
.msg-img img{width:100%;border-radius:1.25rem;box-shadow:0 24px 64px rgba(19,79,92,.18);}
.msg-img::after{content:'';position:absolute;bottom:-20px;right:-20px;width:140px;height:140px;border:3px solid var(--g);border-radius:.75rem;z-index:-1;}
.msg-content h2{font-size:1.8rem;color:var(--td);margin-bottom:1rem;}
.msg-content p{color:#5a7c85;line-height:1.9;font-size:.98rem;margin-bottom:1rem;}
.msg-sign{color:var(--gd);font-size:1rem;font-weight:600;margin-top:1.5rem;}
.msg-role{color:var(--mu);font-size:.85rem;margin-top:.25rem;}

/* ── QUOTE ── */
.quote-sec{background:linear-gradient(135deg,var(--t) 0%,#0f3640 100%);padding:5rem 1.25rem;text-align:center;}
.quote-icon{font-size:3rem;color:var(--g);margin-bottom:1.5rem;}
.quote-text{font-family:'Cormorant Garamond',serif;font-size:clamp(1.4rem,3vw,2rem);color:var(--w);line-height:1.7;max-width:800px;margin:0 auto 1rem;font-style:italic;}
.quote-author{color:var(--g);font-weight:600;}

/* ── TIPS ── */
.tips-sec{background:var(--w);}
.tips-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem;}
.tip-card{background:var(--cr);border-radius:1rem;padding:2rem;text-align:center;transition:transform .3s,box-shadow .3s;}
.tip-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(19,79,92,.1);}
.tip-icon{width:64px;height:64px;border-radius:50%;background:var(--tl);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.5rem;color:var(--t);}
.tip-card h4{font-size:1.15rem;color:var(--td);margin-bottom:.5rem;}
.tip-card p{color:var(--mu);font-size:.9rem;line-height:1.7;margin:0;}

/* ── PARENTING ── */
.parenting-sec{background:var(--cr);}
.parenting-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:2rem;margin-top:3rem;}
.parenting-card{background:var(--w);border-radius:1.25rem;padding:2rem;box-shadow:0 8px 24px rgba(19,79,92,.06);border-top:4px solid var(--g);}
.parenting-card:nth-child(2){border-top-color:var(--t);}
.parenting-card:nth-child(3){border-top-color:#2a8a60;}
.parenting-card h3{font-size:1.3rem;color:var(--td);margin-bottom:1rem;}
.parenting-card ul{list-style:none;padding:0;margin:0;}
.parenting-card ul li{padding:.5rem 0;color:var(--mu);font-size:.93rem;display:flex;align-items:flex-start;gap:.5rem;}
.parenting-card ul li::before{content:'✓';color:var(--g);font-weight:bold;}

/* ── CONTACT ── */
.contact-sec{background:var(--t);text-align:center;padding:4rem 1.25rem;}
.contact-sec h2{color:var(--w);font-size:clamp(1.5rem,3vw,2rem);margin-bottom:1rem;}
.contact-sec p{color:rgba(255,255,255,.7);max-width:500px;margin:0 auto 1.5rem;}
.contact-links{display:flex;justify-content:center;gap:2rem;flex-wrap:wrap;}
.contact-links a{color:var(--g);text-decoration:none;font-weight:600;display:flex;align-items:center;gap:.5rem;}

/* ── EXPLORE MORE ── */
.explore-sec{padding:4rem 1.25rem;background:var(--cr);}
.explore-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin-top:2rem;}
.explore-card{background:var(--w);border-radius:1rem;padding:1.75rem;text-align:center;text-decoration:none;transition:transform .3s,box-shadow .3s;}
.explore-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(19,79,92,.12);}
.explore-icon{font-size:2.5rem;margin-bottom:1rem;}
.explore-card h4{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:var(--td);margin-bottom:.5rem;}
.explore-card p{color:var(--mu);font-size:.85rem;line-height:1.6;margin:0;}

@media(max-width:768px){
  .msg-img{margin-bottom:2rem;}
}
`;

// ═══════════════════════════════════════════════════════════════════════════
function useA() {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });
  return [ref, inView];
}

// ═══════════════════════════════════════════════════════════════════════════
export default function MessageForParentsPage() {
  const [r1, v1] = useA();
  const [r2, v2] = useA();

  return (
    <>
      <style>{css}</style>
      <div className="msg">
        {/* ── HERO ── */}
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <span className="hero-badge">For Families</span>
            <h1>Message for Parents</h1>
            <p>
              A partnership in your child's educational journey and overall
              development.
            </p>
          </motion.div>
          <div className="hero-arc" />
        </section>

        {/* ── PRINCIPAL MESSAGE ── */}
        <section className="sec msg-sec">
          <div className="inner" ref={r1}>
            <div className="msg-grid">
              <motion.div
                className="msg-img"
                initial={{ opacity: 0, x: -40 }}
                animate={v1 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Principal"
                />
              </motion.div>
              <motion.div
                className="msg-content"
                initial={{ opacity: 0, x: 40 }}
                animate={v1 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="chip">
                  <FaQuoteLeft /> From the Desk of the Principal
                </span>
                <h2>A Warm Welcome to the SRPS Family</h2>
                <p>Dear Parents and Guardians,</p>
                <p>
                  Welcome to Shree Ram Public School! It is with great pleasure
                  that I extend this message to you. At SRPS, we believe that
                  education is a collaborative effort between the school and the
                  family. Your involvement in your child's learning journey is
                  crucial to their success.
                </p>
                <p>
                  Our dedicated faculty works tirelessly to provide not just
                  academic excellence but also character building, values
                  education, and holistic development. We encourage you to be
                  active participants in this journey — attend parent-teacher
                  meetings, volunteer for school events, and maintain open
                  communication with teachers.
                </p>
                <p>
                  Together, we can shape responsible, compassionate, and
                  successful individuals who will make their mark on the world.
                </p>
                <div className="msg-sign">Mrs. Sunita Sharma</div>
                <div className="msg-role">
                  Principal, Shree Ram Public School
                </div>
              </motion.div>
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
          >
            <div className="quote-icon">
              <FaQuoteLeft />
            </div>
            <p className="quote-text">
              "Education is a shared commitment between dedicated teachers,
              motivated students, and enthusiastic parents."
            </p>
            <div className="quote-author">— Anonymous</div>
          </motion.div>
        </section>

        {/* ── PARENTING TIPS ── */}
        <section className="sec tips-sec">
          <div className="inner center" ref={r2}>
            <span className="chip">
              <FaLightbulb /> Support
            </span>
            <h2 className="sec-h">How You Can Support Your Child</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Your involvement makes a significant difference in your child's
              academic success.
            </span>

            <div className="tips-grid">
              {[
                {
                  icon: <FaBookOpen />,
                  t: "Create a Study Routine",
                  d: "Establish a consistent homework and study schedule at home.",
                },
                {
                  icon: <FaHeart />,
                  t: "Show Interest",
                  d: "Ask about their day, lessons, and friends to stay connected.",
                },
                {
                  icon: <FaUsers />,
                  t: "Communicate with Teachers",
                  d: "Attend PTMs and reach out when concerns arise.",
                },
                {
                  icon: <FaChild />,
                  t: "Encourage Independence",
                  d: "Let them take responsibility for their belongings and tasks.",
                },
                {
                  icon: <FaCalendarAlt />,
                  t: "Monitor Screen Time",
                  d: "Ensure balanced use of technology for learning and recreation.",
                },
                {
                  icon: <FaHome />,
                  t: "Provide a Quiet Space",
                  d: "Create a dedicated study area free from distractions.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="tip-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="tip-icon">{item.icon}</div>
                  <h4>{item.t}</h4>
                  <p>{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARTNERSHIP ── */}
        <section className="sec parenting-sec">
          <div className="inner center">
            <span className="chip">
              <FaHandshake /> Partnership
            </span>
            <h2 className="sec-h">Building a Strong Home-School Connection</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              A successful education requires teamwork between parents and
              educators.
            </span>

            <div className="parenting-grid">
              <motion.div
                className="parenting-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3>What We Expect from Parents</h3>
                <ul>
                  <li>Ensure regular attendance</li>
                  <li>Review homework daily</li>
                  <li>Attend parent-teacher meetings</li>
                  <li>Support school policies</li>
                  <li>Encourage positive attitudes</li>
                </ul>
              </motion.div>
              <motion.div
                className="parenting-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3>What You Can Expect from Us</h3>
                <ul>
                  <li>Regular progress updates</li>
                  <li>Individual attention to students</li>
                  <li>Safe and nurturing environment</li>
                  <li>Transparent communication</li>
                  <li>Quality academic instruction</li>
                </ul>
              </motion.div>
              <motion.div
                className="parenting-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3>Important Reminders</h3>
                <ul>
                  <li>Check school app for updates</li>
                  <li>Submit leave applications in advance</li>
                  <li>Update contact information</li>
                  <li>Inform about medical conditions</li>
                  <li>Pay fees on time</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section className="contact-sec">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Stay Connected</h2>
            <p>
              We are always here to support you and your child. Reach out with
              any questions or concerns.
            </p>
            <div className="contact-links">
              <a href="tel:+919876543210">
                <FaPhone /> +91 98765 43210
              </a>
              <a href="mailto:info@shreerampublicschool.com">
                <FaEnvelope /> info@shreerampublicschool.com
              </a>
            </div>
          </motion.div>
        </section>

        {/* ── EXPLORE MORE ── */}
        <section className="explore-sec">
          <div className="inner center">
            <span className="chip">Discover More</span>
            <h2 className="sec-h">Explore Our School</h2>
            <div className="explore-grid">
              <a href="/message-students" className="explore-card">
                <div className="explore-icon">🎓</div>
                <h4>For Students</h4>
                <p>Message from the principal to students</p>
              </a>
              <a href="/important-procedure" className="explore-card">
                <div className="explore-icon">📝</div>
                <h4>Important Procedures</h4>
                <p>Admission and other important processes</p>
              </a>
              <a href="/school-anthem" className="explore-card">
                <div className="explore-icon">🎵</div>
                <h4>School Anthem</h4>
                <p>Our pride - the school anthem</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

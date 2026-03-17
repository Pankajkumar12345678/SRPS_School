import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaQuoteLeft,
  FaGraduationCap,
  FaStar,
  FaTrophy,
  FaLightbulb,
  FaUsers,
  FaHeart,
  FaHandshake,
  FaBookOpen,
  FaRunning,
  FaBrain,
  FaRocket,
  FaAward,
  FaSmile,
  FaEnvelope,
  FaPhone,
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
.students{font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--w);}
.students h1,.students h2,.students h3,.students h4{font-family:'Cormorant Garamond',serif;}

.sec{padding:5rem 1.25rem;}
.inner{max-width:1100px;margin:0 auto;}
.center{text-align:center;}

.chip{display:inline-flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gd);margin-bottom:.7rem;}
.chip::before{content:'';display:block;width:22px;height:2px;background:var(--g);border-radius:2px;}
.sec-h{font-size:clamp(1.8rem,3vw,2.6rem);color:var(--td);margin-bottom:1rem;line-height:1.15;}
.sec-sub{color:var(--mu);font-size:.97rem;line-height:1.75;max-width:620px;display:block;}

/* ── HERO ── */
.hero{position:relative;background:var(--t);padding:6rem 1rem 5rem;overflow:hidden;text-align:center;}
.hero::before{content:'';position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1950&q=80') center/cover;opacity:.1;}
.hero-badge{display:inline-block;background:var(--g);color:var(--td);font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:.35rem 1.1rem;border-radius:2rem;margin-bottom:1.25rem;}
.hero h1{font-size:clamp(2rem,4.5vw,3.2rem);color:var(--w);line-height:1.15;margin-bottom:1rem;}
.hero p{color:rgba(255,255,255,.75);font-size:1.05rem;max-width:560px;margin:0 auto;font-weight:300;}
.hero-arc{position:absolute;bottom:-2px;left:0;right:0;height:70px;background:var(--w);clip-path:ellipse(55% 100% at 50% 100%);}

/* ── MESSAGE ── */
.msg-sec{background:var(--cr);}
.msg-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:4rem;align-items:center;}
@media(max-width:850px){.msg-grid{grid-template-columns:1fr;}}
.msg-content h2{font-size:1.8rem;color:var(--td);margin-bottom:1rem;}
.msg-content p{color:#5a7c85;line-height:1.9;font-size:.98rem;margin-bottom:1rem;}
.msg-sign{color:var(--gd);font-size:1rem;font-weight:600;margin-top:1.5rem;}
.msg-role{color:var(--mu);font-size:.85rem;margin-top:.25rem;}
.msg-img{position:relative;}
.msg-img img{width:100%;border-radius:1.25rem;box-shadow:0 24px 64px rgba(19,79,92,.18);}
.msg-img::before{content:'';position:absolute;top:-15px;left:-15px;width:60px;height:60px;border:3px solid var(--g);border-radius:50%;z-index:-1;}

/* ── QUOTE ── */
.quote-sec{background:linear-gradient(135deg,var(--td) 0%,#0a2e36 100%);padding:5rem 1.25rem;text-align:center;position:relative;overflow:hidden;}
.quote-sec::before{content:'"';position:absolute;top:-50px;left:5%;font-family:'Cormorant Garamond',serif;font-size:22rem;color:rgba(232,185,122,.05);line-height:1;pointer-events:none;}
.quote-text{font-family:'Cormorant Garamond',serif;font-size:clamp(1.4rem,3vw,2rem);color:var(--w);line-height:1.7;max-width:800px;margin:0 auto 1rem;font-style:italic;}
.quote-author{color:var(--g);font-weight:600;}

/* ── TIPS ── */
.tips-sec{background:var(--w);}
.tips-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:3rem;}
.tip-card{background:var(--cr);border-radius:1rem;padding:2rem;text-align:center;transition:transform .3s,box-shadow .3s;border-bottom:3px solid transparent;}
.tip-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(19,79,92,.1);}
.tip-card:nth-child(1){border-bottom-color:var(--g);}
.tip-card:nth-child(2){border-bottom-color:var(--t);}
.tip-card:nth-child(3){border-bottom-color:#2a8a60;}
.tip-card:nth-child(4){border-bottom-color:#7B6FD4;}
.tip-icon{width:64px;height:64px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.5rem;}
.tip-card:nth-child(1) .tip-icon{background:rgba(232,185,122,.2);color:var(--gd);}
.tip-card:nth-child(2) .tip-icon{background:rgba(27,107,122,.12);color:var(--t);}
.tip-card:nth-child(3) .tip-icon{background:rgba(42,138,96,.12);color:#2a8a60;}
.tip-card:nth-child(4) .tip-icon{background:rgba(123,111,212,.12);color:#7B6FD4;}
.tip-card h4{font-size:1.15rem;color:var(--td);margin-bottom:.5rem;}
.tip-card p{color:var(--mu);font-size:.9rem;line-height:1.7;margin:0;}

/* ── SUCCESS ── */
.success-sec{background:var(--cr);}
.success-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;margin-top:3rem;}
.success-card{background:var(--w);border-radius:1rem;padding:2rem;text-align:center;box-shadow:0 8px 24px rgba(19,79,92,.06);transition:transform .3s;}
.success-card:hover{transform:translateY(-5px);}
.success-icon{font-size:2.5rem;margin-bottom:1rem;}
.success-card:nth-child(1) .success-icon{color:var(--gd);}
.success-card:nth-child(2) .success-icon{color:var(--t);}
.success-card:nth-child(3) .success-icon{color:#2a8a60;}
.success-card:nth-child(4) .success-icon{color:#7B6FD4;}
.success-card h4{font-size:1.2rem;color:var(--td);margin-bottom:.5rem;}
.success-card p{color:var(--mu);font-size:.9rem;line-height:1.7;}

/* ── MOTIVATION ── */
.motivation-sec{background:var(--tl);text-align:center;}
.motivation-grid{display:flex;justify-content:center;gap:2rem;flex-wrap:wrap;margin-top:3rem;}
.motivation-item{background:var(--w);border-radius:1rem;padding:2rem;flex:1;min-width:250px;max-width:300px;}
.motivation-item h4{font-size:1.3rem;color:var(--td);margin-bottom:.5rem;}

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
export default function MessageForStudentsPage() {
  const [r1, v1] = useA();
  const [r2, v2] = useA();

  return (
    <>
      <style>{css}</style>
      <div className="students">
        {/* ── HERO ── */}
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <span className="hero-badge">Dear Students</span>
            <h1>Message for Students</h1>
            <p>Words of encouragement and guidance for your journey ahead.</p>
          </motion.div>
          <div className="hero-arc" />
        </section>

        {/* ── PRINCIPAL MESSAGE ── */}
        <section className="sec msg-sec">
          <div className="inner" ref={r1}>
            <div className="msg-grid">
              <motion.div
                className="msg-content"
                initial={{ opacity: 0, x: -40 }}
                animate={v1 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <span className="chip">
                  <FaQuoteLeft /> A Message to Our Students
                </span>
                <h2>Dream Big, Work Hard</h2>
                <p>Dear Students,</p>
                <p>
                  You are the most important part of Shree Ram Public School.
                  Every day, you bring energy, curiosity, and hope to our
                  campus. Your dreams and aspirations inspire us to be better
                  educators.
                </p>
                <p>
                  Remember, success is not just about marks and grades. It's
                  about becoming a good human being — someone who is honest,
                  compassionate, and respectful. Strive for excellence in
                  everything you do, but never forget to be kind.
                </p>
                <p>
                  Take advantage of every opportunity — join clubs, participate
                  in sports, speak up in class, and make friends. These
                  experiences will shape who you become.
                </p>
                <p>
                  Believe in yourself. You are capable of achieving great
                  things!
                </p>
                <div className="msg-sign">Mrs. Sunita Sharma</div>
                <div className="msg-role">
                  Principal, Shree Ram Public School
                </div>
              </motion.div>
              <motion.div
                className="msg-img"
                initial={{ opacity: 0, x: 40 }}
                animate={v1 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
                  alt="Students"
                />
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
            style={{ position: "relative", zIndex: 1 }}
          >
            <p className="quote-text">
              "The future belongs to those who believe in the beauty of their
              dreams."
            </p>
            <div className="quote-author">— Eleanor Roosevelt</div>
          </motion.div>
        </section>

        {/* ── STUDY TIPS ── */}
        <section className="sec tips-sec">
          <div className="inner center" ref={r2}>
            <span className="chip">
              <FaLightbulb /> Tips for Success
            </span>
            <h2 className="sec-h">Your Guide to Academic Excellence</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Follow these proven strategies to achieve your goals.
            </span>

            <div className="tips-grid">
              {[
                {
                  icon: <FaBookOpen />,
                  t: "Attend Classes Regularly",
                  d: "Be present in every class. Take notes and ask questions when in doubt.",
                },
                {
                  icon: <FaBrain />,
                  t: "Study Smart",
                  d: "Understand concepts, don't just memorize. Connect topics and review regularly.",
                },
                {
                  icon: <FaRunning />,
                  t: "Stay Active",
                  d: "Balance studies with sports and activities. A healthy body means a sharp mind.",
                },
                {
                  icon: <FaUsers />,
                  t: "Learn Together",
                  d: "Form study groups. Teaching others reinforces your own understanding.",
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

        {/* ── SUCCESS HABITS ── */}
        <section className="sec success-sec">
          <div className="inner center">
            <span className="chip">
              <FaTrophy /> Habits of Successful Students
            </span>
            <h2 className="sec-h">Build These Habits</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Great students aren't born — they're made through daily habits.
            </span>

            <div className="success-grid">
              {[
                {
                  icon: <FaStar />,
                  t: "Set Goals",
                  d: "Know what you want to achieve each day, week, and year.",
                },
                {
                  icon: <FaRocket />,
                  t: "Manage Time",
                  d: "Use your time wisely. Make a schedule and stick to it.",
                },
                {
                  icon: <FaHeart />,
                  t: "Stay Positive",
                  d: "Believe in yourself. Positive thinking leads to positive results.",
                },
                {
                  icon: <FaAward />,
                  t: "Never Give Up",
                  d: "Face challenges head-on. Every setback is a learning opportunity.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="success-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="success-icon">{item.icon}</div>
                  <h4>{item.t}</h4>
                  <p>{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MOTIVATION ── */}
        <section className="sec motivation-sec">
          <div className="inner center">
            <span className="chip">
              <FaSmile /> Remember
            </span>
            <h2 className="sec-h">You Are Special</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Every student has unique talents. Discover and develop yours.
            </span>

            <div className="motivation-grid">
              {[
                {
                  t: "Your Voice Matters",
                  d: "Speak up in class, share your ideas, and don't be afraid to ask questions.",
                },
                {
                  t: "Mistakes Are OK",
                  d: "Making mistakes is how we learn. Don't be afraid to try new things.",
                },
                {
                  t: "Be Kind",
                  d: "Treat everyone with respect. A kind word can make someone's day.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="motivation-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
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

        {/* ── CONTACT ── */}
        <section className="contact-sec">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Need Help? We're Here for You</h2>
            <p>
              Your teachers and counselors are always available to support you.
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
              <a href="/message-parents" className="explore-card">
                <div className="explore-icon">👨‍👩‍👧</div>
                <h4>For Parents</h4>
                <p>Message from the principal to parents</p>
              </a>
              <a href="/school-anthem" className="explore-card">
                <div className="explore-icon">🎵</div>
                <h4>School Anthem</h4>
                <p>Our pride - the school anthem</p>
              </a>
              <a href="/former-headmistress" className="explore-card">
                <div className="explore-icon">🏆</div>
                <h4>Former Headmistress</h4>
                <p>Tribute to our visionary leader</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

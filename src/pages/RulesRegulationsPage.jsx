import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaGavel,
  FaSchool,
  FaUserClock,
  FaMobileAlt,
  FaBook,
  FaWalking,
  FaUtensils,
  FaBus,
  FaClipboardList,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
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
  --red:#e74c3c; --green:#27ae60;
}

*{box-sizing:border-box;}
.rules{font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--w);}
.rules h1,.rules h2,.rules h3,.rules h4{font-family:'Cormorant Garamond',serif;}

.sec{padding:5rem 1.25rem;}
.inner{max-width:1000px;margin:0 auto;}
.center{text-align:center;}

.chip{display:inline-flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gd);margin-bottom:.7rem;}
.chip::before{content:'';display:block;width:22px;height:2px;background:var(--g);border-radius:2px;}
.sec-h{font-size:clamp(1.8rem,3vw,2.6rem);color:var(--td);margin-bottom:1rem;line-height:1.15;}
.sec-sub{color:var(--mu);font-size:.97rem;line-height:1.75;max-width:620px;display:block;}

/* ── HERO ── */
.hero{position:relative;background:var(--td);padding:6rem 1rem 5rem;overflow:hidden;text-align:center;}
.hero::before{content:'';position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1950&q=80') center/cover;opacity:.1;}
.hero-badge{display:inline-block;background:var(--g);color:var(--td);font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:.35rem 1.1rem;border-radius:2rem;margin-bottom:1.25rem;}
.hero h1{font-size:clamp(2rem,4.5vw,3.2rem);color:var(--w);line-height:1.15;margin-bottom:1rem;}
.hero p{color:rgba(255,255,255,.75);font-size:1.05rem;max-width:560px;margin:0 auto;font-weight:300;}
.hero-arc{position:absolute;bottom:-2px;left:0;right:0;height:70px;background:var(--w);clip-path:ellipse(55% 100% at 50% 100%);}

/* ── INTRO ── */
.intro-sec{background:var(--cr);padding:4rem 1.25rem;}
.intro-text{max-width:750px;margin:0 auto;text-align:center;}
.intro-text p{color:var(--mu);line-height:1.9;font-size:1rem;margin-bottom:1rem;}

/* ── RULES GRID ── */
.rules-sec{background:var(--w);}
.rules-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(450px,1fr));gap:1.5rem;margin-top:3rem;}
.rule-card{background:var(--cr);border-radius:1rem;padding:1.75rem;transition:transform .3s,box-shadow .3s;}
.rule-card:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(19,79,92,.1);}
.rule-header{display:flex;align-items:center;gap:1rem;margin-bottom:1rem;}
.rule-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;}
.rule-icon.do{background:rgba(39,174,96,.12);color:var(--green);}
.rule-icon.dont{background:rgba(231,76,60,.12);color:var(--red);}
.rule-icon.info{background:rgba(27,107,122,.12);color:var(--t);}
.rule-header h3{font-size:1.2rem;color:var(--td);margin:0;}
.rule-list{list-style:none;padding:0;margin:0;}
.rule-list li{display:flex;align-items:flex-start;gap:.75rem;padding:.6rem 0;border-bottom:1px solid rgba(19,79,92,.08);}
.rule-list li:last-child{border-bottom:none;}
.rule-list li svg{margin-top:.2rem;flex-shrink:0;}
.rule-list li.do svg{color:var(--green);}
.rule-list li.dont svg{color:var(--red);}
.rule-list li.info svg{color:var(--t);}
.rule-list li span{color:var(--mu);font-size:.92rem;line-height:1.6;}

/* ── TIMINGS ── */
.time-sec{background:var(--tl);}
.time-table{width:100%;border-collapse:collapse;margin-top:2rem;background:var(--w);border-radius:1rem;overflow:hidden;box-shadow:0 8px 32px rgba(19,79,92,.08);}
.time-table th,.time-table td{padding:1rem 1.5rem;text-align:left;}
.time-table th{background:var(--t);color:var(--w);font-weight:600;font-size:.85rem;text-transform:uppercase;letter-spacing:.05em;}
.time-table tr:nth-child(even){background:var(--cr);}
.time-table td{color:var(--mu);font-size:.95rem;}
.time-table tr:hover{background:var(--tl);}

/* ── DRESS CODE ── */
.dress-sec{background:var(--w);}
.dress-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;margin-top:3rem;}
.dress-card{background:var(--cr);border-radius:1rem;padding:2rem;text-align:center;}
.dress-card h4{font-size:1.15rem;color:var(--td);margin-bottom:.75rem;}
.dress-card p{color:var(--mu);font-size:.9rem;line-height:1.7;}

/* ── FEES ── */
.fees-sec{background:var(--cr);}
.fees-note{background:var(--w);border-left:4px solid var(--g);padding:1.5rem;border-radius:0 .75rem .75rem 0;margin-top:2rem;}
.fees-note h4{color:var(--td);font-size:1.1rem;margin-bottom:.5rem;}
.fees-note p{color:var(--mu);font-size:.9rem;line-height:1.7;margin:0;}

/* ── CONTACT ── */
.contact-sec{background:var(--t);text-align:center;padding:4rem 1.25rem;}
.contact-sec h2{color:var(--w);font-size:clamp(1.5rem,3vw,2rem);margin-bottom:1rem;}
.contact-sec p{color:rgba(255,255,255,.7);max-width:500px;margin:0 auto 1.5rem;}
.contact-sec a{color:var(--g);text-decoration:none;font-weight:600;}

/* ── EXPLORE MORE ── */
.explore-sec{padding:4rem 1.25rem;background:var(--w);}
.explore-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin-top:2rem;}
.explore-card{background:var(--cr);border-radius:1rem;padding:1.75rem;text-align:center;text-decoration:none;transition:transform .3s,box-shadow .3s;}
.explore-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(19,79,92,.12);}
.explore-icon{font-size:2.5rem;margin-bottom:1rem;}
.explore-card h4{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:var(--td);margin-bottom:.5rem;}
.explore-card p{color:var(--mu);font-size:.85rem;line-height:1.6;margin:0;}

@media(max-width:768px){
  .rules-grid{grid-template-columns:1fr;}
  .time-table{display:block;overflow-x:auto;}
}
`;

// ═══════════════════════════════════════════════════════════════════════════
function useA() {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });
  return [ref, inView];
}

// ═══════════════════════════════════════════════════════════════════════════
export default function RulesRegulationsPage() {
  const [r1, v1] = useA();
  const [r2, v2] = useA();

  return (
    <>
      <style>{css}</style>
      <div className="rules">
        {/* ── HERO ── */}
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <span className="hero-badge">Guidelines</span>
            <h1>Rules & Regulations</h1>
            <p>
              Guidelines and policies that help maintain a safe, disciplined,
              and conducive learning environment.
            </p>
          </motion.div>
          <div className="hero-arc" />
        </section>

        {/* ── INTRODUCTION ── */}
        <section className="intro-sec">
          <div className="inner">
            <div className="intro-text">
              <span className="chip">
                <FaGavel /> Code of Conduct
              </span>
              <h2 className="sec-h">Maintaining Excellence</h2>
              <p>
                At Shree Ram Public School, we believe that discipline is the
                foundation of success. Our rules and regulations are designed to
                create a safe, orderly, and nurturing environment where every
                student can thrive academically and personally.
              </p>
              <p>
                Parents and students are requested to go through these
                guidelines carefully and cooperate with the school in enforcing
                them for the benefit of all.
              </p>
            </div>
          </div>
        </section>

        {/* ── GENERAL RULES ── */}
        <section className="sec rules-sec">
          <div className="inner" ref={r1}>
            <span className="chip">
              <FaClipboardList /> Guidelines
            </span>
            <h2 className="sec-h">General Rules</h2>

            <div className="rules-grid">
              <motion.div
                className="rule-card"
                initial={{ opacity: 0, y: 20 }}
                animate={v1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="rule-header">
                  <div className="rule-icon do">
                    <FaCheckCircle />
                  </div>
                  <h3>Do's</h3>
                </div>
                <ul className="rule-list">
                  <li className="do">
                    <FaCheckCircle />
                    <span>Arrive to school on time every day</span>
                  </li>
                  <li className="do">
                    <FaCheckCircle />
                    <span>Wear clean and ironed school uniform daily</span>
                  </li>
                  <li className="do">
                    <FaCheckCircle />
                    <span>Carry the school ID card every day</span>
                  </li>
                  <li className="do">
                    <FaCheckCircle />
                    <span>Maintain cleanliness in the campus</span>
                  </li>
                  <li className="do">
                    <FaCheckCircle />
                    <span>Respect teachers and elders</span>
                  </li>
                  <li className="do">
                    <FaCheckCircle />
                    <span>Complete homework and classwork regularly</span>
                  </li>
                  <li className="do">
                    <FaCheckCircle />
                    <span>Use polite language at all times</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="rule-card"
                initial={{ opacity: 0, y: 20 }}
                animate={v1 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="rule-header">
                  <div className="rule-icon dont">
                    <FaTimesCircle />
                  </div>
                  <h3>Don'ts</h3>
                </div>
                <ul className="rule-list">
                  <li className="dont">
                    <FaTimesCircle />
                    <span>Do not bring valuable items to school</span>
                  </li>
                  <li className="dont">
                    <FaTimesCircle />
                    <span>Do not use mobile phones in school premises</span>
                  </li>
                  <li className="dont">
                    <FaTimesCircle />
                    <span>Do not indulge in ragging or bullying</span>
                  </li>
                  <li className="dont">
                    <FaTimesCircle />
                    <span>Do not damage school property</span>
                  </li>
                  <li className="dont">
                    <FaTimesCircle />
                    <span>Do not leave school without permission</span>
                  </li>
                  <li className="dont">
                    <FaTimesCircle />
                    <span>Do not wear jewelry or makeup</span>
                  </li>
                  <li className="dont">
                    <FaTimesCircle />
                    <span>Do not use abusive language</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SCHOOL TIMINGS ── */}
        <section className="sec time-sec">
          <div className="inner center" ref={r2}>
            <span className="chip">
              <FaUserClock /> Schedule
            </span>
            <h2 className="sec-h">School Timings</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Students are expected to follow the daily schedule strictly.
            </span>

            <table className="time-table">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>School Gate Opens</td>
                  <td>7:30 AM</td>
                </tr>
                <tr>
                  <td>Morning Assembly</td>
                  <td>7:45 AM - 8:00 AM</td>
                </tr>
                <tr>
                  <td>Period 1</td>
                  <td>8:00 AM - 8:45 AM</td>
                </tr>
                <tr>
                  <td>Period 2</td>
                  <td>8:45 AM - 9:30 AM</td>
                </tr>
                <tr>
                  <td>Period 3</td>
                  <td>9:30 AM - 10:15 AM</td>
                </tr>
                <tr>
                  <td>Break / Prayer</td>
                  <td>10:15 AM - 10:35 AM</td>
                </tr>
                <tr>
                  <td>Period 4</td>
                  <td>10:35 AM - 11:20 AM</td>
                </tr>
                <tr>
                  <td>Period 5</td>
                  <td>11:20 AM - 12:05 PM</td>
                </tr>
                <tr>
                  <td>Period 6</td>
                  <td>12:05 PM - 12:50 PM</td>
                </tr>
                <tr>
                  <td>School Closes</td>
                  <td>1:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── ATTENDANCE ── */}
        <section className="sec rules-sec">
          <div className="inner">
            <span className="chip">
              <FaInfoCircle /> Attendance Policy
            </span>
            <h2 className="sec-h">Attendance Rules</h2>

            <div className="rules-grid">
              <motion.div
                className="rule-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="rule-header">
                  <div className="rule-icon info">
                    <FaInfoCircle />
                  </div>
                  <h3>Important Guidelines</h3>
                </div>
                <ul className="rule-list">
                  <li className="info">
                    <FaInfoCircle />
                    <span>Minimum 75% attendance is mandatory</span>
                  </li>
                  <li className="info">
                    <FaInfoCircle />
                    <span>Leave application must be submitted in advance</span>
                  </li>
                  <li className="info">
                    <FaInfoCircle />
                    <span>Medical leave requires a doctor's certificate</span>
                  </li>
                  <li className="info">
                    <FaInfoCircle />
                    <span>Repeated absence may lead to detention</span>
                  </li>
                  <li className="info">
                    <FaInfoCircle />
                    <span>Student must be present on exam days</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="rule-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rule-header">
                  <div className="rule-icon info">
                    <FaExclamationTriangle />
                  </div>
                  <h3>Late Arrival Policy</h3>
                </div>
                <ul className="rule-list">
                  <li className="info">
                    <FaExclamationTriangle />
                    <span>Students arriving after 7:45 AM are marked late</span>
                  </li>
                  <li className="info">
                    <FaExclamationTriangle />
                    <span>Three late arrivals equal one absence</span>
                  </li>
                  <li className="info">
                    <FaExclamationTriangle />
                    <span>Late students must get a gate pass from office</span>
                  </li>
                  <li className="info">
                    <FaExclamationTriangle />
                    <span>Persistent lateness will be reported to parents</span>
                  </li>
                  <li className="info">
                    <FaExclamationTriangle />
                    <span>Gate closes at 8:00 AM sharp</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── UNIFORM ── */}
        <section className="sec dress-sec">
          <div className="inner center">
            <span className="chip">
              <FaSchool /> Dress Code
            </span>
            <h2 className="sec-h">School Uniform</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Students must wear the prescribed school uniform daily.
            </span>

            <div className="dress-grid">
              <motion.div
                className="dress-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h4>Boys</h4>
                <p>
                  White shirt with school logo, grey trousers, black shoes, grey
                  socks. Hair should be neatly trimmed.
                </p>
              </motion.div>
              <motion.div
                className="dress-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4>Girls</h4>
                <p>
                  White shirt with school logo, grey plazzo/skirt, black shoes,
                  white socks. Hair should be tied neatly.
                </p>
              </motion.div>
              <motion.div
                className="dress-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4>Winter Uniform</h4>
                <p>
                  School sweater/sweatshirt with stripes, grey track pants
                  allowed for Classes I-V only.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FEES ── */}
        <section className="sec fees-sec">
          <div className="inner center">
            <span className="chip">
              <FaClipboardList /> Fee Policy
            </span>
            <h2 className="sec-h">Fee Guidelines</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Fee structure and payment policies.
            </span>

            <div className="fees-note">
              <h4>Important Note</h4>
              <p>
                Tuition fees are payable monthly by the 10th of each month.
                Annual fees must be paid by April 30th. Late payment will incur
                a fine of ₹50 per day. Payment can be made via cash, check, or
                online transfer.
              </p>
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
            <h2>Questions or Concerns?</h2>
            <p>
              For any clarification regarding rules and regulations, please
              contact the school office.
            </p>
            <a href="tel:+919876543210">+91 98765 43210</a> &nbsp;|&nbsp;{" "}
            <a href="mailto:info@shreerampublicschool.com">
              info@shreerampublicschool.com
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
                <p>Learn about our educational objectives</p>
              </a>
              <a href="/important-procedure" className="explore-card">
                <div className="explore-icon">📝</div>
                <h4>Important Procedures</h4>
                <p>Admission and other important processes</p>
              </a>
              <a href="/message-students" className="explore-card">
                <div className="explore-icon">🎓</div>
                <h4>For Students</h4>
                <p>Message from the principal to students</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

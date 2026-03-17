import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaClipboardList,
  FaUserPlus,
  FaFileAlt,
  FaBus,
  FaUtensils,
  FaFirstAid,
  FaCalendarAlt,
  FaClock,
  FaDownload,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaBook,
  FaSchool,
  FaMoneyBillWave,
  FaUserGraduate,
} from "react-icons/fa";

// ═══════════════════════════════════════════════════════════════════════════
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Jost:wght@300;600;700;400;500&family=DM+Sans:wght@300;400;500;700&display=swap');

:root {
  --td:#134F5C; --t:#1B6B7A; --tm:#2a8a9a; --tl:#d6edf0; --tp:#edf7f9;
  --g:#E8B97A;  --gb:#F5D08A; --gd:#C9943A; --gp:#fdf4e7;
  --cr:#FAF7F2; --w:#FFFFFF;
  --tx:#0f3640; --mu:#6b8f96;
}

*{box-sizing:border-box;}
.proc{font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--w);}
.proc h1,.proc h2,.proc h3,.proc h4{font-family:'Cormorant Garamond',serif;}

.sec{padding:5rem 1.25rem;}
.inner{max-width:1100px;margin:0 auto;}
.center{text-align:center;}

.chip{display:inline-flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gd);margin-bottom:.7rem;}
.chip::before{content:'';display:block;width:22px;height:2px;background:var(--g);border-radius:2px;}
.sec-h{font-size:clamp(1.8rem,3vw,2.6rem);color:var(--td);margin-bottom:1rem;line-height:1.15;}
.sec-sub{color:var(--mu);font-size:.97rem;line-height:1.75;max-width:620px;display:block;}

/* ── HERO ── */
.hero{position:relative;background:var(--td);padding:6rem 1rem 5rem;overflow:hidden;text-align:center;}
.hero::before{content:'';position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1950&q=80') center/cover;opacity:.1;}
.hero-badge{display:inline-block;background:var(--g);color:var(--td);font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:.35rem 1.1rem;border-radius:2rem;margin-bottom:1.25rem;}
.hero h1{font-size:clamp(2rem,4.5vw,3.2rem);color:var(--w);line-height:1.15;margin-bottom:1rem;}
.hero p{color:rgba(255,255,255,.75);font-size:1.05rem;max-width:560px;margin:0 auto;font-weight:300;}
.hero-arc{position:absolute;bottom:-2px;left:0;right:0;height:70px;background:var(--w);clip-path:ellipse(55% 100% at 50% 100%);}

/* ── STEPS ── */
.steps-sec{background:var(--cr);}
.steps-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;margin-top:3rem;}
.step-card{background:var(--w);border-radius:1rem;padding:2rem;position:relative;transition:transform .3s,box-shadow .3s;}
.step-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(19,79,92,.1);}
.step-num{position:absolute;top:-15px;left:25px;width:40px;height:40px;background:var(--g);color:var(--td);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.1rem;}
.step-card:nth-child(2) .step-num{background:var(--t);color:var(--w);}
.step-card:nth-child(3) .step-num{background:#2a8a60;color:var(--w);}
.step-card:nth-child(4) .step-num{background:#7B6FD4;color:var(--w);}
.step-icon{font-size:2rem;color:var(--t);margin-bottom:1rem;}
.step-card h3{font-size:1.25rem;color:var(--td);margin-bottom:.75rem;}
.step-card p{color:var(--mu);font-size:.92rem;line-height:1.7;margin:0;}
.step-list{list-style:none;padding:0;margin:1rem 0 0;}
.step-list li{display:flex;align-items:flex-start;gap:.5rem;font-size:.88rem;color:var(--mu);margin-bottom:.5rem;}
.step-list li svg{color:var(--g);margin-top:.2rem;flex-shrink:0;}

/* ── DOCUMENTS ── */
.docs-sec{background:var(--w);}
.docs-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin-top:3rem;}
.doc-card{background:var(--cr);border-radius:1rem;padding:1.75rem;text-align:center;transition:transform .3s,box-shadow .3s;}
.doc-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(19,79,92,.1);}
.doc-icon{width:60px;height:60px;border-radius:50%;background:var(--tl);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-size:1.5rem;color:var(--t);}
.doc-card h4{font-size:1.1rem;color:var(--td);margin-bottom:.5rem;}
.doc-card p{color:var(--mu);font-size:.85rem;line-height:1.6;margin:0;}

/* ── FEE STRUCTURE ── */
.fee-sec{background:var(--cr);}
.fee-table{width:100%;border-collapse:collapse;margin-top:2rem;background:var(--w);border-radius:1rem;overflow:hidden;box-shadow:0 8px 32px rgba(19,79,92,.08);}
.fee-table th,.fee-table td{padding:1rem 1.5rem;text-align:left;}
.fee-table th{background:var(--t);color:var(--w);font-weight:600;font-size:.85rem;text-transform:uppercase;letter-spacing:.05em;}
.fee-table tr:nth-child(even){background:var(--cr);}
.fee-table tr:hover{background:var(--tl);}
.fee-table td{color:var(--mu);font-size:.95rem;}
.fee-note{background:var(--w);border-left:4px solid var(--g);padding:1.5rem;border-radius:0 .75rem .75rem 0;margin-top:2rem;}
.fee-note h4{color:var(--td);font-size:1.1rem;margin-bottom:.5rem;}
.fee-note p{color:var(--mu);font-size:.9rem;line-height:1.7;margin:0;}

/* ── TRANSPORT ── */
.transport-sec{background:var(--w);}
.transport-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;margin-top:3rem;}
.transport-card{background:var(--cr);border-radius:1rem;padding:2rem;text-align:center;}
.transport-card h4{font-size:1.15rem;color:var(--td);margin-bottom:.5rem;}
.transport-card p{color:var(--mu);font-size:.9rem;line-height:1.7;}

/* ── IMPORTANT ── */
.imp-sec{background:linear-gradient(135deg,var(--td) 0%,#0a2e36 100%);padding:4rem 1.25rem;}
.imp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;}
.imp-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:1rem;padding:2rem;}
.imp-card h3{color:var(--g);font-size:1.2rem;margin-bottom:1rem;display:flex;align-items:center;gap:.75rem;}
.imp-card ul{list-style:none;padding:0;margin:0;}
.imp-card ul li{color:rgba(255,255,255,.75);font-size:.9rem;margin-bottom:.6rem;display:flex;align-items:flex-start;gap:.5rem;}
.imp-card ul li svg{color:var(--g);margin-top:.2rem;flex-shrink:0;}

/* ── CONTACT ── */
.contact-sec{background:var(--t);text-align:center;padding:4rem 1.25rem;}
.contact-sec h2{color:var(--w);font-size:clamp(1.5rem,3vw,2rem);margin-bottom:1rem;}
.contact-sec p{color:rgba(255,255,255,.7);max-width:500px;margin:0 auto 1.5rem;}
.contact-links{display:flex;justify-content:center;gap:2rem;flex-wrap:wrap;}
.contact-links a{color:var(--g);text-decoration:none;font-weight:600;display:flex;align-items:center;gap:.5rem;}

/* ── EXPLORE MORE ── */
.explore-sec{padding:4rem 1.25rem;background:var(--w);}
.explore-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin-top:2rem;}
.explore-card{background:var(--cr);border-radius:1rem;padding:1.75rem;text-align:center;text-decoration:none;transition:transform .3s,box-shadow .3s;}
.explore-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(19,79,92,.12);}
.explore-icon{font-size:2.5rem;margin-bottom:1rem;}
.explore-card h4{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:var(--td);margin-bottom:.5rem;}
.explore-card p{color:var(--mu);font-size:.85rem;line-height:1.6;margin:0;}

@media(max-width:768px){
  .fee-table{display:block;overflow-x:auto;}
}
`;

// ═══════════════════════════════════════════════════════════════════════════
function useA() {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });
  return [ref, inView];
}

// ═══════════════════════════════════════════════════════════════════════════
export default function ImportantProcedurePage() {
  const [r1, v1] = useA();
  const [r2, v2] = useA();

  return (
    <>
      <style>{css}</style>
      <div className="proc">
        {/* ── HERO ── */}
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <span className="hero-badge">Essential Info</span>
            <h1>Important Procedures</h1>
            <p>
              Key processes and guidelines that parents and students need to
              know.
            </p>
          </motion.div>
          <div className="hero-arc" />
        </section>

        {/* ── ADMISSION PROCESS ── */}
        <section className="sec steps-sec">
          <div className="inner center" ref={r1}>
            <span className="chip">
              <FaClipboardList /> Admission Process
            </span>
            <h2 className="sec-h">How to Apply</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Follow these simple steps to complete the admission process.
            </span>

            <div className="steps-grid">
              {[
                {
                  n: "1",
                  icon: <FaUserPlus />,
                  t: "Fill Application Form",
                  d: "Obtain and fill the admission form from the school office or download from website.",
                  l: [
                    "Available from January each year",
                    "Submit along with required documents",
                    "Pay registration fee",
                  ],
                },
                {
                  n: "2",
                  icon: <FaFileAlt />,
                  t: "Document Verification",
                  d: "Submit required documents for verification.",
                  l: [
                    "Birth certificate",
                    "Previous marksheet",
                    "Transfer certificate",
                    "Passport size photos",
                  ],
                },
                {
                  n: "3",
                  icon: <FaUserGraduate />,
                  t: "Interaction/Assessment",
                  d: "Student may be called for a brief interaction.",
                  l: "For Classes II and above",
                },
                {
                  n: "4",
                  icon: <FaCheckCircle />,
                  t: "Confirmation",
                  d: "Pay fees and collect admission confirmation.",
                  l: [
                    "Fee payment within 3 days",
                    "Collect ID card and uniform slip",
                  ],
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="step-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={v1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="step-num">{item.n}</div>
                  <div className="step-icon">{item.icon}</div>
                  <h3>{item.t}</h3>
                  <p>{item.d}</p>
                  {item.l && (
                    <ul className="step-list">
                      {Array.isArray(item.l) ? (
                        item.l.map((li, i) => (
                          <li key={i}>
                            <FaCheckCircle /> {li}
                          </li>
                        ))
                      ) : (
                        <li>
                          <FaCheckCircle /> {item.l}
                        </li>
                      )}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REQUIRED DOCUMENTS ── */}
        <section className="sec docs-sec">
          <div className="inner center">
            <span className="chip">
              <FaFileAlt /> Required Documents
            </span>
            <h2 className="sec-h">Documents for Admission</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Please bring these documents at the time of admission.
            </span>

            <div className="docs-grid">
              {[
                {
                  icon: <FaFileAlt />,
                  t: "Birth Certificate",
                  d: "Original and photocopy from municipal corporation.",
                },
                {
                  icon: <FaFileAlt />,
                  t: "Previous Marksheet",
                  d: "For Classes II and above, original and photocopy.",
                },
                {
                  icon: <FaFileAlt />,
                  t: "Transfer Certificate",
                  d: "Original TC from previous school (if applicable).",
                },
                {
                  icon: <FaFileAlt />,
                  t: "Passport Photos",
                  d: "4 recent passport size photographs.",
                },
                {
                  icon: <FaFileAlt />,
                  t: "Aadhar Card",
                  d: "Copy of child's Aadhar card.",
                },
                {
                  icon: <FaFileAlt />,
                  t: "Address Proof",
                  d: "Copy of any utility bill or ration card.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="doc-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="doc-icon">{item.icon}</div>
                  <h4>{item.t}</h4>
                  <p>{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEE STRUCTURE ── */}
        <section className="sec fee-sec">
          <div className="inner center" ref={r2}>
            <span className="chip">
              <FaMoneyBillWave /> Fee Structure
            </span>
            <h2 className="sec-h">Tuition Fees (Annual)</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Transparent and affordable fee structure for quality education.
            </span>

            <table className="fee-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Tuition Fee (Monthly)</th>
                  <th>Annual Fee</th>
                  <th>Total Annual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nursery - KG</td>
                  <td>₹1,800</td>
                  <td>₹5,000</td>
                  <td>₹26,600</td>
                </tr>
                <tr>
                  <td>Class I - V</td>
                  <td>₹2,200</td>
                  <td>₹6,000</td>
                  <td>₹32,400</td>
                </tr>
                <tr>
                  <td>Class VI - VIII</td>
                  <td>₹2,500</td>
                  <td>₹7,000</td>
                  <td>₹37,000</td>
                </tr>
                <tr>
                  <td>Class IX - X</td>
                  <td>₹2,800</td>
                  <td>₹8,000</td>
                  <td>₹41,600</td>
                </tr>
                <tr>
                  <td>Class XI - XII</td>
                  <td>₹3,200</td>
                  <td>₹10,000</td>
                  <td>₹48,400</td>
                </tr>
              </tbody>
            </table>

            <div className="fee-note">
              <h4>Payment Options</h4>
              <p>
                Fees can be paid monthly, quarterly, or annually. Annual payment
                gets 5% discount. Payment modes: Cash, Cheque, UPI, Online
                Transfer. Late payment incurs ₹50/day fine.
              </p>
            </div>
          </div>
        </section>

        {/* ── TRANSPORT ── */}
        <section className="sec transport-sec">
          <div className="inner center">
            <span className="chip">
              <FaBus /> Transport Facility
            </span>
            <h2 className="sec-h">School Transportation</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              Safe and reliable transport service available for students.
            </span>

            <div className="transport-grid">
              <motion.div
                className="transport-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <h4>Routes Available</h4>
                <p>
                  Transport covers all major areas in Muzaffarnagar and nearby
                  towns. Contact office for route details.
                </p>
              </motion.div>
              <motion.div
                className="transport-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4>Transport Charges</h4>
                <p>
                  ₹500-₹1,500 per month depending on distance. Annual payment
                  available with discount.
                </p>
              </motion.div>
              <motion.div
                className="transport-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4>Safety Measures</h4>
                <p>
                  GPS enabled buses, female attendant, first aid kit, and CCTV
                  monitoring in all vehicles.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── IMPORTANT NOTES ── */}
        <section className="imp-sec">
          <div className="inner">
            <div className="imp-grid">
              <motion.div
                className="imp-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3>
                  <FaExclamationTriangle /> Important Dates
                </h3>
                <ul>
                  <li>Admission Form Available: January</li>
                  <li>Last Date to Apply: March 31</li>
                  <li>Session Begins: April 1</li>
                  <li>Parent Teacher Meeting: Last Saturday of every month</li>
                </ul>
              </motion.div>
              <motion.div
                className="imp-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3>
                  <FaInfoCircle /> School Timings
                </h3>
                <ul>
                  <li>Gate Opens: 7:30 AM</li>
                  <li>Assembly: 7:45 AM</li>
                  <li>School Closes: 1:00 PM</li>
                  <li>Office Hours: 8:00 AM - 2:00 PM</li>
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
            <h2>Need More Information?</h2>
            <p>
              Contact our admission office for any queries regarding procedures.
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
              <a href="/admissions" className="explore-card">
                <div className="explore-icon">📚</div>
                <h4>Admissions</h4>
                <p>Apply for admission now</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

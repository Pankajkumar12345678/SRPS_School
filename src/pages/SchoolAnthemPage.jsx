import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaMusic,
  FaHeart,
  FaStar,
  FaQuoteLeft,
  FaPlay,
  FaPause,
  FaVideo,
  FaMicrophone,
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
.anthem{font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--w);}
.anthem h1,.anthem h2,.anthem h3,.anthem h4{font-family:'Cormorant Garamond',serif;}

.sec{padding:5rem 1.25rem;}
.inner{max-width:1100px;margin:0 auto;}
.center{text-align:center;}

.chip{display:inline-flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gd);margin-bottom:.7rem;}
.chip::before{content:'';display:block;width:22px;height:2px;background:var(--g);border-radius:2px;}
.sec-h{font-size:clamp(1.8rem,3vw,2.6rem);color:var(--td);margin-bottom:1rem;line-height:1.15;}
.sec-sub{color:var(--mu);font-size:.97rem;line-height:1.75;max-width:620px;display:block;}

/* ── HERO ── */
.hero{position:relative;background:var(--td);padding:6rem 1rem 5rem;overflow:hidden;text-align:center;}
.hero::before{content:'';position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1950&q=80') center/cover;opacity:.1;}
.hero-badge{display:inline-block;background:var(--g);color:var(--td);font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:.35rem 1.1rem;border-radius:2rem;margin-bottom:1.25rem;}
.hero h1{font-size:clamp(2rem,4.5vw,3.2rem);color:var(--w);line-height:1.15;margin-bottom:1rem;}
.hero p{color:rgba(255,255,255,.75);font-size:1.05rem;max-width:560px;margin:0 auto;font-weight:300;}
.hero-arc{position:absolute;bottom:-2px;left:0;right:0;height:70px;background:var(--w);clip-path:ellipse(55% 100% at 50% 100%);}

/* ── ANTHEM CARD ── */
.anthem-sec{background:var(--cr);}
.anthem-card{background:var(--w);border-radius:1.5rem;padding:3rem;box-shadow:0 16px 64px rgba(19,79,92,.12);max-width:900px;margin:0 auto;position:relative;overflow:hidden;}
.anthem-card::before{content:'';position:absolute;top:0;left:0;right:0;height:6px;background:linear-gradient(90deg,var(--t),var(--g),var(--t));}
.anthem-title{text-align:center;margin-bottom:2rem;}
.anthem-title h2{font-size:2rem;color:var(--td);margin-bottom:.5rem;}
.anthem-title span{color:var(--mu);font-size:.9rem;}
.anthem-content{font-family:'Cormorant Garamond',serif;}
.anthem-verse{text-align:center;margin-bottom:2.5rem;padding-bottom:2rem;border-bottom:1px dashed rgba(19,79,92,.15);}
.anthem-verse:last-of-type{border-bottom:none;margin-bottom:0;padding-bottom:0;}
.anthem-label{font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--g);margin-bottom:1rem;}
.anthem-text{font-size:1.35rem;line-height:2;font-style:italic;color:var(--td);max-width:700px;margin:0 auto;}
.anthem-text span{color:var(--t);font-weight:600;}

/* ── PLAYER ── */
.player-sec{background:var(--w);}
.player-card{background:var(--cr);border-radius:1.25rem;padding:2.5rem;display:flex;align-items:center;gap:2rem;max-width:700px;margin:0 auto;}
@media(max-width:600px){.player-card{flex-direction:column;text-align:center;}}
.play-btn{width:80px;height:80px;border-radius:50%;background:var(--g);color:var(--td);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.8rem;transition:all .3s;flex-shrink:0;}
.play-btn:hover{transform:scale(1.1);box-shadow:0 8px 24px rgba(232,185,122,.4);}
.player-info{flex:1;}
.player-info h3{font-size:1.3rem;color:var(--td);margin-bottom:.25rem;}
.player-info p{color:var(--mu);font-size:.9rem;margin:0;}
.player-progress{width:100%;height:6px;background:var(--tl);border-radius:3px;margin-top:1rem;overflow:hidden;}
.player-progress-bar{height:100%;background:linear-gradient(90deg,var(--t),var(--g));width:35%;border-radius:3px;}

/* ── MEANING ── */
.meaning-sec{background:var(--cr);}
.meaning-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:2rem;margin-top:3rem;}
.meaning-card{background:var(--w);border-radius:1rem;padding:2rem;border-left:4px solid var(--g);}
.meaning-card:nth-child(2){border-left-color:var(--t);}
.meaning-card:nth-child(3){border-left-color:#2a8a60;}
.meaning-card h3{font-size:1.2rem;color:var(--td);margin-bottom:1rem;}
.meaning-card p{color:var(--mu);font-size:.95rem;line-height:1.8;margin:0;}

/* ── QUOTE ── */
.quote-sec{background:linear-gradient(135deg,var(--t) 0%,#0a2e36 100%);padding:5rem 1.25rem;text-align:center;}
.quote-icon{font-size:3rem;color:var(--g);margin-bottom:1.5rem;}
.quote-text{font-family:'Cormorant Garamond',serif;font-size:clamp(1.4rem,3vw,2rem);color:var(--w);line-height:1.7;max-width:800px;margin:0 auto 1rem;font-style:italic;}
.quote-author{color:var(--g);font-weight:600;}

/* ── SING ── */
.sing-sec{background:var(--w);text-align:center;padding:4rem 1.25rem;}
.sing-sec h2{font-size:clamp(1.5rem,3vw,2rem);color:var(--td);margin-bottom:1rem;}
.sing-sec p{color:var(--mu);max-width:500px;margin:0 auto;}

/* ── EXPLORE MORE ── */
.explore-sec{padding:4rem 1.25rem;background:var(--cr);}
.explore-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.5rem;margin-top:2rem;}
.explore-card{background:var(--w);border-radius:1rem;padding:1.75rem;text-align:center;text-decoration:none;transition:transform .3s,box-shadow .3s;}
.explore-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(19,79,92,.12);}
.explore-icon{font-size:2.5rem;margin-bottom:1rem;}
.explore-card h4{font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:var(--td);margin-bottom:.5rem;}
.explore-card p{color:var(--mu);font-size:.85rem;line-height:1.6;margin:0;}
`;

// ═══════════════════════════════════════════════════════════════════════════
function useA() {
  const [ref, inView] = useInView({ threshold: 0.12, triggerOnce: true });
  return [ref, inView];
}

// ═══════════════════════════════════════════════════════════════════════════
export default function SchoolAnthemPage() {
  const [r1, v1] = useA();
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <>
      <style>{css}</style>
      <div className="anthem">
        {/* ── HERO ── */}
        <section className="hero">
          <motion.div
            initial={{ opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <span className="hero-badge">Pride of SRPS</span>
            <h1>School Anthem</h1>
            <p>The soul of our institution — a melody that unites us all.</p>
          </motion.div>
          <div className="hero-arc" />
        </section>

        {/* ── ANTHEM LYRICS ── */}
        <section className="sec anthem-sec">
          <div className="inner" ref={r1}>
            <motion.div
              className="anthem-card"
              initial={{ opacity: 0, y: 30 }}
              animate={v1 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="anthem-title">
                <span className="chip">
                  <FaMusic /> Shree Ram Public School
                </span>
                <h2>School Anthem</h2>
                <span>Lyrics & Composition</span>
              </div>

              <div className="anthem-content">
                <div className="anthem-verse">
                  <div className="anthem-label">Verse 1</div>
                  <p className="anthem-text">
                    <span>Shree Ram Public School</span> mein humein hai naaz,
                    <br />
                    Vidya ke deepak jisme jalte hain saajna,
                    <br />
                    Har dil khush yeh gaata hai,
                    <br />
                    <span>Shree Ram</span> jeevan humara, shikshа hamaara.
                  </p>
                </div>

                <div className="anthem-verse">
                  <div className="anthem-label">Verse 2</div>
                  <p className="anthem-text">
                    <span>Bachpan ki ummeed</span> yeh school leke aata hai,
                    <br />
                    Har bacche ka sapna isne sach karwaaya hai,
                    <br />
                    Desh ki shaan badhayega,
                    <br />
                    <span>Har student</span> iss school ka naam rachaayega.
                  </p>
                </div>

                <div className="anthem-verse">
                  <div className="anthem-label">Chorus</div>
                  <p className="anthem-text">
                    <span>Chalo milkar</span> iss school ki god mein,
                    <br />
                    Vidya ki roshni leke aage badhein,
                    <br />
                    <span>Shree Ram Public School</span> hai humara,
                    <br />
                    <span>Ishq humara</span> — education hamaara!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── PLAYER ── */}
        <section className="sec player-sec">
          <div className="inner">
            <div className="player-card">
              <button className="play-btn" onClick={togglePlay}>
                {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <div className="player-info">
                <h3>School Anthem (Audio)</h3>
                <p>Listen to the melodious school anthem</p>
                <div className="player-progress">
                  <div className="player-progress-bar" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MEANING ── */}
        <section className="sec meaning-sec">
          <div className="inner center">
            <span className="chip">
              <FaHeart /> Significance
            </span>
            <h2 className="sec-h">What the Anthem Means</h2>
            <span className="sec-sub" style={{ margin: "0 auto" }}>
              The anthem captures our values, aspirations, and commitment to
              education.
            </span>

            <div className="meaning-grid">
              {[
                {
                  t: "Pride in Education",
                  d: "The anthem expresses the pride we feel in being part of Shree Ram Public School, where knowledge illuminates every young mind.",
                },
                {
                  t: "Nurturing Dreams",
                  d: "It speaks to how the school transforms the dreams of children into reality, giving them hope for a brighter future.",
                },
                {
                  t: "Unity & Progress",
                  d: "The chorus emphasizes collective progress — students advancing together with the light of education, building the nation's glory.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="meaning-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3>{item.t}</h3>
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
          >
            <div className="quote-icon">
              <FaMusic />
            </div>
            <p className="quote-text">
              "Where education meets tradition, and dreams take flight."
            </p>
            <div className="quote-author">— Shree Ram Public School</div>
          </motion.div>
        </section>

        {/* ── SING WITH US ── */}
        <section className="sing-sec">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Sing With Us</h2>
            <p>
              Every morning, students and teachers come together to sing our
              beloved anthem, filling the air with unity and pride.
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
              <a href="/retired-teachers" className="explore-card">
                <div className="explore-icon">👨‍🏫</div>
                <h4>Retired Teachers</h4>
                <p>Honoring our legends</p>
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

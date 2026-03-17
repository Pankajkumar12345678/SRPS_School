import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { photos } from "../data/galleryData.js";

const CATEGORIES = [
  "All",
  "Campus Life",
  "Events & Activities",
  "NCC & Sports",
];

// ═══════════════════════════════════════════════════════
//  LED BOARD HERO CAROUSEL  (inline — no external import)
// ═══════════════════════════════════════════════════════
const ledCss = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

.led-scene{
  width:100%;
  background:
    repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(0,0,0,.03) 60px,rgba(0,0,0,.03) 61px),
    repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(0,0,0,.03) 60px,rgba(0,0,0,.03) 61px),
    linear-gradient(160deg,#d6cfc7 0%,#c8bfb5 40%,#b8ada1 100%);
  display:flex;align-items:center;justify-content:center;
  padding:60px 40px 80px;position:relative;overflow:hidden;perspective:1400px;
}
.led-scene::before{content:'';position:absolute;top:0;left:10%;right:10%;height:300px;background:radial-gradient(ellipse at top,rgba(255,240,200,.35) 0%,transparent 70%);pointer-events:none;}
.led-scene::after{content:'';position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(0deg,rgba(0,0,0,.18) 0%,transparent 100%);pointer-events:none;}
.led-wall-panel{position:absolute;top:0;left:50%;transform:translateX(-50%);width:85%;height:100%;background:linear-gradient(180deg,#cdc5bc 0%,#bfb5aa 100%);box-shadow:inset -8px 0 20px rgba(0,0,0,.1),inset 8px 0 20px rgba(0,0,0,.1);}
.led-wrap{position:relative;width:100%;max-width:1100px;}
.led-cable{position:absolute;top:-30px;left:50%;transform:translateX(-50%);z-index:10;display:flex;gap:180px;}
.led-cable-wire{width:3px;height:35px;background:linear-gradient(180deg,#888,#333);border-radius:2px;box-shadow:1px 0 3px rgba(0,0,0,.4);}
.led-mount{position:relative;transform-style:preserve-3d;transform:rotateX(2deg) rotateY(-1deg);filter:drop-shadow(0 60px 80px rgba(0,0,0,.55)) drop-shadow(0 20px 30px rgba(0,0,0,.4));}
.led-casing{
  position:relative;background:linear-gradient(145deg,#1c1c1c 0%,#111 50%,#0a0a0a 100%);
  border-radius:18px;padding:22px;
  box-shadow:inset 0 2px 1px rgba(255,255,255,.08),inset 0 -2px 2px rgba(0,0,0,.8),inset 3px 0 6px rgba(255,255,255,.04),inset -3px 0 6px rgba(0,0,0,.6),8px 8px 0 #080808,0 0 60px rgba(0,180,255,.08);
  z-index:2;
}
.led-casing::before{content:'';position:absolute;top:6px;right:-8px;width:8px;height:calc(100% - 12px);background:linear-gradient(180deg,#0f0f0f,#050505);border-radius:0 4px 4px 0;}
.led-casing::after{content:'';position:absolute;bottom:-8px;left:6px;width:calc(100% - 6px);height:8px;background:linear-gradient(90deg,#0a0a0a,#050505);border-radius:0 0 4px 4px;}
.led-screws{position:absolute;inset:0;pointer-events:none;z-index:5;}
.led-screw{position:absolute;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#555,#222);box-shadow:inset 0 1px 2px rgba(255,255,255,.15),0 1px 3px rgba(0,0,0,.8);}
.led-screw::after{content:'+';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:7px;color:rgba(255,255,255,.2);font-weight:900;}
.led-screw.tl{top:8px;left:8px;}.led-screw.tr{top:8px;right:8px;}.led-screw.bl{bottom:8px;left:8px;}.led-screw.br{bottom:8px;right:8px;}
.led-inner-bezel{position:relative;border-radius:8px;background:#000;padding:3px;box-shadow:inset 0 0 12px rgba(0,0,0,.9),0 0 30px rgba(0,150,255,.12);}
.led-glow-top{position:absolute;top:-4px;left:5%;right:5%;height:4px;background:linear-gradient(90deg,transparent,#00c8ff,#fff,#00c8ff,transparent);border-radius:2px;filter:blur(3px);opacity:.7;animation:ledPulse 3s ease-in-out infinite;}
.led-glow-bottom{position:absolute;bottom:-4px;left:5%;right:5%;height:4px;background:linear-gradient(90deg,transparent,#00c8ff,#fff,#00c8ff,transparent);border-radius:2px;filter:blur(3px);opacity:.5;animation:ledPulse 3s ease-in-out infinite 1.5s;}
@keyframes ledPulse{0%,100%{opacity:.5;}50%{opacity:.9;}}
.led-screen{position:relative;border-radius:6px;overflow:hidden;aspect-ratio:16/7;background:#000;background-image:repeating-linear-gradient(0deg,rgba(0,0,0,.04),rgba(0,0,0,.04) 1px,transparent 1px,transparent 3px);}
.led-screen-glare{position:absolute;top:0;left:0;right:0;height:45%;background:linear-gradient(180deg,rgba(255,255,255,.06) 0%,transparent 100%);border-radius:6px 6px 0 0;pointer-events:none;z-index:10;}
.led-screen-glare::after{content:'';position:absolute;top:8px;left:20px;width:120px;height:50px;background:rgba(255,255,255,.05);border-radius:50%;filter:blur(12px);}
.led-slide-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.led-slide-overlay{position:absolute;inset:0;z-index:2;background:linear-gradient(135deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.2) 50%,rgba(0,0,0,.5) 100%);}
.led-slide-content{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;}
.led-slide-badge{font-family:'Orbitron',monospace;font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#00c8ff;background:rgba(0,200,255,.1);border:1px solid rgba(0,200,255,.3);padding:.3rem .9rem;border-radius:3px;margin-bottom:1rem;text-shadow:0 0 10px #00c8ff;}
.led-slide-title{font-family:'Orbitron',monospace;font-size:clamp(1rem,3.5vw,2.4rem);font-weight:900;color:#fff;text-shadow:0 0 30px rgba(255,255,255,.4),0 2px 8px rgba(0,0,0,.8);line-height:1.1;margin-bottom:.75rem;letter-spacing:.05em;}
.led-slide-desc{font-family:'Share Tech Mono',monospace;font-size:clamp(.6rem,1.4vw,.9rem);color:rgba(255,255,255,.7);max-width:500px;line-height:1.6;}
.led-hud-tl{position:absolute;top:1rem;left:1rem;z-index:4;}
.led-hud-tr{position:absolute;top:1rem;right:1rem;z-index:4;text-align:right;}
.led-hud-bl{position:absolute;bottom:2.5rem;left:1rem;z-index:4;}
.led-hud-br{position:absolute;bottom:2.5rem;right:1rem;z-index:4;text-align:right;}
.led-hud-text{font-family:'Share Tech Mono',monospace;font-size:.58rem;color:rgba(0,200,255,.7);letter-spacing:.1em;text-transform:uppercase;text-shadow:0 0 8px rgba(0,200,255,.5);line-height:1.6;}
.led-hud-corner{display:inline-block;width:14px;height:14px;border-top:2px solid rgba(0,200,255,.6);border-left:2px solid rgba(0,200,255,.6);}
.led-hud-corner.tr-c{border-left:none;border-right:2px solid rgba(0,200,255,.6);}
.led-hud-corner.bl-c{border-top:none;border-bottom:2px solid rgba(0,200,255,.6);}
.led-hud-corner.br-c{border-top:none;border-left:none;border-bottom:2px solid rgba(0,200,255,.6);border-right:2px solid rgba(0,200,255,.6);}
.led-ticker-bar{position:absolute;bottom:0;left:0;right:0;height:32px;background:rgba(0,0,0,.75);border-top:1px solid rgba(0,200,255,.2);z-index:5;display:flex;align-items:center;overflow:hidden;}
.led-ticker-label{font-family:'Orbitron',monospace;font-size:.55rem;font-weight:700;letter-spacing:.15em;color:#000;background:#00c8ff;padding:0 .75rem;height:100%;display:flex;align-items:center;white-space:nowrap;flex-shrink:0;}
.led-ticker-track{display:flex;gap:3rem;animation:ledTicker 25s linear infinite;white-space:nowrap;padding-left:2rem;}
.led-ticker-item{font-family:'Share Tech Mono',monospace;font-size:.65rem;color:rgba(255,255,255,.8);letter-spacing:.05em;}
.led-ticker-dot{color:#00c8ff;margin:0 .5rem;}
@keyframes ledTicker{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.led-nav{position:absolute;top:50%;left:0;right:0;display:flex;justify-content:space-between;padding:0 1rem;transform:translateY(-50%);z-index:6;pointer-events:none;}
.led-nav-btn{pointer-events:all;width:38px;height:38px;border-radius:4px;background:rgba(0,0,0,.5);border:1px solid rgba(0,200,255,.4);color:#00c8ff;font-size:1.4rem;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;box-shadow:0 0 12px rgba(0,200,255,.2);}
.led-nav-btn:hover{background:rgba(0,200,255,.15);border-color:#00c8ff;box-shadow:0 0 20px rgba(0,200,255,.4);}
.led-dots{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;gap:.5rem;z-index:6;}
.led-dot{width:6px;height:6px;border-radius:1px;background:rgba(255,255,255,.3);cursor:pointer;transition:all .3s;border:1px solid rgba(0,200,255,.2);}
.led-dot.active{background:#00c8ff;box-shadow:0 0 8px #00c8ff;width:18px;}
.led-brand-strip{position:absolute;bottom:8px;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:0 28px;z-index:3;}
.led-brand-logo{font-family:'Orbitron',monospace;font-size:.5rem;font-weight:700;color:rgba(255,255,255,.15);letter-spacing:.2em;text-transform:uppercase;}
.led-power-dot{width:6px;height:6px;border-radius:50%;background:#00ff88;box-shadow:0 0 6px #00ff88;animation:powerBlink 2s ease-in-out infinite;}
@keyframes powerBlink{0%,100%{opacity:1;}50%{opacity:.4;}}
.led-bracket{position:absolute;bottom:-18px;width:100%;display:flex;justify-content:space-around;padding:0 80px;z-index:0;}
.led-bracket-arm{width:14px;height:28px;background:linear-gradient(180deg,#4a4a4a,#2a2a2a);border-radius:0 0 4px 4px;box-shadow:2px 4px 8px rgba(0,0,0,.5);position:relative;}
.led-bracket-arm::after{content:'';position:absolute;bottom:-6px;left:-8px;width:30px;height:6px;background:linear-gradient(90deg,#3a3a3a,#222);border-radius:2px;box-shadow:0 2px 6px rgba(0,0,0,.5);}
.led-reflection{width:100%;max-width:1100px;height:60px;margin-top:4px;background:linear-gradient(180deg,rgba(0,0,0,.15) 0%,transparent 100%);border-radius:0 0 8px 8px;filter:blur(2px);transform:scaleY(-0.3) translateY(-30px);transform-origin:top;opacity:.4;pointer-events:none;}
@media(max-width:768px){
  .led-scene{padding:40px 16px 60px;}
  .led-casing{padding:12px;border-radius:10px;}
  .led-cable{gap:80px;}
  .led-hud-tl,.led-hud-br{display:none;}
}
@media(max-width:480px){
  .led-scene{padding:24px 8px 40px;}
  .led-casing{padding:8px;}
  .led-slide-desc{display:none;}
  .led-slide-badge{font-size:.5rem;}
  .led-nav-btn{width:28px;height:28px;font-size:1rem;}
  .led-cable{gap:50px;}
}
`;

const TICKER_TEXT = [
  "Annual Function 2025",
  "NCC Republic Day Parade",
  "Science Exhibition Winners",
  "Board Results 98.6%",
  "District Sports Champions",
  "Cultural Fest Highlights",
  "Annual Function 2025",
  "NCC Republic Day Parade",
  "Science Exhibition Winners",
  "Board Results 98.6%",
  "District Sports Champions",
  "Cultural Fest Highlights",
];

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span>
      {time.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })}
    </span>
  );
}

function LEDBoardCarousel({ photos = [], interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (photos.length < 2 || paused) return;
    const t = setInterval(
      () => setIndex((p) => (p + 1) % photos.length),
      interval,
    );
    return () => clearInterval(t);
  }, [photos.length, interval, paused]);

  if (!photos.length) return null;

  const current = photos[index];
  const nextSlide = () => setIndex((p) => (p + 1) % photos.length);
  const prevSlide = () =>
    setIndex((p) => (p - 1 + photos.length) % photos.length);
  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <>
      <style>{ledCss}</style>
      <div className="led-scene">
        <div className="led-wall-panel" />
        <div className="led-wrap">
          <div className="led-cable">
            <div className="led-cable-wire" />
            <div className="led-cable-wire" />
            <div className="led-cable-wire" />
          </div>

          <div
            className="led-mount"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="led-casing">
              <div className="led-screws">
                <div className="led-screw tl" />
                <div className="led-screw tr" />
                <div className="led-screw bl" />
                <div className="led-screw br" />
              </div>

              <div className="led-inner-bezel">
                <div className="led-glow-top" />
                <div className="led-glow-bottom" />

                <div className="led-screen">
                  <AnimatePresence mode="crossfade">
                    <motion.img
                      key={index}
                      src={current.src}
                      alt={current.alt}
                      className="led-slide-img"
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                  </AnimatePresence>

                  <div className="led-slide-overlay" />
                  <div className="led-screen-glare" />

                  {/* HUD corners */}
                  <div className="led-hud-tl">
                    <span
                      className="led-hud-corner"
                      style={{ display: "block", marginBottom: 4 }}
                    />
                    <div className="led-hud-text">
                      SRS·CAM·{String(index + 1).padStart(2, "0")}
                      <br />
                      {today}
                    </div>
                  </div>
                  <div className="led-hud-tr">
                    <span
                      className="led-hud-corner tr-c"
                      style={{
                        display: "block",
                        marginBottom: 4,
                        marginLeft: "auto",
                      }}
                    />
                    <div className="led-hud-text">
                      <LiveClock />
                      <br />
                      REC ● LIVE
                    </div>
                  </div>
                  <div className="led-hud-bl">
                    <div className="led-hud-text" style={{ marginBottom: 4 }}>
                      {current.category || "GALLERY"}
                      <br />
                      FRAME {index + 1}/{photos.length}
                    </div>
                    <span
                      className="led-hud-corner bl-c"
                      style={{ display: "block" }}
                    />
                  </div>
                  <div className="led-hud-br">
                    <div className="led-hud-text" style={{ marginBottom: 4 }}>
                      SHREE RAM SCHOOL
                      <br />
                      EST. 1995
                    </div>
                    <span
                      className="led-hud-corner br-c"
                      style={{ display: "block", marginLeft: "auto" }}
                    />
                  </div>

                  {/* Main content */}
                  <div className="led-slide-content">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: ".5rem",
                        }}
                      >
                        <div className="led-slide-badge">
                          ◆ SHREE RAM SCHOOL · JODHPUR ◆
                        </div>
                        <div className="led-slide-title">
                          {current.title || current.alt || "School Gallery"}
                        </div>
                        <div className="led-slide-desc">
                          {current.description ||
                            "Celebrating memories, achievements & vibrant campus life."}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Nav */}
                  <div className="led-nav">
                    <button className="led-nav-btn" onClick={prevSlide}>
                      ‹
                    </button>
                    <button className="led-nav-btn" onClick={nextSlide}>
                      ›
                    </button>
                  </div>

                  {/* Dots */}
                  <div className="led-dots">
                    {photos.map((_, i) => (
                      <div
                        key={i}
                        className={`led-dot ${i === index ? "active" : ""}`}
                        onClick={() => setIndex(i)}
                      />
                    ))}
                  </div>

                  {/* Ticker */}
                  <div className="led-ticker-bar">
                    <div className="led-ticker-label">LATEST</div>
                    <div className="led-ticker-track">
                      {TICKER_TEXT.map((item, i) => (
                        <span key={i} className="led-ticker-item">
                          {item}
                          <span className="led-ticker-dot">◆</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* /screen */}
              </div>
              {/* /inner-bezel */}

              <div className="led-brand-strip">
                <span className="led-brand-logo">SRS·DISPLAY·PRO</span>
                <span className="led-power-dot" />
              </div>
            </div>
            {/* /casing */}

            <div className="led-bracket">
              <div className="led-bracket-arm" />
              <div className="led-bracket-arm" />
              <div className="led-bracket-arm" />
              <div className="led-bracket-arm" />
            </div>
          </div>
          {/* /mount */}

          <div className="led-reflection" />
        </div>
      </div>
    </>
  );
}
// ═══════════════════════════════════════════════════════
//  END LED BOARD
// ═══════════════════════════════════════════════════════

// ─── GALLERY PAGE CSS ────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --ink:#0a0a0a;--paper:#faf8f4;--gold:#c9973a;--gold-light:#e8c97a;
  --gold-pale:#fdf6e3;--teal:#0d3d47;--teal-mid:#1a5c6b;--muted:#6b7280;
  --border:#e5ddd0;--white:#ffffff;
  --shadow-sm:0 2px 8px rgba(10,10,10,.08);
  --shadow-md:0 8px 32px rgba(10,10,10,.12);
  --shadow-lg:0 24px 64px rgba(10,10,10,.16);
  --f-display:'Playfair Display',Georgia,serif;
  --f-body:'DM Sans',sans-serif;
  --f-hindi:'Noto Sans Devanagari','DM Sans',sans-serif;
}
.gp{font-family:var(--f-body);background:var(--paper);color:var(--ink);min-height:100vh;overflow-x:hidden;}
.gp-masthead{position:relative;background:var(--teal);overflow:hidden;}
.gp-masthead-noise{position:absolute;inset:0;pointer-events:none;opacity:.6;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");}
.gp-masthead-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:1.6rem 2rem;position:relative;z-index:2;}
.gp-masthead-rule{height:1px;background:linear-gradient(90deg,transparent,rgba(201,151,58,.4),transparent);}
.gp-masthead-center{text-align:center;padding:0 2rem;}
.gp-school-tag{font-family:var(--f-body);font-size:.65rem;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:var(--gold-light);margin-bottom:.5rem;display:block;}
.gp-masthead-title{font-family:var(--f-display);font-size:clamp(2rem,5vw,3.4rem);font-weight:900;color:var(--white);line-height:.9;letter-spacing:-.02em;}
.gp-masthead-title span{color:var(--gold-light);font-style:italic;}
.gp-masthead-sub{font-size:.8rem;color:rgba(255,255,255,.5);letter-spacing:.15em;text-transform:uppercase;margin-top:.6rem;font-family:var(--f-hindi);}
.gp-masthead-right{text-align:right;}
.gp-date-chip{display:inline-block;background:rgba(201,151,58,.15);border:1px solid rgba(201,151,58,.3);color:var(--gold-light);padding:.3rem .8rem;border-radius:4px;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;}
.gp-gold-rule{height:3px;background:linear-gradient(90deg,var(--teal),var(--gold),var(--gold-light),var(--gold),var(--teal));}
.gp-body{max-width:1240px;margin:0 auto;padding:0 1.5rem;}
.gp-intro-grid{display:grid;grid-template-columns:1fr 2px 1fr;gap:3rem;padding:4rem 0;align-items:start;}
.gp-intro-divider{background:var(--border);}
.gp-intro-left h2{font-family:var(--f-display);font-size:clamp(1.8rem,4vw,3rem);font-weight:700;line-height:1.1;color:var(--teal);margin-bottom:1.5rem;}
.gp-intro-left h2 em{color:var(--gold);font-style:italic;}
.gp-intro-left p{font-size:1rem;line-height:1.8;color:var(--muted);margin-bottom:1rem;}
.gp-hindi-block{background:linear-gradient(135deg,var(--teal),var(--teal-mid));color:var(--white);border-radius:12px;padding:1.5rem;font-family:var(--f-hindi);font-size:.95rem;line-height:1.8;position:relative;overflow:hidden;margin-top:1.5rem;}
.gp-hindi-block::before{content:'"';position:absolute;top:-.5rem;left:.8rem;font-size:6rem;color:rgba(201,151,58,.3);font-family:var(--f-display);line-height:1;}
.gp-intro-right{display:flex;flex-direction:column;gap:1.5rem;}
.gp-stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}
.gp-stat{background:var(--white);border:1px solid var(--border);border-radius:10px;padding:1.2rem 1rem;text-align:center;box-shadow:var(--shadow-sm);transition:all .3s;}
.gp-stat:hover{border-color:var(--gold);transform:translateY(-3px);box-shadow:var(--shadow-md);}
.gp-stat-n{font-family:var(--f-display);font-size:2.2rem;font-weight:900;color:var(--gold);line-height:1;}
.gp-stat-l{font-size:.75rem;color:var(--muted);margin-top:.3rem;font-weight:500;letter-spacing:.05em;}
.gp-values-list{display:flex;flex-direction:column;gap:.75rem;}
.gp-value-item{display:flex;align-items:center;gap:1rem;background:var(--white);border:1px solid var(--border);border-radius:8px;padding:.8rem 1rem;transition:all .3s;}
.gp-value-item:hover{border-color:var(--gold);box-shadow:var(--shadow-sm);}
.gp-value-icon{width:36px;height:36px;border-radius:8px;flex-shrink:0;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-size:1.1rem;}
.gp-value-text strong{display:block;font-size:.85rem;font-weight:600;color:var(--ink);}
.gp-value-text span{font-size:.75rem;color:var(--muted);}
.gp-section-head{display:flex;align-items:baseline;gap:1.5rem;padding:3rem 0 1.5rem;border-bottom:2px solid var(--ink);margin-bottom:2rem;}
.gp-section-head h2{font-family:var(--f-display);font-size:clamp(1.5rem,3vw,2.4rem);font-weight:900;color:var(--ink);letter-spacing:-.02em;}
.gp-section-num{font-family:var(--f-display);font-size:1rem;color:var(--gold);font-style:italic;}
.gp-section-head-line{flex:1;height:1px;background:var(--border);}
.gp-featured-hero{display:grid;grid-template-columns:1.6fr 1fr;grid-template-rows:1fr 1fr;gap:.75rem;margin-bottom:3rem;}
.gp-feat-main{grid-row:1/3;position:relative;border-radius:4px;overflow:hidden;cursor:pointer;background:#000;aspect-ratio:4/3;}
.gp-feat-side{position:relative;border-radius:4px;overflow:hidden;cursor:pointer;background:#000;aspect-ratio:16/9;}
.gp-feat-img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease,filter .4s;filter:brightness(.95);}
.gp-feat-main:hover .gp-feat-img,.gp-feat-side:hover .gp-feat-img{transform:scale(1.06);filter:brightness(1);}
.gp-feat-caption{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(0deg,rgba(10,10,10,.85) 0%,rgba(10,10,10,.3) 70%,transparent 100%);padding:2rem 1.5rem 1.2rem;transform:translateY(4px);transition:transform .3s;}
.gp-feat-main:hover .gp-feat-caption,.gp-feat-side:hover .gp-feat-caption{transform:translateY(0);}
.gp-feat-cat{font-size:.65rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--gold-light);margin-bottom:.4rem;}
.gp-feat-title{font-family:var(--f-display);font-size:1.1rem;color:var(--white);font-weight:700;line-height:1.3;}
.gp-feat-main .gp-feat-title{font-size:1.6rem;}
.gp-feat-zoom{position:absolute;top:1rem;right:1rem;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;color:white;font-size:1rem;opacity:0;transition:opacity .3s,transform .3s;transform:scale(.8);}
.gp-feat-main:hover .gp-feat-zoom,.gp-feat-side:hover .gp-feat-zoom{opacity:1;transform:scale(1);}
.gp-filter-bar{position:sticky;top:0;z-index:50;background:rgba(250,248,244,.95);backdrop-filter:blur(16px);border-bottom:1px solid var(--border);margin:0 -1.5rem;padding:.75rem 1.5rem;}
.gp-filter-inner{max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;}
.gp-cat-tabs{display:flex;gap:.4rem;flex-wrap:wrap;}
.gp-cat-btn{padding:.45rem 1rem;border-radius:4px;border:1.5px solid var(--border);background:transparent;font-family:var(--f-body);font-size:.8rem;font-weight:600;color:var(--muted);cursor:pointer;transition:all .2s;letter-spacing:.03em;}
.gp-cat-btn:hover{border-color:var(--teal);color:var(--teal);}
.gp-cat-btn.active{background:var(--teal);border-color:var(--teal);color:var(--white);}
.gp-search-wrap{margin-left:auto;position:relative;}
.gp-search-icon{position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:var(--muted);font-size:.9rem;pointer-events:none;}
.gp-search-input{padding:.45rem .9rem .45rem 2.2rem;border:1.5px solid var(--border);border-radius:4px;font-family:var(--f-body);font-size:.82rem;background:var(--white);color:var(--ink);width:220px;transition:all .2s;}
.gp-search-input:focus{outline:none;border-color:var(--teal);box-shadow:0 0 0 3px rgba(13,61,71,.08);}
.gp-result-count{font-size:.78rem;color:var(--muted);white-space:nowrap;}
.gp-spotlight{display:grid;grid-template-columns:300px 1fr;gap:3rem;align-items:start;padding:3rem 0;border-top:1px solid var(--border);}
.gp-spotlight:nth-child(even){grid-template-columns:1fr 300px;}
.gp-spotlight:nth-child(even) .gp-spotlight-meta{order:2;}
.gp-spotlight:nth-child(even) .gp-spotlight-images{order:1;}
.gp-spotlight-eyebrow{font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;}
.gp-spotlight h3{font-family:var(--f-display);font-size:1.9rem;font-weight:700;color:var(--teal);line-height:1.15;margin-bottom:1rem;}
.gp-spotlight p{font-size:.92rem;line-height:1.8;color:var(--muted);margin-bottom:1.5rem;font-family:var(--f-hindi);}
.gp-spotlight-cta{display:inline-flex;align-items:center;gap:.5rem;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--teal);border-bottom:2px solid var(--gold);padding-bottom:.15rem;cursor:pointer;transition:color .2s;}
.gp-spotlight-cta:hover{color:var(--gold);}
.gp-spotlight-images{display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;}
.gp-spot-img-wrap{border-radius:4px;overflow:hidden;cursor:pointer;aspect-ratio:1;position:relative;background:#000;}
.gp-spot-img-wrap:first-child{grid-column:1/3;aspect-ratio:2/1;}
.gp-spot-img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease,filter .3s;filter:brightness(.9);}
.gp-spot-img-wrap:hover .gp-spot-img{transform:scale(1.08);filter:brightness(1);}
.gp-masonry{columns:200px 5;gap:1rem;}
.gp-card{break-inside:avoid;margin-bottom:1rem;border-radius:4px;overflow:hidden;cursor:pointer;position:relative;background:#000;box-shadow:var(--shadow-sm);transition:transform .3s,box-shadow .3s;}
.gp-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-md);}
.gp-card-img{width:100%;height:auto;min-height:160px;max-height:340px;object-fit:cover;display:block;transition:transform .5s ease,filter .3s;filter:brightness(.92);}
.gp-card:hover .gp-card-img{transform:scale(1.06);filter:brightness(1);}
.gp-card-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(10,10,10,.7) 0%,transparent 50%);opacity:0;transition:opacity .3s;display:flex;flex-direction:column;justify-content:flex-end;padding:.75rem;}
.gp-card:hover .gp-card-overlay{opacity:1;}
.gp-card-label{font-size:.7rem;font-weight:600;color:rgba(255,255,255,.8);letter-spacing:.05em;}
.gp-pagination{display:flex;align-items:center;justify-content:center;gap:.35rem;padding:2.5rem 0;flex-wrap:wrap;}
.gp-pg-btn{min-width:38px;height:38px;border-radius:4px;border:1.5px solid var(--border);background:var(--white);color:var(--ink);font-family:var(--f-body);font-size:.82rem;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;padding:0 .6rem;}
.gp-pg-btn:hover:not(:disabled){background:var(--teal);border-color:var(--teal);color:var(--white);}
.gp-pg-btn.active{background:var(--ink);border-color:var(--ink);color:var(--white);}
.gp-pg-btn:disabled{opacity:.35;cursor:not-allowed;}
.gp-pg-dots{padding:0 .2rem;color:var(--muted);font-size:.9rem;}
.gp-testimonials{background:var(--teal);padding:4rem 1.5rem;position:relative;overflow:hidden;}
.gp-testimonials::before{content:'"';position:absolute;top:-2rem;left:2rem;font-size:20rem;color:rgba(201,151,58,.06);font-family:var(--f-display);line-height:1;pointer-events:none;}
.gp-test-inner{max-width:1240px;margin:0 auto;}
.gp-test-head{font-family:var(--f-display);font-size:2.2rem;font-weight:900;color:var(--white);margin-bottom:.5rem;}
.gp-test-sub{font-size:.85rem;color:rgba(255,255,255,.5);margin-bottom:2.5rem;letter-spacing:.1em;}
.gp-test-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1.5rem;}
.gp-test-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:1.5rem;transition:all .3s;}
.gp-test-card:hover{background:rgba(255,255,255,.1);border-color:rgba(201,151,58,.3);}
.gp-test-quote{font-family:var(--f-display);font-size:1rem;font-style:italic;color:rgba(255,255,255,.9);line-height:1.7;margin-bottom:1.2rem;}
.gp-test-byline{display:flex;align-items:center;gap:.75rem;}
.gp-test-avatar{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid var(--gold);flex-shrink:0;}
.gp-test-name{font-size:.85rem;font-weight:700;color:var(--white);}
.gp-test-role{font-size:.75rem;color:rgba(255,255,255,.45);}
.gp-cta{border-top:3px solid var(--gold);border-bottom:3px solid var(--gold);padding:3.5rem 0;text-align:center;margin:2rem 0;background:linear-gradient(180deg,var(--gold-pale) 0%,var(--paper) 100%);}
.gp-cta h2{font-family:var(--f-display);font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;color:var(--teal);margin-bottom:.5rem;letter-spacing:-.02em;}
.gp-cta p{font-size:1rem;color:var(--muted);margin-bottom:2rem;}
.gp-cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.gp-cta-btn{padding:.9rem 2.5rem;border-radius:4px;font-family:var(--f-body);font-size:.85rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;transition:all .25s;border:2px solid transparent;}
.gp-cta-btn.primary{background:var(--teal);color:var(--white);border-color:var(--teal);}
.gp-cta-btn.primary:hover{background:var(--ink);border-color:var(--ink);}
.gp-cta-btn.secondary{background:transparent;color:var(--teal);border-color:var(--teal);}
.gp-cta-btn.secondary:hover{background:var(--teal);color:var(--white);}
.gp-lightbox{position:fixed;inset:0;z-index:9999;background:rgba(5,5,5,.97);display:flex;align-items:center;justify-content:center;}
.gp-lb-inner{position:relative;max-width:90vw;display:flex;flex-direction:column;align-items:center;}
.gp-lb-img{max-width:85vw;max-height:80vh;object-fit:contain;border-radius:2px;box-shadow:0 40px 80px rgba(0,0,0,.8);}
.gp-lb-close{position:fixed;top:1.5rem;right:2rem;background:none;border:none;color:rgba(255,255,255,.6);font-size:2rem;cursor:pointer;transition:color .2s,transform .2s;line-height:1;z-index:10000;}
.gp-lb-close:hover{color:var(--white);transform:rotate(90deg);}
.gp-lb-nav{display:flex;align-items:center;gap:1.5rem;margin-top:1.5rem;}
.gp-lb-nav-btn{width:48px;height:48px;border-radius:4px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:var(--white);font-size:1.4rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;}
.gp-lb-nav-btn:hover{background:var(--gold);border-color:var(--gold);color:var(--ink);}
.gp-lb-caption{color:rgba(255,255,255,.6);font-size:.85rem;letter-spacing:.05em;flex:1;text-align:center;}
.gp-lb-caption strong{color:var(--white);}
@media(max-width:1024px){.gp-masonry{columns:180px 4;}}
@media(max-width:900px){
  .gp-intro-grid{grid-template-columns:1fr;gap:2rem;}
  .gp-intro-divider{display:none;}
  .gp-featured-hero{grid-template-columns:1fr;grid-template-rows:auto;}
  .gp-feat-main{grid-row:auto;aspect-ratio:16/9;}
  .gp-spotlight,.gp-spotlight:nth-child(even){grid-template-columns:1fr;gap:1.5rem;}
  .gp-spotlight:nth-child(even) .gp-spotlight-meta,.gp-spotlight:nth-child(even) .gp-spotlight-images{order:0;}
  .gp-masonry{columns:150px 3;}
}
@media(max-width:600px){
  .gp-masthead-inner{grid-template-columns:1fr;text-align:center;padding:1.2rem 1rem;}
  .gp-masthead-rule,.gp-masthead-right{display:none;}
  .gp-masthead-center{padding:0;}
  .gp-body{padding:0 1rem;}
  .gp-intro-grid{padding:2rem 0;}
  .gp-masonry{columns:140px 2;}
  .gp-filter-inner{flex-direction:column;align-items:stretch;gap:.75rem;}
  .gp-search-wrap{margin-left:0;}
  .gp-search-input{width:100%;}
  .gp-result-count{text-align:center;}
  .gp-spotlight h3{font-size:1.5rem;}
  .gp-spotlight-images{grid-template-columns:repeat(2,1fr);}
  .gp-spot-img-wrap:first-child{grid-column:1/3;}
  .gp-section-head{padding:2rem 0 1rem;}
  .gp-testimonials{padding:3rem 1rem;}
  .gp-test-grid{grid-template-columns:1fr;}
  .gp-lb-img{max-width:95vw;max-height:70vh;}
  .gp-lb-close{top:1rem;right:1rem;}
}
@media(max-width:400px){
  .gp-masonry{columns:1;}
  .gp-cat-tabs{justify-content:center;}
  .gp-cta-btn{width:100%;text-align:center;}
}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;}}
`;

const SPOTLIGHT_DATA = [
  {
    key: "Campus Life",
    eyebrow: "Daily Vibrancy",
    heading: "Where Learning Meets Life",
    body: "दैनिक जीवन की जीवंतता: हमारा हरा-भरा कैंपस छात्रों के लिए दूसरा घर है। क्लासरूम से लेकर लाइब्रेरी, लैब से खेल का मैदान — हर कोना शिक्षा और मस्ती से भरा।",
    cta: "Explore Campus →",
  },
  {
    key: "Events & Activities",
    eyebrow: "Celebrations & Culture",
    heading: "Every Occasion, Unforgettable",
    body: "उत्सवों का संगम: स्वतंत्रता दिवस, दीपावली, विज्ञान प्रदर्शनी से लेकर वार्षिक समारोह तक — हर अवसर यादगार। छात्र नृत्य, नाटक, क्विज में प्रतिभा दिखाते हैं।",
    cta: "View All Events →",
  },
  {
    key: "NCC & Sports",
    eyebrow: "Discipline & Valor",
    heading: "Body, Mind & Nation",
    body: "NCC & Sports में पराक्रम: एनसीसी कैडेट्स अनुशासन सिखाते, परेड में देशभक्ति दिखाते। खेल में फुटबॉल, एथलेटिक्स से जिले में विजय प्राप्त करते हैं।",
    cta: "See Achievements →",
  },
];

const VALUES = [
  { icon: "📚", label: "Academic Excellence", sub: "98%+ Board Results" },
  { icon: "🎖️", label: "NCC & Discipline", sub: "National Level Cadets" },
  { icon: "🏆", label: "Sports Champions", sub: "District Level Winners" },
  { icon: "🎭", label: "Cultural Heritage", sub: "Annual Fest & Events" },
];

const TESTIMONIALS = [
  {
    quote:
      "Shree Ram School's gallery reflects the warmth and vibrancy of our campus. Every photo brings back joyful memories!",
    name: "Dr. Sharma",
    role: "Principal",
    idx: 0,
  },
  {
    quote:
      "NCC training here shaped my son's discipline. Grateful for such meaningful opportunities for our children.",
    name: "Ravi Kumar",
    role: "Parent",
    idx: 10,
  },
  {
    quote:
      "Events like Annual Function are magical. The gallery keeps that excitement alive throughout the year!",
    name: "Priya S.",
    role: "Class X Student",
    idx: 20,
  },
  {
    quote:
      "Sports and NCC activities build real character. I'm proud to be part of this incredible institution.",
    name: "Cadet Rohan",
    role: "NCC Captain",
    idx: 30,
  },
];

export default function PhotoGalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightbox, setLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredPhotos = useMemo(
    () =>
      photos.filter(
        (p) =>
          (activeCategory === "All" || p.category === activeCategory) &&
          p.alt.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [activeCategory, searchQuery],
  );

  useEffect(() => {
    setCurrentPage(1);
    setLightbox(false);
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filteredPhotos.length / itemsPerPage) || 1;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedPhotos = filteredPhotos.slice(
    startIdx,
    startIdx + itemsPerPage,
  );

  const categories = useMemo(() => {
    const counts = {};
    photos.forEach((p) => (counts[p.category] = (counts[p.category] || 0) + 1));
    return CATEGORIES.map((c) => ({
      name: c,
      count: c === "All" ? photos.length : counts[c] || 0,
    }));
  }, []);

  const openLightbox = useCallback((idx) => {
    setCurrentIndex(idx);
    setLightbox(true);
  }, []);
  const currentPhoto = filteredPhotos[currentIndex];
  const handleNav = (d) =>
    setCurrentIndex(
      (p) => (p + d + filteredPhotos.length) % filteredPhotos.length,
    );

  const renderPages = () => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("…");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1);
      pages.push("…");
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("…");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push("…");
      pages.push(totalPages);
    }
    return pages;
  };

  const Pagination = () => (
    <div className="gp-pagination">
      <button
        className="gp-pg-btn"
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      <button
        className="gp-pg-btn"
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
      >
        ‹
      </button>
      {renderPages().map((p, i) =>
        p === "…" ? (
          <span key={`d${i}`} className="gp-pg-dots">
            …
          </span>
        ) : (
          <button
            key={p}
            className={`gp-pg-btn ${currentPage === p ? "active" : ""}`}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </button>
        ),
      )}
      <button
        className="gp-pg-btn"
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        ›
      </button>
      <button
        className="gp-pg-btn"
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );

  return (
    <>
      <style>{css}</style>

      {/* ══ LED BOARD HERO ══ */}
      <LEDBoardCarousel photos={photos.slice(0, 10)} interval={5000} />

      <div className="gp">
        {/* Masthead */}

        <div className="gp-gold-rule" />

        <div className="gp-body">
          {/* Editorial Intro */}
          <motion.div
            className="gp-intro-grid"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="gp-intro-left">
              <h2>
                A Visual Chronicle of <em>Excellence</em>
              </h2>
              <p>
                Welcome to Shree Ram School's Photo Gallery — a living archive
                of our journey since 1995, capturing over{" "}
                {photos.length.toLocaleString()} moments of growth, celebration,
                and achievement across our 5-acre CBSE campus in Jodhpur.
              </p>
              <p>
                From morning assemblies echoing with the national anthem to NCC
                parades, science exhibitions, and cultural fests — every frame
                tells a story.
              </p>
              <div className="gp-hindi-block">
                <strong>स्वागत है श्री राम स्कूल की फोटो गैलरी में!</strong>{" "}
                1200+ छात्रों के साथ अनुशासित वातावरण में उत्कृष्ट शिक्षा।
                एनसीसी, खेल, सांस्कृतिक कार्यक्रम — हर क्षण यादगार।
              </div>
            </div>
            <div className="gp-intro-divider" />
            <div className="gp-intro-right">
              <div className="gp-stat-row">
                <div className="gp-stat">
                  <div className="gp-stat-n">{photos.length}</div>
                  <div className="gp-stat-l">Moments</div>
                </div>
                <div className="gp-stat">
                  <div className="gp-stat-n">1200+</div>
                  <div className="gp-stat-l">Students</div>
                </div>
                <div className="gp-stat">
                  <div className="gp-stat-n">30yr</div>
                  <div className="gp-stat-l">Legacy</div>
                </div>
              </div>
              <div className="gp-values-list">
                {VALUES.map((v, i) => (
                  <motion.div
                    key={i}
                    className="gp-value-item"
                    whileHover={{ x: 4 }}
                  >
                    <div className="gp-value-icon">{v.icon}</div>
                    <div className="gp-value-text">
                      <strong>{v.label}</strong>
                      <span>{v.sub}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 01 Featured */}
          <div className="gp-section-head">
            <span className="gp-section-num">01.</span>
            <h2>Featured Highlights</h2>
            <div className="gp-section-head-line" />
          </div>
          <div className="gp-featured-hero">
            {photos.slice(0, 3).map((photo, idx) => (
              <motion.div
                key={photo.src}
                className={idx === 0 ? "gp-feat-main" : "gp-feat-side"}
                onClick={() => openLightbox(idx)}
                whileHover={{ scale: 1.005 }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="gp-feat-img"
                  loading="lazy"
                />
                <div className="gp-feat-caption">
                  <div className="gp-feat-cat">{photo.category}</div>
                  <div className="gp-feat-title">{photo.alt}</div>
                </div>
                <div className="gp-feat-zoom">⊕</div>
              </motion.div>
            ))}
          </div>

          {/* Filter Bar */}
          <div className="gp-filter-bar">
            <div className="gp-filter-inner">
              <div className="gp-cat-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    className={`gp-cat-btn ${activeCategory === cat.name ? "active" : ""}`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
              <div className="gp-search-wrap">
                <span className="gp-search-icon">🔍</span>
                <input
                  type="text"
                  className="gp-search-input"
                  placeholder="Search photos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <span className="gp-result-count">
                {filteredPhotos.length} photos · Page {currentPage}/{totalPages}
              </span>
            </div>
          </div>

          {/* 02 By Category */}
          <div className="gp-section-head" style={{ marginTop: "3rem" }}>
            <span className="gp-section-num">02.</span>
            <h2>By Category</h2>
            <div className="gp-section-head-line" />
          </div>
          {SPOTLIGHT_DATA.map((s, i) => {
            const catPhotos = photos
              .filter((p) => p.category === s.key)
              .slice(0, 5);
            return (
              <motion.div
                key={s.key}
                className="gp-spotlight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="gp-spotlight-meta">
                  <div className="gp-spotlight-eyebrow">{s.eyebrow}</div>
                  <h3>{s.heading}</h3>
                  <p>{s.body}</p>
                  <span
                    className="gp-spotlight-cta"
                    onClick={() => setActiveCategory(s.key)}
                  >
                    {s.cta}
                  </span>
                </div>
                <div className="gp-spotlight-images">
                  {catPhotos.map((photo) => (
                    <div
                      key={photo.src}
                      className="gp-spot-img-wrap"
                      onClick={() =>
                        openLightbox(
                          photos.findIndex((p) => p.src === photo.src),
                        )
                      }
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="gp-spot-img"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* 03 Full Gallery */}
          <div className="gp-section-head" style={{ marginTop: "2rem" }}>
            <span className="gp-section-num">03.</span>
            <h2>Full Gallery</h2>
            <div className="gp-section-head-line" />
          </div>

          {totalPages > 1 && <Pagination />}

          <motion.div
            className="gp-masonry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {paginatedPhotos.map((photo, idx) => (
              <motion.article
                key={`${photo.src}-${idx}`}
                className="gp-card"
                onClick={() => openLightbox(startIdx + idx)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: Math.min(idx * 0.02, 0.4),
                  duration: 0.35,
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="gp-card-img"
                  loading="lazy"
                />
                <div className="gp-card-overlay">
                  <span className="gp-card-label">{photo.category}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {totalPages > 1 && <Pagination />}
        </div>
        {/* /gp-body */}

        {/* Testimonials */}
        <div className="gp-testimonials">
          <div className="gp-test-inner">
            <div className="gp-test-head">What Our Family Says</div>
            <div className="gp-test-sub">VOICES FROM OUR COMMUNITY</div>
            <div className="gp-test-grid">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  className="gp-test-card"
                  whileHover={{ y: -4 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="gp-test-quote">"{t.quote}"</div>
                  <div className="gp-test-byline">
                    <img
                      src={photos[t.idx]?.src || "/logo.jpg"}
                      alt={t.name}
                      className="gp-test-avatar"
                    />
                    <div>
                      <div className="gp-test-name">{t.name}</div>
                      <div className="gp-test-role">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="gp-body">
          <motion.div
            className="gp-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Relive the Memories</h2>
            <p>
              Explore more photos, share your story, or plan a visit to our
              campus.
            </p>
            <div className="gp-cta-btns">
              <button className="gp-cta-btn primary">Share Gallery</button>
              <button className="gp-cta-btn secondary">Plan a Visit</button>
            </div>
          </motion.div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && currentPhoto && (
            <motion.div
              className="gp-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(false)}
            >
              <button
                className="gp-lb-close"
                onClick={() => setLightbox(false)}
              >
                ✕
              </button>
              <motion.div
                className="gp-lb-inner"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.93, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              >
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  className="gp-lb-img"
                />
                <div className="gp-lb-nav">
                  <button
                    className="gp-lb-nav-btn"
                    onClick={() => handleNav(-1)}
                  >
                    ‹
                  </button>
                  <div className="gp-lb-caption">
                    <strong>{currentPhoto.alt}</strong> ·{" "}
                    {currentPhoto.category} · {currentIndex + 1}/
                    {filteredPhotos.length}
                  </div>
                  <button
                    className="gp-lb-nav-btn"
                    onClick={() => handleNav(1)}
                  >
                    ›
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

/* ── SCENE / ROOM ── */
.led-scene {
  width: 100%;
  min-height: 100vh;
  background:
    /* subtle wall texture */
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 60px,
      rgba(0,0,0,.03) 60px,
      rgba(0,0,0,.03) 61px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 60px,
      rgba(0,0,0,.03) 60px,
      rgba(0,0,0,.03) 61px
    ),
    linear-gradient(160deg, #d6cfc7 0%, #c8bfb5 40%, #b8ada1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px 80px;
  position: relative;
  overflow: hidden;
  perspective: 1400px;
}

/* ambient room light from top */
.led-scene::before {
  content: '';
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 300px;
  background: radial-gradient(ellipse at top, rgba(255,240,200,.35) 0%, transparent 70%);
  pointer-events: none;
}

/* floor shadow */
.led-scene::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 120px;
  background: linear-gradient(0deg, rgba(0,0,0,.18) 0%, transparent 100%);
  pointer-events: none;
}

/* ── WALL PANEL behind board ── */
.led-wall-panel {
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 85%;
  height: 100%;
  background: linear-gradient(180deg, #cdc5bc 0%, #bfb5aa 100%);
  box-shadow: inset -8px 0 20px rgba(0,0,0,.1), inset 8px 0 20px rgba(0,0,0,.1);
}

/* ── OUTER MOUNTING FRAME (wall bracket) ── */
.led-mount {
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(2deg) rotateY(-1deg);
  filter: drop-shadow(0 60px 80px rgba(0,0,0,.55))
          drop-shadow(0 20px 30px rgba(0,0,0,.4));
  width: 100%;
  max-width: 1100px;
}

/* ── WALL BRACKET ARMS ── */
.led-bracket {
  position: absolute;
  bottom: -18px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 80px;
  z-index: 0;
}
.led-bracket-arm {
  width: 14px;
  height: 28px;
  background: linear-gradient(180deg, #4a4a4a, #2a2a2a);
  border-radius: 0 0 4px 4px;
  box-shadow: 2px 4px 8px rgba(0,0,0,.5);
  position: relative;
}
.led-bracket-arm::after {
  content: '';
  position: absolute;
  bottom: -6px; left: -8px;
  width: 30px; height: 6px;
  background: linear-gradient(90deg, #3a3a3a, #222);
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(0,0,0,.5);
}

/* ── CABLE ── */
.led-cable {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  gap: 140px;
}
.led-cable-wire {
  width: 3px;
  height: 35px;
  background: linear-gradient(180deg, #888, #333);
  border-radius: 2px;
  box-shadow: 1px 0 3px rgba(0,0,0,.4);
}

/* ── OUTER CASING (thick bezel) ── */
.led-casing {
  position: relative;
  background: linear-gradient(145deg, #1c1c1c 0%, #111 50%, #0a0a0a 100%);
  border-radius: 18px;
  padding: 22px;
  box-shadow:
    /* top highlight */
    inset 0 2px 1px rgba(255,255,255,.08),
    /* bottom shadow */
    inset 0 -2px 2px rgba(0,0,0,.8),
    /* left edge */
    inset 3px 0 6px rgba(255,255,255,.04),
    /* right edge shadow */
    inset -3px 0 6px rgba(0,0,0,.6),
    /* 3D depth right face */
    8px 8px 0 #080808,
    /* outer glow from screen */
    0 0 60px rgba(0,180,255,.08);
  z-index: 2;
}

/* right-face 3D effect */
.led-casing::before {
  content: '';
  position: absolute;
  top: 6px; right: -8px;
  width: 8px;
  height: calc(100% - 12px);
  background: linear-gradient(180deg, #0f0f0f, #050505);
  border-radius: 0 4px 4px 0;
  transform: skewY(-0.5deg);
}
/* bottom-face 3D effect */
.led-casing::after {
  content: '';
  position: absolute;
  bottom: -8px; left: 6px;
  width: calc(100% - 6px);
  height: 8px;
  background: linear-gradient(90deg, #0a0a0a, #050505);
  border-radius: 0 0 4px 4px;
  transform: skewX(-0.5deg);
}

/* ── BEZEL SCREWS ── */
.led-screws {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}
.led-screw {
  position: absolute;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #555, #222);
  box-shadow: inset 0 1px 2px rgba(255,255,255,.15), 0 1px 3px rgba(0,0,0,.8);
}
.led-screw::after {
  content: '+';
  position: absolute;
  inset: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 7px; color: rgba(255,255,255,.2);
  font-weight: 900;
}
.led-screw.tl { top: 8px;  left: 8px;  }
.led-screw.tr { top: 8px;  right: 8px; }
.led-screw.bl { bottom: 8px; left: 8px;  }
.led-screw.br { bottom: 8px; right: 8px; }

/* ── INNER BEZEL (slim border around screen) ── */
.led-inner-bezel {
  position: relative;
  border-radius: 8px;
  background: #000;
  padding: 3px;
  box-shadow:
    inset 0 0 12px rgba(0,0,0,.9),
    0 0 30px rgba(0,150,255,.12);
  overflow: visible;
}

/* ── LED STRIP GLOW (edge lighting) ── */
.led-glow-top {
  position: absolute;
  top: -4px; left: 5%; right: 5%;
  height: 4px;
  background: linear-gradient(90deg, transparent, #00c8ff, #fff, #00c8ff, transparent);
  border-radius: 2px;
  filter: blur(3px);
  opacity: .7;
  animation: ledPulse 3s ease-in-out infinite;
}
.led-glow-bottom {
  position: absolute;
  bottom: -4px; left: 5%; right: 5%;
  height: 4px;
  background: linear-gradient(90deg, transparent, #00c8ff, #fff, #00c8ff, transparent);
  border-radius: 2px;
  filter: blur(3px);
  opacity: .5;
  animation: ledPulse 3s ease-in-out infinite 1.5s;
}
@keyframes ledPulse {
  0%,100% { opacity: .5; }
  50%      { opacity: .9; }
}

/* ── SCREEN AREA ── */
.led-screen {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 16/7;
  background: #000;
  /* scanline texture */
  background-image: repeating-linear-gradient(
    0deg,
    rgba(0,0,0,.04),
    rgba(0,0,0,.04) 1px,
    transparent 1px,
    transparent 3px
  );
}

/* screen glare */
.led-screen-glare {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 45%;
  background: linear-gradient(180deg, rgba(255,255,255,.06) 0%, transparent 100%);
  border-radius: 6px 6px 0 0;
  pointer-events: none;
  z-index: 10;
}
/* corner glare */
.led-screen-glare::after {
  content: '';
  position: absolute;
  top: 8px; left: 20px;
  width: 120px; height: 50px;
  background: rgba(255,255,255,.05);
  border-radius: 50%;
  filter: blur(12px);
}

/* ── SLIDE IMAGE ── */
.led-slide-img {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
}

/* ── GRADIENT OVERLAY ON SCREEN ── */
.led-slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(0,0,0,.55) 0%,
    rgba(0,0,0,.2) 50%,
    rgba(0,0,0,.5) 100%
  );
  z-index: 2;
}

/* ── SLIDE CONTENT ── */
.led-slide-content {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}
.led-slide-badge {
  font-family: 'Orbitron', monospace;
  font-size: .6rem;
  font-weight: 700;
  letter-spacing: .3em;
  text-transform: uppercase;
  color: #00c8ff;
  background: rgba(0,200,255,.1);
  border: 1px solid rgba(0,200,255,.3);
  padding: .3rem .9rem;
  border-radius: 3px;
  margin-bottom: 1rem;
  text-shadow: 0 0 10px #00c8ff;
}
.led-slide-title {
  font-family: 'Orbitron', monospace;
  font-size: clamp(1.2rem, 3.5vw, 2.6rem);
  font-weight: 900;
  color: #fff;
  text-shadow: 0 0 30px rgba(255,255,255,.4), 0 2px 8px rgba(0,0,0,.8);
  line-height: 1.1;
  margin-bottom: .75rem;
  letter-spacing: .05em;
}
.led-slide-desc {
  font-family: 'Share Tech Mono', monospace;
  font-size: clamp(.65rem, 1.4vw, .95rem);
  color: rgba(255,255,255,.7);
  max-width: 500px;
  line-height: 1.6;
}

/* ── HUD ELEMENTS ── */
.led-hud-tl {
  position: absolute;
  top: 1rem; left: 1rem;
  z-index: 4;
}
.led-hud-tr {
  position: absolute;
  top: 1rem; right: 1rem;
  z-index: 4;
  text-align: right;
}
.led-hud-bl {
  position: absolute;
  bottom: 1rem; left: 1rem;
  z-index: 4;
}
.led-hud-br {
  position: absolute;
  bottom: 1rem; right: 1rem;
  z-index: 4;
  text-align: right;
}
.led-hud-text {
  font-family: 'Share Tech Mono', monospace;
  font-size: .6rem;
  color: rgba(0,200,255,.7);
  letter-spacing: .1em;
  text-transform: uppercase;
  text-shadow: 0 0 8px rgba(0,200,255,.5);
  line-height: 1.6;
}
.led-hud-corner {
  display: inline-block;
  width: 14px; height: 14px;
  border-top: 2px solid rgba(0,200,255,.6);
  border-left: 2px solid rgba(0,200,255,.6);
}
.led-hud-corner.tr-c {
  border-top: 2px solid rgba(0,200,255,.6);
  border-left: none;
  border-right: 2px solid rgba(0,200,255,.6);
}
.led-hud-corner.bl-c {
  border-top: none;
  border-bottom: 2px solid rgba(0,200,255,.6);
  border-left: 2px solid rgba(0,200,255,.6);
}
.led-hud-corner.br-c {
  border-top: none;
  border-bottom: 2px solid rgba(0,200,255,.6);
  border-left: none;
  border-right: 2px solid rgba(0,200,255,.6);
}

/* ── TICKER BAR ── */
.led-ticker-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 32px;
  background: rgba(0,0,0,.75);
  border-top: 1px solid rgba(0,200,255,.2);
  z-index: 5;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.led-ticker-label {
  font-family: 'Orbitron', monospace;
  font-size: .55rem;
  font-weight: 700;
  letter-spacing: .15em;
  color: #000;
  background: #00c8ff;
  padding: 0 .75rem;
  height: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  flex-shrink: 0;
}
.led-ticker-track {
  display: flex;
  gap: 3rem;
  animation: ledTicker 25s linear infinite;
  white-space: nowrap;
  padding-left: 2rem;
}
.led-ticker-item {
  font-family: 'Share Tech Mono', monospace;
  font-size: .65rem;
  color: rgba(255,255,255,.8);
  letter-spacing: .05em;
}
.led-ticker-dot { color: #00c8ff; margin: 0 .5rem; }
@keyframes ledTicker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* ── NAV BUTTONS ── */
.led-nav {
  position: absolute;
  top: 50%; left: 0; right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  transform: translateY(-50%);
  z-index: 6;
  pointer-events: none;
}
.led-nav-btn {
  pointer-events: all;
  width: 38px; height: 38px;
  border-radius: 4px;
  background: rgba(0,0,0,.5);
  border: 1px solid rgba(0,200,255,.4);
  color: #00c8ff;
  font-size: 1.4rem;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: all .2s;
  box-shadow: 0 0 12px rgba(0,200,255,.2);
  font-family: 'Orbitron', monospace;
}
.led-nav-btn:hover {
  background: rgba(0,200,255,.15);
  border-color: #00c8ff;
  box-shadow: 0 0 20px rgba(0,200,255,.4);
}

/* ── DOTS ── */
.led-dots {
  position: absolute;
  bottom: 40px;
  left: 50%; transform: translateX(-50%);
  display: flex; gap: .5rem;
  z-index: 6;
}
.led-dot {
  width: 6px; height: 6px;
  border-radius: 1px;
  background: rgba(255,255,255,.3);
  cursor: pointer;
  transition: all .3s;
  border: 1px solid rgba(0,200,255,.2);
}
.led-dot.active {
  background: #00c8ff;
  box-shadow: 0 0 8px #00c8ff;
  width: 18px;
}

/* ── BELOW-BOARD CONTROLS (brand strip) ── */
.led-brand-strip {
  position: absolute;
  bottom: 10px; left: 0; right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;
  z-index: 3;
}
.led-brand-logo {
  font-family: 'Orbitron', monospace;
  font-size: .55rem;
  font-weight: 700;
  color: rgba(255,255,255,.15);
  letter-spacing: .2em;
  text-transform: uppercase;
}
.led-power-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #00ff88;
  box-shadow: 0 0 6px #00ff88;
  animation: powerBlink 2s ease-in-out infinite;
}
@keyframes powerBlink {
  0%,100% { opacity: 1; }
  50%      { opacity: .4; }
}

/* ── FLOOR REFLECTION ── */
.led-reflection {
  width: 100%;
  max-width: 1100px;
  height: 60px;
  margin-top: 4px;
  background: linear-gradient(180deg, rgba(0,0,0,.15) 0%, transparent 100%);
  border-radius: 0 0 8px 8px;
  filter: blur(2px);
  transform: scaleY(-0.3) translateY(-30px);
  transform-origin: top;
  opacity: .4;
  pointer-events: none;
}

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .led-scene { padding: 40px 16px 60px; perspective: 800px; }
  .led-casing { padding: 12px; border-radius: 10px; }
  .led-slide-title { font-size: clamp(1rem, 5vw, 1.6rem); }
  .led-hud-tl, .led-hud-br { display: none; }
  .led-cable { gap: 80px; }
}
@media (max-width: 480px) {
  .led-scene { padding: 30px 10px 50px; }
  .led-casing { padding: 8px; }
  .led-slide-badge { font-size: .5rem; }
  .led-slide-desc { display: none; }
  .led-nav-btn { width: 30px; height: 30px; font-size: 1rem; }
}
`;

const TICKER_TEXT = [
  "Annual Function 2025", "NCC Republic Day Parade", "Science Exhibition Winners",
  "Board Results 98.6%", "District Sports Champions", "Cultural Fest Highlights",
  "Annual Function 2025", "NCC Republic Day Parade", "Science Exhibition Winners",
  "Board Results 98.6%", "District Sports Champions", "Cultural Fest Highlights",
];

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span>
      {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

export default function GalleryHeroCarousel({ photos = [], interval = 5000 }) {
  const [index, setIndex]   = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (photos.length < 2 || paused) return;
    const t = setInterval(() => setIndex(p => (p + 1) % photos.length), interval);
    return () => clearInterval(t);
  }, [photos.length, interval, paused]);

  if (!photos.length) return null;

  const current  = photos[index];
  const nextSlide = () => setIndex(p => (p + 1) % photos.length);
  const prevSlide = () => setIndex(p => (p - 1 + photos.length) % photos.length);

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric"
  });

  return (
    <>
      <style>{css}</style>

      <div className="led-scene">
        {/* wall panel */}
        <div className="led-wall-panel" />

        {/* mounting cables */}
        <div style={{ position: "relative", width: "100%", maxWidth: 1100 }}>
          <div className="led-cable">
            <div className="led-cable-wire" />
            <div className="led-cable-wire" />
            <div className="led-cable-wire" />
          </div>

          {/* ── OUTER CASING ── */}
          <div
            className="led-mount"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="led-casing">

              {/* screws */}
              <div className="led-screws">
                <div className="led-screw tl" />
                <div className="led-screw tr" />
                <div className="led-screw bl" />
                <div className="led-screw br" />
              </div>

              {/* inner bezel */}
              <div className="led-inner-bezel">
                <div className="led-glow-top" />
                <div className="led-glow-bottom" />

                {/* ── SCREEN ── */}
                <div className="led-screen">

                  {/* slide image */}
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

                  {/* overlay */}
                  <div className="led-slide-overlay" />

                  {/* screen glare */}
                  <div className="led-screen-glare" />

                  {/* HUD corners */}
                  <div className="led-hud-tl">
                    <span className="led-hud-corner" style={{ display: "block", marginBottom: 4 }} />
                    <div className="led-hud-text">
                      SRS·CAM·{String(index + 1).padStart(2, "0")}<br />
                      {today}
                    </div>
                  </div>
                  <div className="led-hud-tr">
                    <span className="led-hud-corner tr-c" style={{ display: "block", marginBottom: 4, marginLeft: "auto" }} />
                    <div className="led-hud-text">
                      <LiveClock /><br />
                      REC ● LIVE
                    </div>
                  </div>
                  <div className="led-hud-bl">
                    <div className="led-hud-text" style={{ marginBottom: 4 }}>
                      {current.category || "GALLERY"}<br />
                      FRAME {index + 1}/{photos.length}
                    </div>
                    <span className="led-hud-corner bl-c" style={{ display: "block" }} />
                  </div>
                  <div className="led-hud-br">
                    <div className="led-hud-text" style={{ marginBottom: 4 }}>
                      SHREE RAM SCHOOL<br />
                      EST. 1995
                    </div>
                    <span className="led-hud-corner br-c" style={{ display: "block", marginLeft: "auto" }} />
                  </div>

                  {/* main content */}
                  <div className="led-slide-content">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: .6, delay: .3 }}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: ".5rem" }}
                      >
                        <div className="led-slide-badge">
                          ◆ SHREE RAM SCHOOL · JODHPUR ◆
                        </div>
                        <div className="led-slide-title">
                          {current.title || current.alt || "School Gallery"}
                        </div>
                        <div className="led-slide-desc">
                          {current.description || "Celebrating memories, achievements & vibrant campus life."}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* nav buttons */}
                  <div className="led-nav">
                    <button className="led-nav-btn" onClick={prevSlide}>‹</button>
                    <button className="led-nav-btn" onClick={nextSlide}>›</button>
                  </div>

                  {/* dot indicators */}
                  <div className="led-dots">
                    {photos.map((_, i) => (
                      <div
                        key={i}
                        className={`led-dot ${i === index ? "active" : ""}`}
                        onClick={() => setIndex(i)}
                      />
                    ))}
                  </div>

                  {/* ticker */}
                  <div className="led-ticker-bar">
                    <div className="led-ticker-label">LATEST</div>
                    <div className="led-ticker-track">
                      {TICKER_TEXT.map((item, i) => (
                        <span key={i} className="led-ticker-item">
                          {item}<span className="led-ticker-dot">◆</span>
                        </span>
                      ))}
                    </div>
                  </div>

                </div>{/* /screen */}
              </div>{/* /inner-bezel */}

              {/* brand strip inside casing */}
              <div className="led-brand-strip">
                <span className="led-brand-logo">SRS·DISPLAY·PRO</span>
                <span className="led-power-dot" />
              </div>

            </div>{/* /casing */}

            {/* wall bracket arms */}
            <div className="led-bracket">
              <div className="led-bracket-arm" />
              <div className="led-bracket-arm" />
              <div className="led-bracket-arm" />
              <div className="led-bracket-arm" />
            </div>

          </div>{/* /mount */}

          {/* floor reflection */}
          <div className="led-reflection" />
        </div>
      </div>
    </>
  );
}
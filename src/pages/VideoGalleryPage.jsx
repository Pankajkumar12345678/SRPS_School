import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { videos } from "../data/galleryData.js";

const VIDEO_CATEGORIES = ["All", "Campus Life", "Events & Activities", "NCC & Sports"];

// ═══════════════════════════════════════════════════════════════════════════════
//  LED BOARD HERO CAROUSEL
// ═══════════════════════════════════════════════════════════════════════════════
const ledCss = `
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');

.led-scene{
  width:100%;
  background:
    repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(0,100,100,.03) 60px,rgba(0,100,100,.03) 61px),
    repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(0,100,100,.03) 60px,rgba(0,100,100,.03) 61px),
    linear-gradient(160deg,#f0fafa 0%,#ffffff 45%,#eef8f8 100%);
  display:flex;align-items:center;justify-content:center;
  padding:60px 40px 80px;position:relative;overflow:hidden;perspective:1400px;
}
.led-scene::before{
  content:'';position:absolute;top:0;left:10%;right:10%;height:300px;
  background:radial-gradient(ellipse at top,rgba(20,184,184,.1) 0%,transparent 70%);
  pointer-events:none;
}
.led-scene::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:120px;
  background:linear-gradient(0deg,rgba(0,0,0,.05) 0%,transparent 100%);
  pointer-events:none;
}
.led-wall-panel{
  position:absolute;top:0;left:50%;transform:translateX(-50%);
  width:85%;height:100%;
  background:linear-gradient(180deg,#ffffff 0%,#f5fafa 100%);
  box-shadow:inset -8px 0 20px rgba(20,184,184,.05),inset 8px 0 20px rgba(20,184,184,.05);
}
.led-wrap{position:relative;width:100%;max-width:1100px;}
.led-cable{
  position:absolute;top:-30px;left:50%;transform:translateX(-50%);
  z-index:10;display:flex;gap:180px;
}
.led-cable-wire{width:3px;height:35px;background:linear-gradient(180deg,#14b8b8,#999);border-radius:2px;box-shadow:1px 0 3px rgba(0,0,0,.2);}
.led-mount{
  position:relative;transform-style:preserve-3d;
  transform:rotateX(2deg) rotateY(-1deg);
  filter:drop-shadow(0 60px 80px rgba(0,0,0,.28)) drop-shadow(0 20px 30px rgba(0,0,0,.18));
}
.led-casing{
  position:relative;
  background:linear-gradient(145deg,#1c2e2e 0%,#111e1e 50%,#080f0f 100%);
  border-radius:18px;padding:22px;
  box-shadow:
    inset 0 2px 1px rgba(20,168,168,.12),
    inset 0 -2px 2px rgba(0,0,0,.8),
    8px 8px 0 #050d0d,
    0 0 60px rgba(20,168,168,.1);
  z-index:2;
}
.led-casing::before{content:'';position:absolute;top:6px;right:-8px;width:8px;height:calc(100% - 12px);background:linear-gradient(180deg,#111e1e,#060e0e);border-radius:0 4px 4px 0;}
.led-casing::after{content:'';position:absolute;bottom:-8px;left:6px;width:calc(100% - 6px);height:8px;background:linear-gradient(90deg,#0a1818,#050e0e);border-radius:0 0 4px 4px;}
.led-screws{position:absolute;inset:0;pointer-events:none;z-index:5;}
.led-screw{position:absolute;width:10px;height:10px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#2a4a4a,#0d1e1e);box-shadow:inset 0 1px 2px rgba(20,168,168,.2),0 1px 3px rgba(0,0,0,.8);}
.led-screw::after{content:'+';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:7px;color:rgba(20,168,168,.3);font-weight:900;}
.led-screw.tl{top:8px;left:8px;}.led-screw.tr{top:8px;right:8px;}.led-screw.bl{bottom:8px;left:8px;}.led-screw.br{bottom:8px;right:8px;}
.led-inner-bezel{position:relative;border-radius:8px;background:#000;padding:3px;box-shadow:inset 0 0 12px rgba(0,0,0,.9),0 0 30px rgba(20,168,168,.15);}
.led-glow-top{position:absolute;top:-4px;left:5%;right:5%;height:4px;background:linear-gradient(90deg,transparent,#14b8b8,#d4a84b,#14b8b8,transparent);border-radius:2px;filter:blur(3px);opacity:.7;animation:ledPulse 3s ease-in-out infinite;}
.led-glow-bottom{position:absolute;bottom:-4px;left:5%;right:5%;height:4px;background:linear-gradient(90deg,transparent,#14b8b8,#d4a84b,#14b8b8,transparent);border-radius:2px;filter:blur(3px);opacity:.5;animation:ledPulse 3s ease-in-out infinite 1.5s;}
@keyframes ledPulse{0%,100%{opacity:.5;}50%{opacity:.9;}}
.led-screen{position:relative;border-radius:6px;overflow:hidden;aspect-ratio:16/7;background:#000;background-image:repeating-linear-gradient(0deg,rgba(0,0,0,.04),rgba(0,0,0,.04) 1px,transparent 1px,transparent 3px);}
.led-screen-glare{position:absolute;top:0;left:0;right:0;height:45%;background:linear-gradient(180deg,rgba(255,255,255,.05) 0%,transparent 100%);border-radius:6px 6px 0 0;pointer-events:none;z-index:10;}
.led-slide-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.led-slide-overlay{position:absolute;inset:0;z-index:2;background:linear-gradient(135deg,rgba(4,30,30,.6) 0%,rgba(0,0,0,.1) 50%,rgba(4,30,30,.6) 100%);}
.led-video-badge{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);z-index:5;pointer-events:none;opacity:0;transition:opacity .3s;}
.led-screen:hover .led-video-badge{opacity:1;}
.led-play-ring{width:64px;height:64px;border-radius:50%;background:rgba(20,184,184,.15);backdrop-filter:blur(10px);border:2px solid rgba(20,184,184,.5);display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(20,184,184,.3);}
.led-play-ring svg{width:26px;height:26px;fill:#14b8b8;margin-left:4px;}
.led-hud-tl{position:absolute;top:1rem;left:1rem;z-index:4;}
.led-hud-tr{position:absolute;top:1rem;right:1rem;z-index:4;text-align:right;}
.led-hud-bl{position:absolute;bottom:2.8rem;left:1rem;z-index:4;}
.led-hud-br{position:absolute;bottom:2.8rem;right:1rem;z-index:4;text-align:right;}
.led-hud-text{font-family:'Share Tech Mono',monospace;font-size:.58rem;color:rgba(20,184,184,.8);letter-spacing:.1em;text-transform:uppercase;text-shadow:0 0 8px rgba(20,184,184,.5);line-height:1.7;}
.led-hud-corner{display:inline-block;width:14px;height:14px;border-top:2px solid rgba(20,184,184,.65);border-left:2px solid rgba(20,184,184,.65);}
.led-hud-corner.tr-c{border-left:none;border-right:2px solid rgba(20,184,184,.65);}
.led-hud-corner.bl-c{border-top:none;border-bottom:2px solid rgba(20,184,184,.65);}
.led-hud-corner.br-c{border-top:none;border-left:none;border-bottom:2px solid rgba(20,184,184,.65);border-right:2px solid rgba(20,184,184,.65);}
.led-slide-content{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:2rem;pointer-events:none;}
.led-slide-badge{font-family:'Orbitron',monospace;font-size:.58rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#d4a84b;background:rgba(212,168,75,.1);border:1px solid rgba(212,168,75,.35);padding:.3rem .9rem;border-radius:3px;margin-bottom:.9rem;text-shadow:0 0 10px rgba(212,168,75,.6);}
.led-slide-title{font-family:'Orbitron',monospace;font-size:clamp(.9rem,3vw,2.2rem);font-weight:900;color:#f5ede0;text-shadow:0 0 30px rgba(245,237,224,.3),0 2px 8px rgba(0,0,0,.8);line-height:1.1;margin-bottom:.6rem;letter-spacing:.04em;}
.led-slide-desc{font-family:'Share Tech Mono',monospace;font-size:clamp(.55rem,1.3vw,.82rem);color:rgba(245,237,224,.6);max-width:480px;line-height:1.6;}
.led-slide-cat{margin-top:.8rem;font-family:'Orbitron',monospace;font-size:.52rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:.25rem .7rem;border-radius:2px;}
.led-slide-cat.campus{background:rgba(13,138,138,.7);color:#fff;}
.led-slide-cat.events{background:rgba(212,168,75,.75);color:#041e1e;}
.led-slide-cat.ncc{background:rgba(160,50,50,.75);color:#fff;}
.led-ticker-bar{position:absolute;bottom:0;left:0;right:0;height:32px;background:rgba(4,14,14,.88);border-top:1px solid rgba(20,184,184,.2);z-index:5;display:flex;align-items:center;overflow:hidden;}
.led-ticker-label{font-family:'Orbitron',monospace;font-size:.52rem;font-weight:700;letter-spacing:.15em;color:#041e1e;background:#14b8b8;padding:0 .75rem;height:100%;display:flex;align-items:center;white-space:nowrap;flex-shrink:0;}
.led-ticker-track{display:flex;gap:3rem;animation:ledTicker 30s linear infinite;white-space:nowrap;padding-left:2rem;}
.led-ticker-item{font-family:'Share Tech Mono',monospace;font-size:.63rem;color:rgba(245,237,224,.75);letter-spacing:.05em;}
.led-ticker-dot{color:#d4a84b;margin:0 .5rem;}
@keyframes ledTicker{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.led-nav{position:absolute;top:50%;left:0;right:0;display:flex;justify-content:space-between;padding:0 1rem;transform:translateY(-50%);z-index:6;pointer-events:none;}
.led-nav-btn{pointer-events:all;width:38px;height:38px;border-radius:4px;background:rgba(4,14,14,.6);border:1px solid rgba(20,184,184,.4);color:#14b8b8;font-size:1.4rem;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;box-shadow:0 0 12px rgba(20,184,184,.2);}
.led-nav-btn:hover{background:rgba(20,184,184,.18);border-color:#14b8b8;box-shadow:0 0 20px rgba(20,184,184,.4);}
.led-dots{position:absolute;bottom:38px;left:50%;transform:translateX(-50%);display:flex;gap:.5rem;z-index:6;}
.led-dot{width:6px;height:6px;border-radius:1px;background:rgba(245,237,224,.25);cursor:pointer;transition:all .3s;border:1px solid rgba(20,184,184,.2);}
.led-dot.active{background:#d4a84b;box-shadow:0 0 8px #d4a84b;width:18px;}
.led-vid-progress{position:absolute;bottom:32px;left:0;right:0;height:3px;background:rgba(255,255,255,.1);z-index:6;}
.led-vid-progress-fill{height:100%;background:linear-gradient(90deg,#14b8b8,#d4a84b);transition:width .25s linear;}
.led-brand-strip{position:absolute;bottom:8px;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:0 28px;z-index:3;}
.led-brand-logo{font-family:'Orbitron',monospace;font-size:.48rem;font-weight:700;color:rgba(20,184,184,.2);letter-spacing:.2em;text-transform:uppercase;}
.led-power-dot{width:6px;height:6px;border-radius:50%;background:#14b8b8;box-shadow:0 0 6px #14b8b8;animation:powerBlink 2s ease-in-out infinite;}
@keyframes powerBlink{0%,100%{opacity:1;}50%{opacity:.3;}}
.led-bracket{position:absolute;bottom:-18px;width:100%;display:flex;justify-content:space-around;padding:0 80px;z-index:0;}
.led-bracket-arm{width:14px;height:28px;background:linear-gradient(180deg,#666,#333);border-radius:0 0 4px 4px;box-shadow:2px 4px 8px rgba(0,0,0,.25);position:relative;}
.led-bracket-arm::after{content:'';position:absolute;bottom:-6px;left:-8px;width:30px;height:6px;background:linear-gradient(90deg,#555,#222);border-radius:2px;}
.led-reflection{width:100%;max-width:1100px;height:60px;margin-top:4px;background:linear-gradient(180deg,rgba(20,184,184,.05) 0%,transparent 100%);border-radius:0 0 8px 8px;filter:blur(2px);transform:scaleY(-0.3) translateY(-30px);transform-origin:top;opacity:.25;pointer-events:none;}
@media(max-width:768px){.led-scene{padding:40px 16px 60px;}.led-casing{padding:12px;border-radius:10px;}.led-cable{gap:80px;}.led-hud-tl,.led-hud-br{display:none;}}
@media(max-width:480px){.led-scene{padding:24px 8px 40px;}.led-casing{padding:8px;}.led-slide-desc,.led-slide-cat{display:none;}.led-slide-badge{font-size:.48rem;}.led-nav-btn{width:28px;height:28px;font-size:1rem;}.led-cable{gap:50px;}}
`;

const TICKER_TEXT = [
  "Annual Function 2025","NCC Republic Day Parade","Science Exhibition Winners",
  "Board Results 98.6%","District Sports Champions","Cultural Fest Highlights",
  "Video Gallery · Shree Ram School","Annual Function 2025","NCC Republic Day Parade",
  "Science Exhibition Winners","Board Results 98.6%","District Sports Champions",
  "Cultural Fest Highlights","Video Gallery · Shree Ram School",
];

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  return <span>{time.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", second:"2-digit" })}</span>;
}

function getCatClass(cat) {
  if (cat === "Campus Life")         return "campus";
  if (cat === "Events & Activities") return "events";
  return "ncc";
}

function LEDVideoCarousel({ videos = [], onOpenVideo }) {
  const [index, setIndex]   = useState(0);
  const [paused, setPaused] = useState(false);
  const [vidProgress, setVidProgress] = useState(0);
  const videoRef = useRef(null);
  const today = new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" });

  useEffect(() => {
    if (!videos.length || paused) return;
    const t = setInterval(() => { setIndex(p => (p + 1) % videos.length); setVidProgress(0); }, 8000);
    return () => clearInterval(t);
  }, [videos.length, paused]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0; el.muted = true; el.play().catch(() => {});
    const onUpdate = () => setVidProgress((el.currentTime / (el.duration || 1)) * 100);
    el.addEventListener("timeupdate", onUpdate);
    return () => el.removeEventListener("timeupdate", onUpdate);
  }, [index]);

  if (!videos.length) return null;
  const current = videos[index];
  const isYT    = current.type === "youtube";
  const ytId    = isYT ? current.src.split("/embed/")[1]?.split("?")[0] : null;

  return (
    <>
      <style>{ledCss}</style>
      <div className="led-scene">
        <div className="led-wall-panel" />
        <div className="led-wrap">
          <div className="led-cable">
            <div className="led-cable-wire" /><div className="led-cable-wire" /><div className="led-cable-wire" />
          </div>
          <div className="led-mount" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <div className="led-casing">
              <div className="led-screws">
                <div className="led-screw tl" /><div className="led-screw tr" />
                <div className="led-screw bl" /><div className="led-screw br" />
              </div>
              <div className="led-inner-bezel">
                <div className="led-glow-top" /><div className="led-glow-bottom" />
                <div className="led-screen" onClick={() => onOpenVideo && onOpenVideo(index)} style={{ cursor:"pointer" }}>
                  <AnimatePresence mode="crossfade">
                    <motion.div key={index} style={{ position:"absolute", inset:0 }} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.8, ease:"easeInOut" }}>
                      {isYT
                        ? <img src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`} alt={current.title} className="led-slide-video" style={{ objectFit:"cover" }} />
                        : <video ref={videoRef} key={current.src} src={current.src} className="led-slide-video" muted playsInline loop preload="auto" autoPlay />
                      }
                    </motion.div>
                  </AnimatePresence>
                  <div className="led-slide-overlay" />
                  <div className="led-screen-glare" />
                  <div className="led-video-badge"><div className="led-play-ring"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>
                  <div className="led-hud-tl"><span className="led-hud-corner" style={{ display:"block", marginBottom:4 }} /><div className="led-hud-text">SRS·VID·{String(index+1).padStart(2,"0")}<br />{today}</div></div>
                  <div className="led-hud-tr"><span className="led-hud-corner tr-c" style={{ display:"block", marginBottom:4, marginLeft:"auto" }} /><div className="led-hud-text"><LiveClock /><br />REC ● LIVE</div></div>
                  <div className="led-hud-bl"><div className="led-hud-text" style={{ marginBottom:4 }}>{current.category || "GALLERY"}<br />CLIP {index+1}/{videos.length}</div><span className="led-hud-corner bl-c" style={{ display:"block" }} /></div>
                  <div className="led-hud-br"><div className="led-hud-text" style={{ marginBottom:4 }}>SHREE RAM SCHOOL<br />EST. 2012</div><span className="led-hud-corner br-c" style={{ display:"block", marginLeft:"auto" }} /></div>
                  <div className="led-slide-content">
                    <AnimatePresence mode="wait">
                      <motion.div key={index} initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} transition={{ duration:.55, delay:.3 }} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                        <div className="led-slide-badge">◆ SHREE RAM SCHOOL · JODHPUR ◆</div>
                        <div className="led-slide-title">{current.title}</div>
                        <div className="led-slide-desc">{current.description}</div>
                        <div className={`led-slide-cat ${getCatClass(current.category)}`}>{current.category}</div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="led-nav">
                    <button className="led-nav-btn" onClick={e => { e.stopPropagation(); setIndex(p => (p - 1 + videos.length) % videos.length); setVidProgress(0); }}>‹</button>
                    <button className="led-nav-btn" onClick={e => { e.stopPropagation(); setIndex(p => (p + 1) % videos.length); setVidProgress(0); }}>›</button>
                  </div>
                  <div className="led-dots">{videos.map((_, i) => <div key={i} className={`led-dot ${i===index?"active":""}`} onClick={e => { e.stopPropagation(); setIndex(i); setVidProgress(0); }} />)}</div>
                  {!isYT && <div className="led-vid-progress"><div className="led-vid-progress-fill" style={{ width:`${vidProgress}%` }} /></div>}
                  <div className="led-ticker-bar">
                    <div className="led-ticker-label">▶ WATCH</div>
                    <div className="led-ticker-track">{TICKER_TEXT.map((item, i) => <span key={i} className="led-ticker-item">{item}<span className="led-ticker-dot">◆</span></span>)}</div>
                  </div>
                </div>
              </div>
              <div className="led-brand-strip"><span className="led-brand-logo">SRS·VIDEO·PRO</span><span className="led-power-dot" /></div>
            </div>
            <div className="led-bracket"><div className="led-bracket-arm" /><div className="led-bracket-arm" /><div className="led-bracket-arm" /><div className="led-bracket-arm" /></div>
          </div>
          <div className="led-reflection" />
        </div>
      </div>
    </>
  );
}

// ── GALLERY PAGE CSS ──────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Syne:wght@400;600;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#ffffff;
  --bg2:#f4fafa;
  --surface:#ffffff;
  --surface2:#eef8f8;
  --gold:#c49a28;
  --gold-dim:#a07818;
  --gold-pale:rgba(196,154,40,.08);
  --teal:#0d8a8a;
  --teal-bright:#14b8b8;
  --teal-pale:rgba(20,184,184,.07);
  --dark:#041c1e;
  --text:#1a2e2e;
  --muted:#5a7a7a;
  --border:rgba(196,154,40,.2);
  --border2:rgba(20,184,184,.14);
  --shadow:0 4px 20px rgba(4,28,30,.08);
  --shadow2:0 16px 48px rgba(4,28,30,.14);
  --f-display:'Cormorant Garamond',Georgia,serif;
  --f-body:'Syne',sans-serif;
  --radius:14px;
}
.vg{font-family:var(--f-body);background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden;}

/* ── MASTHEAD ── */
.vg-masthead{
  position:relative;
  background:linear-gradient(180deg,#eef9f9 0%,#ffffff 100%);
  border-bottom:1px solid var(--border2);
  padding:2.5rem 2rem 2.5rem;text-align:center;overflow:hidden;
}
.vg-masthead::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--teal-bright),var(--gold),var(--teal-bright),transparent);}
.vg-masthead-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 70% 80% at 50% 0%,rgba(20,184,184,.06) 0%,transparent 60%);}
.vg-logo-wrap{display:flex;align-items:center;justify-content:center;gap:1.2rem;margin-bottom:1.2rem;}
.vg-logo-img{width:68px;height:68px;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(20,184,184,.2));}
.vg-logo-text{text-align:left;}
.vg-logo-name{font-family:var(--f-display);font-size:1.2rem;font-weight:700;color:var(--dark);letter-spacing:.03em;line-height:1.1;}
.vg-logo-tagline{font-size:.62rem;color:var(--teal-bright);letter-spacing:.18em;text-transform:uppercase;margin-top:.15rem;}
.vg-eyebrow{display:inline-flex;align-items:center;gap:.6rem;margin-bottom:.8rem;font-size:.62rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--teal-bright);}
.vg-eyebrow-line{width:28px;height:1px;background:var(--teal-bright);}
.vg-masthead h1{font-family:var(--f-display);font-size:clamp(2.4rem,6vw,4.5rem);font-weight:700;line-height:.95;letter-spacing:-.02em;color:var(--dark);margin-bottom:.8rem;}
.vg-masthead h1 em{color:var(--teal);font-style:italic;}
.vg-masthead-sub{font-size:.85rem;color:var(--muted);letter-spacing:.04em;max-width:480px;margin:0 auto 2rem;line-height:1.7;}
.vg-masthead-stats{display:flex;gap:1.2rem;justify-content:center;flex-wrap:wrap;}
.vg-stat{padding:.9rem 1.6rem;background:#fff;border:1px solid var(--border2);border-radius:10px;box-shadow:var(--shadow);}
.vg-stat-n{font-family:var(--f-display);font-size:2.2rem;font-weight:700;color:var(--teal);line-height:1;}
.vg-stat-l{font-size:.62rem;color:var(--muted);letter-spacing:.15em;text-transform:uppercase;margin-top:.2rem;}

/* ── DIVIDER ── */
.vg-divider{height:3px;background:linear-gradient(90deg,var(--bg),var(--teal-bright),var(--gold),var(--teal-bright),var(--bg));}

/* ══════════════════════════════
   SECTION 1 — HIGHLIGHTS BANNER
══════════════════════════════ */
.vg-highlights{
  background:linear-gradient(135deg,var(--teal) 0%,#0a6a6a 50%,#083d3d 100%);
  padding:4rem 2rem;text-align:center;position:relative;overflow:hidden;
}
.vg-highlights::before{
  content:'';position:absolute;inset:0;
  background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E");
}
.vg-hl-inner{max-width:960px;margin:0 auto;position:relative;z-index:1;}
.vg-hl-eyebrow{font-size:.62rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-bottom:.8rem;}
.vg-highlights h2{font-family:var(--f-display);font-size:clamp(1.8rem,4vw,3rem);font-weight:700;color:#fff;line-height:1.1;margin-bottom:1rem;}
.vg-highlights h2 em{color:#d4a84b;font-style:italic;}
.vg-highlights p{font-size:.88rem;color:rgba(255,255,255,.7);line-height:1.7;max-width:580px;margin:0 auto 2.5rem;}
.vg-hl-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:1rem;}
.vg-hl-card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:1.3rem 1rem;text-align:center;transition:all .3s;}
.vg-hl-card:hover{background:rgba(255,255,255,.14);transform:translateY(-4px);box-shadow:0 12px 30px rgba(0,0,0,.2);}
.vg-hl-icon{font-size:2rem;margin-bottom:.5rem;}
.vg-hl-num{font-family:var(--f-display);font-size:2.1rem;font-weight:700;color:#d4a84b;line-height:1;}
.vg-hl-label{font-size:.62rem;color:rgba(255,255,255,.6);letter-spacing:.12em;text-transform:uppercase;margin-top:.3rem;}

/* ══════════════════════════════
   SECTION 2 — CATEGORY SHOWCASE
══════════════════════════════ */
.vg-categories{padding:4rem 2rem;background:#f8fdfd;}
.vg-categories-inner{max-width:1200px;margin:0 auto;}
.vg-cat-showcase-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;margin-top:2.5rem;}
.vg-cat-showcase-card{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:4/3;cursor:pointer;box-shadow:var(--shadow);transition:transform .35s,box-shadow .35s;}
.vg-cat-showcase-card:hover{transform:translateY(-6px) scale(1.01);box-shadow:var(--shadow2);}
.vg-cat-showcase-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:5rem;}
.vg-cat-showcase-bg.campus{background:linear-gradient(135deg,#0a5858 0%,#0d8a8a 100%);}
.vg-cat-showcase-bg.events{background:linear-gradient(135deg,#7a5010 0%,#c49a28 100%);}
.vg-cat-showcase-bg.ncc{background:linear-gradient(135deg,#6a1818 0%,#a03030 100%);}
.vg-cat-showcase-overlay{position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.08) 60%);display:flex;flex-direction:column;justify-content:flex-end;padding:1.5rem;}
.vg-cat-showcase-title{font-family:var(--f-display);font-size:1.4rem;font-weight:700;color:#fff;line-height:1.1;margin-bottom:.3rem;}
.vg-cat-showcase-count{font-size:.7rem;color:rgba(255,255,255,.6);letter-spacing:.12em;text-transform:uppercase;}
.vg-cat-showcase-arrow{margin-top:.8rem;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;transition:all .3s;}
.vg-cat-showcase-card:hover .vg-cat-showcase-arrow{background:var(--teal-bright);border-color:var(--teal-bright);}
.vg-cat-showcase-arrow svg{width:14px;height:14px;fill:#fff;}

/* ── FILTER BAR ── */
.vg-filter{position:sticky;top:0;z-index:100;background:rgba(255,255,255,.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border2);box-shadow:0 2px 16px rgba(20,184,184,.07);padding:.8rem 2rem;}
.vg-filter-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:1rem;flex-wrap:wrap;}
.vg-filter-label{font-size:.65rem;letter-spacing:.15em;text-transform:uppercase;color:var(--muted);flex-shrink:0;}
.vg-cat-tabs{display:flex;gap:.4rem;flex-wrap:wrap;}
.vg-cat-btn{padding:.4rem 1rem;border-radius:6px;border:1px solid var(--border2);background:transparent;font-family:var(--f-body);font-size:.75rem;font-weight:600;color:var(--muted);cursor:pointer;transition:all .2s;letter-spacing:.04em;}
.vg-cat-btn:hover{border-color:var(--teal-bright);color:var(--teal);}
.vg-cat-btn.active{background:var(--teal);border-color:var(--teal);color:#fff;box-shadow:0 4px 14px rgba(20,184,184,.25);}
.vg-filter-count{margin-left:auto;font-size:.7rem;color:var(--muted);}

/* ── VIDEO BODY ── */
.vg-body{max-width:1200px;margin:0 auto;padding:3rem 2rem 5rem;position:relative;}

/* ── SECTION HEAD ── */
.vg-section-head{display:flex;align-items:center;gap:1.5rem;margin-bottom:2rem;}
.vg-section-num{font-family:var(--f-display);font-size:.9rem;color:var(--teal-bright);font-style:italic;flex-shrink:0;}
.vg-section-head h2{font-family:var(--f-display);font-size:clamp(1.5rem,3vw,2.2rem);font-weight:600;color:var(--dark);letter-spacing:-.01em;}
.vg-section-line{flex:1;height:1px;background:linear-gradient(90deg,var(--border2),transparent);}

/* ── VIDEO GRID ── */
.vg-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.5rem;}

/* ── VIDEO CARD ── */
.vg-card{background:#fff;border:1px solid var(--border2);border-radius:var(--radius);overflow:hidden;transition:transform .35s,box-shadow .35s,border-color .3s;cursor:pointer;box-shadow:var(--shadow);}
.vg-card:hover{transform:translateY(-6px);box-shadow:var(--shadow2),0 0 0 1px rgba(20,184,184,.2);border-color:rgba(20,184,184,.28);}
.vg-thumb{position:relative;overflow:hidden;aspect-ratio:16/9;background:#000;}
.vg-thumb-video{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease,filter .4s;filter:brightness(.85);}
.vg-card:hover .vg-thumb-video{transform:scale(1.04);filter:brightness(1);}
.vg-thumb-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(4,28,30,.32) 0%,transparent 50%,rgba(4,28,30,.38) 100%);display:flex;align-items:center;justify-content:center;transition:background .3s;}
.vg-card:hover .vg-thumb-overlay{background:linear-gradient(135deg,rgba(13,138,138,.18) 0%,transparent 50%,rgba(196,154,40,.14) 100%);}
.vg-play-btn{width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,.18);backdrop-filter:blur(10px);border:2px solid rgba(255,255,255,.4);display:flex;align-items:center;justify-content:center;transition:all .3s;}
.vg-play-btn svg{width:20px;height:20px;fill:#fff;margin-left:3px;}
.vg-card:hover .vg-play-btn{background:var(--teal-bright);border-color:var(--teal-bright);box-shadow:0 0 28px rgba(20,184,184,.45);transform:scale(1.1);}
.vg-cat-pill{position:absolute;top:.6rem;left:.6rem;font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.22rem .55rem;border-radius:3px;}
.vg-cat-pill.campus{background:rgba(13,138,138,.9);color:#fff;}
.vg-cat-pill.events{background:rgba(196,154,40,.95);color:#fff;}
.vg-cat-pill.ncc{background:rgba(160,50,50,.9);color:#fff;}
.vg-card-info{padding:1rem 1.15rem 1.25rem;}
.vg-card-title{font-family:var(--f-display);font-size:1.12rem;font-weight:600;color:var(--dark);line-height:1.25;margin-bottom:.35rem;}
.vg-card-desc{font-size:.76rem;color:var(--muted);line-height:1.6;}
.vg-card-footer{display:flex;align-items:center;justify-content:space-between;margin-top:.85rem;padding-top:.7rem;border-top:1px solid var(--border2);}
.vg-card-tag{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold-dim);}
.vg-card-cta{font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--teal-bright);display:flex;align-items:center;gap:.3rem;transition:color .2s;}
.vg-card-cta:hover{color:var(--teal);}

/* ══════════════════════════════════
   SECTION 3 — ACHIEVEMENTS TIMELINE
══════════════════════════════════ */
.vg-timeline{padding:4rem 2rem;background:#fff;}
.vg-timeline-inner{max-width:860px;margin:0 auto;}
.vg-timeline-list{position:relative;margin-top:2.5rem;padding-left:2.2rem;}
.vg-timeline-list::before{content:'';position:absolute;left:0;top:.5rem;bottom:0;width:2px;background:linear-gradient(180deg,var(--teal-bright),var(--gold),var(--teal-bright));}
.vg-timeline-item{position:relative;padding:0 0 2.5rem 2rem;}
.vg-timeline-dot{position:absolute;left:-2.65rem;top:.25rem;width:18px;height:18px;border-radius:50%;background:#fff;border:2px solid var(--teal-bright);box-shadow:0 0 12px rgba(20,184,184,.25);}
.vg-timeline-dot.gold{border-color:var(--gold);box-shadow:0 0 12px rgba(196,154,40,.25);}
.vg-timeline-dot.red{border-color:#a03030;box-shadow:0 0 12px rgba(160,48,48,.22);}
.vg-timeline-year{font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--teal-bright);margin-bottom:.25rem;}
.vg-timeline-year.gold{color:var(--gold);}
.vg-timeline-year.red{color:#a03030;}
.vg-timeline-title{font-family:var(--f-display);font-size:1.2rem;font-weight:600;color:var(--dark);margin-bottom:.3rem;}
.vg-timeline-desc{font-size:.8rem;color:var(--muted);line-height:1.65;}

/* ══════════════════════════════════
   SECTION 4 — CTA / CONNECT STRIP
══════════════════════════════════ */
.vg-cta-strip{
  background:linear-gradient(135deg,#041c1e 0%,#062628 50%,#0a3838 100%);
  padding:4.5rem 2rem;text-align:center;position:relative;overflow:hidden;
}
.vg-cta-strip::before{content:'';position:absolute;top:-80px;left:50%;transform:translateX(-50%);width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(20,184,184,.1) 0%,transparent 70%);}
.vg-cta-strip::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--teal-bright),var(--gold),var(--teal-bright),transparent);}
.vg-cta-inner{max-width:680px;margin:0 auto;position:relative;z-index:1;}
.vg-cta-icon{font-size:2.8rem;margin-bottom:1rem;}
.vg-cta-strip h2{font-family:var(--f-display);font-size:clamp(1.8rem,4vw,2.8rem);font-weight:700;color:#fff;line-height:1.1;margin-bottom:.8rem;}
.vg-cta-strip h2 em{color:#d4a84b;font-style:italic;}
.vg-cta-strip p{font-size:.88rem;color:rgba(245,237,224,.62);line-height:1.7;margin-bottom:2rem;}
.vg-cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.vg-btn-primary{display:inline-flex;align-items:center;gap:.6rem;padding:.78rem 2rem;border-radius:8px;background:var(--teal-bright);color:#fff;font-family:var(--f-body);font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:none;cursor:pointer;transition:all .25s;text-decoration:none;box-shadow:0 8px 24px rgba(20,184,184,.35);}
.vg-btn-primary:hover{background:#0fa0a0;transform:translateY(-2px);box-shadow:0 12px 32px rgba(20,184,184,.45);}
.vg-btn-secondary{display:inline-flex;align-items:center;gap:.6rem;padding:.78rem 2rem;border-radius:8px;background:transparent;color:#d4a84b;font-family:var(--f-body);font-size:.82rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:2px solid rgba(212,168,75,.4);cursor:pointer;transition:all .25s;text-decoration:none;}
.vg-btn-secondary:hover{background:rgba(212,168,75,.1);border-color:#d4a84b;transform:translateY(-2px);}
.vg-cta-socials{margin-top:2.2rem;display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;}
.vg-social-badge{display:inline-flex;align-items:center;gap:.4rem;font-size:.7rem;color:rgba(245,237,224,.45);letter-spacing:.08em;padding:.3rem .8rem;border-radius:20px;border:1px solid rgba(255,255,255,.1);transition:all .2s;cursor:pointer;}
.vg-social-badge:hover{color:rgba(245,237,224,.9);border-color:rgba(255,255,255,.25);background:rgba(255,255,255,.06);}

/* ── MODAL ── */
.vg-modal{position:fixed;inset:0;z-index:9999;background:rgba(4,28,30,.94);backdrop-filter:blur(20px);display:flex;align-items:center;justify-content:center;padding:2rem;}
.vg-modal-inner{position:relative;width:100%;max-width:960px;display:flex;flex-direction:column;background:#fff;border:1px solid var(--border2);border-radius:16px;overflow:hidden;box-shadow:0 60px 120px rgba(0,0,0,.5),0 0 0 1px rgba(20,184,184,.15);}
.vg-modal-player{position:relative;width:100%;background:#000;aspect-ratio:16/9;}
.vg-modal-video{width:100%;height:100%;display:block;outline:none;}
.vg-modal-close{position:absolute;top:.8rem;right:.8rem;z-index:10;width:34px;height:34px;border-radius:50%;background:rgba(4,28,30,.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.8);font-size:1rem;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;}
.vg-modal-close:hover{background:rgba(180,50,50,.85);border-color:rgba(220,50,50,.6);color:#fff;transform:rotate(90deg);}
.vg-controls{padding:.8rem 1.1rem;background:var(--surface2);display:flex;flex-direction:column;gap:.55rem;border-top:1px solid var(--border2);}
.vg-progress-wrap{position:relative;height:4px;border-radius:2px;background:rgba(20,184,184,.15);cursor:pointer;transition:height .2s;}
.vg-progress-wrap:hover{height:6px;}
.vg-progress-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--teal-bright),var(--gold));pointer-events:none;transition:width .1s linear;}
.vg-progress-thumb{position:absolute;top:50%;transform:translate(50%,-50%);width:12px;height:12px;border-radius:50%;background:var(--gold);box-shadow:0 0 8px rgba(196,154,40,.5);pointer-events:none;opacity:0;transition:opacity .2s;}
.vg-progress-wrap:hover .vg-progress-thumb{opacity:1;}
.vg-controls-row{display:flex;align-items:center;gap:.7rem;}
.vg-ctrl-btn{background:none;border:none;color:var(--muted);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:.3rem;border-radius:4px;transition:all .2s;}
.vg-ctrl-btn:hover{color:var(--dark);background:rgba(20,184,184,.08);}
.vg-ctrl-btn svg{width:18px;height:18px;}
.vg-time{font-size:.7rem;color:var(--muted);letter-spacing:.05em;font-variant-numeric:tabular-nums;}
.vg-vol-wrap{display:flex;align-items:center;gap:.45rem;}
.vg-vol-slider{width:65px;height:3px;border-radius:2px;background:rgba(20,184,184,.2);-webkit-appearance:none;appearance:none;cursor:pointer;}
.vg-vol-slider::-webkit-slider-thumb{-webkit-appearance:none;width:10px;height:10px;border-radius:50%;background:var(--gold);cursor:pointer;}
.vg-ctrl-spacer{flex:1;}
.vg-modal-meta{padding:.9rem 1.1rem;border-top:1px solid var(--border2);display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;}
.vg-modal-title{font-family:var(--f-display);font-size:1.25rem;font-weight:600;color:var(--dark);}
.vg-modal-desc{font-size:.76rem;color:var(--muted);margin-top:.2rem;line-height:1.5;}
.vg-modal-cat{flex-shrink:0;font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--teal);background:var(--teal-pale);border:1px solid var(--border2);padding:.28rem .65rem;border-radius:3px;margin-top:.15rem;}
.vg-modal-counter{font-size:.62rem;color:var(--muted);margin-top:.4rem;text-align:right;}
.vg-modal-nav-btn{position:fixed;top:50%;transform:translateY(-50%);z-index:10001;width:42px;height:42px;border-radius:50%;background:rgba(4,28,30,.65);backdrop-filter:blur(8px);border:1px solid rgba(20,184,184,.25);color:rgba(20,184,184,.9);font-size:1.5rem;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .25s;}
.vg-modal-nav-btn:hover{background:var(--teal-bright);border-color:var(--teal-bright);color:#fff;}
.vg-modal-nav-btn.prev{left:1rem;}
.vg-modal-nav-btn.next{right:1rem;}
.vg-empty{text-align:center;padding:5rem 2rem;color:var(--muted);}
.vg-empty-icon{font-size:2.8rem;margin-bottom:.8rem;opacity:.3;}

/* ── PAGINATION ── */
.vg-pagination{
  display:flex;align-items:center;justify-content:center;gap:.5rem;
  margin-top:3rem;flex-wrap:wrap;
}
.vg-page-btn{
  min-width:40px;height:40px;border-radius:8px;
  border:1px solid var(--border2);background:#fff;
  font-family:var(--f-body);font-size:.82rem;font-weight:600;
  color:var(--muted);cursor:pointer;transition:all .2s;
  display:flex;align-items:center;justify-content:center;
  box-shadow:var(--shadow);
}
.vg-page-btn:hover:not(:disabled){border-color:var(--teal-bright);color:var(--teal);background:#f0fdfd;}
.vg-page-btn.active{background:var(--teal);border-color:var(--teal);color:#fff;box-shadow:0 4px 14px rgba(20,184,184,.3);}
.vg-page-btn:disabled{opacity:.35;cursor:not-allowed;}
.vg-page-btn.vg-page-arrow svg{width:16px;height:16px;}
.vg-page-info{font-size:.7rem;color:var(--muted);letter-spacing:.06em;margin-left:.5rem;}

@media(max-width:900px){.vg-grid{grid-template-columns:repeat(auto-fill,minmax(260px,1fr));}.vg-masthead-stats{gap:1rem;}.vg-hl-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:600px){
  .vg-masthead{padding:2rem 1rem;}.vg-masthead h1{font-size:2.4rem;}.vg-body{padding:2rem 1rem 4rem;}
  .vg-filter{padding:.7rem 1rem;}.vg-grid{grid-template-columns:1fr;}
  .vg-modal{padding:.4rem;}.vg-modal-inner{border-radius:10px;}.vg-vol-wrap{display:none;}
  .vg-modal-meta{flex-direction:column;}.vg-modal-nav-btn{width:32px;height:32px;font-size:1.1rem;}
  .vg-modal-nav-btn.prev{left:.3rem;}.vg-modal-nav-btn.next{right:.3rem;}
  .vg-logo-img{width:52px;height:52px;}.vg-highlights{padding:2.5rem 1rem;}.vg-categories{padding:2.5rem 1rem;}
  .vg-timeline{padding:2.5rem 1rem;}.vg-cta-strip{padding:3rem 1rem;}
  .vg-cta-btns{flex-direction:column;align-items:center;}.vg-hl-grid{grid-template-columns:repeat(2,1fr);}
}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important;}}
`;

function formatTime(s) {
  if (isNaN(s) || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function VideoCard({ video, index, onClick }) {
  const thumbRef = useRef(null);
  const isYT = video.type === "youtube";
  const ytId = isYT ? video.src.split("/embed/")[1]?.split("?")[0] : null;
  useEffect(() => { const el = thumbRef.current; if (!el) return; el.currentTime = 2; }, []);
  return (
    <motion.div className="vg-card" onClick={() => onClick(index)} initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.38, delay:Math.min(index*.06,.38) }}>
      <div className="vg-thumb">
        {isYT ? <img src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`} alt={video.title} className="vg-thumb-video" /> : <video ref={thumbRef} src={video.src} className="vg-thumb-video" muted playsInline preload="metadata" />}
        <div className="vg-thumb-overlay"><div className="vg-play-btn"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>
        <span className={`vg-cat-pill ${getCatClass(video.category)}`}>{video.category}</span>
      </div>
      <div className="vg-card-info">
        <div className="vg-card-title">{video.title}</div>
        <div className="vg-card-desc">{video.description}</div>
        <div className="vg-card-footer">
          <span className="vg-card-tag">{isYT ? "YouTube" : "Local Video"}</span>
          <span className="vg-card-cta">Watch now <svg style={{width:11,height:11}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></span>
        </div>
      </div>
    </motion.div>
  );
}

function VideoModal({ video, current, total, onClose, onPrev, onNext }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentT, setCurrentT] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const isYT = video.type === "youtube";
  useEffect(() => { const el = videoRef.current; if (!el) return; el.pause(); el.currentTime = 0; setPlaying(false); setProgress(0); setCurrentT(0); setDuration(0); }, [video]);
  useEffect(() => {
    const handler = (e) => { if (e.key==="Escape") onClose(); if (e.key==="ArrowRight") onNext(); if (e.key==="ArrowLeft") onPrev(); if (e.key===" ") { e.preventDefault(); togglePlay(); } };
    window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler);
  }, [playing]);
  const togglePlay = () => { const el = videoRef.current; if (!el) return; if (el.paused) { el.play(); setPlaying(true); } else { el.pause(); setPlaying(false); } };
  const handleTimeUpdate = () => { const el = videoRef.current; if (!el?.duration) return; setCurrentT(el.currentTime); setProgress((el.currentTime/el.duration)*100); };
  const handleSeek = (e) => { const el = videoRef.current; const bar = e.currentTarget; el.currentTime = ((e.clientX - bar.getBoundingClientRect().left) / bar.offsetWidth) * el.duration; };
  const handleVolume = (e) => { const v = parseFloat(e.target.value); setVolume(v); setMuted(v===0); if (videoRef.current) videoRef.current.volume = v; };
  const toggleMute = () => { const el = videoRef.current; if (!el) return; el.muted = !el.muted; setMuted(el.muted); };
  const toggleFS = () => { const el = videoRef.current; if (!el) return; if (!document.fullscreenElement) el.requestFullscreen?.(); else document.exitFullscreen?.(); };
  return (
    <motion.div className="vg-modal" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={onClose}>
      <button className="vg-modal-nav-btn prev" onClick={e => { e.stopPropagation(); onPrev(); }}>‹</button>
      <button className="vg-modal-nav-btn next" onClick={e => { e.stopPropagation(); onNext(); }}>›</button>
      <motion.div className="vg-modal-inner" onClick={e => e.stopPropagation()} initial={{ scale:.92, opacity:0, y:20 }} animate={{ scale:1, opacity:1, y:0 }} exit={{ scale:.92, opacity:0 }} transition={{ type:"spring", stiffness:300, damping:28 }}>
        <div className="vg-modal-player">
          {isYT ? <iframe src={`${video.src}?autoplay=1`} className="vg-modal-video" allow="autoplay; fullscreen" allowFullScreen title={video.title} style={{ border:"none" }} /> : <video ref={videoRef} src={video.src} className="vg-modal-video" onTimeUpdate={handleTimeUpdate} onLoadedMetadata={() => setDuration(videoRef.current?.duration||0)} onEnded={() => setPlaying(false)} onClick={togglePlay} preload="auto" />}
          <button className="vg-modal-close" onClick={onClose}>✕</button>
        </div>
        {!isYT && (
          <div className="vg-controls">
            <div className="vg-progress-wrap" onClick={handleSeek}><div className="vg-progress-fill" style={{ width:`${progress}%` }} /><div className="vg-progress-thumb" style={{ left:`${progress}%` }} /></div>
            <div className="vg-controls-row">
              <button className="vg-ctrl-btn" onClick={togglePlay}>{playing ? <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}</button>
              <span className="vg-time">{formatTime(currentT)} / {formatTime(duration)}</span>
              <div className="vg-ctrl-spacer" />
              <div className="vg-vol-wrap">
                <button className="vg-ctrl-btn" onClick={toggleMute}>{muted ? <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg> : <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>}</button>
                <input type="range" className="vg-vol-slider" min="0" max="1" step=".05" value={muted?0:volume} onChange={handleVolume} />
              </div>
              <button className="vg-ctrl-btn" onClick={toggleFS}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></button>
            </div>
          </div>
        )}
        <div className="vg-modal-meta">
          <div><div className="vg-modal-title">{video.title}</div><div className="vg-modal-desc">{video.description}</div></div>
          <div><div className="vg-modal-cat">{video.category}</div><div className="vg-modal-counter">{current+1} / {total}</div></div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── EXTRA SECTIONS ────────────────────────────────────────────────────────────

function CategoriesShowcase({ onFilterSelect, catCounts }) {
  const cats = [
    { key:"Campus Life",          cls:"campus", icon:"🏫", desc:"Daily school life, classrooms & labs" },
    { key:"Events & Activities",  cls:"events", icon:"🎭", desc:"Annual functions, fests & programs" },
    { key:"NCC & Sports",         cls:"ncc",    icon:"🏅", desc:"Parades, sports days & achievements" },
  ];
  return (
    <div className="vg-categories">
      <div className="vg-categories-inner">
        <div className="vg-section-head">
          <span className="vg-section-num">02.</span>
          <h2>Browse by Category</h2>
          <div className="vg-section-line" />
        </div>
        <div className="vg-cat-showcase-grid">
          {cats.map((cat,i) => (
            <motion.div key={cat.key} className="vg-cat-showcase-card" onClick={() => onFilterSelect(cat.key)} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.4, delay:i*.1 }}>
              <div className={`vg-cat-showcase-bg ${cat.cls}`}>{cat.icon}</div>
              <div className="vg-cat-showcase-overlay">
                <div className="vg-cat-showcase-title">{cat.key}</div>
                <div className="vg-cat-showcase-count">{catCounts[cat.key]||0} videos · {cat.desc}</div>
                <div className="vg-cat-showcase-arrow"><svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AchievementsTimeline() {
  const events = [
    { year:"2025", color:"teal",  title:"Annual Function 2025",            desc:"A spectacular evening of dance, drama, and music attended by 2,000+ parents and guests." },
    { year:"2025", color:"gold",  title:"NCC Republic Day Parade",          desc:"Our NCC cadets marched proudly at the district-level Republic Day parade in Jodhpur." },
    { year:"2024", color:"red",   title:"District Sports Champions",        desc:"Shree Ram School wins the inter-school athletics championship for the 3rd consecutive year." },
    { year:"2024", color:"gold",  title:"Science Exhibition Gold Medal",    desc:"Students won top prize at the Rajasthan State Science Exhibition for their AI project." },
    { year:"2023", color:"teal",  title:"Cultural Fest — Rang Utsav",       desc:"A vibrant 2-day cultural festival showcasing folk arts, music, and traditions of Rajasthan." },
    { year:"2012", color:"gold",  title:"School Founded",                   desc:"Shree Ram School established in Jodhpur with a vision to nurture excellence in every student." },
  ];
  const dotClass = { teal:"", gold:"gold", red:"red" };
  return (
    <div className="vg-timeline">
      <div className="vg-timeline-inner">
        <div className="vg-section-head">
          <span className="vg-section-num">03.</span>
          <h2>Achievements & Milestones</h2>
          <div className="vg-section-line" />
        </div>
        <div className="vg-timeline-list">
          {events.map((ev,i) => (
            <motion.div key={i} className="vg-timeline-item" initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:.4, delay:i*.08 }}>
              <div className={`vg-timeline-dot ${dotClass[ev.color]}`} />
              <div className={`vg-timeline-year ${dotClass[ev.color]}`}>{ev.year}</div>
              <div className="vg-timeline-title">{ev.title}</div>
              <div className="vg-timeline-desc">{ev.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTAStrip() {
  return (
    <motion.div className="vg-cta-strip" initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:.6 }}>
      <div className="vg-cta-inner">
        <div className="vg-cta-icon">📽️</div>
        <h2>Have a <em>Memory</em> to Share?</h2>
        <p>Submit your school photos or videos to be featured in our gallery. Help us build the most complete archive of Shree Ram School's journey.</p>
        <div className="vg-cta-btns">
          <a href="mailto:info@shreeram.school" className="vg-btn-primary">
            <svg style={{width:16,height:16}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Contact Us
          </a>
          <a href="/" className="vg-btn-secondary">
            <svg style={{width:16,height:16}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
            Back to Home
          </a>
        </div>
        <div className="vg-cta-socials">
          <span className="vg-social-badge">📘 Facebook</span>
          <span className="vg-social-badge">📸 Instagram</span>
          <span className="vg-social-badge">▶️ YouTube</span>
          <span className="vg-social-badge">🐦 Twitter</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
const VIDEOS_PER_PAGE = 10;

export default function VideoGalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalIndex,     setModalIndex]     = useState(null);
  const [currentPage,    setCurrentPage]    = useState(1);

  const filteredVideos = useMemo(() =>
    videos.filter(v => activeCategory === "All" || v.category === activeCategory),
    [activeCategory]);

  const totalPages   = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);
  const pagedVideos  = filteredVideos.slice((currentPage - 1) * VIDEOS_PER_PAGE, currentPage * VIDEOS_PER_PAGE);

  const openModal    = useCallback((idx) => setModalIndex(idx), []);
  const closeModal   = () => setModalIndex(null);
  const prevVideo    = () => setModalIndex(p => (p - 1 + filteredVideos.length) % filteredVideos.length);
  const nextVideo    = () => setModalIndex(p => (p + 1) % filteredVideos.length);
  const currentVideo = modalIndex !== null ? filteredVideos[modalIndex] : null;

  const catCounts = useMemo(() => {
    const c = {};
    videos.forEach(v => (c[v.category] = (c[v.category]||0) + 1));
    return c;
  }, []);

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    setTimeout(() => document.querySelector(".vg-filter")?.scrollIntoView({ behavior:"smooth", block:"start" }), 100);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.querySelector(".vg-body")?.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  return (
    <>
      <style>{css}</style>

      {/* ══ LED BOARD HERO ══ */}
      <LEDVideoCarousel videos={videos} onOpenVideo={openModal} />

      <div className="vg">

        {/* ── MASTHEAD ── */}
        <div className="vg-masthead">
          <div className="vg-masthead-bg" />
          <div className="vg-logo-wrap">
            <img src="/assets/logo.png" alt="Shree Ram School Logo" className="vg-logo-img" onError={e => { e.currentTarget.style.display="none"; }} />
            <div className="vg-logo-text">
              <div className="vg-logo-name">Shree Ram School</div>
              <div className="vg-logo-tagline">Jodhpur · Est. 2012</div>
            </div>
          </div>
          <div className="vg-eyebrow"><span className="vg-eyebrow-line" />Official Media Archive<span className="vg-eyebrow-line" /></div>
          <h1>Video <em>Gallery</em></h1>
          <p className="vg-masthead-sub">Relive the moments — campus life, celebrations, NCC parades, and more.</p>
          <div className="vg-masthead-stats">
            <div className="vg-stat"><div className="vg-stat-n">{videos.length}</div><div className="vg-stat-l">Total Videos</div></div>
            {VIDEO_CATEGORIES.slice(1).map(cat => (
              <div key={cat} className="vg-stat"><div className="vg-stat-n">{catCounts[cat]||0}</div><div className="vg-stat-l">{cat}</div></div>
            ))}
          </div>
        </div>

        <div className="vg-divider" />

        {/* ══ SECTION 2 — CATEGORIES ══ */}
        <CategoriesShowcase onFilterSelect={handleCategorySelect} catCounts={catCounts} />

        <div className="vg-divider" />

        {/* ── FILTER BAR ── */}
        <div className="vg-filter">
          <div className="vg-filter-inner">
            <span className="vg-filter-label">Filter</span>
            <div className="vg-cat-tabs">
              {VIDEO_CATEGORIES.map(cat => (
                <button key={cat} className={`vg-cat-btn ${activeCategory===cat?"active":""}`} onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}>
                  {cat} ({cat==="All"?videos.length:catCounts[cat]||0})
                </button>
              ))}
            </div>
            <span className="vg-filter-count">{filteredVideos.length} video{filteredVideos.length!==1?"s":""}</span>
          </div>
        </div>

        {/* ── VIDEO GRID ── */}
        <div className="vg-body">
          <div className="vg-section-head">
            <span className="vg-section-num">01.</span>
            <h2>{activeCategory==="All"?"All Videos":activeCategory}</h2>
            <div className="vg-section-line" />
          </div>
          {filteredVideos.length === 0 ? (
            <div className="vg-empty"><div className="vg-empty-icon">🎬</div><p>No videos in this category yet.</p></div>
          ) : (
            <>
              <div className="vg-grid">
                {pagedVideos.map((video, idx) => (
                  <VideoCard key={`${video.src}-${idx}`} video={video} index={(currentPage-1)*VIDEOS_PER_PAGE + idx} onClick={openModal} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="vg-pagination">
                  <button className="vg-page-btn vg-page-arrow" disabled={currentPage===1} onClick={() => handlePageChange(currentPage-1)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  {Array.from({ length:totalPages }, (_,i) => i+1).map(page => (
                    <button key={page} className={`vg-page-btn ${page===currentPage?"active":""}`} onClick={() => handlePageChange(page)}>
                      {page}
                    </button>
                  ))}
                  <button className="vg-page-btn vg-page-arrow" disabled={currentPage===totalPages} onClick={() => handlePageChange(currentPage+1)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                  </button>
                  <span className="vg-page-info">Page {currentPage} of {totalPages} · {filteredVideos.length} videos</span>
                </div>
              )}
            </>
          )}
        </div>

        <div className="vg-divider" />

        {/* ══ SECTION 3 — TIMELINE ══ */}
        <AchievementsTimeline />

        <div className="vg-divider" />

        {/* ══ SECTION 4 — CTA ══ */}
        <CTAStrip />

        {/* ── MODAL ── */}
        <AnimatePresence>
          {currentVideo && (
            <VideoModal video={currentVideo} current={modalIndex} total={filteredVideos.length} onClose={closeModal} onPrev={prevVideo} onNext={nextVideo} />
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
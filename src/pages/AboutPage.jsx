import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaHistory, FaBullseye, FaEye, FaHeart, FaBuilding, FaAward,
  FaTrophy, FaFlask, FaGraduationCap, FaUserCheck, FaStar, FaQuoteLeft,
  FaPhone, FaEnvelope, FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// ═══════════════════════════════════════════════════════════════════════════
//  GLOBAL CSS
// ═══════════════════════════════════════════════════════════════════════════
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Jost:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;700&display=swap');

@keyframes pulse-ring {
  from { opacity:.55; transform:translate(-50%,-50%) scale(1); }
  to   { opacity:0;   transform:translate(-50%,-50%) scale(1.12); }
}
@keyframes star-twinkle {
  0%,100% { opacity:.15; transform:scale(1); }
  50%     { opacity:.7;  transform:scale(1.4); }
}
@keyframes float-blob {
  0%,100% { transform:translateY(0) scale(1); }
  50%     { transform:translateY(-18px) scale(1.04); }
}
@keyframes ringRot { to { transform: rotate(360deg); } }
@keyframes glf {
  from { transform: translateY(0) rotate(var(--gr,0deg)); }
  to   { transform: translateY(-14px) rotate(var(--gr,0deg)); }
}

:root {
  --td:#134F5C; --t:#1B6B7A; --tm:#2a8a9a; --tl:#d6edf0; --tp:#edf7f9;
  --g:#E8B97A;  --gb:#F5D08A; --gd:#C9943A; --gp:#fdf4e7;
  --cr:#FAF7F2; --w:#FFFFFF;
  --tx:#0f3640; --mu:#6b8f96; --br:rgba(19,79,92,.1);
}

*{box-sizing:border-box;}
.ar{font-family:'DM Sans',sans-serif;color:var(--tx);background:var(--w);}
.ar h1,.ar h2,.ar h3,.ar h4{font-family:'Cormorant Garamond',serif;}

.sec{padding:6rem 1.25rem;}
.inner{max-width:1140px;margin:0 auto;}
.r2{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
@media(max-width:768px){.r2{grid-template-columns:1fr;}}
.center{text-align:center;}

.chip{display:inline-flex;align-items:center;gap:.5rem;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gd);margin-bottom:.7rem;}
.chip::before{content:'';display:block;width:22px;height:2px;background:var(--g);border-radius:2px;}
.sec-h{font-size:clamp(1.8rem,3vw,2.6rem);color:var(--td);margin-bottom:1rem;line-height:1.15;}
.sec-sub{color:var(--mu);font-size:.97rem;line-height:1.75;max-width:620px;display:block;}

/* ── HERO ── */
.hero{position:relative;background:var(--td);padding:7rem 1rem 6rem;overflow:hidden;text-align:center;}
.hero::before{content:'';position:absolute;inset:0;background:url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1950&q=80') center/cover;opacity:.12;}
.hero-badge{display:inline-block;background:var(--g);color:var(--td);font-size:.75rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;padding:.35rem 1.1rem;border-radius:2rem;margin-bottom:1.25rem;}
.hero h1{font-size:clamp(2.2rem,5vw,4rem);color:var(--w);line-height:1.15;margin-bottom:1rem;}
.hero h1 span{color:var(--g);}
.hero p{color:rgba(255,255,255,.75);font-size:1.1rem;max-width:560px;margin:0 auto;font-weight:300;}
.hero-arc{position:absolute;bottom:-2px;left:0;right:0;height:70px;background:var(--w);clip-path:ellipse(55% 100% at 50% 100%);}
.hero-ring{position:absolute;border:2px solid rgba(232,185,122,.25);border-radius:50%;pointer-events:none;}

/* ── HISTORY ── */
.h-sec{background:var(--cr);}
.h-text p{color:#4a6e77;line-height:1.9;margin-bottom:1rem;font-size:.96rem;}
.img-frame{position:relative;}
.img-frame img{width:100%;border-radius:1.25rem;box-shadow:0 24px 64px rgba(19,79,92,.18);display:block;position:relative;z-index:1;}
.img-frame::after{content:'';position:absolute;inset:-14px -14px auto auto;width:110px;height:110px;border:3px solid var(--g);border-radius:.75rem;z-index:0;}
.stats{display:flex;gap:2.5rem;margin-top:2.2rem;flex-wrap:wrap;}
.s-n{font-family:'Cormorant Garamond',serif;font-size:2.2rem;color:var(--t);line-height:1;}
.s-n em{color:var(--gd);font-style:normal;}
.s-l{font-size:.7rem;text-transform:uppercase;letter-spacing:.1em;color:var(--mu);margin-top:.15rem;}

/* ── FOUNDATION ── */
.f-sec{background:var(--w);}
.fgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:2rem;margin-top:3rem;}
.fc{background:var(--cr);border-radius:1.1rem;padding:2.5rem 2rem;border-top:4px solid var(--g);text-align:left;position:relative;overflow:hidden;transition:box-shadow .3s,transform .3s;}
.fc:hover{box-shadow:0 18px 52px rgba(19,79,92,.12);transform:translateY(-5px);}
.fc::after{content:'';position:absolute;bottom:-44px;right:-44px;width:110px;height:110px;border-radius:50%;background:rgba(232,185,122,.14);}
.fic{width:50px;height:50px;border-radius:.75rem;display:flex;align-items:center;justify-content:center;margin-bottom:1.2rem;font-size:1.3rem;}
.fic.t{background:rgba(27,107,122,.12);color:var(--t);}
.fic.g{background:rgba(232,185,122,.25);color:var(--gd);}
.fic.gr{background:rgba(60,160,100,.12);color:#2a8a60;}
.fc h3{font-size:1.3rem;color:var(--td);margin-bottom:.55rem;}
.fc p{color:#5a7c85;line-height:1.75;font-size:.94rem;}

/* ── ORBIT SECTIONS ── */
.orbit-sec-academic {
  padding: 5.5rem 1.25rem;
  background: linear-gradient(160deg, #edf7f9 0%, #f5fbfc 55%, #d6edf0 100%);
  position: relative;
  overflow: hidden;
}
.orbit-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(65px);
  pointer-events: none;
  animation: float-blob 7s ease-in-out infinite;
}

/* ── PRINCIPAL ── */
.pr-sec{padding:6rem 1.25rem;background:var(--td);position:relative;overflow:hidden;}
.pr-sec::before{content:'"';position:absolute;top:-60px;left:2%;font-family:'Cormorant Garamond',serif;font-size:28rem;color:rgba(232,185,122,.05);line-height:1;pointer-events:none;}
.pr-inner{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:260px 1fr;gap:4.5rem;align-items:center;}
@media(max-width:700px){.pr-inner{grid-template-columns:1fr;text-align:center;}}
.pr-img{width:210px;height:210px;border-radius:50%;object-fit:cover;border:4px solid var(--g);box-shadow:0 0 0 10px rgba(232,185,122,.12);margin:0 auto;display:block;}
.pr-chip{color:rgba(255,255,255,.5);}
.pr-chip::before{background:rgba(232,185,122,.45);}
.pr-h{color:var(--w);}
.pr-role{color:var(--g);font-size:.88rem;letter-spacing:.05em;margin-bottom:1.3rem;}
.pr-q{color:rgba(255,255,255,.82);font-size:1.06rem;line-height:1.9;font-style:italic;border-left:3px solid var(--g);padding-left:1.3rem;font-family:'Cormorant Garamond',serif;}
.pr-sign{color:var(--g);font-size:.9rem;margin-top:1.2rem;font-weight:600;}

/* ── LEADERSHIP ── */
.ld-sec{background:var(--cr);}
.lgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:2.5rem;margin-top:3rem;}
.lc{text-align:center;}
.lw{position:relative;display:inline-block;margin-bottom:1rem;}
.lw img{width:130px;height:130px;border-radius:50%;object-fit:cover;border:3px solid var(--tl);transition:border-color .3s;}
.lc:hover .lw img{border-color:var(--g);}
.lw::after{content:'';position:absolute;inset:-7px;border-radius:50%;border:2px dashed var(--g);opacity:0;transition:opacity .3s;}
.lc:hover .lw::after{opacity:1;}
.lc h3{font-size:1.1rem;color:var(--td);margin-bottom:.2rem;}
.l-role{font-size:.75rem;color:var(--gd);font-weight:700;letter-spacing:.07em;text-transform:uppercase;}
.l-bio{font-size:.81rem;color:var(--mu);margin-top:.45rem;line-height:1.6;}

/* ── CAMPUS ── */
.ca-sec{background:var(--tp);}
.cagrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(255px,1fr));gap:1.5rem;margin-top:3rem;}
.cac{position:relative;border-radius:1.1rem;overflow:hidden;aspect-ratio:4/3;cursor:pointer;}
.cac img{width:100%;height:100%;object-fit:cover;transition:transform .6s ease;display:block;}
.cac:hover img{transform:scale(1.08);}
.co{position:absolute;inset:0;background:linear-gradient(to top,rgba(19,79,92,.88) 0%,transparent 60%);display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;padding:1.25rem;}
.co-ic{background:var(--g);color:var(--td);width:36px;height:36px;border-radius:.5rem;display:flex;align-items:center;justify-content:center;margin-bottom:.5rem;font-size:1rem;}
.co h3{color:var(--w);font-size:1.05rem;font-family:'Cormorant Garamond',serif;}
.co p{color:rgba(255,255,255,.65);font-size:.78rem;margin-top:.2rem;}

/* ── ACCREDITATIONS ── */
.ar-sec{padding:5rem 1.25rem;background:var(--t);text-align:center;}
.ar-sec h2{color:var(--w);margin-bottom:.75rem;}
.ar-sec .sec-sub{color:rgba(255,255,255,.7);margin:0 auto 2.5rem;}
.acc-pill{background:rgba(232,185,122,.18);border:1px solid rgba(232,185,122,.35);color:var(--gb);font-size:.78rem;font-weight:600;letter-spacing:.08em;padding:.4rem 1rem;border-radius:2rem;display:inline-block;margin-bottom:2.2rem;}
.al{display:flex;justify-content:center;align-items:center;gap:2.5rem;flex-wrap:wrap;}
.al img{height:52px;filter:brightness(0) invert(1);opacity:.8;transition:opacity .3s;}
.al img:hover{opacity:1;}
.ad{width:1px;height:44px;background:rgba(255,255,255,.22);}

/* ── ACHIEVEMENTS ── */
.ach-sec{background:var(--cr);}
.achgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;margin-top:3rem;}
.ac{background:var(--w);border-radius:1.1rem;padding:2.5rem 2rem;box-shadow:0 4px 24px rgba(19,79,92,.07);transition:transform .3s,box-shadow .3s;text-align:left;border-bottom:3px solid transparent;}
.ac:hover{transform:translateY(-5px);box-shadow:0 18px 50px rgba(19,79,92,.13);border-bottom-color:var(--g);}
.a-ic{font-size:2.3rem;margin-bottom:1rem;}
.ac h3{font-size:1.2rem;color:var(--td);margin-bottom:.5rem;}
.ac p{color:#5a7c85;font-size:.92rem;line-height:1.75;}
.a-yr{display:inline-block;background:var(--gp);color:var(--gd);font-size:.68rem;font-weight:700;letter-spacing:.1em;padding:.2rem .6rem;border-radius:1rem;margin-bottom:.6rem;text-transform:uppercase;}

/* ════════════════════════════════════════
   ── TESTIMONIALS — WHITE BG 3D CAROUSEL
   ════════════════════════════════════════ */
.te-sec-v2 {
  position: relative;
  padding: 100px 0 120px;
  overflow: hidden;
  font-family: 'Jost', sans-serif;
  background: #ffffff;
}
/* Top teal+amber accent border */
.te-sec-v2::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 4px;
  background: linear-gradient(90deg,
    transparent 3%, #0D6674 25%, #E8B07A 50%, #0D6674 75%, transparent 97%
  );
}
/* Dot-grid texture */
.te-dots-bg {
  position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(circle, rgba(13,102,116,0.07) 1px, transparent 1px);
  background-size: 28px 28px;
}
/* Soft teal wash top */
.te-wash {
  position: absolute; top: 0; left: 0; right: 0; height: 320px;
  background: linear-gradient(180deg, rgba(13,102,116,0.05) 0%, transparent 100%);
  pointer-events: none;
}
/* Teal glow left */
.te-blob-l {
  position: absolute; width: 420px; height: 420px; border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(13,102,116,0.08) 0%, transparent 70%);
  top: -80px; left: -160px; filter: blur(50px);
}
/* Amber glow right */
.te-blob-r {
  position: absolute; width: 380px; height: 380px; border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(232,176,122,0.12) 0%, transparent 70%);
  bottom: -60px; right: -120px; filter: blur(50px);
}
/* Large shield watermark */
.te-shield-wm {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%,-52%);
  opacity: 0.03; pointer-events: none;
  width: 580px; height: 580px;
}
.te-v2-inner {
  max-width: 1080px; margin: 0 auto;
  padding: 0 28px; position: relative; z-index: 2; text-align: center;
}
/* Eyebrow */
.te-eyebrow-v2 {
  display: inline-flex; align-items: center; gap: 9px;
  background: rgba(13,102,116,0.08);
  border: 1px solid rgba(13,102,116,0.20);
  color: #0D6674;
  font-family: 'Jost', sans-serif;
  font-size: 0.65rem; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase;
  padding: 7px 20px; border-radius: 3px; margin-bottom: 20px;
}
/* Heading */
.te-h2-v2 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 700;
  font-size: clamp(2.1rem, 4.2vw, 3.4rem);
  line-height: 1.1; color: #0A2730;
  margin: 0 0 16px; letter-spacing: -0.01em;
}
.te-h2-v2 em { font-style: italic; color: #0D6674; }
/* Subtitle */
.te-sub-v2 {
  font-family: 'Jost', sans-serif;
  font-weight: 300; font-size: 0.97rem;
  color: #6B8A90; max-width: 460px;
  margin: 0 auto 18px; line-height: 1.75;
}
/* Ornamental divider */
.te-orn-v2 {
  display: flex; align-items: center; justify-content: center;
  gap: 12px; margin: 0 auto 68px;
}
.te-orn-line-v2 {
  height: 1px; width: 60px;
  background: linear-gradient(90deg, transparent, rgba(13,102,116,0.35));
}
.te-orn-line-v2.r { background: linear-gradient(270deg, transparent, rgba(13,102,116,0.35)); }
.te-orn-dia-v2 { width: 7px; height: 7px; background: #E8B07A; transform: rotate(45deg); }
.te-orn-dot-v2 { width: 4px; height: 4px; background: #0D6674; border-radius: 50%; opacity: 0.5; }

/* 3D Stage */
.te-persp-v2 { perspective: 1100px; perspective-origin: 50% 46%; width: 100%; }
.te-stage-v2 {
  position: relative; height: 400px;
  transform-style: preserve-3d;
  display: flex; align-items: center; justify-content: center;
}
.te-card-pos-v2 { position: absolute; width: 500px; max-width: 88vw; }

/* Card */
.te-card-v2 {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(13,102,116,0.12);
  border-top: 2px solid var(--te-accent, #0D6674);
  border-radius: 10px;
  padding: 40px 38px 34px;
  box-shadow:
    0 4px 6px rgba(13,102,116,0.06),
    0 20px 60px rgba(13,102,116,0.10),
    0 40px 80px rgba(0,0,0,0.05);
  overflow: hidden;
}
/* Left accent bar */
.te-card-v2::before {
  content: '';
  position: absolute; left: 0; top: 14%; bottom: 14%;
  width: 3px; border-radius: 0 2px 2px 0;
  background: var(--te-accent, #0D6674); opacity: 0.6;
}
/* Subtle teal wash inside */
.te-card-v2::after {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 80px;
  background: linear-gradient(180deg, rgba(13,102,116,0.025) 0%, transparent 100%);
  pointer-events: none;
}
/* Card corner shield */
.te-card-shield-v2 {
  position: absolute; bottom: -12px; right: -8px;
  pointer-events: none; opacity: 0.05;
}
/* Large quote mark */
.te-qmark-v2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 5.5rem; line-height: 0.7;
  color: var(--te-accent, #0D6674);
  opacity: 0.10; display: block; text-align: left;
  font-style: italic; user-select: none; margin-bottom: -8px;
}
/* Quote text */
.te-q-v2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.12rem; font-weight: 500;
  font-style: italic; line-height: 1.82;
  color: #2D4A52; margin: 0 0 26px; position: relative; z-index: 1;
}
/* Profile strip */
.te-profile-v2 {
  display: flex; align-items: center; gap: 15px;
  border-top: 1px solid rgba(13,102,116,0.10);
  padding-top: 20px; position: relative; z-index: 1;
}
.te-av-wrap-v2 { position: relative; flex-shrink: 0; }
.te-av-v2 {
  width: 52px; height: 52px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.18rem; font-weight: 700;
  color: #fff; position: relative; z-index: 1;
  box-shadow: 0 4px 14px rgba(0,0,0,0.18);
}
/* Rotating dashed ring */
.te-ring-v2 {
  position: absolute; inset: -5px; border-radius: 50%;
  border: 1.5px dashed var(--te-ring); opacity: 0.50;
  animation: ringRot 14s linear infinite;
}
/* Tag */
.te-tag-v2 {
  position: absolute; bottom: -3px; right: -10px;
  font-family: 'Jost', sans-serif;
  font-size: 0.48rem; font-weight: 700;
  letter-spacing: 0.13em; text-transform: uppercase;
  padding: 2px 6px; border-radius: 2px; color: #fff; z-index: 2;
}
.te-name-v2 {
  font-family: 'Jost', sans-serif;
  font-weight: 600; font-size: 0.96rem; color: #0A2730;
  letter-spacing: 0.02em;
}
.te-role-v2 {
  font-family: 'Jost', sans-serif;
  font-weight: 300; font-size: 0.74rem;
  color: #6B8A90; margin-top: 3px; letter-spacing: 0.03em;
}
/* Dots */
.te-dots-v2 {
  display: flex; align-items: center; justify-content: center;
  gap: 10px; margin-top: 56px;
}
.te-dot-v2 {
  height: 6px; border-radius: 100px;
  background: rgba(13,102,116,0.18);
  transition: all 0.42s cubic-bezier(0.34,1.3,0.64,1);
  cursor: pointer; width: 6px;
}
.te-dot-v2.on { width: 30px; background: #0D6674; }
/* Since badge */
.te-since-v2 {
  display: inline-flex; align-items: center; gap: 8px;
  margin-top: 38px;
  font-family: 'Jost', sans-serif;
  font-size: 0.67rem; font-weight: 500;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(13,102,116,0.42);
}
.te-since-line-v2 { height: 1px; width: 36px; background: rgba(13,102,116,0.22); }
/* Floating glyphs */
.te-glyph-v2 {
  position: absolute; color: #0D6674; opacity: 0.04;
  user-select: none; pointer-events: none;
  animation: glf ease-in-out infinite alternate;
  font-family: 'Cormorant Garamond', serif;
}

@media (max-width: 700px) {
  .te-card-pos-v2 { width: 320px; }
  .te-stage-v2 { height: 520px; }
  .te-card-v2 { padding: 30px 22px 26px; }
  .te-q-v2 { font-size: 1rem; }
}

/* ── CTA ── */
.cta-sec{padding:6rem 1.25rem;background:var(--td);text-align:center;position:relative;overflow:hidden;}
.cta-sec::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(232,185,122,.14) 0%,transparent 70%);}
.cta-sec h2{color:var(--w);font-size:clamp(1.8rem,3vw,2.5rem);margin-bottom:1rem;}
.cta-sec p{color:rgba(255,255,255,.65);max-width:520px;margin:0 auto 2.5rem;}
.cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
.btn-g{background:var(--g);color:var(--td);padding:.9rem 2.6rem;border-radius:3rem;font-weight:700;font-size:.95rem;text-decoration:none;transition:background .3s,transform .2s;letter-spacing:.04em;}
.btn-g:hover{background:var(--gb);transform:translateY(-2px);}
.btn-o{border:2px solid rgba(255,255,255,.35);color:var(--w);padding:.9rem 2.6rem;border-radius:3rem;font-weight:600;font-size:.95rem;text-decoration:none;transition:border-color .3s,background .3s,transform .2s;}
.btn-o:hover{border-color:var(--g);background:rgba(232,185,122,.1);transform:translateY(-2px);}
`;

// ═══════════════════════════════════════════════════════════════════════════
//  TESTIMONIAL DATA
// ═══════════════════════════════════════════════════════════════════════════
const TESTIMONIALS = [
  {
    q: "My daughter has blossomed completely since joining SRPS. The teachers here don't just teach — they genuinely care. Her confidence, curiosity, and results have all improved remarkably.",
    nm: "Mrs. Priya Sharma",
    rl: "Parent · Class IX",
    initials: "PS",
    grad: "linear-gradient(135deg,#C8864A,#F5CFA0)",
    ring: "#E8B07A",
    accent: "#C8864A",
    tag: "Parent",
    tagBg: "linear-gradient(135deg,#C8864A,#E8B07A)",
  },
  {
    q: "I passed Class XII from SRPS and went on to study Engineering at NIT Kurukshetra. The foundation built here in Science and Maths was exceptional. I owe my career to this school.",
    nm: "Rahul Verma",
    rl: "Alumni, Batch 2020 · NIT Kurukshetra",
    initials: "RV",
    grad: "linear-gradient(135deg,#0D6674,#2AABB8)",
    ring: "#2AABB8",
    accent: "#0D6674",
    tag: "Alumni",
    tagBg: "linear-gradient(135deg,#0D6674,#2AABB8)",
  },
  {
    q: "The co-curricular exposure at SRPS is unmatched in the district. My son won a State Kabaddi medal and still maintained 90% in boards. That balance is rare and truly commendable.",
    nm: "Mr. Ajay Chauhan",
    rl: "Parent · Class XII",
    initials: "AC",
    grad: "linear-gradient(135deg,#C8864A,#F5CFA0)",
    ring: "#E8B07A",
    accent: "#C8864A",
    tag: "Parent",
    tagBg: "linear-gradient(135deg,#C8864A,#E8B07A)",
  },
  {
    q: "The school's discipline, clean campus, and dedicated faculty made my years here unforgettable. The values instilled here guide every decision I make even today as a professional.",
    nm: "Pooja Agarwal",
    rl: "Alumni, Batch 2019 · MBA, Delhi",
    initials: "PA",
    grad: "linear-gradient(135deg,#0D6674,#2AABB8)",
    ring: "#2AABB8",
    accent: "#0D6674",
    tag: "Alumni",
    tagBg: "linear-gradient(135deg,#0D6674,#2AABB8)",
  },
  {
    q: "SRPS gave me more than education — it gave me character. The mentors pushed us beyond textbooks, and the friendships formed here will last a lifetime. Best decision of my life.",
    nm: "Arjun Sinha",
    rl: "Alumni, Batch 2021 · IIT Delhi",
    initials: "AS",
    grad: "linear-gradient(135deg,#C8864A,#E8B07A)",
    ring: "#E8B07A",
    accent: "#C8864A",
    tag: "Alumni",
    tagBg: "linear-gradient(135deg,#0D6674,#2AABB8)",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
//  TESTIMONIALS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [isAuto, setIsAuto] = useState(true);
  const total = TESTIMONIALS.length;

  const goTo = (idx) => setCurrent((idx + total) % total);

  useEffect(() => {
    if (!isAuto) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % total), 4500);
    return () => clearInterval(t);
  }, [isAuto, total]);

  const getOffset = (idx) => {
    let o = idx - current;
    if (o > total / 2) o -= total;
    if (o < -total / 2) o += total;
    return o;
  };

  const cardTransform = (off) => {
    const abs = Math.abs(off);
    const sign = Math.sign(off);
    return {
      transform: `translateX(${sign * (abs === 1 ? 308 : abs === 2 ? 565 : 0)}px) translateZ(${-abs * 115}px) rotateY(${sign * abs * 13}deg) scale(${1 - abs * 0.115})`,
      opacity: abs === 0 ? 1 : abs === 1 ? 0.55 : 0.18,
      zIndex: 10 - abs,
      filter: abs > 1 ? `blur(${abs * 1.8}px)` : "none",
      transition: "all 0.72s cubic-bezier(0.34,1.15,0.64,1)",
      cursor: abs === 0 ? "default" : "pointer",
    };
  };

  const Stars = ({ color }) => (
    <div style={{ display: "flex", gap: "3px", marginBottom: "12px" }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );

  return (
    <section
      className="te-sec-v2"
      onMouseEnter={() => setIsAuto(false)}
      onMouseLeave={() => setIsAuto(true)}
    >
      <div className="te-dots-bg" />
      <div className="te-wash" />
      <div className="te-blob-l" />
      <div className="te-blob-r" />

      {/* Shield watermark */}
      <svg className="te-shield-wm" viewBox="0 0 200 220" fill="none">
        <path d="M100 8L180 38L180 110C180 158 142 194 100 212C58 194 20 158 20 110L20 38Z"
          stroke="#0D6674" strokeWidth="3" fill="none" />
        <path d="M100 22L168 48L168 112C168 153 134 186 100 202C66 186 32 153 32 112L32 48Z"
          stroke="#0D6674" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M100 72C100 72 118 90 118 105C118 117 110 127 100 130C90 127 82 117 82 105C82 90 100 72 100 72Z"
          fill="#E8B07A" opacity="0.7" />
      </svg>

      {/* Floating glyphs */}
      {["✦", "◈", "❧", "✧"].map((g, i) => (
        <span key={i} className="te-glyph-v2" style={{
          fontSize: `${2.2 + i * 0.5}rem`,
          top: `${14 + i * 16}%`,
          ...(i % 2 === 0 ? { right: `${5 + i * 2}%` } : { left: `${4 + i * 2}%` }),
          "--gr": `${i * 20}deg`,
          animationDuration: `${4 + i * 0.8}s`,
          animationDelay: `${i * 0.5}s`,
        }}>{g}</span>
      ))}

      <div className="te-v2-inner">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <div className="te-eyebrow-v2">
            {/* Flame icon */}
            <svg width="12" height="16" viewBox="0 0 40 50" fill="none">
              <path d="M20 4C20 4 32 16 32 28C32 36 26 44 20 46C14 44 8 36 8 28C8 16 20 4 20 4Z" fill="#0D6674" />
              <path d="M20 20C20 20 27 27 27 33C27 38 24 42 20 43C16 42 13 38 13 33C13 27 20 20 20 20Z" fill="rgba(255,255,255,0.5)" />
            </svg>
            Voices of Our Community
          </div>

          <h2 className="te-h2-v2">
            What <em>Parents &amp; Alumni</em> Say
          </h2>
          <p className="te-sub-v2">
            The true measure of a school lies in the lives it transforms —&nbsp;
            and the stories that speak for themselves.
          </p>

          {/* Ornamental divider with book icon */}
          <div className="te-orn-v2">
            <div className="te-orn-dot-v2" />
            <div className="te-orn-line-v2" />
            <div className="te-orn-dia-v2" />
            {/* Book icon */}
            <svg width="22" height="16" viewBox="0 0 44 32" fill="none">
              <path d="M22 4C17 4 4 7 4 7L4 28C4 28 14 25 22 25Z" fill="#E8B07A" opacity="0.85" />
              <path d="M22 4C27 4 40 7 40 7L40 28C40 28 30 25 22 25Z" fill="#0D6674" opacity="0.75" />
              <line x1="22" y1="4" x2="22" y2="25" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
            </svg>
            <div className="te-orn-dia-v2" />
            <div className="te-orn-line-v2 r" />
            <div className="te-orn-dot-v2" />
          </div>
        </motion.div>

        {/* 3D Carousel */}
        <div className="te-persp-v2">
          <div className="te-stage-v2">
            {TESTIMONIALS.map((item, idx) => {
              const off = getOffset(idx);
              if (Math.abs(off) > 2) return null;
              const isCenter = off === 0;
              return (
                <div
                  key={idx}
                  className="te-card-pos-v2"
                  style={cardTransform(off)}
                  onClick={() => !isCenter && goTo(idx)}
                >
                  <div className="te-card-v2" style={{ "--te-accent": item.accent }}>
                    {/* Corner shield */}
                    <svg className="te-card-shield-v2" width="80" height="90"
                      viewBox="0 0 200 220" fill="none">
                      <path d="M100 8L180 38L180 110C180 158 142 194 100 212C58 194 20 158 20 110L20 38Z"
                        stroke="#0D6674" strokeWidth="5" fill="none" />
                    </svg>

                    <span className="te-qmark-v2">"</span>
                    <Stars color={item.accent} />
                    <p className="te-q-v2">"{item.q}"</p>

                    <div className="te-profile-v2">
                      <div className="te-av-wrap-v2">
                        <div className="te-av-v2" style={{ background: item.grad }}>
                          {item.initials}
                        </div>
                        <div className="te-ring-v2" style={{ "--te-ring": item.ring }} />
                        <span className="te-tag-v2" style={{ background: item.tagBg }}>
                          {item.tag}
                        </span>
                      </div>
                      <div>
                        <div className="te-name-v2">{item.nm}</div>
                        <div className="te-role-v2">{item.rl}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots only — no arrows */}
        <div className="te-dots-v2">
          {TESTIMONIALS.map((_, i) => (
            <div
              key={i}
              className={`te-dot-v2${i === current ? " on" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* Since 2012 badge */}
        <div style={{ textAlign: "center" }}>
          <div className="te-since-v2">
            <div className="te-since-line-v2" />
            Established Since 2012
            <div className="te-since-line-v2" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  ORBIT DATA
// ═══════════════════════════════════════════════════════════════════════════
const ACADEMIC = [
  { id:0, emoji:"🌱", label:"Nursery – KG", badge:"Pre-Primary", color:"#1B8A9A", glow:"rgba(27,138,154,.55)", tags:["Activity Based","Bilingual","Montessori"], detail:"Play-based learning, phonics, early numeracy, and social skills through structured yet joyful activities. Our Montessori-trained educators build a lifelong love for learning in a safe, colourful environment." },
  { id:1, emoji:"📚", label:"Class I – V", badge:"Primary", color:"#C9943A", glow:"rgba(201,148,58,.55)", tags:["English Medium","Maths & Science","Arts & Crafts"], detail:"Core subjects with emphasis on conceptual understanding, reading habits, and co-curricular participation. Small class sizes ensure every child receives individual attention from our experienced faculty." },
  { id:2, emoji:"🔬", label:"Class VI – VIII", badge:"Middle School", color:"#2a8a60", glow:"rgba(42,138,96,.55)", tags:["NCERT","Lab Work","Projects"], detail:"Deepened exploration of Sciences, Social Studies, and Languages with project-based learning, lab experiments, and leadership opportunities." },
  { id:3, emoji:"🏅", label:"Class IX – X", badge:"Secondary", color:"#134F5C", glow:"rgba(19,79,92,.5)", tags:["CBSE Board","Mock Tests","Counselling"], detail:"Comprehensive CBSE board preparation with periodic mock tests, doubt-clearing sessions, and dedicated career counselling workshops." },
  { id:4, emoji:"⚗️", label:"Science XI–XII", badge:"Science Stream", color:"#1B6B7A", glow:"rgba(27,107,122,.55)", tags:["PCM / PCB","NEET & JEE","Lab Hours"], detail:"Physics, Chemistry, Biology/Maths with dedicated lab hours, expert faculty, and focused NEET, JEE, and CUET coaching." },
  { id:5, emoji:"💼", label:"Commerce XI–XII", badge:"Commerce Stream", color:"#7B6FD4", glow:"rgba(123,111,212,.5)", tags:["Accounts","Economics","Business Studies"], detail:"Accountancy, Business Studies, Economics, and Informatics Practices preparing students for CA Foundation, MBA entrances, and careers in banking and finance." },
];

const COCURR = [
  { id:0, emoji:"⚽", label:"Sports & Athletics", color:"#1B8A9A", glow:"rgba(27,138,154,.55)", tags:["Football","Cricket","Kabaddi","Yoga"], detail:"State-of-the-art sports ground with trained coaches. Our teams have won District-Level championships two consecutive years." },
  { id:1, emoji:"🎵", label:"Music & Dance", color:"#C9943A", glow:"rgba(201,148,58,.55)", tags:["Classical","Folk","Western","Instrumental"], detail:"Classical Indian music, western instruments, folk and contemporary dance taught by expert visiting faculty." },
  { id:2, emoji:"🎨", label:"Visual Arts", color:"#2a8a60", glow:"rgba(42,138,96,.55)", tags:["Drawing","Painting","Craft","Sculpture"], detail:"Drawing, painting, craft, and sculpture workshops guided by professional artists." },
  { id:3, emoji:"🤖", label:"Coding & Robotics", color:"#134F5C", glow:"rgba(19,79,92,.5)", tags:["Python","Scratch","STEM Kits","Class VI+"], detail:"Python, Scratch, and hands-on STEM robotics kits from Class VI onwards." },
  { id:4, emoji:"🎤", label:"Debate & Elocution", color:"#1B6B7A", glow:"rgba(27,107,122,.55)", tags:["Public Speaking","MUNs","Inter-School"], detail:"Public speaking, Model UN conferences, and inter-school debate competitions." },
  { id:5, emoji:"🎖️", label:"NCC & Scouts", color:"#7B6FD4", glow:"rgba(123,111,212,.5)", tags:["Discipline","Leadership","Community Service"], detail:"NCC and Scout & Guide units build discipline, patriotism, and community service." },
  { id:6, emoji:"🧪", label:"Science Club", color:"#C9943A", glow:"rgba(201,148,58,.55)", tags:["Experiments","Olympiads","Science Fairs"], detail:"Weekly experiments, national science olympiad coaching, and science fair participation." },
  { id:7, emoji:"🚌", label:"Educational Tours", color:"#2a8a60", glow:"rgba(42,138,96,.55)", tags:["History","Science","Culture"], detail:"Annual educational trips to historical monuments, science museums, and cultural heritage sites." },
];

// ═══════════════════════════════════════════════════════════════════════════
//  PLANET
// ═══════════════════════════════════════════════════════════════════════════
function Planet({ item, angle, radius, isActive, onClick }) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius * 0.38;
  const zDepth = Math.sin(rad);
  const baseScale = 0.68 + (zDepth + 1) * 0.19;
  const zIndex = isActive ? 300 : Math.round((zDepth + 1) * 50) + 1;
  return (
    <motion.div onClick={onClick} style={{ position:"absolute", left:"50%", top:"50%", x:x-40, y:y-40, zIndex, cursor:"pointer" }}
      animate={{ scale: isActive ? 1.32 : baseScale }}
      transition={{ duration:0.35, type:"spring", damping:18 }}
      whileHover={{ scale: baseScale * 1.15 }}>
      <div style={{ position:"absolute", inset:-10, borderRadius:"50%", background:`radial-gradient(circle, ${item.glow} 0%, transparent 70%)`, opacity:isActive?1:0.65, transition:"opacity .3s", pointerEvents:"none" }} />
      <div style={{ width:80, height:80, borderRadius:"50%", background:`radial-gradient(circle at 34% 28%, ${item.color}ff, ${item.color}60)`, border:`3px solid ${isActive?"rgba(255,255,255,.85)":item.color+"bb"}`, boxShadow:isActive?`0 0 30px ${item.glow}, 0 0 60px ${item.glow}, inset 0 -8px 20px rgba(0,0,0,.18)`:`0 0 14px ${item.glow}, inset 0 -6px 16px rgba(0,0,0,.12)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.75rem", position:"relative", transition:"box-shadow .3s, border .3s" }}>
        {item.emoji}
        <div style={{ position:"absolute", top:10, left:13, width:16, height:10, borderRadius:"50%", background:"rgba(255,255,255,.42)", filter:"blur(2px)", pointerEvents:"none" }} />
      </div>
      <div style={{ position:"absolute", top:"calc(100% + 7px)", left:"50%", transform:"translateX(-50%)", whiteSpace:"nowrap", background:"rgba(19,79,92,.85)", backdropFilter:"blur(8px)", color:"#fff", fontSize:".64rem", fontWeight:700, padding:"3px 10px", borderRadius:"2rem", border:`1px solid ${item.color}55`, letterSpacing:".04em", pointerEvents:"none" }}>
        {item.label}
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  ORBIT SCENE
// ═══════════════════════════════════════════════════════════════════════════
function OrbitScene({ items, title, subtitle, centerEmoji, centerColor, accentColor, hint }) {
  const count = items.length;
  const [angles, setAngles] = useState(items.map((_, i) => (360 / count) * i));
  const [active, setActive] = useState(null);
  const speedRef = useRef(0.014);
  const rafRef = useRef(null);
  const lastRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const handleMouse = (e) => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (e.clientY < rect.top - 200 || e.clientY > rect.bottom + 200) return;
      const cx = rect.left + rect.width / 2;
      speedRef.current = ((e.clientX - cx) / (rect.width / 2)) * 0.042;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    if (active !== null) return;
    const tick = (ts) => {
      if (lastRef.current === null) lastRef.current = ts;
      const dt = Math.min(ts - lastRef.current, 50);
      lastRef.current = ts;
      setAngles((prev) => prev.map((a) => (a + speedRef.current * dt + 360) % 360));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafRef.current); lastRef.current = null; };
  }, [active]);

  const handleClick = (idx) => setActive(active === idx ? null : idx);
  const RADIUS = 265;
  const activeItem = active !== null ? items[active] : null;

  return (
    <div style={{ position:"relative" }}>
      <div style={{ textAlign:"center", marginBottom:".75rem" }}>
        <span style={{ display:"inline-flex", alignItems:"center", gap:".5rem", fontSize:".68rem", fontWeight:700, letterSpacing:".14em", textTransform:"uppercase", color:accentColor, marginBottom:".55rem" }}>
          <span style={{ display:"inline-block", width:20, height:2, background:accentColor, borderRadius:2 }} />
          {subtitle}
        </span>
        <h2 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(1.9rem,3.5vw,2.7rem)", color:"#0f3640", margin:"0 0 .35rem", lineHeight:1.1 }}>{title}</h2>
        <p style={{ color:"#6b8f96", fontSize:".78rem", margin:"0 auto", maxWidth:480 }}>{hint || "🖱 Mouse को left/right ले जाएं — orbit उसी दिशा में घूमेगा · Planet tap करें details देखने के लिए"}</p>
      </div>
      <div ref={stageRef} style={{ position:"relative", width:"100%", height:510, display:"flex", alignItems:"center", justifyContent:"center" }}>
        {[0, 38, 74].map((extra, i) => (
          <div key={i} style={{ position:"absolute", width:RADIUS*2+extra, height:(RADIUS*2+extra)*0.38, border:`1px ${i===0?"dashed":"solid"} ${i===0?"rgba(19,79,92,.2)":"rgba(19,79,92,.06)"}`, borderRadius:"50%", pointerEvents:"none" }} />
        ))}
        <div style={{ position:"absolute", zIndex:100, width:108, height:108, borderRadius:"50%", background:`radial-gradient(circle at 36% 30%, ${centerColor}ff, ${centerColor}77)`, boxShadow:`0 0 44px ${centerColor}99, 0 0 88px ${centerColor}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2.8rem", border:"3px solid rgba(255,255,255,.55)" }}>
          {centerEmoji}
          {[0,1,2].map((i) => (
            <div key={i} style={{ position:"absolute", width:108+30+i*18, height:108+30+i*18, borderRadius:"50%", border:`1.5px solid ${centerColor}${["1e","12","08"][i]}`, top:"50%", left:"50%", transform:"translate(-50%,-50%)", animation:`pulse-ring ${1.9+i*0.5}s ease-in-out infinite`, animationDelay:`${i*0.28}s` }} />
          ))}
        </div>
        {items.map((item, idx) => (
          <Planet key={item.id} item={item} angle={angles[idx]} radius={RADIUS} isActive={active===idx} onClick={() => handleClick(idx)} />
        ))}
      </div>
      <AnimatePresence>
        {activeItem && (
          <motion.div key={activeItem.id} initial={{ opacity:0, y:32, scale:0.92 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:20, scale:0.95 }} transition={{ duration:0.4, type:"spring", damping:18 }}
            style={{ maxWidth:680, margin:"0 auto", background:"rgba(255,255,255,0.94)", border:`2px solid ${activeItem.color}44`, borderRadius:"1.4rem", padding:"2.2rem", backdropFilter:"blur(20px)", boxShadow:`0 24px 80px ${activeItem.glow}, 0 2px 0 rgba(255,255,255,.9) inset`, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-60, right:-60, width:180, height:180, borderRadius:"50%", background:`radial-gradient(circle, ${activeItem.glow} 0%, transparent 70%)`, opacity:0.22, pointerEvents:"none" }} />
            <div style={{ display:"flex", alignItems:"flex-start", gap:"1.4rem" }}>
              <div style={{ width:66, height:66, borderRadius:"50%", flexShrink:0, background:`radial-gradient(circle at 34% 28%, ${activeItem.color}, ${activeItem.color}66)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.85rem", boxShadow:`0 0 24px ${activeItem.glow}`, border:`2px solid ${activeItem.color}` }}>{activeItem.emoji}</div>
              <div style={{ flex:1 }}>
                <span style={{ display:"inline-block", background:`${activeItem.color}15`, color:activeItem.color, fontSize:".62rem", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", padding:".2rem .72rem", borderRadius:"1rem", border:`1px solid ${activeItem.color}33`, marginBottom:".45rem" }}>{activeItem.badge || activeItem.label}</span>
                <h3 style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"1.6rem", color:"#0f3640", margin:"0 0 .65rem" }}>{activeItem.label}</h3>
                <p style={{ color:"#4a6e77", lineHeight:1.82, fontSize:".93rem", marginBottom:"1rem" }}>{activeItem.detail}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:".4rem" }}>
                  {activeItem.tags.map((t) => (
                    <span key={t} style={{ background:`${activeItem.color}10`, color:activeItem.color, border:`1px solid ${activeItem.color}30`, fontSize:".72rem", fontWeight:600, padding:".28rem .88rem", borderRadius:"2rem", letterSpacing:".05em" }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => setActive(null)} style={{ position:"absolute", top:"1rem", right:"1rem", background:"rgba(19,79,92,.08)", border:"1px solid rgba(19,79,92,.18)", color:"#134F5C", width:30, height:30, borderRadius:"50%", cursor:"pointer", fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
          </motion.div>
        )}
      </AnimatePresence>
      {!activeItem && <div style={{ textAlign:"center", marginTop:"1.2rem", color:"rgba(19,79,92,.28)", fontSize:".7rem", letterSpacing:".1em" }}>● ● ● किसी भी Planet को tap करें ● ● ●</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════════════════
const fu = { hidden:{ opacity:0, y:32 }, visible:{ opacity:1, y:0 } };
function useA() {
  const [ref, inView] = useInView({ threshold:0.12, triggerOnce:true });
  return [ref, inView];
}
const Stars5 = () => (
  <div style={{ color:"#E8B97A", display:"flex", gap:".2rem", marginBottom:"1rem" }}>
    {[...Array(5)].map((_,i) => <FaStar key={i} />)}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
//  MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════
export default function AboutPage() {
  const [r1, v1] = useA(), [r2, v2] = useA();

  return (
    <>
      <style>{css}</style>
      <div className="ar">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-ring" style={{ width:500, height:500, top:-200, right:-150 }} />
          <div className="hero-ring" style={{ width:300, height:300, bottom:40, left:-80 }} />
          <motion.div initial={{ opacity:0, y:44 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, ease:"easeOut" }} style={{ position:"relative", zIndex:1 }}>
            <span className="hero-badge">Est. 2012 · CBSE Affiliated</span>
            <h1>About <span>Shree Ram</span><br />Public School</h1>
            <p>Nurturing young minds, shaping future leaders with values, excellence, and purpose.</p>
          </motion.div>
          <div className="hero-arc" />
        </section>

        {/* ── 1. HISTORY ── */}
        <section className="sec h-sec">
          <div className="inner r2" ref={r1}>
            <motion.div className="h-text" variants={fu} initial="hidden" animate={v1?"visible":"hidden"} transition={{ duration:0.65 }}>
              <span className="chip"><FaHistory /> Our History</span>
              <h2 className="sec-h">A Decade of Transformative Education</h2>
              <p>Founded in 2012 by a collective of passionate educationists, Shree Ram Public School was born from a singular belief — that every child in rural Haryana deserves world-class education. What began with 50 students and 5 teachers has grown into one of the region's most respected institutions.</p>
              <p>Spread across a lush 2-acre campus in Kanhra, Muzaffarnagar, we today serve 1,000+ students from Nursery through Class XII. Our CBSE affiliation (No. 531526) ensures students are equipped for national-level competitive examinations and higher education.</p>
              <p>Over 13 years we have invested in modern smart classrooms, trained faculty, an enriched STEM curriculum, and vibrant co-curricular life — while preserving the discipline, values, and community spirit that define us.</p>
              <div className="stats">
                {[["1000","+","Students"],["70","+","Staff Members"],["13","+","Years"],["98","%","Board Pass"]].map(([n,s,l]) => (
                  <div key={l}><div className="s-n">{n}<em>{s}</em></div><div className="s-l">{l}</div></div>
                ))}
              </div>
            </motion.div>
            <motion.div className="img-frame" variants={fu} initial="hidden" animate={v1?"visible":"hidden"} transition={{ duration:0.65, delay:0.22 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/Woodward_High_School_%28Toledo%2C_Ohio%29%2C_January_2021.jpg" alt="School campus" />
            </motion.div>
          </div>
        </section>

        {/* ── 2. MISSION · VISION · VALUES ── */}
        <section className="sec f-sec">
          <div className="inner center" ref={r2}>
            <span className="chip">What We Stand For</span>
            <h2 className="sec-h">Our Foundation</h2>
            <span className="sec-sub" style={{ margin:"0 auto .5rem" }}>Three pillars that guide every decision, every lesson, and every interaction at Shree Ram Public School.</span>
            <div className="fgrid">
              {[
                { ic:<FaBullseye />, cls:"t", title:"Our Mission", desc:"To provide holistic, student-centric education that cultivates academic excellence, creative thinking, and ethical character — preparing well-rounded individuals capable of contributing meaningfully to an ever-changing world." },
                { ic:<FaEye />, cls:"g", title:"Our Vision", desc:"To be the most trusted centre of learning in rural Haryana — a school where every child's unique potential is discovered, nurtured, and celebrated, and where the spirit of curiosity never fades." },
                { ic:<FaHeart />, cls:"gr", title:"Core Values", desc:"Integrity · Compassion · Excellence · Respect · Innovation. These five values are not slogans on a wall — they are lived daily in our classrooms, corridors, and community service initiatives." },
              ].map((item, idx) => (
                <motion.div key={idx} className="fc" variants={fu} initial="hidden" animate={v2?"visible":"hidden"} transition={{ duration:0.5, delay:idx*0.18 }}>
                  <div className={`fic ${item.cls}`}>{item.ic}</div>
                  <h3>{item.title}</h3><p>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. ORBIT SECTIONS ── */}
        <section className="orbit-sec-academic" style={{ padding:0, background:"none" }}>
          <div className="orbit-blob" style={{ width:380, height:380, background:"rgba(27,107,122,.07)", top:-140, right:"55%", animationDelay:"0s", zIndex:0 }} />
          <div className="orbit-blob" style={{ width:260, height:260, background:"rgba(232,185,122,.1)", bottom:-80, left:"5%", animationDelay:"3s", zIndex:0 }} />
          <div className="orbit-blob" style={{ width:320, height:320, background:"rgba(42,138,96,.08)", top:-100, left:"55%", animationDelay:"1.5s", zIndex:0 }} />
          <div className="orbit-blob" style={{ width:240, height:240, background:"rgba(27,107,122,.08)", bottom:-60, right:"5%", animationDelay:"4s", zIndex:0 }} />
          <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", padding:"5.5rem 1.25rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"start" }}>
              <div style={{ minWidth:0 }}>
                <OrbitScene items={ACADEMIC} title="Curriculum & Streams" subtitle="Academic Programs" centerEmoji="🏫" centerColor="#E8B97A" accentColor="#C9943A" />
              </div>
              <div style={{ minWidth:0 }}>
                <OrbitScene items={COCURR} title="Co-Curricular Activities" subtitle="Beyond the Classroom" centerEmoji="✨" centerColor="#1B6B7A" accentColor="#134F5C" />
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. PRINCIPAL'S MESSAGE ── */}
        <section className="pr-sec">
          <div className="pr-inner">
            <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.75 }} viewport={{ once:true }}>
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Principal" className="pr-img" />
            </motion.div>
            <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }} transition={{ duration:0.75 }} viewport={{ once:true }}>
              <span className="chip pr-chip">From the Desk Of</span>
              <h2 className="sec-h pr-h">Principal's Message</h2>
              <div className="pr-role">Mrs. Sunita Sharma · M.Ed · 22 Years in Education</div>
              <blockquote className="pr-q">"At Shree Ram Public School, education is far more than textbooks and examinations — it is the art of igniting a lifelong love of learning. We believe every child carries a spark of genius, and our responsibility as educators is to fan that flame with encouragement, rigour, and empathy. We are not just preparing students for board exams — we are preparing them for life."</blockquote>
              <div className="pr-sign">— Mrs. Sunita Sharma, Principal, Shree Ram Public School</div>
            </motion.div>
          </div>
        </section>

        {/* ── 5. LEADERSHIP TEAM ── */}
        <section className="sec ld-sec">
          <div className="inner center">
            <span className="chip">The People Behind the School</span>
            <h2 className="sec-h">Our Leadership Team</h2>
            <span className="sec-sub" style={{ margin:"0 auto" }}>Guided by experienced educators and community leaders who share one vision: quality education for every child.</span>
            <div className="lgrid">
              {[
                { name:"Mr. Ramesh Gupta", role:"Chairman", bio:"Veteran educationist with 30+ years. Founded SRPS to bridge the urban-rural education gap in Muzaffarnagar.", img:"https://randomuser.me/api/portraits/men/32.jpg" },
                { name:"Mrs. Anita Agarwal", role:"Vice Chairperson", bio:"Social activist committed to girl-child empowerment and inclusive learning programs across Haryana.", img:"https://randomuser.me/api/portraits/women/44.jpg" },
                { name:"Dr. Vikas Singh", role:"Academic Director", bio:"Ph.D in Education. Oversees curriculum design, faculty development, and academic quality assurance.", img:"https://randomuser.me/api/portraits/men/46.jpg" },
                { name:"Mr. Suresh Kumar", role:"Administrative Head", bio:"Ensures seamless day-to-day operations, infrastructure, student safety, and parent communication.", img:"https://randomuser.me/api/portraits/men/58.jpg" },
              ].map((p, idx) => (
                <motion.div key={idx} className="lc" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:idx*0.15 }} viewport={{ once:true }}>
                  <div className="lw"><img src={p.img} alt={p.name} /></div>
                  <h3>{p.name}</h3>
                  <div className="l-role">{p.role}</div>
                  <p className="l-bio">{p.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. CAMPUS ── */}
        <section className="sec ca-sec">
          <div className="inner center">
            <span className="chip"><FaBuilding /> Infrastructure</span>
            <h2 className="sec-h">Our Campus</h2>
            <span className="sec-sub" style={{ margin:"0 auto" }}>A thoughtfully designed 2-acre campus built to inspire — modern classrooms, equipped labs, a rich library, and open spaces for sport and imagination.</span>
            <div className="cagrid">
              {[
                { l:"Smart Classrooms", s:"Digital boards · AC rooms · HD Projectors", i:"https://images.unsplash.com/photo-1588072432836-e100327ed50e?auto=format&fit=crop&w=800&q=80" },
                { l:"Science Laboratories", s:"Physics, Chemistry & Biology fully equipped", i:"https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80" },
                { l:"Library & Resource Centre", s:"5,000+ books · Periodicals · Digital catalogue", i:"https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80" },
                { l:"Sports Complex", s:"Ground, basketball court & indoor games hall", i:"https://images.unsplash.com/photo-1575361204480-a5d5b7b2a9b1?auto=format&fit=crop&w=800&q=80" },
                { l:"Computer Lab", s:"50 nodes · High-speed internet · Tally & MS Office", i:"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80" },
                { l:"Auditorium & Stage", s:"600-seat hall for events & cultural programmes", i:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" },
              ].map((item, idx) => (
                <motion.div key={idx} className="cac" initial={{ opacity:0, scale:0.93 }} whileInView={{ opacity:1, scale:1 }} transition={{ duration:0.5, delay:idx*0.09 }} viewport={{ once:true }}>
                  <img src={item.i} alt={item.l} />
                  <div className="co"><div className="co-ic"><FaBuilding /></div><h3>{item.l}</h3><p>{item.s}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. ACCREDITATIONS ── */}
        <section className="ar-sec">
          <div className="inner center">
            <span className="chip" style={{ color:"rgba(255,255,255,.5)" }}>Recognition</span>
            <h2 className="sec-h" style={{ color:"#fff" }}>Accreditations & Affiliations</h2>
            <span className="sec-sub" style={{ color:"rgba(255,255,255,.7)", margin:"0 auto 1.5rem" }}>A fully recognised CBSE-affiliated senior secondary school meeting the highest national educational benchmarks.</span>
            <br />
            <span className="acc-pill">Affiliation No. 531526 · School Code: 62614 · Haryana</span>
            <div className="al">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/CBSE_Logo.svg/1200px-CBSE_Logo.svg.png" alt="CBSE" />
              <div className="ad" />
              <img src="https://www.education.gov.in/sites/upload_files/mhrd/files/images/logo_0.png" alt="Ministry of Education" />
            </div>
          </div>
        </section>

        {/* ── 8. ACHIEVEMENTS ── */}
        <section className="sec ach-sec">
          <div className="inner center">
            <span className="chip">Milestones</span>
            <h2 className="sec-h">Awards & Achievements</h2>
            <span className="sec-sub" style={{ margin:"0 auto" }}>Over 13 years, our students and institution have earned recognition at district, state, and national levels.</span>
            <div className="achgrid">
              {[
                { ic:<FaTrophy style={{ color:"#c9943a" }} />, yr:"2023", t:"Best School Award – Haryana", d:"Conferred by the Haryana Education Department for outstanding holistic performance across academics, sports, and community outreach." },
                { ic:<FaAward style={{ color:"#1B6B7A" }} />, yr:"8 Yrs", t:"100% Board Pass Rate", d:"Maintained a perfect pass percentage in CBSE Class X and XII board examinations for eight consecutive years running." },
                { ic:<FaStar style={{ color:"#c9943a" }} />, yr:"2021", t:"Top CBSE Rank – Muzaffarnagar", d:"Two students secured Top 10 CBSE Class XII positions in the district, each scoring above 95% aggregate." },
                { ic:<FaFlask style={{ color:"#1B6B7A" }} />, yr:"2023", t:"National Science Olympiad", d:"Five students qualified for the National Science Olympiad; one advanced to the Grand Final in New Delhi." },
                { ic:<FaUserCheck style={{ color:"#2a8a60" }} />, yr:"2022-23", t:"District Sports Champions", d:"Gold medals in District-Level Football and Athletics; three students represented Muzaffarnagar at State Level." },
                { ic:<FaGraduationCap style={{ color:"#2a8a60" }} />, yr:"Ongoing", t:"100% Placement Guidance", d:"Every graduating batch receives dedicated college counselling, with admissions to IITs, NITs, Delhi University, and top state colleges." },
              ].map((item, idx) => (
                <motion.div key={idx} className="ac" initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:idx*0.1 }} viewport={{ once:true }}>
                  <div className="a-ic">{item.ic}</div>
                  <span className="a-yr">{item.yr}</span>
                  <h3>{item.t}</h3><p>{item.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. TESTIMONIALS ── */}
        <TestimonialsSection />

        {/* ── 10. CTA ── */}
        <section className="cta-sec">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} transition={{ duration:0.7 }} viewport={{ once:true }} style={{ position:"relative", zIndex:1 }}>
            <span className="chip" style={{ justifyContent:"center", color:"rgba(255,255,255,.42)" }}>Join the Family</span>
            <h2>Experience Excellence Firsthand</h2>
            <p>Schedule a campus visit, attend an open day, or reach out to our admissions office — we'd love to welcome your child to Shree Ram Public School.</p>
            <div className="cta-btns">
              <Link to="/contact" className="btn-g">Contact Us</Link>
              <Link to="/admissions" className="btn-o">Enquire Now</Link>
            </div>
          </motion.div>
        </section>

      </div>
    </>
  );
}
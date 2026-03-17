import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

/* ── Image paths ── */
const SLIDES = [
  {
    src: "/School_pic/NCC_Pic_Primnester_29.JPEG",
    caption: "NCC Leadership Camp",
  },
  { src: "/School_pic/IMG_31.JPG", caption: "School Campus" },
  { src: "/School_pic/NCC_Pic_35.JPEG", caption: "Parade Ground" },
  { src: "/School_pic/NCC_Pic_Primenester_30.JPG", caption: "Annual Function" },
  { src: "/School_pic/NCC-Pic_39.JPG", caption: "Sports Day" },
];

/* ── Stats ── */
const STATS = [
  { num: "2,500+", label: "Students" },
  { num: "98%", label: "Board Results" },
  { num: "12+", label: "Years Legacy" },
  { num: "50+", label: "Activities" },
];

export default function Hero() {
  const [idx, setIdx] = useState(0);

  /* Auto-advance */
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "100vh",
        minHeight: "620px",
        fontFamily: "'Outfit','Nunito',sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap');

        /* Slide crossfade */
        .hero-slide {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
        }

        /* Diagonal strip keyframe */
        @keyframes stripSlide {
          0%   { transform: translateX(-110%) skewX(-12deg); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateX(110vw) skewX(-12deg); opacity: 0; }
        }

        /* Entrance animations */
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(32px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity:0; transform: translateX(-28px); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes widthIn {
          from { width:0; opacity:0; }
          to   { width:56px; opacity:1; }
        }

        .anim-up   { animation: fadeUp  0.8s cubic-bezier(.22,1,.36,1) both; }
        .anim-left { animation: fadeLeft 0.7s cubic-bezier(.22,1,.36,1) both; }

        /* Shine on primary button */
        .btn-primary {
          position: relative;
          overflow: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          top: 0; left: -80%;
          width: 60%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          transform: skewX(-20deg);
          transition: left 0.65s ease;
        }
        .btn-primary:hover::after { left: 160%; }

        /* Dot indicators */
        .dot { transition: all 0.35s ease; }
        .dot.active { background: #f59e0b; width: 28px !important; border-radius: 4px; }

        /* Caption tag */
        @keyframes tagIn {
          from { opacity:0; transform:translateY(8px); }
          to   { opacity:1; transform:translateY(0); }
        }

        /* Progress bar on active slide dot */
        @keyframes dotProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      {/* ════════════════════════════════
          BACKGROUND IMAGES — full bleed
      ════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={idx}
            src={SLIDES[idx].src}
            alt={SLIDES[idx].caption}
            className="hero-slide"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* ── Overlay: VERY light — only bottom-left darkening for text legibility ── */}
        {/* Right 50% of image stays near-pristine */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                105deg,
                rgba(5,10,30,0.72) 0%,
                rgba(5,10,30,0.52) 38%,
                rgba(5,10,30,0.10) 62%,
                rgba(5,10,30,0.04) 100%
              )
            `,
          }}
        />
        {/* Very subtle bottom vignette only */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to top, rgba(5,10,30,0.55) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ════════════════════════════════==============================
          DIAGONAL ACCENT STRIP  — sweeps left → right on each slide change ════════════════════════════════ */}
      <AnimatePresence>
        <motion.div
          key={`strip-${idx}`}
          initial={{ x: "-110%", skewX: "-12deg", opacity: 0 }}
          animate={{ x: "110vw", skewX: "-12deg", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.6,
            ease: "easeInOut",
            times: [0, 0.12, 0.88, 1],
          }}
          className="absolute inset-y-0 z-[5] pointer-events-none"
          style={{
            width: "180px",
            background:
              "linear-gradient(90deg, transparent, rgba(245,158,11,0.22), rgba(249,115,22,0.18), transparent)",
          }}
        />
      </AnimatePresence>

      {/* ════════════════════════════════
          LEFT CONTENT PANEL
      ════════════════════════════════ */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-20 max-w-2xl">
        {/* ── HEADING ── */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(2.4rem, 6vw, 4.4rem)",
            fontWeight: "900",
            lineHeight: "1.06",
            color: "#ffffff",
            letterSpacing: "-1px",
            textShadow: "0 2px 24px rgba(0,0,0,0.4)",
          }}
        >
          Shaping{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #fbbf24 10%, #f97316 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              position: "relative",
            }}
          >
            Tomorrow's
            {/* underline squiggle */}
            <svg
              style={{
                position: "absolute",
                bottom: "-6px",
                left: 0,
                width: "100%",
              }}
              viewBox="0 0 240 10"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M2 7 Q60 2 120 7 Q180 12 238 7"
                stroke="#f97316"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.75"
              />
            </svg>
          </span>
          <br />
          Leaders Today.
        </motion.h1>

        {/* ── SUBHEADING ── */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: "20px",
            fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
            color: "rgba(255,255,255,0.88)",
            lineHeight: "1.7",
            maxWidth: "480px",
            fontWeight: "400",
          }}
        >
          Shree Ram Public School — where{" "}
          <span style={{ color: "#fcd34d", fontWeight: "600" }}>
            Atal Tinkering Labs
          </span>
          , world-class sports, and academic excellence meet to build confident
          leaders.
        </motion.p>

        {/* ── BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.7 }}
          style={{
            marginTop: "36px",
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            alignItems: "center",
          }}
        >
          {/* Primary */}
          <Link
            to="/admissions"
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 30px",
              borderRadius: "14px",
              fontWeight: "800",
              fontSize: "15px",
              color: "#0a0f1e",
              background: "linear-gradient(135deg, #fbbf24 0%, #f97316 100%)",
              boxShadow: "0 6px 30px rgba(251,191,36,0.45)",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow =
                "0 10px 40px rgba(251,191,36,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 6px 30px rgba(251,191,36,0.45)";
            }}
          >
            Enroll Your Child
            <ArrowRight size={17} />
          </Link>

          {/* Secondary */}
          <Link
            to="/campus"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "13px 28px",
              borderRadius: "14px",
              fontWeight: "700",
              fontSize: "15px",
              color: "rgba(255,255,255,0.92)",
              background: "rgba(255,255,255,0.08)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(12px)",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.16)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Explore Campus
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>
        </motion.div>

        {/* ── STATS ROW ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.82, duration: 0.8 }}
          style={{
            marginTop: "44px",
            display: "flex",
            flexWrap: "wrap",
            gap: "28px 36px",
          }}
        >
          {STATS.map((s, i) => (
            <div key={i} style={{ position: "relative" }}>
              {i > 0 && (
                <div
                  style={{
                    position: "absolute",
                    left: "-18px",
                    top: "4px",
                    bottom: "4px",
                    width: "1px",
                    background: "rgba(255,255,255,0.15)",
                  }}
                />
              )}
              <p
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: "900",
                  background: "linear-gradient(90deg,#fbbf24,#f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                }}
              >
                {s.num}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "12px",
                  marginTop: "4px",
                  fontWeight: "500",
                  letterSpacing: "0.3px",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ════════════════════════════════
          BOTTOM BAR — slide controls + caption
      ════════════════════════════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{
          padding: "16px 24px 20px",
          background:
            "linear-gradient(to top, rgba(5,10,30,0.75) 0%, transparent 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Slide caption */}
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "999px",
              padding: "5px 14px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#f59e0b",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "12px",
                color: "rgba(255,255,255,0.85)",
                fontWeight: "600",
              }}
            >
              {SLIDES[idx].caption}
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.4)",
                fontWeight: "600",
              }}
            >
              {idx + 1}/{SLIDES.length}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Active slide number (top-right corner) ── */}
      <div
        className="absolute top-6 right-6 z-20"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "4px",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35 }}
            style={{
              fontSize: "32px",
              fontWeight: "900",
              color: "rgba(255,255,255,0.08)",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            0{idx + 1}
          </motion.span>
        </AnimatePresence>
        <div
          style={{
            width: "24px",
            height: "1.5px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "2px",
          }}
        />
        <span
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.3)",
            fontWeight: "600",
          }}
        >
          0{SLIDES.length}
        </span>
      </div>
    </section>
  );
}

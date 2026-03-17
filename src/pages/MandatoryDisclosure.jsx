import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   COLOR SYSTEM — extracted from school logo
   Primary  : Teal   #0d6e7a / #0a5564 / #1a8a98
   Accent   : Gold   #f0b84a / #e8a832 / #ffd280
   Light    : Cream  #fdf6e3 / #fff9f0
   Text     : #1a2e35
═══════════════════════════════════════════════════════════════ */

const T = {
  teal: "#0d6e7a",
  tealDark: "#0a5564",
  tealLight: "#1a8a98",
  tealPale: "#e6f4f6",
  gold: "#f0b84a",
  goldDark: "#c9922a",
  goldLight: "#ffd280",
  goldPale: "#fff8e7",
  cream: "#fdf6e3",
  white: "#ffffff",
  text: "#1a2e35",
  muted: "#5a7a82",
};

/* ─── DATA ─────────────────────────────────────────────────────────────────── */
const generalInfo = [
  { label: "Name of the School", value: "Shree Ram Public School", icon: "🏫" },
  { label: "Affiliation No.", value: "532046", icon: "📋" },
  { label: "School Code", value: "42056", icon: "🔢" },
  {
    label: "Complete Address",
    value: "Kanhra-Badhra, Charkhi Dadri, Haryana — 127308",
    icon: "📍",
  },
  {
    label: "Principal & Qualification",
    value: "Mr. Amit — M.Sc., B.Ed",
    icon: "👨‍🏫",
  },
  { label: "School Email ID", value: "42056@cbseshiksha.in", icon: "📧" },
  {
    label: "Contact Details",
    value: "01252-299999 | 8199991081–84",
    icon: "📞",
  },
];

const documents = [
  "Affiliation / Upgradation Letter & Recent Extension",
  "Society / Trust / Company Registration Certificate",
  "No Objection Certificate (NOC) by State Govt. / UT",
  "Recognition Certificate under RTE Act, 2009",
  "Valid Building Safety Certificate (National Building Code)",
  "Valid Fire Safety Certificate",
  "Self Certification for Affiliation / Upgradation",
  "Mandatory Disclosure Details — SARAS 5.0",
  "Water, Health and Sanitation Certificates",
];

const staffData = [
  { role: "PGT", count: 10, color: T.teal, light: T.tealPale },
  { role: "TGT", count: 6, color: T.gold, light: T.goldPale },
  { role: "PRT", count: 14, color: T.tealLight, light: "#e0f5f7" },
];

const infraStats = [
  {
    label: "Campus Area",
    value: 12145,
    unit: "sq.m",
    icon: "🏛️",
    color: T.teal,
    max: 15000,
  },
  {
    label: "Playground",
    value: 4446,
    unit: "sq.m",
    icon: "⚽",
    color: T.gold,
    max: 6000,
  },
  {
    label: "Classrooms",
    value: 22,
    unit: "rooms",
    icon: "🪑",
    color: T.tealLight,
    max: 30,
  },
  {
    label: "Laboratories",
    value: 6,
    unit: "labs",
    icon: "🔬",
    color: T.goldDark,
    max: 10,
  },
  {
    label: "Girls Toilets",
    value: 6,
    unit: "units",
    icon: "🚺",
    color: "#0a9396",
    max: 10,
  },
  {
    label: "Boys Toilets",
    value: 6,
    unit: "units",
    icon: "🚹",
    color: "#94d2bd",
    max: 10,
  },
];

const resultsX = [
  { year: "2022", registered: 30, passed: 29, pct: 96.7 },
  { year: "2023", registered: 32, passed: 31, pct: 96.9 },
  { year: "2024", registered: 35, passed: 35, pct: 100 },
];
const resultsXII = [
  { year: "2022", registered: 18, passed: 17, pct: 94.4 },
  { year: "2023", registered: 20, passed: 19, pct: 95 },
  { year: "2024", registered: 22, passed: 21, pct: 95.5 },
];

/* ─── ANIMATED DONUT CHART ──────────────────────────────────────────────────── */
function DonutChart({ data, size = 220 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [prog, setProg] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = null;
    const go = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1400, 1);
      setProg(p);
      if (p < 1) requestAnimationFrame(go);
    };
    requestAnimationFrame(go);
  }, [inView]);

  const total = data.reduce((a, d) => a + d.count, 0);
  const cx = size / 2,
    cy = size / 2,
    R = size * 0.4,
    r = size * 0.24;
  let angle = -Math.PI / 2;
  const slices = data.map((d) => {
    const sweep = (d.count / total) * 2 * Math.PI * prog;
    const x1 = cx + R * Math.cos(angle),
      y1 = cy + R * Math.sin(angle);
    const x2 = cx + R * Math.cos(angle + sweep),
      y2 = cy + R * Math.sin(angle + sweep);
    const ix1 = cx + r * Math.cos(angle),
      iy1 = cy + r * Math.sin(angle);
    const ix2 = cx + r * Math.cos(angle + sweep),
      iy2 = cy + r * Math.sin(angle + sweep);
    const lg = sweep > Math.PI ? 1 : 0;
    const path = `M${ix1},${iy1}L${x1},${y1}A${R},${R} 0 ${lg} 1 ${x2},${y2}L${ix2},${iy2}A${r},${r} 0 ${lg} 0 ${ix1},${iy1}Z`;
    angle += sweep;
    return { ...d, path };
  });

  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg width={size} height={size}>
        <circle cx={cx} cy={cy} r={r - 2} fill={T.cream} />
        {slices.map((s, i) => (
          <path
            key={i}
            d={s.path}
            fill={s.color}
            stroke="white"
            strokeWidth="3"
          >
            <title>
              {s.role}: {s.count}
            </title>
          </path>
        ))}
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fontSize="26"
          fontWeight="900"
          fill={T.text}
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fontSize="10"
          fill={T.muted}
          fontWeight="700"
          letterSpacing="2"
        >
          STAFF
        </text>
      </svg>
    </div>
  );
}

/* ─── SEMI-CIRCULAR GAUGE ───────────────────────────────────────────────────── */
function SemiGauge({ value, max, color, size = 110 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [prog, setProg] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = null;
    const go = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1300, 1);
      setProg(p);
      if (p < 1) requestAnimationFrame(go);
    };
    requestAnimationFrame(go);
  }, [inView]);

  const pct = (value / max) * prog;
  const cx = size / 2,
    cy = size * 0.62,
    R = size * 0.38;
  const sa = Math.PI;
  const ea = sa + Math.PI * pct;
  const x1 = cx + R * Math.cos(sa),
    y1 = cy + R * Math.sin(sa);
  const x2 = cx + R * Math.cos(ea),
    y2 = cy + R * Math.sin(ea);
  const tx2 = cx + R * Math.cos(sa + Math.PI),
    ty2 = cy + R * Math.sin(sa + Math.PI);
  const lg = pct > 0.5 ? 1 : 0;

  return (
    <svg
      ref={ref}
      width={size}
      height={size * 0.68}
      viewBox={`0 0 ${size} ${size * 0.68}`}
    >
      <path
        d={`M${x1},${y1}A${R},${R} 0 0 1 ${tx2},${ty2}`}
        fill="none"
        stroke="#e0eaec"
        strokeWidth="9"
        strokeLinecap="round"
      />
      {pct > 0.01 && (
        <path
          d={`M${x1},${y1}A${R},${R} 0 ${lg} 1 ${x2},${y2}`}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
        />
      )}
      <text
        x={cx}
        y={cy + 2}
        textAnchor="middle"
        fontSize="13"
        fontWeight="900"
        fill={T.text}
      >
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

/* ─── ANIMATED PROGRESS BAR ─────────────────────────────────────────────────── */
function AnimBar({ value, max, color, label, unit }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const pct = Math.round((value / max) * 100);
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold" style={{ color: T.text }}>
          {label}
        </span>
        <span className="text-sm font-black" style={{ color }}>
          {value.toLocaleString()}{" "}
          <span className="font-normal text-xs" style={{ color: T.muted }}>
            {unit}
          </span>
        </span>
      </div>
      <div
        className="h-3 rounded-full overflow-hidden"
        style={{ background: "#dde8ea" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p className="text-xs text-right" style={{ color: T.muted }}>
        {pct}% of capacity
      </p>
    </div>
  );
}

/* ─── RESULTS BAR CHART ─────────────────────────────────────────────────────── */
function ResultsChart({ results, fillColor, title, emoji, borderColor }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const maxR = Math.max(...results.map((r) => r.registered));

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl border-2 p-7 shadow-lg"
      style={{ borderColor }}
    >
      <h3
        className="text-lg font-black mb-1 flex items-center gap-2"
        style={{ color: T.text }}
      >
        {emoji} {title}
      </h3>
      <p className="text-xs mb-6" style={{ color: T.muted }}>
        Registered vs Passed — with pass %
      </p>

      {/* bar chart */}
      <div className="flex items-end gap-5 mb-6" style={{ height: "120px" }}>
        {results.map((r, i) => {
          const rH = (r.registered / maxR) * 100;
          const pH = (r.passed / maxR) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs font-black" style={{ color: fillColor }}>
                {r.pct}%
              </span>
              <div
                className="w-full flex gap-1.5 items-end"
                style={{ height: "90px" }}
              >
                <motion.div
                  className="flex-1 rounded-t-xl"
                  style={{ background: "#dde8ea" }}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${rH}%` } : {}}
                  transition={{ duration: 0.9, delay: i * 0.14 }}
                />
                <motion.div
                  className="flex-1 rounded-t-xl"
                  style={{
                    background: `linear-gradient(180deg, ${fillColor}cc 0%, ${fillColor} 100%)`,
                  }}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${pH}%` } : {}}
                  transition={{ duration: 0.9, delay: i * 0.14 + 0.1 }}
                />
              </div>
              <span className="text-xs font-bold" style={{ color: T.muted }}>
                {r.year}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex gap-5 text-xs mb-5" style={{ color: T.muted }}>
        <span className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded inline-block"
            style={{ background: "#dde8ea" }}
          />
          Registered
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded inline-block"
            style={{ background: fillColor }}
          />
          Passed
        </span>
      </div>

      {/* pass rate rows */}
      <div className="space-y-3">
        {results.map((r, i) => (
          <div key={i} className="flex items-center gap-3 text-sm">
            <span className="font-bold w-10" style={{ color: T.text }}>
              {r.year}
            </span>
            <div
              className="flex-1 h-2.5 rounded-full overflow-hidden"
              style={{ background: "#dde8ea" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${fillColor}99, ${fillColor})`,
                }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${r.pct}%` } : {}}
                transition={{ duration: 1.1, delay: 0.45 + i * 0.12 }}
              />
            </div>
            <span
              className="font-black w-14 text-right"
              style={{ color: fillColor }}
            >
              {r.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SECTION HEADER ────────────────────────────────────────────────────────── */
function SectionHeader({ tag, title, icon, accent = T.teal }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65 }}
      className="mb-8"
    >
      <span
        className="inline-block text-xs font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full mb-3"
        style={{ background: accent + "22", color: accent }}
      >
        {tag}
      </span>
      <h2
        className="text-3xl md:text-4xl font-black flex items-center gap-3"
        style={{
          color: T.text,
          fontFamily: "'Playfair Display', Georgia, serif",
        }}
      >
        <span>{icon}</span> {title}
      </h2>
      <div
        className="mt-3 h-1.5 w-16 rounded-full"
        style={{ background: `linear-gradient(90deg, ${accent}, ${T.gold})` }}
      />
    </motion.div>
  );
}

/* ─── LOGO SVG (school logo recreated inline) ───────────────────────────────── */
function SchoolLogo({ size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 220" fill="none">
      {/* shield */}
      <path
        d="M100 5 L185 35 L185 130 Q185 185 100 215 Q15 185 15 130 L15 35 Z"
        fill={T.teal}
        stroke={T.gold}
        strokeWidth="6"
      />
      <path
        d="M100 18 L172 44 L172 128 Q172 178 100 205 Q28 178 28 128 L28 44 Z"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        opacity="0.5"
      />
      {/* gold circle */}
      <circle cx="100" cy="105" r="52" fill={T.gold} opacity="0.9" />
      {/* book */}
      <ellipse
        cx="100"
        cy="148"
        rx="42"
        ry="10"
        fill={T.goldDark}
        opacity="0.6"
      />
      <path
        d="M58 148 Q100 130 142 148 L142 158 Q100 140 58 158 Z"
        fill="#e8d5b0"
      />
      <path
        d="M58 138 Q100 118 142 138 L142 148 Q100 128 58 148 Z"
        fill="#f0e4c8"
      />
      <path d="M100 136 L100 158" stroke={T.goldDark} strokeWidth="2.5" />
      {/* flame */}
      <path
        d="M100 58 Q88 78 92 92 Q80 82 84 68 Q72 85 78 100 Q70 92 72 78 Q60 100 75 118 Q82 128 100 130 Q118 128 125 118 Q140 100 128 78 Q130 92 122 100 Q128 85 116 68 Q120 82 108 92 Q112 78 100 58Z"
        fill="white"
        opacity="0.92"
      />
    </svg>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────────────────────── */
export default function MandatoryDisclosure() {
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <div
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        background: T.cream,
        color: T.text,
      }}
      className="min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');

        :root {
          --teal: ${T.teal};
          --gold: ${T.gold};
          --cream: ${T.cream};
        }
        @keyframes floatShield {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-16px) rotate(2deg); }
        }
        @keyframes shimmerGold {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ripple {
          0%   { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes dotFloat {
          0%,100% { transform: translateY(0) scale(1);   opacity: 0.5; }
          50%      { transform: translateY(-18px) scale(1.3); opacity: 1; }
        }
        @keyframes waveAnim {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .gold-shimmer {
          background: linear-gradient(90deg, ${T.gold} 0%, #ffe599 35%, ${T.goldLight} 50%, #ffe599 65%, ${T.gold} 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerGold 3.5s linear infinite;
        }
        .shield-float { animation: floatShield 5s ease-in-out infinite; }
        .card-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(13,110,122,0.18); }
        .doc-hover { transition: all 0.22s ease; }
        .doc-hover:hover { border-color: ${T.gold} !important; transform: translateY(-4px); box-shadow: 0 16px 40px rgba(240,184,74,0.2); }
        .wave-bg {
          background: linear-gradient(135deg, ${T.tealDark} 0%, ${T.teal} 50%, ${T.tealLight} 100%);
        }
        .teal-card { background: linear-gradient(135deg, ${T.teal}15 0%, ${T.tealPale} 100%); }
        .gold-card  { background: linear-gradient(135deg, ${T.gold}20 0%, ${T.goldPale} 100%); }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO — 50vh with logo-matched teal + gold theme
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: "50vh", background: T.teal }}
      >
        {/* animated dot field */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2,
                height: Math.random() * 6 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? T.gold : "white",
                opacity: 0.25,
                animation: `dotFloat ${3 + Math.random() * 5}s ${Math.random() * 4}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        {/* diagonal stripe overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(60deg, white 0, white 1px, transparent 0, transparent 50%)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* gold glow blob top-right */}
        <div
          className="absolute -top-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: T.gold }}
        />
        <div
          className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: T.tealLight }}
        />

        <div className="relative z-10 container mx-auto px-6 py-14 md:py-16 flex flex-col md:flex-row items-center gap-12">
          {/* LEFT — text */}
          <motion.div
            className="flex-1 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* badge */}
            <div
              className="inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
              style={{
                borderColor: T.gold + "80",
                background: T.gold + "18",
                color: T.goldLight,
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: T.gold }}
              />
              CBSE Affiliated · Since 2012
            </div>

            <h1
              className="font-black leading-tight mb-4 drop-shadow-xl"
              style={{
                fontSize: "clamp(2.6rem,6vw,4.5rem)",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Mandatory
              <br />
              <span className="gold-shimmer">Disclosure</span>
            </h1>

            <p className="text-white/75 text-base md:text-lg max-w-md leading-relaxed mb-8">
              Shree Ram Public School · Kanhra-Badhra, Charkhi Dadri, Haryana
              <br />
              <span className="text-white/50 text-sm">
                As per CBSE norms for complete public transparency
              </span>
            </p>

            {/* nav pills */}
            <div className="flex flex-wrap gap-2">
              {[
                "General Info",
                "Documents",
                "Staff",
                "Infrastructure",
                "Results",
              ].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                  className="border text-white/80 hover:text-white text-xs font-bold px-4 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    borderColor: "rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = T.gold;
                    e.target.style.color = T.tealDark;
                    e.target.style.borderColor = T.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.08)";
                    e.target.style.color = "rgba(255,255,255,0.8)";
                    e.target.style.borderColor = "rgba(255,255,255,0.25)";
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
          </motion.div>

          {/* CENTER — school logo (floating) */}
          <motion.div
            className="flex flex-col items-center gap-4 flex-shrink-0"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, type: "spring" }}
          >
            {/* ripple rings */}
            <div className="relative flex items-center justify-center">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="absolute rounded-full border"
                  style={{
                    width: 140 + n * 50,
                    height: 140 + n * 50,
                    borderColor: T.gold + "40",
                    animation: `ripple 2.5s ${n * 0.8}s ease-out infinite`,
                  }}
                />
              ))}
              <div className="relative shield-float">
                <img
                  src="/mnt/user-data/uploads/1771783385821_image.png"
                  alt="Shree Ram Public School Logo"
                  className="rounded-2xl shadow-2xl"
                  style={{
                    width: 130,
                    height: 130,
                    objectFit: "contain",
                    filter: "drop-shadow(0 12px 32px rgba(0,0,0,0.35))",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  style={{ display: "none", width: 130, height: 130 }}
                  className="items-center justify-center"
                >
                  <SchoolLogo size={130} />
                </div>
              </div>
            </div>
            <div className="text-center">
              <p
                className="font-black text-white text-base tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Shree Ram Public School
              </p>
              <p
                className="text-xs tracking-widest uppercase mt-1"
                style={{ color: T.goldLight }}
              >
                Est. Since 2012
              </p>
            </div>
          </motion.div>

          {/* RIGHT — stat pills */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { v: "30", l: "Teachers", bg: T.gold, tc: T.tealDark },
              { v: "22", l: "Classrooms", bg: "white", tc: T.teal },
              { v: "100%", l: "Class X '24", bg: T.tealLight, tc: "white" },
              { v: "12,145", l: "Campus sq.m", bg: T.goldDark, tc: "white" },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.06 }}
                className="rounded-2xl px-5 py-4 text-center shadow-xl font-extrabold min-w-[105px] cursor-default"
                style={{ background: s.bg, color: s.tc }}
              >
                <p className="text-2xl md:text-3xl leading-none">{s.v}</p>
                <p className="text-xs mt-1 font-semibold opacity-80">{s.l}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* wave bottom */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 52"
            preserveAspectRatio="none"
            className="w-full h-13"
          >
            <path
              d="M0,32 C360,58 1080,6 1440,32 L1440,52 L0,52 Z"
              fill={T.cream}
            />
          </svg>
        </div>
      </section>

      {/* ── NOTICE ──────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl px-6 py-4 flex items-start gap-3 border-2"
          style={{ background: T.goldPale, borderColor: T.gold + "80" }}
        >
          <span className="text-2xl">⚠️</span>
          <p className="text-sm leading-relaxed" style={{ color: T.goldDark }}>
            <b>Important Notice:</b> The school must upload self-attested copies
            of all documents signed by Chairman / Manager / Secretary and
            Principal. Documents found non-genuine shall render the school
            liable for action as per CBSE norms.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-10 space-y-20">
        {/* ══ A — GENERAL INFORMATION ════════════════════════════════════════ */}
        <section id="general-info">
          <SectionHeader
            tag="Section A"
            title="General Information"
            icon="🏫"
            accent={T.teal}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generalInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="card-lift rounded-2xl border-2 p-5 flex items-start gap-4 shadow-sm bg-white"
                style={{ borderColor: T.tealPale }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: T.tealPale }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: T.teal }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="font-bold text-sm leading-snug"
                    style={{ color: T.text }}
                  >
                    {item.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ B — DOCUMENTS ════════════════════════════════════════════════ */}
        <section id="documents">
          <SectionHeader
            tag="Section B"
            title="Documents & Information"
            icon="📁"
            accent={T.goldDark}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.93 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -5 }}
                className="doc-hover bg-white rounded-2xl border-2 p-5 shadow-sm cursor-pointer group"
                style={{ borderColor: T.tealPale }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-colors duration-200"
                    style={{ background: T.tealPale }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = T.teal)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = T.tealPale)
                    }
                  >
                    📄
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "#dcfce7", color: "#166534" }}
                  >
                    ✓ Available
                  </span>
                </div>
                <p
                  className="text-sm font-semibold leading-snug mb-3 transition-colors"
                  style={{ color: T.text }}
                >
                  {doc}
                </p>
                <div
                  className="flex items-center gap-1 text-xs font-bold transition-colors"
                  style={{ color: T.gold }}
                >
                  <span>View Document</span>
                  <span className="group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ D — STAFF ══════════════════════════════════════════════════════ */}
        <section id="staff">
          <SectionHeader
            tag="Section D"
            title="Staff (Teaching)"
            icon="👥"
            accent={T.teal}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* donut chart card */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border-2 p-8 shadow-lg flex flex-col items-center"
              style={{ borderColor: T.tealPale }}
            >
              <h3
                className="text-lg font-black mb-5 self-start"
                style={{
                  color: T.text,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Teacher Distribution
              </h3>
              <DonutChart data={staffData} size={210} />
              <div className="mt-6 w-full grid grid-cols-3 gap-3">
                {staffData.map((s) => (
                  <div
                    key={s.role}
                    className="text-center rounded-xl p-3 border-2"
                    style={{ borderColor: s.color + "50", background: s.light }}
                  >
                    <p
                      className="text-2xl font-black"
                      style={{ color: s.color }}
                    >
                      {s.count}
                    </p>
                    <p
                      className="text-xs font-bold mt-0.5"
                      style={{ color: T.muted }}
                    >
                      {s.role}
                    </p>
                    <p className="text-xs" style={{ color: T.muted }}>
                      {Math.round((s.count / 30) * 100)}%
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* progress bars + summary */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border-2 p-8 shadow-lg space-y-5"
              style={{ borderColor: T.tealPale }}
            >
              <h3
                className="text-lg font-black mb-1"
                style={{
                  color: T.text,
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Staff Breakdown
              </h3>
              {staffData.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span
                      className="text-sm font-bold"
                      style={{ color: T.text }}
                    >
                      {s.role} Teachers
                    </span>
                    <span
                      className="text-sm font-black"
                      style={{ color: s.color }}
                    >
                      {s.count} / 30
                    </span>
                  </div>
                  <div
                    className="h-3 rounded-full overflow-hidden"
                    style={{ background: "#dde8ea" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: s.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(s.count / 30) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, delay: i * 0.18 }}
                    />
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4 pt-3">
                <div
                  className="rounded-xl p-4 text-center border-2"
                  style={{ background: T.tealPale, borderColor: T.teal + "50" }}
                >
                  <p className="text-3xl font-black" style={{ color: T.teal }}>
                    30
                  </p>
                  <p
                    className="text-xs font-semibold mt-1"
                    style={{ color: T.muted }}
                  >
                    Total Teachers
                  </p>
                </div>
                <div
                  className="rounded-xl p-4 text-center border-2"
                  style={{ background: T.goldPale, borderColor: T.gold + "80" }}
                >
                  <p
                    className="text-3xl font-black"
                    style={{ color: T.goldDark }}
                  >
                    40:1
                  </p>
                  <p
                    className="text-xs font-semibold mt-1"
                    style={{ color: T.muted }}
                  >
                    Teacher : Section
                  </p>
                </div>
              </div>
              <div
                className="rounded-xl p-4 flex items-center gap-3 border-2"
                style={{ background: T.goldPale, borderColor: T.gold + "60" }}
              >
                <span className="text-2xl">🧑‍⚕️</span>
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wide"
                    style={{ color: T.goldDark }}
                  >
                    Counsellor / Wellness / Special Ed
                  </p>
                  <p
                    className="text-xl font-black"
                    style={{ color: T.goldDark }}
                  >
                    1 Staff Member
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══ E — INFRASTRUCTURE ════════════════════════════════════════════ */}
        <section id="infrastructure">
          <SectionHeader
            tag="Section E"
            title="School Infrastructure"
            icon="🏗️"
            accent={T.goldDark}
          />

          {/* Gauge overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border-2 p-8 shadow-lg mb-6"
            style={{ borderColor: T.goldPale }}
          >
            <h3
              className="text-sm font-black uppercase tracking-widest mb-8 text-center"
              style={{ color: T.muted }}
            >
              Capacity Overview — Gauge View
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {infraStats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center rounded-2xl p-3 border"
                  style={{
                    background: s.color + "0a",
                    borderColor: s.color + "30",
                  }}
                >
                  <SemiGauge
                    value={s.value}
                    max={s.max}
                    color={s.color}
                    size={100}
                  />
                  <div className="text-lg mt-1">{s.icon}</div>
                  <p
                    className="text-xs font-bold mt-1 text-center"
                    style={{ color: T.text }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="text-base font-black"
                    style={{ color: s.color }}
                  >
                    {s.value.toLocaleString()}
                  </p>
                  <p className="text-xs" style={{ color: T.muted }}>
                    {s.unit}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Detailed progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border-2 p-8 shadow-lg space-y-6"
            style={{ borderColor: T.tealPale }}
          >
            <h3
              className="text-base font-black uppercase tracking-wide"
              style={{ color: T.muted }}
            >
              Detailed Utilization
            </h3>
            {infraStats.map((s) => (
              <AnimBar
                key={s.label}
                value={s.value}
                max={s.max}
                color={s.color}
                label={s.label}
                unit={s.unit}
              />
            ))}
            <div
              className="rounded-xl p-4 flex items-center gap-3 border-2 mt-2"
              style={{ background: T.tealPale, borderColor: T.teal + "50" }}
            >
              <span className="text-2xl">🌐</span>
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: T.teal }}
                >
                  Internet Facility
                </p>
                <p className="text-xl font-black" style={{ color: T.teal }}>
                  Available ✓
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══ RESULTS ══════════════════════════════════════════════════════ */}
        <section id="results">
          <SectionHeader
            tag="Board Results"
            title="Last 3 Years — Exam Results"
            icon="📊"
            accent={T.teal}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ResultsChart
              title="Class X"
              emoji="📘"
              results={resultsX}
              fillColor={T.teal}
              borderColor={T.tealPale}
            />
            <ResultsChart
              title="Class XII"
              emoji="📗"
              results={resultsXII}
              fillColor={T.goldDark}
              borderColor={T.goldPale + "cc"}
            />
          </div>

          {/* summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Class X — 2024",
                value: "100%",
                sub: "35/35 passed",
                bg: T.tealPale,
                text: T.teal,
                border: T.teal + "50",
              },
              {
                label: "Class XII — 2024",
                value: "95.5%",
                sub: "21/22 passed",
                bg: T.goldPale,
                text: T.goldDark,
                border: T.gold + "80",
              },
              {
                label: "3-Year Avg (X)",
                value: "97.9%",
                sub: "avg pass rate",
                bg: T.tealPale,
                text: T.tealLight,
                border: T.tealLight + "60",
              },
              {
                label: "3-Year Avg (XII)",
                value: "95%",
                sub: "avg pass rate",
                bg: T.goldPale,
                text: T.goldDark,
                border: T.goldDark + "50",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="bg-white rounded-2xl border-2 p-6 text-center shadow-sm card-lift"
                style={{ background: s.bg, borderColor: s.border }}
              >
                <p className="text-4xl font-black" style={{ color: s.text }}>
                  {s.value}
                </p>
                <p
                  className="text-xs font-semibold mt-1"
                  style={{ color: T.muted }}
                >
                  {s.sub}
                </p>
                <p
                  className="text-xs mt-2 leading-snug"
                  style={{ color: T.muted }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
          <p
            className="text-center text-xs mt-4 italic"
            style={{ color: T.muted }}
          >
            * 2022 & 2023 data is indicative — update as per official CBSE
            records.
          </p>
        </section>
      </div>
    </div>
  );
}

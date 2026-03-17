import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   COLOR SYSTEM — Shree Ram Public School Logo
═══════════════════════════════════════════════════════════ */
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
  text: "#1a2e35",
  muted: "#5a7a82",
};

/* ─── DATA ────────────────────────────────────────────────── */
const subjects = [
  { name: "English", icon: "🔤", color: T.teal },
  { name: "Hindi", icon: "📝", color: T.goldDark },
  { name: "Mathematics", icon: "📐", color: T.teal },
  { name: "Science", icon: "🔬", color: T.tealLight },
  { name: "Social Science", icon: "🌍", color: T.goldDark },
  { name: "Computer Science", icon: "💻", color: T.teal },
];

const electives = [
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "Economics",
  "Business Studies",
  "Accountancy",
  "History",
  "Political Science",
];

const methods = [
  {
    icon: "🖥️",
    title: "Smart Classrooms",
    desc: "Interactive whiteboards & multimedia for engaging lessons",
    color: T.teal,
  },
  {
    icon: "🧪",
    title: "Experiential Learning",
    desc: "Labs, field trips & projects that bring concepts to life",
    color: T.goldDark,
  },
  {
    icon: "👤",
    title: "Individual Attention",
    desc: "Remedial classes & personal guidance for every student",
    color: T.tealLight,
  },
  {
    icon: "📊",
    title: "Regular Assessments",
    desc: "Continuous feedback loops to monitor and boost progress",
    color: T.gold,
  },
];

const coActivities = [
  {
    name: "Art & Craft",
    icon: "🎨",
    desc: "Unleash creativity through painting, sculpture, and visual arts.",
    color: T.gold,
  },
  {
    name: "Music",
    icon: "🎵",
    desc: "Classical and modern music training for all skill levels.",
    color: T.teal,
  },
  {
    name: "Sports",
    icon: "🏅",
    desc: "Physical excellence through cricket, football, athletics & more.",
    color: T.goldDark,
  },
  {
    name: "Dance",
    icon: "💃",
    desc: "Classical & contemporary dance to build expression and confidence.",
    color: T.tealLight,
  },
  {
    name: "Debate Club",
    icon: "🎤",
    desc: "Sharpen communication and critical thinking skills.",
    color: T.goldDark,
  },
  {
    name: "Science Club",
    icon: "🚀",
    desc: "Hands-on experiments and inter-school science competitions.",
    color: T.teal,
  },
];

const assessments = [
  {
    icon: "📋",
    title: "Continuous Assessment",
    desc: "Regular class tests, quizzes & projects throughout the year.",
    color: T.gold,
  },
  {
    icon: "📅",
    title: "Term Examinations",
    desc: "Two major term exams (PA I & PA II) plus Pre-Boards for X & XII.",
    color: T.teal,
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    desc: "Detailed report cards & parent-teacher meetings after each assessment.",
    color: T.tealLight,
  },
  {
    icon: "🏫",
    title: "CBSE Board Exams",
    desc: "Class X & XII students appear for official CBSE board examinations.",
    color: T.goldDark,
  },
];

const toppers = [
  {
    name: "Anjali Sharma",
    cls: "Class X — 2024–25",
    pct: 98.2,
    img: "https://randomuser.me/api/portraits/women/63.jpg",
    medal: "🥇",
  },
  {
    name: "Rahul Yadav",
    cls: "Class XII — 2024–25",
    pct: 96.8,
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    medal: "🥈",
  },
  {
    name: "Priya Singh",
    cls: "Class X — 2023–24",
    pct: 97.5,
    img: "https://randomuser.me/api/portraits/women/54.jpg",
    medal: "🥉",
  },
];

const calendarEvents = [
  { month: "Apr", event: "Session Starts", color: T.teal },
  { month: "Jun", event: "Unit Test 1", color: T.gold },
  { month: "Sep", event: "Half-Yearly Exams", color: T.tealLight },
  { month: "Oct", event: "Annual Sports Day", color: T.goldDark },
  { month: "Jan", event: "Pre-Board Exams", color: T.teal },
  { month: "Feb", event: "Annual Function", color: T.gold },
  { month: "Mar", event: "CBSE Board Exams", color: T.goldDark },
];

/* ─── ANIMATED SCORE RING ─────────────────────────────────── */
function ScoreRing({ pct, color, size = 100 }) {
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

  const r = size * 0.38,
    cx = size / 2,
    cy = size / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100) * prog;

  return (
    <svg ref={ref} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#e0eaec"
        strokeWidth="9"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fontSize="16"
        fontWeight="900"
        fill={T.text}
      >
        {Math.round(pct * prog)}%
      </text>
      <text
        x={cx}
        y={cy + 13}
        textAnchor="middle"
        fontSize="8"
        fill={T.muted}
        fontWeight="700"
        letterSpacing="1"
      >
        SCORE
      </text>
    </svg>
  );
}

/* ─── SUBJECT HEXAGON CARD ────────────────────────────────── */
function SubjectCard({ s, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
      whileHover={{ y: -8, scale: 1.06 }}
      className="group cursor-default flex flex-col items-center rounded-3xl p-6 border-2 shadow-sm text-center"
      style={{ background: "white", borderColor: s.color + "40" }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-md transition-transform group-hover:scale-110"
        style={{ background: s.color + "18", border: `2px solid ${s.color}40` }}
      >
        {s.icon}
      </div>
      <h3
        className="font-black text-sm leading-tight"
        style={{ color: T.text }}
      >
        {s.name}
      </h3>
      <div
        className="mt-2 h-1 w-8 rounded-full"
        style={{ background: s.color }}
      />
    </motion.div>
  );
}

/* ─── SECTION HEADER ──────────────────────────────────────── */
function SectionHeader({ tag, title, sub, accent = T.teal }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65 }}
      className="text-center mb-12"
    >
      <span
        className="inline-block text-xs font-bold tracking-[0.22em] uppercase px-4 py-1.5 rounded-full mb-3"
        style={{ background: accent + "22", color: accent }}
      >
        {tag}
      </span>
      <h2
        className="text-3xl md:text-4xl font-black"
        style={{
          color: T.text,
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "-0.025em",
          fontWeight: 800,
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          className="mt-3 text-base max-w-xl mx-auto"
          style={{ color: T.muted }}
        >
          {sub}
        </p>
      )}
      <div
        className="mt-4 h-1.5 w-14 rounded-full mx-auto"
        style={{ background: `linear-gradient(90deg, ${accent}, ${T.gold})` }}
      />
    </motion.div>
  );
}

/* ─── ANIMATED COUNTER ────────────────────────────────────── */
function Counter({ to, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = null;
    const go = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / 1600, 1);
      setVal(Math.round(to * p));
      if (p < 1) requestAnimationFrame(go);
    };
    requestAnimationFrame(go);
  }, [inView]);
  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

/* ─── MAIN ────────────────────────────────────────────────── */
export default function AcademicPage() {
  return (
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        letterSpacing: "-0.02em",
        background: T.cream,
        color: T.text,
      }}
      className="min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap');
        h1,h2,h3,h4,h5,h6 { font-family: 'Montserrat', sans-serif !important; }
        .heading-primary { font-weight:900; letter-spacing:-0.03em; line-height:1.08; }
        .heading-accent  { font-weight:700; letter-spacing:0.015em; }
        .logo-style-title { font-weight:800; letter-spacing:-0.025em; }
        .logo-style-sub   { font-weight:600; letter-spacing:0.06em; text-transform:uppercase; font-size:0.78em; color:#f0b84a; }
        @keyframes shimmerGold {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes floatY   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes dotPop   { 0%,100%{transform:scale(1);opacity:0.35} 50%{transform:scale(1.5);opacity:0.85} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .gold-shimmer {
          background: linear-gradient(90deg,${T.gold} 0%,${T.goldLight} 30%,#fff4cc 50%,${T.goldLight} 70%,${T.gold} 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerGold 3.5s linear infinite;
        }
        .float1 { animation: floatY 4s ease-in-out infinite; }
        .float2 { animation: floatY 5.5s 1s ease-in-out infinite; }
        .float3 { animation: floatY 3.8s 0.5s ease-in-out infinite; }
        .card-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(13,110,122,0.16); }
        .spin-slow { animation: spinSlow 18s linear infinite; }
        .stripe-bg {
          background-image: repeating-linear-gradient(60deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 0, transparent 50%);
          background-size: 22px 22px;
        }
        .dot-bg {
          background-image: radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px);
          background-size: 26px 26px;
        }
      `}</style>

      {/* ════════════════════════════════════════════════════
          HERO — 50vh
      ════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: "50vh", background: T.teal }}
      >
        {/* animated dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 5 + 2,
                height: Math.random() * 5 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? T.gold : "white",
                opacity: 0.25,
                animation: `dotPop ${3 + Math.random() * 4}s ${Math.random() * 3}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 stripe-bg" />
        {/* blobs */}
        <div
          className="absolute -top-24 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: T.gold }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-3xl opacity-15"
          style={{ background: T.tealLight }}
        />

        {/* spinning ring decoration */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
          <svg
            width="280"
            height="280"
            viewBox="0 0 280 280"
            className="spin-slow"
          >
            {Array.from({ length: 18 }, (_, i) => {
              const a = (i / 18) * Math.PI * 2;
              return (
                <circle
                  key={i}
                  cx={140 + 120 * Math.cos(a)}
                  cy={140 + 120 * Math.sin(a)}
                  r="6"
                  fill={T.gold}
                />
              );
            })}
            <circle
              cx="140"
              cy="140"
              r="90"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="8 8"
            />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-14 md:py-18 flex flex-col md:flex-row items-center gap-12">
          {/* left */}
          <motion.div
            className="flex-1 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              className="inline-flex items-center gap-2 border px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5"
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
              CBSE Affiliated · Academic Excellence
            </div>
            <h1
              className="leading-tight mb-4 drop-shadow-xl"
              style={{
                fontSize: "clamp(2.4rem,5.5vw,4rem)",
                fontFamily: "'Montserrat',sans-serif",
              }}
            >
              <span
                style={{
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  display: "block",
                }}
              >
                Nurturing
              </span>
              <span
                className="gold-shimmer"
                style={{
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                  fontSize: "0.85em",
                  display: "block",
                }}
              >
                Bright Minds
              </span>
            </h1>
            <p className="max-w-md leading-relaxed mb-8 text-white/75 text-base">
              A rigorous CBSE curriculum blended with innovative teaching
              methods to foster intellectual growth, creativity, and character.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Curriculum",
                "Subjects",
                "Teaching",
                "Activities",
                "Results",
              ].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="border text-white/80 hover:text-white text-xs font-bold px-4 py-1.5 rounded-full transition-all duration-200"
                  style={{
                    borderColor: "rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = T.gold;
                    e.target.style.color = T.tealDark;
                    e.target.style.borderColor = T.gold;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255,255,255,0.1)";
                    e.target.style.color = "rgba(255,255,255,0.8)";
                    e.target.style.borderColor = "rgba(255,255,255,0.25)";
                  }}
                >
                  {l}
                </a>
              ))}
            </div>
          </motion.div>

          {/* right — stat float cards */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              {
                v: "Nursery–XII",
                l: "Classes Offered",
                bg: T.gold,
                tc: T.tealDark,
                cl: "float1",
              },
              {
                v: "30+",
                l: "Qualified Teachers",
                bg: "white",
                tc: T.teal,
                cl: "float2",
              },
              {
                v: "100%",
                l: "Class X Pass 2024",
                bg: T.tealLight,
                tc: "white",
                cl: "float3",
              },
              {
                v: "6 Labs",
                l: "Science & Computer",
                bg: T.goldDark,
                tc: "white",
                cl: "float1",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.06 }}
                className={`rounded-2xl px-5 py-4 text-center shadow-xl font-extrabold ${s.cl}`}
                style={{ background: s.bg, color: s.tc }}
              >
                <p className="text-xl font-black leading-none">{s.v}</p>
                <p className="text-xs mt-1 font-semibold opacity-75">{s.l}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 52"
            preserveAspectRatio="none"
            className="w-full h-12"
          >
            <path
              d="M0,32 C360,58 1080,6 1440,32 L1440,52 L0,52 Z"
              fill={T.cream}
            />
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 space-y-24">
        {/* ══ STATS BAND ═══════════════════════════════════════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { val: 30, suf: "+", label: "Expert Teachers", color: T.teal },
            { val: 100, suf: "%", label: "Class X Pass 2024", color: T.gold },
            { val: 22, suf: "", label: "Smart Classrooms", color: T.tealLight },
            { val: 6, suf: "", label: "Labs & Studios", color: T.goldDark },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="card-lift bg-white rounded-2xl border-2 p-6 text-center shadow-sm"
              style={{ borderColor: s.color + "40" }}
            >
              <p className="text-4xl font-black" style={{ color: s.color }}>
                <Counter to={s.val} suffix={s.suf} />
              </p>
              <p
                className="text-sm font-semibold mt-1"
                style={{ color: T.muted }}
              >
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ══ CURRICULUM ═══════════════════════════════════════════ */}
        <section id="curriculum">
          <SectionHeader
            tag="Our Framework"
            title="CBSE Curriculum"
            sub="Conceptual understanding, critical thinking & holistic development from Nursery to Class XII"
            accent={T.teal}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📚",
                title: "Nursery – Class V",
                desc: "Foundation stage — language, numeracy, EVS, art, and physical education to build strong basics.",
                color: T.gold,
              },
              {
                icon: "🏫",
                title: "Class VI – Class X",
                desc: "CBSE middle & secondary — core subjects with labs, projects, and continuous assessment.",
                color: T.teal,
              },
              {
                icon: "🎓",
                title: "Class XI – Class XII",
                desc: "Senior secondary — Science, Commerce & Humanities streams with career-focused elective choices.",
                color: T.goldDark,
              },
            ].map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="card-lift bg-white rounded-2xl border-2 p-7 shadow-sm"
                style={{ borderColor: c.color + "40" }}
              >
                <div className="text-4xl mb-4">{c.icon}</div>
                <h3
                  className="text-lg font-black mb-2"
                  style={{
                    color: c.color,
                    fontFamily: "'Montserrat',sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: T.muted }}
                >
                  {c.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ SUBJECTS ═════════════════════════════════════════════ */}
        <section id="subjects">
          <SectionHeader
            tag="What We Teach"
            title="Subjects We Offer"
            accent={T.goldDark}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {subjects.map((s, i) => (
              <SubjectCard key={i} s={s} i={i} />
            ))}
          </div>
          {/* electives */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border-2 p-7 shadow-sm"
            style={{ borderColor: T.goldPale }}
          >
            <h3 className="font-black text-base mb-4" style={{ color: T.text }}>
              Senior Secondary Electives
            </h3>
            <div className="flex flex-wrap gap-2">
              {electives.map((e) => (
                <span
                  key={e}
                  className="px-3 py-1.5 rounded-full text-xs font-bold border-2 cursor-default hover:scale-105 transition-transform"
                  style={{
                    background: T.tealPale,
                    color: T.teal,
                    borderColor: T.teal + "40",
                  }}
                >
                  {e}
                </span>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══ TEACHING METHODOLOGY ═════════════════════════════════ */}
        <section id="teaching">
          <SectionHeader
            tag="How We Teach"
            title="Innovative Teaching Methods"
            accent={T.teal}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {methods.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="card-lift bg-white rounded-2xl border-2 p-7 shadow-sm"
                style={{ borderColor: m.color + "40" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow"
                  style={{
                    background: m.color + "18",
                    border: `2px solid ${m.color}40`,
                  }}
                >
                  {m.icon}
                </div>
                <h3
                  className="font-black text-base mb-2"
                  style={{
                    color: m.color,
                    fontFamily: "'Montserrat',sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {m.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: T.muted }}
                >
                  {m.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ CO-CURRICULAR ════════════════════════════════════════ */}
        <section id="activities">
          <SectionHeader
            tag="Beyond Textbooks"
            title="Co-Curricular Activities"
            sub="Shaping well-rounded personalities through arts, sports, and clubs"
            accent={T.goldDark}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coActivities.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.93 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="card-lift bg-white rounded-2xl border-2 p-7 shadow-sm group"
                style={{ borderColor: a.color + "40" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow transition-transform group-hover:scale-110"
                    style={{
                      background: a.color + "18",
                      border: `2px solid ${a.color}40`,
                    }}
                  >
                    {a.icon}
                  </div>
                  <h3
                    className="text-lg font-black"
                    style={{
                      color: a.color,
                      fontFamily: "'Montserrat',sans-serif",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {a.name}
                  </h3>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: T.muted }}
                >
                  {a.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ ASSESSMENT ═══════════════════════════════════════════ */}
        <section>
          <SectionHeader
            tag="Evaluation System"
            title="Assessment & Evaluation"
            accent={T.teal}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {assessments.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="card-lift bg-white rounded-2xl border-2 p-7 text-center shadow-sm"
                style={{ borderColor: a.color + "40" }}
              >
                <div className="text-5xl mb-4">{a.icon}</div>
                <h3
                  className="font-black text-base mb-2"
                  style={{
                    color: a.color,
                    fontFamily: "'Montserrat',sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {a.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: T.muted }}
                >
                  {a.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ ACADEMIC CALENDAR ════════════════════════════════════ */}
        <section>
          <SectionHeader
            tag="Academic Year"
            title="Calendar 2025–26"
            sub="Stay ahead — key events, exams, and activities at a glance"
            accent={T.goldDark}
          />
          <div
            className="bg-white rounded-2xl border-2 shadow-lg overflow-hidden"
            style={{ borderColor: T.tealPale }}
          >
            {/* header strip */}
            <div
              className="px-8 py-5 flex items-center justify-between"
              style={{
                background: `linear-gradient(90deg,${T.tealDark},${T.teal})`,
              }}
            >
              <h3
                className="font-black text-white text-lg"
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                📅 Academic Calendar 2025–26
              </h3>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                className="font-black px-5 py-2 rounded-xl text-xs flex items-center gap-2"
                style={{ background: T.gold, color: T.tealDark }}
              >
                ⬇ Download
              </motion.a>
            </div>
            {/* events */}
            <div className="divide-y" style={{ divideColor: T.tealPale }}>
              {calendarEvents.map((ev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-5 px-8 py-4 hover:bg-opacity-60 transition-colors group"
                  style={{ background: i % 2 === 0 ? "white" : T.cream }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black shadow-sm flex-shrink-0"
                    style={{
                      background: ev.color + "20",
                      border: `2px solid ${ev.color}50`,
                      color: ev.color,
                    }}
                  >
                    <span className="text-xs uppercase tracking-wide">
                      {ev.month}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm" style={{ color: T.text }}>
                      {ev.event}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: T.muted }}>
                      Academic Year 2025–26
                    </p>
                  </div>
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: ev.color }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TOPPERS ══════════════════════════════════════════════ */}
        <section id="results">
          <SectionHeader
            tag="Our Stars"
            title="Board Exam Toppers"
            sub="Celebrating the academic excellence of our students"
            accent={T.teal}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {toppers.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="card-lift bg-white rounded-2xl border-2 p-8 text-center shadow-lg"
                style={{
                  borderColor:
                    i === 0 ? T.gold + "80" : i === 1 ? T.tealPale : T.goldPale,
                }}
              >
                {/* medal */}
                <div className="text-4xl mb-3">{s.medal}</div>
                {/* avatar with ring */}
                <div className="relative inline-block mb-5">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `3px solid ${i === 0 ? T.gold : T.teal}`,
                      transform: "scale(1.08)",
                    }}
                  />
                  <img
                    src={s.img}
                    alt={s.name}
                    className="w-24 h-24 rounded-full object-cover shadow-lg relative z-10"
                  />
                </div>
                <h3
                  className="text-lg font-black mb-1"
                  style={{
                    color: T.text,
                    fontFamily: "'Montserrat',sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ color: T.muted }}
                >
                  {s.cls}
                </p>
                <ScoreRing
                  pct={s.pct}
                  color={i === 0 ? T.gold : T.teal}
                  size={100}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ CAREER COUNSELLING ═══════════════════════════════════ */}
        <section className="pb-4">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl p-12 md:p-16 shadow-2xl"
            style={{
              background: `linear-gradient(135deg,${T.tealDark} 0%,${T.teal} 50%,${T.tealLight} 100%)`,
            }}
          >
            <div className="absolute inset-0 dot-bg" />
            {/* decorative ring */}
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
              <svg
                width="260"
                height="260"
                viewBox="0 0 260 260"
                className="spin-slow"
              >
                {Array.from({ length: 16 }, (_, i) => {
                  const a = (i / 16) * Math.PI * 2;
                  return (
                    <circle
                      key={i}
                      cx={130 + 105 * Math.cos(a)}
                      cy={130 + 105 * Math.sin(a)}
                      r="5"
                      fill={T.gold}
                    />
                  );
                })}
              </svg>
            </div>
            <div className="relative z-10 max-w-2xl">
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
                style={{ background: T.gold + "30", color: T.goldLight }}
              >
                Career Guidance Cell
              </span>
              <h2
                className="text-3xl md:text-4xl font-black text-white mb-4"
                style={{
                  fontFamily: "'Montserrat',sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Shape Your <span className="gold-shimmer">Future Path</span>
              </h2>
              <p className="text-white/75 mb-8 leading-relaxed">
                Our dedicated career guidance cell offers personalised
                counselling, aptitude tests, and stream selection support to
                help every student discover the right path.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="font-black px-8 py-3.5 rounded-2xl text-sm shadow-xl"
                  style={{ background: T.gold, color: T.tealDark }}
                >
                  Book a Counselling Session →
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="font-bold px-8 py-3.5 rounded-2xl text-sm border-2 text-white"
                  style={{
                    borderColor: "rgba(255,255,255,0.35)",
                    background: "rgba(255,255,255,0.1)",
                  }}
                >
                  Know More
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

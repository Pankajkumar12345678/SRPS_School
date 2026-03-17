import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   COLOR SYSTEM — Shree Ram Public School Logo
   Teal  : #0d6e7a  /  Gold : #f0b84a  /  Cream : #fdf6e3
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

/* ─── DATA ─────────────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    title: "Enquiry",
    icon: "💬",
    desc: "Fill the online enquiry form or contact our admission office directly.",
  },
  {
    num: "02",
    title: "Campus Visit",
    icon: "🏫",
    desc: "Schedule a campus tour and experience our learning environment.",
  },
  {
    num: "03",
    title: "Application",
    icon: "📋",
    desc: "Submit the application form along with all required documents.",
  },
  {
    num: "04",
    title: "Interaction",
    icon: "🤝",
    desc: "Student-parent interaction session with the Principal.",
  },
  {
    num: "05",
    title: "Fee Payment",
    icon: "✅",
    desc: "Confirm your seat by paying the fee within the stipulated time.",
  },
];

const fees = [
  {
    class: "Nursery – UKG",
    tuition: "30,000",
    annual: "5,000",
    total: "35,000",
  },
  { class: "Class I – V", tuition: "35,000", annual: "6,000", total: "41,000" },
  {
    class: "Class VI – VIII",
    tuition: "40,000",
    annual: "7,000",
    total: "47,000",
  },
  {
    class: "Class IX – X",
    tuition: "45,000",
    annual: "8,000",
    total: "53,000",
  },
  {
    class: "Class XI – XII",
    tuition: "50,000",
    annual: "10,000",
    total: "60,000",
  },
];

const importantDates = [
  {
    event: "Application Start",
    date: "1 Dec 2025",
    icon: "🚀",
    color: T.tealLight,
  },
  {
    event: "Application Deadline",
    date: "31 Mar 2026",
    icon: "📅",
    color: T.gold,
  },
  { event: "Interaction Dates", date: "April 2026", icon: "🤝", color: T.teal },
  { event: "Fee Submission", date: "May 2026", icon: "💳", color: T.goldDark },
  {
    event: "Session Begins",
    date: "1 Jul 2026",
    icon: "🎒",
    color: T.tealDark,
  },
];

const eligibility = [
  { level: "Nursery", age: "Age 3+ as on 31st March 2026", color: T.gold },
  { level: "LKG", age: "Age 4+ as on 31st March 2026", color: T.teal },
  { level: "UKG", age: "Age 5+ as on 31st March 2026", color: T.tealLight },
  {
    level: "Class I onwards",
    age: "Previous class passed + seat availability",
    color: T.goldDark,
  },
];

const faqs = [
  {
    q: "What is the age criterion for Nursery?",
    a: "Child must be 3+ years as on 31st March of the admission year.",
  },
  {
    q: "Is there any entrance test?",
    a: "For Nursery–UKG, a simple interaction is conducted. For Class I and above, a basic assessment is held.",
  },
  {
    q: "What documents are required?",
    a: "Birth certificate, previous report card, transfer certificate (if any), passport photos, and address proof.",
  },
  {
    q: "Are scholarships available?",
    a: "Yes — merit-based scholarships and fee concessions for economically weaker sections. Contact the admission office.",
  },
];

const scholarships = [
  {
    title: "Merit Scholarship",
    desc: "For students with 90%+ in previous class",
    icon: "🏆",
    bg: T.goldPale,
    border: T.gold,
  },
  {
    title: "Sports Excellence",
    desc: "For state/national level sports achievers",
    icon: "⚽",
    bg: T.tealPale,
    border: T.teal,
  },
  {
    title: "EWS Concession",
    desc: "Fee relief for economically weaker sections",
    icon: "🤲",
    bg: T.goldPale,
    border: T.goldDark,
  },
  {
    title: "Sibling Discount",
    desc: "Special discount for siblings enrolled here",
    icon: "👨‍👩‍👧",
    bg: T.tealPale,
    border: T.tealLight,
  },
];

/* ─── SECTION HEADER ─────────────────────────────────────── */
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

/* ─── FAQ ACCORDION ──────────────────────────────────────── */
function FAQ({ faq, i }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1 }}
      className="rounded-2xl border-2 overflow-hidden cursor-pointer select-none shadow-sm"
      style={{ borderColor: open ? T.teal : T.tealPale }}
      onClick={() => setOpen(!open)}
    >
      <div
        className="flex items-center justify-between px-6 py-4 gap-3"
        style={{ background: open ? T.tealPale : "white" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">❓</span>
          <h3 className="font-bold text-base" style={{ color: T.text }}>
            {faq.q}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="text-2xl font-bold flex-shrink-0"
          style={{ color: T.teal }}
        >
          +
        </motion.span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p
              className="px-6 py-4 text-sm leading-relaxed border-t"
              style={{ color: T.muted, borderColor: T.tealPale }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── TIMELINE DOT ──────────────────────────────────────── */
function TimelineDot({ item, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.12 }}
      className="flex flex-col items-center text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.12 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg mb-3 border-2"
        style={{
          background: item.color + "20",
          borderColor: item.color + "60",
          color: item.color,
        }}
      >
        {item.icon}
      </motion.div>
      <p
        className="text-xs font-black uppercase tracking-wider mb-1"
        style={{ color: item.color }}
      >
        {item.event}
      </p>
      <p className="text-sm font-bold" style={{ color: T.text }}>
        {item.date}
      </p>
    </motion.div>
  );
}

/* ─── FEE ROW ANIMATED ───────────────────────────────────── */
function FeeRow({ row, i, inView }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: i * 0.1 }}
      className="border-b group hover:bg-opacity-80 transition-colors"
      style={{
        borderColor: T.tealPale,
        background: i % 2 === 0 ? "white" : T.cream,
      }}
    >
      <td className="py-4 px-6">
        <span
          className="font-bold text-sm px-3 py-1 rounded-full"
          style={{ background: T.tealPale, color: T.teal }}
        >
          {row.class}
        </span>
      </td>
      <td className="py-4 px-6 text-sm font-semibold" style={{ color: T.text }}>
        ₹ {row.tuition}
      </td>
      <td className="py-4 px-6 text-sm font-semibold" style={{ color: T.text }}>
        ₹ {row.annual}
      </td>
      <td className="py-4 px-6">
        <span className="text-base font-black" style={{ color: T.teal }}>
          ₹ {row.total}
        </span>
      </td>
    </motion.tr>
  );
}

/* ─── MAIN ───────────────────────────────────────────────── */
export default function AdmissionsPage() {
  const feeRef = useRef(null);
  const feeInView = useInView(feeRef, { once: true, amount: 0.2 });

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
        @keyframes floatY  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes dotPop  { 0%,100%{transform:scale(1);opacity:0.4} 50%{transform:scale(1.5);opacity:0.9} }
        @keyframes lineGrow { from{width:0} to{width:100%} }
        .gold-shimmer {
          background: linear-gradient(90deg,${T.gold} 0%,#ffe599 40%,${T.goldLight} 55%,#ffe599 70%,${T.gold} 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerGold 3.5s linear infinite;
        }
        .float1 { animation: floatY 4s ease-in-out infinite; }
        .float2 { animation: floatY 5s 1.2s ease-in-out infinite; }
        .card-lift { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .card-lift:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(13,110,122,0.18); }
        .step-connector::after {
          content: '';
          position: absolute; top: 50%; right: -16px;
          transform: translateY(-50%);
          width: 24px; height: 2px;
          background: linear-gradient(90deg, ${T.gold}, ${T.teal});
          border-radius: 2px;
        }
      `}</style>

      {/* ════════════════════════════════════════════════════
          HERO — 50vh
      ════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: "50vh", background: T.teal }}
      >
        {/* dot field */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 36 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 5 + 2,
                height: Math.random() * 5 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? T.gold : "white",
                opacity: 0.22,
                animation: `dotPop ${3 + Math.random() * 4}s ${Math.random() * 3}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
        {/* stripe overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(60deg,white 0,white 1px,transparent 0,transparent 50%)",
            backgroundSize: "22px 22px",
          }}
        />
        {/* gold blob */}
        <div
          className="absolute -top-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: T.gold }}
        />
        <div
          className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full blur-3xl opacity-15"
          style={{ background: T.tealLight }}
        />

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
              Admissions Open 2026–27
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
                Begin Your
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
                Journey Here
              </span>
            </h1>
            <p className="max-w-md leading-relaxed mb-8 text-white/75 text-base">
              Admissions now open for Nursery to Class IX at Shree Ram Public
              School, Kanhra-Badhra. Shape your child's future with us.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#apply"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="font-black px-7 py-3 rounded-2xl text-sm shadow-xl flex items-center gap-2"
                style={{ background: T.gold, color: T.tealDark }}
              >
                📋 Apply Now
              </motion.a>
              <motion.a
                href="#process"
                whileHover={{ scale: 1.05 }}
                className="font-bold px-7 py-3 rounded-2xl text-sm border-2 text-white flex items-center gap-2"
                style={{
                  borderColor: "rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.1)",
                }}
              >
                🔍 Know More
              </motion.a>
            </div>
          </motion.div>

          {/* right — floating cards */}
          <motion.div
            className="flex flex-col gap-4 min-w-[240px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              {
                v: "Nursery – IX",
                l: "Admissions Open For",
                bg: T.gold,
                tc: T.tealDark,
                cl: "float1",
              },
              {
                v: "2026–27",
                l: "Academic Session",
                bg: "white",
                tc: T.teal,
                cl: "float2",
              },
              {
                v: "1 Dec 2025",
                l: "Applications Start From",
                bg: T.tealLight,
                tc: "white",
                cl: "float1",
              },
            ].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
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
        {/* ══ ADMISSION PROCESS ═══════════════════════════════════ */}
        <section id="process">
          <SectionHeader
            tag="How to Apply"
            title="Admission Process"
            sub="5 simple steps to secure your child's seat at Shree Ram Public School"
            accent={T.teal}
          />
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* connector line (desktop) */}
            <div
              className="absolute hidden md:block top-10 left-[10%] right-[10%] h-0.5 z-0"
              style={{
                background: `linear-gradient(90deg, ${T.gold}, ${T.teal}, ${T.gold})`,
              }}
            />
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.13 }}
                whileHover={{ y: -6 }}
                className="card-lift relative z-10 bg-white rounded-2xl border-2 p-6 text-center shadow-md"
                style={{ borderColor: T.tealPale }}
              >
                {/* step number badge */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg mx-auto mb-3 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${T.teal}, ${T.tealLight})`,
                    color: "white",
                  }}
                >
                  {step.num}
                </div>
                <div className="text-3xl mb-2">{step.icon}</div>
                <h3
                  className="text-base font-black mb-2"
                  style={{
                    color: T.text,
                    fontFamily: "'Montserrat',sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: T.muted }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ ELIGIBILITY ══════════════════════════════════════════ */}
        <section>
          <SectionHeader
            tag="Who Can Apply"
            title="Eligibility Criteria"
            accent={T.goldDark}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {eligibility.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="card-lift bg-white rounded-2xl border-2 p-6 text-center shadow-sm"
                style={{ borderColor: e.color + "50" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow"
                  style={{
                    background: e.color + "18",
                    border: `2px solid ${e.color}40`,
                  }}
                >
                  🎓
                </div>
                <h3
                  className="text-lg font-black mb-2"
                  style={{
                    color: e.color,
                    fontFamily: "'Montserrat',sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {e.level}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: T.muted }}
                >
                  {e.age}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ FEE STRUCTURE ════════════════════════════════════════ */}
        <section>
          <SectionHeader
            tag="Fee Structure"
            title="Annual Fee Details"
            sub="Transparent and structured fee plan for all classes"
            accent={T.teal}
          />
          <motion.div
            ref={feeRef}
            initial={{ opacity: 0, y: 24 }}
            animate={feeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl border-2 shadow-xl overflow-hidden"
            style={{ borderColor: T.tealPale }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    style={{
                      background: `linear-gradient(90deg, ${T.tealDark}, ${T.teal})`,
                    }}
                  >
                    {[
                      "Class / Group",
                      "Tuition Fee (₹)",
                      "Annual Charges (₹)",
                      "Total Annual (₹)",
                    ].map((h) => (
                      <th
                        key={h}
                        className="py-4 px-6 text-left text-xs font-black uppercase tracking-widest text-white/90"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fees.map((row, i) => (
                    <FeeRow key={i} row={row} i={i} inView={feeInView} />
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="px-6 py-4 border-t flex items-center gap-2"
              style={{ borderColor: T.tealPale, background: T.cream }}
            >
              <span className="text-base">ℹ️</span>
              <p className="text-xs" style={{ color: T.muted }}>
                * Transport, examination fees, and other charges are applicable
                separately as per actuals.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ══ IMPORTANT DATES ══════════════════════════════════════ */}
        <section>
          <SectionHeader
            tag="Key Dates"
            title="Important Dates 2026–27"
            accent={T.goldDark}
          />
          {/* timeline */}
          <div className="relative">
            {/* horizontal line */}
            <div
              className="hidden md:block absolute top-8 left-0 right-0 h-0.5 z-0"
              style={{
                background: `linear-gradient(90deg,${T.gold},${T.teal},${T.gold})`,
              }}
            />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative z-10">
              {importantDates.map((item, i) => (
                <TimelineDot key={i} item={item} i={i} />
              ))}
            </div>
          </div>
          {/* calendar cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mt-10">
            {importantDates.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-lift bg-white rounded-2xl border-2 p-5 text-center shadow-sm"
                style={{ borderColor: item.color + "50" }}
              >
                <p className="text-2xl mb-1">{item.icon}</p>
                <p
                  className="text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color: item.color }}
                >
                  {item.event}
                </p>
                <p className="text-base font-black" style={{ color: T.text }}>
                  {item.date}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ SCHOLARSHIPS ═════════════════════════════════════════ */}
        <section>
          <SectionHeader
            tag="Financial Aid"
            title="Scholarships & Concessions"
            sub="We believe every deserving student should have access to quality education"
            accent={T.teal}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {scholarships.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="card-lift rounded-2xl border-2 p-6 shadow-sm"
                style={{ background: s.bg, borderColor: s.border + "60" }}
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3
                  className="font-black text-base mb-2"
                  style={{
                    color: T.text,
                    fontFamily: "'Montserrat',sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: T.muted }}
                >
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="font-black px-8 py-3 rounded-2xl text-sm shadow-lg"
              style={{ background: T.gold, color: T.tealDark }}
            >
              Check Scholarship Eligibility →
            </motion.button>
          </div>
        </section>

        {/* ══ DOWNLOAD FORMS ═══════════════════════════════════════ */}
        <section id="apply">
          <SectionHeader
            tag="Get Started"
            title="Download Forms"
            accent={T.goldDark}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Application Form",
                sub: "Fill & submit to begin the process",
                icon: "📋",
                primary: true,
              },
              {
                title: "School Prospectus",
                sub: "Complete guide to our programs",
                icon: "📖",
                primary: false,
              },
            ].map((d, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, x: i === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="card-lift flex items-center gap-5 rounded-2xl border-2 p-7 shadow-md cursor-pointer"
                style={{
                  background: d.primary ? T.teal : "white",
                  borderColor: d.primary ? T.teal : T.tealPale,
                  color: d.primary ? "white" : T.text,
                }}
              >
                <div className="text-5xl">{d.icon}</div>
                <div className="flex-1">
                  <h3
                    className="text-lg font-black"
                    style={{
                      fontFamily: "'Montserrat',sans-serif",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {d.title}
                  </h3>
                  <p
                    className="text-sm mt-0.5"
                    style={{
                      color: d.primary ? "rgba(255,255,255,0.7)" : T.muted,
                    }}
                  >
                    {d.sub}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{
                    background: d.primary
                      ? T.gold + "40"
                      : "rgba(13,110,122,0.1)",
                  }}
                >
                  ⬇
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        {/* ══ FAQs ═════════════════════════════════════════════════ */}
        <section>
          <SectionHeader
            tag="FAQs"
            title="Frequently Asked Questions"
            accent={T.teal}
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <FAQ key={i} faq={faq} i={i} />
            ))}
          </div>
        </section>
      </div>

      {/* ══ CONTACT BAND ══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-16 text-white text-center"
        style={{
          background: `linear-gradient(135deg,${T.tealDark},${T.teal},${T.tealLight})`,
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(white 1px,transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl md:text-4xl font-black mb-3"
              style={{
                fontFamily: "'Montserrat',sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Need Help? <span className="gold-shimmer">Talk To Us</span>
            </h2>
            <p className="text-white/70 mb-10 max-w-md mx-auto">
              Our admission team is happy to answer all your queries. Reach out
              anytime.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
              {[
                {
                  icon: "📞",
                  label: "Phone",
                  val: "+91-01252-299999 | 8199991081",
                },
                {
                  icon: "📧",
                  label: "Email",
                  val: "admissions@srpskanhra.com",
                },
                { icon: "📍", label: "Office", val: "Mon–Sat, 9 AM – 3 PM" },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border px-6 py-4 text-left"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    borderColor: "rgba(255,255,255,0.2)",
                  }}
                >
                  <p className="text-lg mb-0.5">
                    {c.icon}{" "}
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70 ml-1">
                      {c.label}
                    </span>
                  </p>
                  <p className="font-bold text-sm">{c.val}</p>
                </motion.div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="font-black px-10 py-4 rounded-2xl text-base shadow-2xl"
              style={{ background: T.gold, color: T.tealDark }}
            >
              Enquire Now →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

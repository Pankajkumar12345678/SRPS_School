import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   COLOR SYSTEM — Shree Ram Public School NCC Theme
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

/* ─── NCC DATA ───────────────────────────────────────────── */
const nccStats = [
  { label: "Active Cadets", value: "150+", icon: "🪖" },
  { label: "Training Hours/Year", value: "200+", icon: "⏱️" },
  { label: "Achievements", value: "25+", icon: "🏆" },
  { label: "Officers", value: "8", icon: "👨‍✈️" },
];

const activities = [
  {
    icon: "🪖",
    title: "Drill & Discipline",
    desc: "Character building through rigorous military training, leadership development, and physical fitness.",
    color: T.teal,
  },
  {
    icon: "🎖️",
    title: "Certificate Courses",
    desc: "Advanced training programs leading to A, B, and C certificates recognized nationally.",
    color: T.gold,
  },
  {
    icon: "🏃",
    title: "Sports & Athletics",
    desc: "Regular sports competitions, athletic events, and inter-school NCC competitions.",
    color: T.tealLight,
  },
  {
    icon: "🎯",
    title: "Outdoor Expedition",
    desc: "Adventure camps, trekking, and field training to develop survival and leadership skills.",
    color: T.goldDark,
  },
];

const nccImages = [
  { src: "/School_pic/NCC_Pic_22.JPG", caption: "🪖 Drill Training", award: false },
  { src: "/School_pic/NCC_Pic_35.JPEG", caption: "🥇 First Position Trophy", award: true },
  { src: "/School_pic/NCC_Pic_36.JPEG", caption: "🏆 District Level Parade", award: true },
  { src: "/School_pic/NCC_Pic_Primnester_29.JPEG", caption: "🇮🇳 Rashtrapati Bhavan Visit", award: true },
  { src: "/School_pic/NCC_Pic_Primenester_30.JPG", caption: "⭐ President's Honor", award: true },
  { src: "/School_pic/NCC_Pic_37.JPG", caption: "📋 Cadet Activities", award: false },
  { src: "/School_pic/NCC_Pic_38.JPG", caption: "🎖️ Certificate Award", award: false },
  { src: "/School_pic/NCC_Pic_Primenester_30.JPG", caption: "🌟 Leadership Camp", award: false },
];

const achievements = [
  "1st Position in District Level NCC Parade",
  "Recognition from the President of India",
  "National Best NCC Unit Award (2023–24)",
  "150+ cadets trained annually",
  "8 commissioned officers from SRPS NCC",
  "Camp certifications for all senior cadets",
];

const nccInfo = [
  {
    title: "Affiliation",
    content: "16 Haryana Battalion NCC (Army Wing)",
    icon: "🛡️",
  },
  {
    title: "Motto",
    content: "Unity and Discipline",
    icon: "🎖️",
  },
  {
    title: "Vision",
    content: "Develop disciplined, responsible, and patriotic citizens",
    icon: "🇮🇳",
  },
  {
    title: "Training Focus",
    content: "Character, leadership, physical fitness & patriotism",
    icon: "⭐",
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

/* ─── STAT CARD ──────────────────────────────────────────── */
function StatCard({ stat, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1 }}
      whileHover={{ y: -5 }}
      className="rounded-2xl p-6 text-center shadow-md border-2"
      style={{
        background: "white",
        borderColor: T.tealPale,
      }}
    >
      <div className="text-4xl mb-3">{stat.icon}</div>
      <p
        className="text-2xl font-black mb-1"
        style={{ color: T.teal, fontFamily: "'Montserrat', sans-serif" }}
      >
        {stat.value}
      </p>
      <p style={{ color: T.muted, fontSize: "0.9rem", fontWeight: 600 }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ─── ACTIVITY CARD ──────────────────────────────────────── */
function ActivityCard({ activity, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.12 }}
      whileHover={{ y: -6 }}
      className="rounded-2xl border-2 p-7 shadow-md cursor-pointer"
      style={{
        background: "white",
        borderColor: activity.color + "40",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = activity.color + "80";
        e.currentTarget.style.boxShadow = `0 20px 48px ${activity.color}22`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = activity.color + "40";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
      }}
    >
      <div className="text-4xl mb-4">{activity.icon}</div>
      <h3
        className="text-lg font-black mb-3"
        style={{
          color: activity.color,
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        {activity.title}
      </h3>
      <p style={{ color: T.muted, fontSize: "0.95rem", lineHeight: 1.6 }}>
        {activity.desc}
      </p>
    </motion.div>
  );
}

/* ─── GALLERY ITEM ───────────────────────────────────────── */
function GalleryItem({ img, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: i * 0.08 }}
      whileHover={{ scale: 1.04 }}
      className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
    >
      <img
        src={img.src}
        alt={img.caption}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        onError={(e) => {
          e.target.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 320'%3E%3Crect fill='%23e6f4f6' width='400' height='320'/%3E%3Ctext x='50%' y='50%' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='18' fill='%230d6e7a'%3EImage Not Found%3C/text%3E%3C/svg%3E";
        }}
      />
      {img.award && (
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
          style={{ background: T.gold, color: T.tealDark }}
        >
          🏆 Award
        </div>
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <p className="text-white text-sm font-semibold">{img.caption}</p>
      </div>
    </motion.div>
  );
}

/* ─── INFO CARD ──────────────────────────────────────────── */
function InfoCard({ info, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: i * 0.1 }}
      className="rounded-2xl border-2 p-6 shadow-md"
      style={{
        background: T.tealPale,
        borderColor: T.teal,
      }}
    >
      <div className="text-3xl mb-3">{info.icon}</div>
      <h3
        className="text-base font-black mb-2"
        style={{
          color: T.teal,
          fontFamily: "'Montserrat', sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        {info.title}
      </h3>
      <p style={{ color: T.text, fontSize: "0.95rem", fontWeight: 500 }}>
        {info.content}
      </p>
    </motion.div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────── */
export default function NCCPage() {
  const achieveRef = useRef(null);
  const achieveInView = useInView(achieveRef, { once: true, amount: 0.3 });

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
        @keyframes dotPop {
          0%,100%{transform:scale(1);opacity:0.4}
          50%{transform:scale(1.5);opacity:0.9}
        }
        @keyframes shimmerGold {
          0%{background-position:-200% center}
          100%{background-position:200% center}
        }
        .gold-shimmer {
          background: linear-gradient(90deg,${T.gold} 0%,#ffe599 40%,${T.goldLight} 55%,#ffe599 70%,${T.gold} 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerGold 3.5s linear infinite;
        }
      `}</style>

      {/* ════════════════════════════════════════════════════
          HERO SECTION — 50vh
      ════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: "50vh", background: T.teal }}
      >
        {/* animated dots */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 32 }, (_, i) => (
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

        {/* gradient blobs */}
        <div
          className="absolute -top-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: T.gold }}
        />
        <div
          className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full blur-3xl opacity-15"
          style={{ background: T.tealLight }}
        />

        <div className="relative z-10 container mx-auto px-6 py-14 md:py-20">
          <motion.div
            className="text-white"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
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
              National Cadet Corps
            </div>
            <h1
              className="leading-tight mb-4 drop-shadow-xl"
              style={{
                fontSize: "clamp(2.4rem,5.5vw,4rem)",
                fontFamily: "'Montserrat',sans-serif",
                fontWeight: 900,
              }}
            >
              Discipline • Leadership
              <br />
              <span className="gold-shimmer" style={{ fontSize: "0.85em" }}>
                Character Excellence
              </span>
            </h1>
            <p className="max-w-lg leading-relaxed mb-8 text-white/80 text-base">
              National Cadet Corps – Army Wing under 16 Haryana Battalion. Building disciplined, patriotic citizens through military training, leadership development, and character building.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#activities"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="font-black px-7 py-3 rounded-2xl text-sm shadow-xl flex items-center gap-2"
                style={{ background: T.gold, color: T.tealDark }}
              >
                🪖 Explore NCC
              </motion.a>
              <motion.a
                href="#achievements"
                whileHover={{ scale: 1.05 }}
                className="font-bold px-7 py-3 rounded-2xl text-sm border-2 text-white flex items-center gap-2"
                style={{
                  borderColor: "rgba(255,255,255,0.35)",
                  background: "rgba(255,255,255,0.1)",
                }}
              >
                🏆 Achievements
              </motion.a>
            </div>
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
        {/* ══ NCC INFO CARDS ═════════════════════════════════════ */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {nccInfo.map((info, i) => (
            <InfoCard key={i} info={info} i={i} />
          ))}
        </section>

        {/* ══ STATISTICS ═════════════════════════════════════════ */}
        <section>
          <SectionHeader
            tag="By The Numbers"
            title="NCC at Shree Ram"
            sub="Impact and presence of our National Cadet Corps program"
            accent={T.teal}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nccStats.map((stat, i) => (
              <StatCard key={i} stat={stat} i={i} />
            ))}
          </div>
        </section>

        {/* ══ ACTIVITIES ═════════════════════════════════════════ */}
        <section id="activities">
          <SectionHeader
            tag="What We Do"
            title="NCC Activities"
            sub="Comprehensive training programs for character development and leadership"
            accent={T.gold}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity, i) => (
              <ActivityCard key={i} activity={activity} i={i} />
            ))}
          </div>
        </section>

        {/* ══ GALLERY ═════════════════════════════════════════════ */}
        <section>
          <SectionHeader
            tag="Our Cadets in Action"
            title="Photo Gallery"
            sub="Moments of excellence, discipline, and patriotism"
            accent={T.tealLight}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nccImages.map((img, i) => (
              <GalleryItem key={i} img={img} i={i} />
            ))}
          </div>
        </section>

        {/* ══ ACHIEVEMENTS ═══════════════════════════════════════ */}
        <section id="achievements">
          <SectionHeader
            tag="Excellence"
            title="Key Achievements"
            sub="Recognition and accomplishments of our NCC program"
            accent={T.tealDark}
          />
          <motion.div
            ref={achieveRef}
            initial={{ opacity: 0 }}
            animate={achieveInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={achieveInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 rounded-2xl shadow-md border-2"
                style={{
                  background: "white",
                  borderColor: T.tealPale,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xl"
                  style={{
                    background: T.gold + "20",
                    color: T.gold,
                  }}
                >
                  🏅
                </div>
                <p
                  className="text-base font-semibold"
                  style={{ color: T.text, lineHeight: 1.5 }}
                >
                  {achievement}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ══ CALL TO ACTION ════════════════════════════════════ */}
        <section
          className="relative overflow-hidden py-16 text-white text-center rounded-3xl"
          style={{
            background: `linear-gradient(135deg,${T.tealDark},${T.teal},${T.tealLight})`,
          }}
        >
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
              Join the NCC <span className="gold-shimmer">Family</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Become part of a legacy of discipline, patriotism, and leadership. Build a stronger character and future with NCC training.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="font-black px-10 py-3 rounded-2xl text-base shadow-xl"
              style={{ background: T.gold, color: T.tealDark }}
            >
              Contact Admissions →
            </motion.button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

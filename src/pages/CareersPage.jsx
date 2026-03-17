import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   COLOR SYSTEM — Shree Ram Public School Logo
═══════════════════════════════════════════════ */
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

/* ─── DATA ──────────────────────────────────── */
const teachingJobs = [
  {
    id: 1,
    title: "Nursery Teacher",
    dept: "Pre-Primary",
    cat: "PRT",
    qual: "NTT / D.El.Ed / B.Ed",
    exp: "1–3 yrs",
    type: "Full-time",
    vac: 2,
    salary: "₹15,000–22,000/mo",
    icon: "🧒",
    skills: [
      "Child Dev",
      "Creative Activities",
      "Classroom Mgmt",
      "Parent Comm",
    ],
  },
  {
    id: 2,
    title: "LKG Teacher",
    dept: "Pre-Primary",
    cat: "PRT",
    qual: "NTT / D.El.Ed",
    exp: "1–3 yrs",
    type: "Full-time",
    vac: 2,
    salary: "₹15,000–22,000/mo",
    icon: "🧒",
    skills: ["Early Childhood", "Phonics", "Storytelling", "Art & Craft"],
  },
  {
    id: 3,
    title: "UKG Teacher",
    dept: "Pre-Primary",
    cat: "PRT",
    qual: "NTT / D.El.Ed",
    exp: "1–3 yrs",
    type: "Full-time",
    vac: 2,
    salary: "₹15,000–22,000/mo",
    icon: "🧒",
    skills: ["Early Literacy", "Numeracy", "Rhymes", "Activity Planning"],
  },
  {
    id: 4,
    title: "Primary English Teacher",
    dept: "Primary (I–V)",
    cat: "PRT",
    qual: "B.A. English, B.Ed",
    exp: "2–5 yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹20,000–30,000/mo",
    icon: "📖",
    skills: ["Grammar", "Creative Writing", "Phonics", "Engagement"],
  },
  {
    id: 5,
    title: "Primary Hindi Teacher",
    dept: "Primary (I–V)",
    cat: "PRT",
    qual: "B.A. Hindi, B.Ed",
    exp: "2–5 yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹20,000–30,000/mo",
    icon: "📖",
    skills: ["Hindi Grammar", "Literature", "Poetry", "Storytelling"],
  },
  {
    id: 6,
    title: "Primary Maths Teacher",
    dept: "Primary (I–V)",
    cat: "PRT",
    qual: "B.Sc. Maths, B.Ed",
    exp: "2–5 yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹20,000–30,000/mo",
    icon: "📐",
    skills: ["Arithmetic", "Geometry", "Problem Solving", "Activity Learning"],
  },
  {
    id: 7,
    title: "Primary EVS Teacher",
    dept: "Primary (I–V)",
    cat: "PRT",
    qual: "B.Sc./B.A., B.Ed",
    exp: "2–5 yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹20,000–30,000/mo",
    icon: "🌿",
    skills: ["Science Basics", "Social Studies", "Experiments", "Projects"],
  },
  {
    id: 8,
    title: "TGT English",
    dept: "Middle School (VI–VIII)",
    cat: "TGT",
    qual: "M.A. English, B.Ed",
    exp: "3–6 yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹25,000–35,000/mo",
    icon: "✍️",
    skills: ["Adv Grammar", "Literature Analysis", "Writing", "Drama"],
  },
  {
    id: 9,
    title: "TGT Hindi",
    dept: "Middle School (VI–VIII)",
    cat: "TGT",
    qual: "M.A. Hindi, B.Ed",
    exp: "3–6 yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹25,000–35,000/mo",
    icon: "✍️",
    skills: ["Hindi Sahitya", "Vyakarana", "Creative Writing"],
  },
  {
    id: 10,
    title: "TGT Maths",
    dept: "Middle School (VI–VIII)",
    cat: "TGT",
    qual: "M.Sc. Maths, B.Ed",
    exp: "3–6 yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹25,000–35,000/mo",
    icon: "📐",
    skills: ["Algebra", "Geometry", "Mensuration", "Problem Solving"],
  },
  {
    id: 11,
    title: "TGT Science",
    dept: "Middle School (VI–VIII)",
    cat: "TGT",
    qual: "M.Sc., B.Ed",
    exp: "3–6 yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹25,000–35,000/mo",
    icon: "🔬",
    skills: ["Physics", "Chemistry", "Biology", "Lab Demos"],
  },
  {
    id: 12,
    title: "TGT Social Science",
    dept: "Middle School (VI–VIII)",
    cat: "TGT",
    qual: "M.A., B.Ed",
    exp: "3–6 yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹25,000–35,000/mo",
    icon: "🌍",
    skills: ["History", "Geography", "Civics", "Map Work"],
  },
  {
    id: 13,
    title: "TGT Computer Science",
    dept: "Middle School (VI–VIII)",
    cat: "TGT",
    qual: "BCA/MCA/B.Tech, B.Ed",
    exp: "2–5 yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹22,000–32,000/mo",
    icon: "💻",
    skills: ["Programming", "MS Office", "Internet", "Scratch/Python"],
  },
  {
    id: 14,
    title: "PGT Mathematics",
    dept: "Senior Secondary (IX–XII)",
    cat: "PGT",
    qual: "M.Sc. Maths, B.Ed",
    exp: "5+ yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹35,000–50,000/mo",
    icon: "📊",
    skills: ["Calculus", "Algebra", "Trigonometry", "Board Prep"],
  },
  {
    id: 15,
    title: "PGT Physics",
    dept: "Senior Secondary (IX–XII)",
    cat: "PGT",
    qual: "M.Sc. Physics, B.Ed",
    exp: "5+ yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹35,000–50,000/mo",
    icon: "⚛️",
    skills: ["Mechanics", "Electromagnetism", "Optics", "Modern Physics"],
  },
  {
    id: 16,
    title: "PGT Chemistry",
    dept: "Senior Secondary (IX–XII)",
    cat: "PGT",
    qual: "M.Sc. Chemistry, B.Ed",
    exp: "5+ yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹35,000–50,000/mo",
    icon: "🧪",
    skills: ["Organic", "Inorganic", "Physical Chem", "Lab Safety"],
  },
  {
    id: 17,
    title: "PGT Biology",
    dept: "Senior Secondary (IX–XII)",
    cat: "PGT",
    qual: "M.Sc. Biology, B.Ed",
    exp: "5+ yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹35,000–50,000/mo",
    icon: "🧬",
    skills: ["Botany", "Zoology", "Biotechnology", "Ecology"],
  },
  {
    id: 18,
    title: "PGT Computer Science",
    dept: "Senior Secondary (IX–XII)",
    cat: "PGT",
    qual: "MCA/B.Tech, B.Ed",
    exp: "5+ yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹35,000–50,000/mo",
    icon: "💻",
    skills: ["Python", "Java", "SQL", "Data Structures"],
  },
  {
    id: 19,
    title: "PGT Economics",
    dept: "Senior Secondary (IX–XII)",
    cat: "PGT",
    qual: "M.A. Economics, B.Ed",
    exp: "5+ yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹35,000–50,000/mo",
    icon: "📈",
    skills: ["Microeconomics", "Macroeconomics", "Statistics"],
  },
  {
    id: 20,
    title: "Special Educator",
    dept: "Inclusive Education",
    cat: "Specialist",
    qual: "B.Ed Special Ed / RCI",
    exp: "2+ yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹25,000–35,000/mo",
    icon: "🤝",
    skills: ["IEP", "Remedial Teaching", "Counseling", "Patience"],
  },
  {
    id: 21,
    title: "School Counsellor",
    dept: "Student Support",
    cat: "Specialist",
    qual: "M.A. Psychology, Diploma",
    exp: "2+ yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹25,000–35,000/mo",
    icon: "💬",
    skills: ["Counseling", "Career Guidance", "Mental Health"],
  },
  {
    id: 22,
    title: "Music Teacher",
    dept: "Co-curricular",
    cat: "Specialist",
    qual: "Degree/Diploma in Music",
    exp: "2+ yrs",
    type: "Part-time",
    vac: 1,
    salary: "₹15,000–25,000/mo",
    icon: "🎵",
    skills: ["Vocal", "Instrument", "Music Theory", "Performances"],
  },
  {
    id: 23,
    title: "Dance Teacher",
    dept: "Co-curricular",
    cat: "Specialist",
    qual: "Degree/Diploma in Dance",
    exp: "2+ yrs",
    type: "Part-time",
    vac: 1,
    salary: "₹15,000–25,000/mo",
    icon: "💃",
    skills: ["Classical Dance", "Contemporary", "Choreography"],
  },
  {
    id: 24,
    title: "Art Teacher",
    dept: "Co-curricular",
    cat: "Specialist",
    qual: "BFA / Diploma in Fine Arts",
    exp: "2+ yrs",
    type: "Part-time",
    vac: 1,
    salary: "₹15,000–25,000/mo",
    icon: "🎨",
    skills: ["Drawing", "Painting", "Crafts", "Art History"],
  },
  {
    id: 25,
    title: "PT Teacher",
    dept: "Sports",
    cat: "Specialist",
    qual: "BPEd / Diploma in Sports",
    exp: "2+ yrs",
    type: "Full-time",
    vac: 2,
    salary: "₹20,000–30,000/mo",
    icon: "🏅",
    skills: ["Sports Coaching", "Fitness", "Team Management"],
  },
  {
    id: 26,
    title: "Robotics Teacher",
    dept: "STEM",
    cat: "Specialist",
    qual: "B.E./B.Tech (CS/ECE)",
    exp: "1+ yr",
    type: "Contract",
    vac: 1,
    salary: "₹25,000–35,000/mo",
    icon: "🤖",
    skills: ["Robotics Kits", "Programming", "Electronics"],
  },
];

const nonTeachingJobs = [
  {
    id: 101,
    title: "Administrative Officer",
    dept: "Administration",
    qual: "MBA / Graduate",
    exp: "5+ yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹30,000–45,000/mo",
    icon: "🏢",
    skills: ["Leadership", "Communication", "Office Mgmt"],
  },
  {
    id: 102,
    title: "Accountant",
    dept: "Finance",
    qual: "B.Com, Tally",
    exp: "3+ yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹20,000–30,000/mo",
    icon: "🧾",
    skills: ["Tally", "GST", "Excel", "Bookkeeping"],
  },
  {
    id: 103,
    title: "Clerk",
    dept: "Administration",
    qual: "Graduate, Typing",
    exp: "1–3 yrs",
    type: "Full-time",
    vac: 2,
    salary: "₹12,000–18,000/mo",
    icon: "📂",
    skills: ["Typing", "MS Office", "Organizational Skills"],
  },
  {
    id: 104,
    title: "Receptionist",
    dept: "Front Office",
    qual: "Graduate",
    exp: "1–3 yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹12,000–18,000/mo",
    icon: "☎️",
    skills: ["Communication", "MS Office", "Multitasking"],
  },
  {
    id: 105,
    title: "Bus Driver",
    dept: "Transport",
    qual: "Heavy Vehicle License",
    exp: "5+ yrs",
    type: "Full-time",
    vac: 2,
    salary: "₹15,000–22,000/mo",
    icon: "🚌",
    skills: ["Safe Driving", "Route Knowledge", "Maintenance"],
  },
  {
    id: 106,
    title: "IT Support",
    dept: "IT",
    qual: "BCA / Diploma IT",
    exp: "1–3 yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹15,000–22,000/mo",
    icon: "🖥️",
    skills: ["Hardware", "Networking", "Troubleshooting"],
  },
  {
    id: 107,
    title: "School Nurse",
    dept: "Health",
    qual: "GNM / B.Sc Nursing",
    exp: "2+ yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹18,000–25,000/mo",
    icon: "🏥",
    skills: ["First Aid", "Health Assessment", "Emergency Care"],
  },
  {
    id: 108,
    title: "Security Guard",
    dept: "Security",
    qual: "10th Pass, Security Training",
    exp: "2+ yrs",
    type: "Full-time",
    vac: 3,
    salary: "₹10,000–15,000/mo",
    icon: "🛡️",
    skills: ["Vigilance", "Basic Writing", "Emergency Response"],
  },
  {
    id: 109,
    title: "Gardener",
    dept: "Maintenance",
    qual: "Experience in Gardening",
    exp: "2+ yrs",
    type: "Full-time",
    vac: 2,
    salary: "₹10,000–15,000/mo",
    icon: "🌿",
    skills: ["Plant Care", "Landscaping", "Irrigation"],
  },
  {
    id: 110,
    title: "Maintenance (Electrician)",
    dept: "Maintenance",
    qual: "ITI Electrician",
    exp: "2+ yrs",
    type: "Full-time",
    vac: 1,
    salary: "₹12,000–18,000/mo",
    icon: "⚡",
    skills: ["Electrical Wiring", "Troubleshooting", "Safety"],
  },
];

const steps = [
  {
    n: "01",
    icon: "👤",
    title: "Register",
    desc: "Create an account with your email and mobile number.",
  },
  {
    n: "02",
    icon: "🔐",
    title: "Verify OTP",
    desc: "Verify your email and mobile with a one-time password.",
  },
  {
    n: "03",
    icon: "📋",
    title: "Fill Application",
    desc: "Complete the form with personal details, qualifications, and experience.",
  },
  {
    n: "04",
    icon: "📎",
    title: "Upload Documents",
    desc: "Upload your CV, certificates, and an optional video introduction.",
  },
  {
    n: "05",
    icon: "✅",
    title: "Submit",
    desc: "Review and submit. Receive a confirmation email instantly.",
  },
];

const benefits = [
  {
    icon: "💰",
    title: "Competitive Salary",
    desc: "Attractive packages with regular increments and performance bonuses.",
    color: T.gold,
  },
  {
    icon: "⚖️",
    title: "Work-Life Balance",
    desc: "Reasonable hours, school holidays, and a healthy work environment.",
    color: T.teal,
  },
  {
    icon: "🏆",
    title: "Professional Growth",
    desc: "Regular workshops, training sessions, and career advancement paths.",
    color: T.goldDark,
  },
  {
    icon: "🤝",
    title: "Supportive Culture",
    desc: "Collaborative atmosphere with modern facilities and leadership support.",
    color: T.tealLight,
  },
];

const faqs = [
  {
    q: "What documents do I need to apply?",
    a: "Updated CV, educational certificates, experience letters, a recent photograph. Optionally a short video introduction (2–3 min).",
  },
  {
    q: "How does OTP verification work?",
    a: "After registration you receive an OTP on your email and mobile. Enter both codes to verify your contact details and secure your application.",
  },
  {
    q: "Can I apply for multiple positions?",
    a: "Yes, but each position requires a separate application submission.",
  },
  {
    q: "What is the selection process?",
    a: "Shortlisted candidates are contacted for an interview (online or in-person). Teaching roles may include a demo class. Final selection is based on qualifications and performance.",
  },
];

const catColor = {
  PRT: T.teal,
  TGT: T.goldDark,
  PGT: T.tealLight,
  Specialist: T.gold,
  Coach: T.goldDark,
};

/* ─── HELPERS ─────────────────────────────── */
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
          fontFamily: "'Montserrat',sans-serif",
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
        style={{ background: `linear-gradient(90deg,${accent},${T.gold})` }}
      />
    </motion.div>
  );
}

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
          <h3 className="font-bold text-sm" style={{ color: T.text }}>
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

/* ─── JOB CARD ────────────────────────────── */
function JobCard({ job, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const cc = catColor[job.cat] || T.teal;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, boxShadow: `0 20px 48px rgba(13,110,122,0.16)` }}
      className="bg-white rounded-2xl border-2 overflow-hidden cursor-pointer group"
      style={{ borderColor: T.tealPale }}
      onClick={() => onClick(job)}
    >
      {/* color stripe */}
      <div
        className="h-1.5"
        style={{
          background: `linear-gradient(90deg,${T.teal},${T.gold},${T.tealLight})`,
        }}
      />
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: cc + "18" }}
          >
            {job.icon}
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: "#dcfce7", color: "#166534" }}
          >
            {job.vac} {job.vac > 1 ? "Vacancies" : "Vacancy"}
          </span>
        </div>
        <h3
          className="font-black text-base mb-0.5 group-hover:text-teal-700 transition-colors"
          style={{
            color: T.text,
            fontFamily: "'Montserrat',sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          {job.title}
        </h3>
        <p className="text-xs mb-3" style={{ color: T.muted }}>
          {job.dept}
        </p>
        <div className="space-y-1.5 mb-4">
          <p className="text-xs" style={{ color: T.muted }}>
            <b style={{ color: T.text }}>Qualification:</b> {job.qual}
          </p>
          <p className="text-xs" style={{ color: T.muted }}>
            <b style={{ color: T.text }}>Experience:</b> {job.exp}
          </p>
          <p className="text-xs font-bold" style={{ color: T.teal }}>
            {job.salary}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span
            className="px-2 py-0.5 rounded-full text-xs font-bold"
            style={{ background: cc + "20", color: cc }}
          >
            {job.cat}
          </span>
          <span
            className="px-2 py-0.5 rounded-full text-xs border"
            style={{ borderColor: T.tealPale, color: T.muted }}
          >
            {job.type}
          </span>
        </div>
        <button
          className="w-full py-2.5 rounded-xl text-xs font-black transition-colors"
          style={{ background: T.tealPale, color: T.teal }}
          onMouseEnter={(e) => {
            e.target.style.background = T.teal;
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = T.tealPale;
            e.target.style.color = T.teal;
          }}
        >
          View Details & Apply →
        </button>
      </div>
    </motion.div>
  );
}

/* ─── OTP INPUT ───────────────────────────── */
function OtpInput() {
  const [vals, setVals] = useState(["", "", "", "", "", ""]);
  const refs = Array.from({ length: 6 }, () => useRef(null));
  const handleChange = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...vals];
    next[i] = v;
    setVals(next);
    if (v && i < 5) refs[i + 1].current?.focus();
  };
  return (
    <div className="flex gap-2 justify-center">
      {vals.map((v, i) => (
        <input
          key={i}
          ref={refs[i]}
          value={v}
          maxLength={1}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !v && i > 0)
              refs[i - 1].current?.focus();
          }}
          className="w-10 h-12 rounded-xl text-center text-lg font-black border-2 outline-none transition-colors"
          style={{ borderColor: v ? T.teal : T.tealPale, color: T.text }}
        />
      ))}
    </div>
  );
}

/* ─── MAIN ────────────────────────────────── */
export default function CareersPage() {
  const [tab, setTab] = useState("teaching");
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalStep, setModalStep] = useState("details"); // details | form | otp | success
  const [otpPhase, setOtpPhase] = useState(1); // 1=enter contact, 2=enter OTP

  const jobs = tab === "teaching" ? teachingJobs : nonTeachingJobs;

  const openJob = (job) => {
    setSelectedJob(job);
    setModalStep("details");
  };
  const closeAll = () => {
    setSelectedJob(null);
    setModalStep("details");
    setOtpPhase(1);
  };

  return (
    <div
      style={{
        fontFamily: "'Montserrat',sans-serif",
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
        @keyframes shimmerGold { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes dotPop { 0%,100%{transform:scale(1);opacity:0.3} 50%{transform:scale(1.5);opacity:0.8} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .gold-shimmer {
          background:linear-gradient(90deg,${T.gold} 0%,${T.goldLight} 30%,#fff4cc 50%,${T.goldLight} 70%,${T.gold} 100%);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:shimmerGold 3.5s linear infinite;
        }
        .float1{animation:floatY 4s ease-in-out infinite}
        .float2{animation:floatY 5.5s 1s ease-in-out infinite}
        .card-lift{transition:transform .25s ease,box-shadow .25s ease}
        .card-lift:hover{transform:translateY(-6px);box-shadow:0 20px 48px rgba(13,110,122,.16)}
        .spin-slow{animation:spinSlow 18s linear infinite}
        input:focus{border-color:${T.teal}!important;box-shadow:0 0 0 3px ${T.teal}22}
        textarea:focus{border-color:${T.teal}!important;box-shadow:0 0 0 3px ${T.teal}22}
      `}</style>

      {/* ════ HERO 50vh ════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: "50vh", background: T.teal }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 38 }, (_, i) => (
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
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(60deg,white 0,white 1px,transparent 0,transparent 50%)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          className="absolute -top-20 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: T.gold }}
        />
        <div
          className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full blur-3xl opacity-15"
          style={{ background: T.tealLight }}
        />
        {/* spinning ring */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block">
          <svg
            width="240"
            height="240"
            viewBox="0 0 240 240"
            className="spin-slow"
          >
            {Array.from({ length: 14 }, (_, i) => {
              const a = (i / 14) * Math.PI * 2;
              return (
                <circle
                  key={i}
                  cx={120 + 98 * Math.cos(a)}
                  cy={120 + 98 * Math.sin(a)}
                  r="5"
                  fill={T.gold}
                />
              );
            })}
            <circle
              cx="120"
              cy="120"
              r="75"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-14 flex flex-col md:flex-row items-center gap-12">
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
              Join Our Team · Est. 2012
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
                Careers at
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
                Shree Ram
              </span>
            </h1>
            <p className="max-w-md leading-relaxed mb-8 text-white/75 text-base">
              Shape the future one child at a time. We're looking for passionate
              educators and dedicated professionals to join our growing family.
            </p>
            <div className="flex flex-wrap gap-3">
              <motion.a
                href="#openings"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="font-black px-7 py-3 rounded-2xl text-sm shadow-xl flex items-center gap-2"
                style={{ background: T.gold, color: T.tealDark }}
              >
                💼 View Openings
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
                📋 How to Apply
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              {
                v: `${teachingJobs.length}`,
                l: "Teaching Roles",
                bg: T.gold,
                tc: T.tealDark,
                cl: "float1",
              },
              {
                v: `${nonTeachingJobs.length}`,
                l: "Non-Teaching Roles",
                bg: "white",
                tc: T.teal,
                cl: "float2",
              },
              {
                v: "Full-time",
                l: "Primary Role Type",
                bg: T.tealLight,
                tc: "white",
                cl: "float1",
              },
              {
                v: "Kanhra",
                l: "Campus Location",
                bg: T.goldDark,
                tc: "white",
                cl: "float2",
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
        {/* ══ WHY JOIN US ═════════════════════════════════════════ */}
        <section>
          <SectionHeader
            tag="Why Work Here"
            title="Why Join SRPS?"
            sub="A place where educators thrive and every contribution matters"
            accent={T.teal}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="card-lift bg-white rounded-2xl border-2 p-7 shadow-sm"
                style={{ borderColor: b.color + "40" }}
              >
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3
                  className="font-black text-base mb-2"
                  style={{
                    color: b.color,
                    fontFamily: "'Montserrat',sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {b.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: T.muted }}
                >
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ══ APPLICATION PROCESS ═════════════════════════════════ */}
        <section id="process">
          <SectionHeader
            tag="How to Apply"
            title="Application Process"
            sub="5 secure steps to submit your application"
            accent={T.goldDark}
          />
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4">
            <div
              className="absolute hidden md:block top-10 left-[10%] right-[10%] h-0.5 z-0"
              style={{
                background: `linear-gradient(90deg,${T.gold},${T.teal},${T.gold})`,
              }}
            />
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -5 }}
                className="card-lift relative z-10 bg-white rounded-2xl border-2 p-6 text-center shadow-md"
                style={{ borderColor: T.tealPale }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-black text-lg mx-auto mb-3 shadow-lg text-white"
                  style={{
                    background: `linear-gradient(135deg,${T.teal},${T.tealLight})`,
                  }}
                >
                  {s.n}
                </div>
                <div className="text-3xl mb-2">{s.icon}</div>
                <h3
                  className="font-black text-sm mb-2"
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
          {/* OTP note */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 rounded-2xl border-2 p-6 flex items-start gap-4"
            style={{ background: T.goldPale, borderColor: T.gold + "70" }}
          >
            <span className="text-3xl flex-shrink-0">🔐</span>
            <div>
              <h3
                className="font-black text-base mb-1"
                style={{ color: T.goldDark }}
              >
                Secure OTP Verification
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: T.text }}>
                To prevent fake applications, we use{" "}
                <b>One-Time Password verification</b> for both email and mobile.
                OTPs are valid for 10 minutes with up to 3 resend attempts.
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                {[
                  "✅ Email OTP sent instantly",
                  "✅ SMS OTP for mobile",
                  "✅ Valid for 10 minutes",
                  "✅ Up to 3 resends",
                ].map((t) => (
                  <span
                    key={t}
                    className="text-xs font-semibold"
                    style={{ color: T.goldDark }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══ JOB LISTINGS ════════════════════════════════════════ */}
        <section id="openings">
          <SectionHeader
            tag="Open Positions"
            title="Current Openings"
            sub={`${teachingJobs.length + nonTeachingJobs.length} positions across teaching and non-teaching roles`}
            accent={T.teal}
          />

          {/* tab switcher */}
          <div className="flex justify-center mb-10">
            <div
              className="inline-flex p-1.5 rounded-2xl gap-1"
              style={{ background: T.tealPale }}
            >
              {[
                { key: "teaching", label: `Teaching (${teachingJobs.length})` },
                {
                  key: "non-teaching",
                  label: `Non-Teaching (${nonTeachingJobs.length})`,
                },
              ].map((btn) => (
                <motion.button
                  key={btn.key}
                  onClick={() => setTab(btn.key)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={
                    tab === btn.key
                      ? {
                          background: T.teal,
                          color: "white",
                          boxShadow: `0 4px 16px ${T.teal}40`,
                        }
                      : { background: "transparent", color: T.muted }
                  }
                >
                  {btn.label}
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} onClick={openJob} />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ══ FAQs ════════════════════════════════════════════════ */}
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

      {/* ══ CONTACT BAND ════════════════════════════════════════ */}
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
              Have Questions? <span className="gold-shimmer">Reach Out</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Our HR team is happy to answer any queries about open positions.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-5 mb-8">
              {[
                { icon: "📞", label: "Phone", val: "+91-01252-299999" },
                { icon: "📧", label: "Email", val: "careers@srpskanhra.com" },
                { icon: "📍", label: "Visit", val: "Mon–Sat, 10 AM–3 PM" },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border px-6 py-4"
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
            <motion.a
              href="#openings"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block font-black px-10 py-4 rounded-2xl text-base shadow-2xl"
              style={{ background: T.gold, color: T.tealDark }}
            >
              Browse All Jobs →
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="border-t-2 py-8 text-center"
        style={{ borderColor: T.teal + "30", background: T.teal }}
      >
        <p
          className="text-xl text-white"
          style={{
            fontWeight: 800,
            letterSpacing: "-0.02em",
            fontFamily: "'Montserrat',sans-serif",
          }}
        >
          Shree Ram Public School
        </p>
        <p className="text-sm mt-1" style={{ color: T.goldLight }}>
          Kanhra-Badhra, Charkhi Dadri, Haryana — 127308
        </p>
        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
          Affiliation No. 532046 · School Code 42056 · CBSE · Est. 2012
        </p>
      </footer>

      {/* ══ JOB DETAIL MODAL ════════════════════════════════════ */}
      <AnimatePresence>
        {selectedJob && modalStep === "details" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(10,85,100,0.6)",
              backdropFilter: "blur(8px)",
            }}
            onClick={closeAll}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="h-1.5 rounded-t-3xl"
                style={{
                  background: `linear-gradient(90deg,${T.teal},${T.gold},${T.tealLight})`,
                }}
              />
              <div className="p-7">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="text-4xl mb-2">{selectedJob.icon}</div>
                    <h3
                      className="text-2xl font-black"
                      style={{
                        color: T.text,
                        fontFamily: "'Montserrat',sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {selectedJob.title}
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: T.muted }}>
                      {selectedJob.dept} ·{" "}
                      <span
                        className="font-bold"
                        style={{ color: catColor[selectedJob.cat] || T.teal }}
                      >
                        {selectedJob.cat}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={closeAll}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold transition-colors"
                    style={{ background: T.tealPale, color: T.teal }}
                    onMouseEnter={(e) => {
                      e.target.style.background = T.teal;
                      e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = T.tealPale;
                      e.target.style.color = T.teal;
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div
                  className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-2xl mb-6"
                  style={{ background: T.cream }}
                >
                  {[
                    { l: "Qualification", v: selectedJob.qual },
                    { l: "Experience", v: selectedJob.exp },
                    { l: "Type", v: selectedJob.type },
                    { l: "Vacancies", v: `${selectedJob.vac}` },
                    { l: "Salary", v: selectedJob.salary },
                    { l: "Location", v: "Kanhra, Haryana" },
                  ].map((item) => (
                    <div
                      key={item.l}
                      className="bg-white rounded-xl p-3 border"
                      style={{ borderColor: T.tealPale }}
                    >
                      <p className="text-xs" style={{ color: T.muted }}>
                        {item.l}
                      </p>
                      <p
                        className="font-bold text-xs mt-0.5"
                        style={{ color: T.text }}
                      >
                        {item.v}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mb-5">
                  <h4
                    className="font-black text-sm mb-3"
                    style={{ color: T.teal }}
                  >
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((sk) => (
                      <span
                        key={sk}
                        className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: T.tealPale, color: T.teal }}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setModalStep("form")}
                    className="flex-1 py-3 rounded-2xl font-black text-sm text-white"
                    style={{
                      background: `linear-gradient(90deg,${T.teal},${T.tealLight})`,
                    }}
                  >
                    Apply Now →
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    onClick={closeAll}
                    className="px-6 py-3 rounded-2xl font-bold text-sm border-2"
                    style={{ borderColor: T.tealPale, color: T.muted }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ APPLICATION FORM MODAL ══════════════════════════════ */}
      <AnimatePresence>
        {selectedJob && modalStep === "form" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(10,85,100,0.6)",
              backdropFilter: "blur(8px)",
            }}
            onClick={closeAll}
          >
            <motion.div
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 24 }}
              className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[88vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="h-1.5 rounded-t-3xl"
                style={{
                  background: `linear-gradient(90deg,${T.teal},${T.gold},${T.tealLight})`,
                }}
              />
              <div className="p-7">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3
                      className="text-xl font-black"
                      style={{
                        color: T.text,
                        fontFamily: "'Montserrat',sans-serif",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Apply — {selectedJob.title}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: T.muted }}>
                      Fill in your details and upload documents
                    </p>
                  </div>
                  <button
                    onClick={closeAll}
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold"
                    style={{ background: T.tealPale, color: T.teal }}
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { l: "Full Name *", ph: "Your full name" },
                      { l: "Date of Birth *", ph: "", type: "date" },
                    ].map((f) => (
                      <div key={f.l}>
                        <label
                          className="block text-xs font-bold mb-1.5"
                          style={{ color: T.teal }}
                        >
                          {f.l}
                        </label>
                        <input
                          type={f.type || "text"}
                          placeholder={f.ph}
                          className="w-full px-4 py-2.5 rounded-xl border-2 text-sm outline-none transition-all"
                          style={{ borderColor: T.tealPale, color: T.text }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { l: "Email *", ph: "you@email.com", type: "email" },
                      { l: "Mobile *", ph: "+91 98765 43210", type: "tel" },
                    ].map((f) => (
                      <div key={f.l}>
                        <label
                          className="block text-xs font-bold mb-1.5"
                          style={{ color: T.teal }}
                        >
                          {f.l}
                        </label>
                        <input
                          type={f.type}
                          placeholder={f.ph}
                          className="w-full px-4 py-2.5 rounded-xl border-2 text-sm outline-none transition-all"
                          style={{ borderColor: T.tealPale, color: T.text }}
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label
                      className="block text-xs font-bold mb-1.5"
                      style={{ color: T.teal }}
                    >
                      Address
                    </label>
                    <textarea
                      rows="2"
                      className="w-full px-4 py-2.5 rounded-xl border-2 text-sm outline-none resize-none transition-all"
                      style={{ borderColor: T.tealPale, color: T.text }}
                    />
                  </div>
                  {[
                    { l: "Upload CV (PDF/DOC) *", accept: ".pdf,.doc,.docx" },
                    {
                      l: "Upload Certificates (Optional)",
                      accept: ".pdf,.jpg,.png",
                      mult: true,
                    },
                  ].map((f) => (
                    <div key={f.l}>
                      <label
                        className="block text-xs font-bold mb-1.5"
                        style={{ color: T.teal }}
                      >
                        {f.l}
                      </label>
                      <div
                        className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-teal-400 transition-colors"
                        style={{ borderColor: T.tealPale }}
                      >
                        <p className="text-sm" style={{ color: T.muted }}>
                          📎 Click to upload
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          accept={f.accept}
                          multiple={f.mult}
                        />
                      </div>
                    </div>
                  ))}
                  <div>
                    <label
                      className="block text-xs font-bold mb-1.5"
                      style={{ color: T.teal }}
                    >
                      Video Introduction Link (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://youtube.com/..."
                      className="w-full px-4 py-2.5 rounded-xl border-2 text-sm outline-none transition-all"
                      style={{ borderColor: T.tealPale, color: T.text }}
                    />
                  </div>
                  <div
                    className="flex items-start gap-2 p-3 rounded-xl"
                    style={{ background: T.goldPale }}
                  >
                    <input
                      type="checkbox"
                      id="consent"
                      className="mt-0.5 accent-teal-600"
                    />
                    <label
                      htmlFor="consent"
                      className="text-xs leading-relaxed"
                      style={{ color: T.goldDark }}
                    >
                      I agree to verify my email and mobile via OTP before
                      submission. I confirm all information provided is
                      accurate.
                    </label>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setModalStep("otp")}
                      className="flex-1 py-3 rounded-2xl font-black text-sm text-white"
                      style={{
                        background: `linear-gradient(90deg,${T.teal},${T.tealLight})`,
                      }}
                    >
                      🔐 Verify & Submit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setModalStep("details")}
                      className="px-6 py-3 rounded-2xl font-bold text-sm border-2"
                      style={{ borderColor: T.tealPale, color: T.muted }}
                    >
                      Back
                    </motion.button>
                  </div>
                  <p className="text-xs text-center" style={{ color: T.muted }}>
                    * OTP verification is mandatory to prevent fake applications
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ OTP MODAL ════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedJob && modalStep === "otp" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(10,85,100,0.6)",
              backdropFilter: "blur(8px)",
            }}
            onClick={closeAll}
          >
            <motion.div
              initial={{ scale: 0.9, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 24 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg"
                  style={{ background: T.tealPale }}
                >
                  🔐
                </div>
                <h3
                  className="text-xl font-black mb-1"
                  style={{
                    color: T.text,
                    fontFamily: "'Montserrat',sans-serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {otpPhase === 1 ? "Verify Your Contact" : "Enter OTP Codes"}
                </h3>
                <p className="text-sm" style={{ color: T.muted }}>
                  {otpPhase === 1
                    ? "Enter your email and mobile to receive OTP codes."
                    : "We've sent 6-digit codes to your email and mobile."}
                </p>
              </div>

              {otpPhase === 1 ? (
                <div className="space-y-4">
                  {[
                    {
                      l: "Email Address",
                      ph: "you@example.com",
                      type: "email",
                    },
                    { l: "Mobile Number", ph: "+91 98765 43210", type: "tel" },
                  ].map((f) => (
                    <div key={f.l}>
                      <label
                        className="block text-xs font-bold mb-1.5"
                        style={{ color: T.teal }}
                      >
                        {f.l}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.ph}
                        className="w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all"
                        style={{ borderColor: T.tealPale }}
                      />
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setOtpPhase(2)}
                    className="w-full py-3.5 rounded-2xl font-black text-sm text-white mt-2"
                    style={{
                      background: `linear-gradient(90deg,${T.teal},${T.tealLight})`,
                    }}
                  >
                    Send OTP →
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <p
                      className="text-xs font-bold mb-3 text-center"
                      style={{ color: T.teal }}
                    >
                      EMAIL OTP
                    </p>
                    <OtpInput />
                    <p
                      className="text-xs text-center mt-2"
                      style={{ color: T.muted }}
                    >
                      Sent to your@email.com
                    </p>
                  </div>
                  <div>
                    <p
                      className="text-xs font-bold mb-3 text-center"
                      style={{ color: T.goldDark }}
                    >
                      MOBILE OTP
                    </p>
                    <OtpInput />
                    <p
                      className="text-xs text-center mt-2"
                      style={{ color: T.muted }}
                    >
                      Sent to +91 98765****
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      onClick={() => setOtpPhase(1)}
                      className="flex-1 py-3 rounded-2xl font-bold text-sm border-2"
                      style={{ borderColor: T.tealPale, color: T.muted }}
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setModalStep("success")}
                      className="flex-1 py-3 rounded-2xl font-black text-sm text-white"
                      style={{
                        background: `linear-gradient(90deg,#16a34a,#15803d)`,
                      }}
                    >
                      ✅ Verify & Submit
                    </motion.button>
                  </div>
                  <p className="text-center text-xs" style={{ color: T.muted }}>
                    Didn't receive?{" "}
                    <button className="font-black" style={{ color: T.teal }}>
                      Resend OTP
                    </button>
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ SUCCESS MODAL ════════════════════════════════════════ */}
      <AnimatePresence>
        {modalStep === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(10,85,100,0.6)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                className="text-6xl mb-5"
              >
                🎉
              </motion.div>
              <h3
                className="text-2xl font-black mb-2"
                style={{
                  color: T.text,
                  fontFamily: "'Montserrat',sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Application Submitted!
              </h3>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: T.muted }}
              >
                Thank you for applying for{" "}
                <b style={{ color: T.teal }}>{selectedJob?.title}</b>. We'll
                review your application and contact you within 7 working days.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={closeAll}
                className="w-full py-3.5 rounded-2xl font-black text-sm text-white"
                style={{
                  background: `linear-gradient(90deg,${T.teal},${T.tealLight})`,
                }}
              >
                Done ✓
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

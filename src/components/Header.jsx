import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  clearAdminSession,
  getAdminEmail,
  isAdminLoggedIn,
} from "../utils/adminAuth.js";

/* ─────────────────────────────────────────────────────
   TRANSLATIONS
───────────────────────────────────────────────────── */
const T = {
  en: {
    schoolName1: "Shree Ram",
    schoolName2: "Public School",
    affiliation: "Affiliated to CBSE, New Delhi",
    nav: [
      "NCC",
      "The School",
      "About Us",
      "Academics",
      "Activities",
      "Gallery",
    ],
    dropdowns: [
      [],
      [
        "Admissions",
        "Vision & Mission",
        "Aims",
        "Rules & Regulations",
        "Message for Parents",
        "Message for Students",
        "Important Procedure",
        "School Anthem",
        "Former Headmistress",
        "Retired Teachers",
      ],
      [
        "About School",
        "Principal Desk",
        "Management Committee",
        "Parents Teachers Association",
        "Awards & Achievements",
        "Affiliation Details",
        "Annual Report",
        "Success Stories",
        "Our Achievers (Toppers)",
        "Our Facilities",
        "Mandatory Public Disclosure",
        "Team",
        "Infrastructure",
      ],
      [
        "Notice Board",
        "Holiday List",
        "Academic Calendar",
        "School Timings",
        "School Uniform",
        "Downloads",
        "Transfer Certificate",
        "Online Study Materials",
      ],
      [
        "National Cadet Corps (NCC)",
        "Martial Arts",
        "Annual Sports",
        "Exhibitions",
        "Celebrations",
        "Competitions",
        "Staff Activity",
        "Extra Curricular",
        "Quiz Test",
      ],
      ["Photo Gallery", "Video Gallery"],
    ],
    notices: [
      "🎉 Annual Sports Day – March 15, 2025 | All students must participate",
      "📚 Exam Schedule for Class X & XII now available – Check Downloads",
      "🏆 Congratulations to our toppers of Board Exams 2024!",
      "📝 Admission Open for Session 2025–26 | Limited Seats Available",
      "🎨 Inter-School Art Competition on March 20 – Register Now",
    ],
    langBtn: "हिंदी",
    noticeLabel: "Notice",
  },
  hi: {
    schoolName1: "श्री राम",
    schoolName2: "पब्लिक स्कूल",
    affiliation: "सीबीएसई, नई दिल्ली से संबद्ध",
    nav: [
      "एनसीसी",
      "विद्यालय",
      "हमारे बारे में",
      "शैक्षणिक",
      "गतिविधियाँ",
      "गैलरी",
    ],
    dropdowns: [
      [],
      [
        "प्रवेश",
        "दृष्टि और मिशन",
        "उद्देश्य",
        "नियम एवं विनियम",
        "अभिभावकों के लिए संदेश",
        "छात्रों के लिए संदेश",
        "महत्वपूर्ण प्रक्रिया",
        "विद्यालय गान",
        "पूर्व प्रधानाध्यापिका",
        "सेवानिवृत्त शिक्षक",
      ],
      [
        "विद्यालय के बारे में",
        "प्रधानाचार्य डेस्क",
        "प्रबंधन समिति",
        "अभिभावक शिक्षक संघ",
        "पुरस्कार एवं उपलब्धियाँ",
        "संबद्धता विवरण",
        "वार्षिक रिपोर्ट",
        "सफलता की कहानियाँ",
        "हमारे उपलब्धकर्ता",
        "हमारी सुविधाएँ",
        "अनिवार्य सार्वजनिक प्रकटीकरण",
        "टीम",
        "अवसंरचना",
      ],
      [
        "सूचना पट्ट",
        "छुट्टी सूची",
        "शैक्षणिक कैलेंडर",
        "विद्यालय समय",
        "विद्यालय गणवेश",
        "डाउनलोड",
        "स्थानांतरण प्रमाणपत्र",
        "ऑनलाइन अध्ययन सामग्री",
      ],
      [
        "राष्ट्रीय कैडेट कोर (एनसीसी)",
        "मार्शल आर्ट",
        "वार्षिक खेल",
        "प्रदर्शनियाँ",
        "उत्सव",
        "प्रतियोगिताएँ",
        "कर्मचारी गतिविधि",
        "पाठ्येतर गतिविधियाँ",
        "क्विज टेस्ट",
      ],
      ["फोटो गैलरी", "वीडियो गैलरी"],
    ],
    notices: [
      "🎉 वार्षिक खेल दिवस – 15 मार्च 2025 | सभी छात्र भाग लें",
      "📚 कक्षा X और XII की परीक्षा कार्यक्रम उपलब्ध – डाउनलोड देखें",
      "🏆 बोर्ड परीक्षा 2024 के टॉपर्स को बधाई!",
      "📝 सत्र 2025–26 के लिए प्रवेश खुला | सीमित सीटें उपलब्ध",
      "🎨 अंतर-विद्यालय कला प्रतियोगिता 20 मार्च – अभी पंजीकरण करें",
    ],
    langBtn: "English",
    noticeLabel: "सूचना",
  },
};

/* Logo theme colors */
const LOGO_TEAL = "#1a6b7a"; /* teal from shield background */
const LOGO_ORANGE = "#d4883a"; /* warm orange from book/circle */
const LOGO_BLUE = "#1a5276"; /* deep navy-blue for "Public School" */

const NAV_COLORS = [
  { color: "#5cb85c", glow: "rgba(92,184,92,0.4)" },
  { color: "#e05a4e", glow: "rgba(224,90,78,0.4)" },
  { color: "#3eb5e5", glow: "rgba(62,181,229,0.4)" },
  { color: "#9b59b6", glow: "rgba(155,89,182,0.4)" },
  { color: "#f0a500", glow: "rgba(240,165,0,0.4)" },
  { color: "#e91e8c", glow: "rgba(233,30,140,0.4)" },
];

const NAV_ICONS = [
  <svg
    key="home"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="19"
    height="19"
  >
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>,
  <svg
    key="schl"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="19"
    height="19"
  >
    <path d="M12 3L2 8l10 5 10-5-10-5z" />
    <path d="M2 8v8l10 5 10-5V8" />
    <path d="M12 13v8" />
  </svg>,
  <svg
    key="abou"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="19"
    height="19"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>,
  <svg
    key="acad"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="19"
    height="19"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>,
  <svg
    key="acti"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="19"
    height="19"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>,
  <svg
    key="gall"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="19"
    height="19"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>,
];

/* ─── Live Clock ─────────────────────────────────── */
function LiveClock({ lang }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const days = {
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
  };
  const months = {
    en: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    hi: [
      "जन",
      "फर",
      "मार",
      "अप्र",
      "मई",
      "जून",
      "जुल",
      "अग",
      "सित",
      "अक्त",
      "नव",
      "दिस",
    ],
  };

  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  const ss = now.getSeconds().toString().padStart(2, "0");
  const day = days[lang][now.getDay()];
  const dt = now.getDate();
  const mon = months[lang][now.getMonth()];
  const yr = now.getFullYear();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "11.5px",
        color: "rgba(255,255,255,0.95)",
        fontFamily: "'Nunito',sans-serif",
        fontWeight: "700",
        letterSpacing: "0.4px",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="13"
        height="13"
        fill="none"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="2.5"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span>
        {day}, {dt} {mon} {yr}
      </span>
      <span style={{ opacity: 0.45 }}>|</span>
      <span style={{ fontVariantNumeric: "tabular-nums" }}>
        {hh}:{mm}:{ss}
      </span>
    </div>
  );
}

/* ─── Dropdown ───────────────────────────────────── */
function DropdownMenu({ items, color, visible }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "calc(100% + 4px)",
        left: "50%",
        transform: visible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(-10px)",
        minWidth: "234px",
        background: "rgba(255,255,255,0.98)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "14px",
        boxShadow: `0 20px 60px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.05), 0 0 28px ${color}18`,
        zIndex: 999,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "all" : "none",
        transition:
          "opacity 0.22s cubic-bezier(0.16,1,0.3,1), transform 0.22s cubic-bezier(0.16,1,0.3,1)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "3px",
          background: `linear-gradient(90deg,${color},${color}55,transparent)`,
        }}
      />
      <div style={{ padding: "6px 0" }}>
        {items.map((item, i) => {
          const isAboutSchool =
            item === "About School" || item === "विद्यालय के बारे में";
          const isPrincipalDesk =
            item === "Principal Desk" || item === "प्रधानाचार्य डेस्क";
          const isManagementCommittee =
            item === "Management Committee" || item === "प्रबंधन समिति";
          const isPTA =
            item === "Parents Teachers Association" ||
            item === "अभिभावक शिक्षक संघ";
          const isAwardsAchievements =
            item === "Awards & Achievements" ||
            item === "पुरस्कार एवं उपलब्धियाँ";
          const isAffiliationDetails =
            item === "Affiliation Details" || item === "संबद्धता विवरण";
          const isAnnualReport =
            item === "Annual Report" || item === "वार्षिक रिपोर्ट";
          const isSuccessStories =
            item === "Success Stories" || item === "सफलता की कहानियाँ";
          const isAchievers =
            item === "Our Achievers (Toppers)" || item === "हमारे उपलब्धकर्ता";
          const isFacilities =
            item === "Our Facilities" || item === "हमारी सुविधाएँ";
          const isPhotoGallery =
            item === "Photo Gallery" || item === "फोटो गैलरी";
          const isVideoGallery =
            item === "Video Gallery" || item === "वीडियो गैलरी";
          const isMandatoryDisclosure =
            item === "Mandatory Public Disclosure" ||
            item === "अनिवार्य सार्वजनिक प्रकटीकरण";
          const isTeam = item === "Team" || item === "टीम";
          const isInfrastructure =
            item === "Infrastructure" || item === "अवसंरचना";
          const isAdmissions = item === "Admissions" || item === "प्रवेश";
          const isNCC =
            item === "National Cadet Corps (NCC)" ||
            item === "राष्ट्रीय कैडेट कोर (एनसीसी)";
          const isVisionMission =
            item === "Vision & Mission" || item === "दृष्टि और मिशन";
          const isAims = item === "Aims" || item === "उद्देश्य";
          const isRules =
            item === "Rules & Regulations" || item === "नियम एवं विनियम";
          const isMessageParents =
            item === "Message for Parents" || item === "अभिभावकों के लिए संदेश";
          const isMessageStudents =
            item === "Message for Students" || item === "छात्रों के लिए संदेश";
          const isProcedure =
            item === "Important Procedure" || item === "महत्वपूर्ण प्रक्रिया";
          const isAnthem = item === "School Anthem" || item === "विद्यालय गान";
          const isFormerHM =
            item === "Former Headmistress" || item === "पूर्व प्रधानाध्यापिका";
          const isRetiredTeachers =
            item === "Retired Teachers" || item === "सेवानिवृत्त शिक्षक";
          const isNoticeBoard =
            item === "Notice Board" || item === "सूचना पट्ट";
          const isHolidayList =
            item === "Holiday List" || item === "छुट्टी सूची";
          const isAcademicCalendar =
            item === "Academic Calendar" || item === "शैक्षणिक कैलेंडर";
          const isSchoolTimings =
            item === "School Timings" || item === "विद्यालय समय";
          const isSchoolUniform =
            item === "School Uniform" || item === "विद्यालय गणवेश";
          const isDownloads = item === "Downloads" || item === "डाउनलोड";
          const isTransferCertificate =
            item === "Transfer Certificate" ||
            item === "स्थानांतरण प्रमाणपत्र";
          const isOnlineStudyMaterials =
            item === "Online Study Materials" ||
            item === "ऑनलाइन अध्ययन सामग्री";
          const isMartialArts =
            item === "Martial Arts" || item === "मार्शल आर्ट";
          const isAnnualSports =
            item === "Annual Sports" || item === "वार्षिक खेल";
          const isExhibitions =
            item === "Exhibitions" || item === "प्रदर्शनियाँ";
          const isCelebrations = item === "Celebrations" || item === "उत्सव";
          const isCompetitions =
            item === "Competitions" || item === "प्रतियोगिताएँ";
          const isStaffActivity =
            item === "Staff Activity" || item === "कर्मचारी गतिविधि";
          const isExtraCurricular =
            item === "Extra Curricular" || item === "पाठ्येतर गतिविधियाँ";
          const isQuizTest =
            item === "Quiz Test" || item === "क्विज टेस्ट";
          const href = isAboutSchool
            ? "/about"
            : isPrincipalDesk
              ? "/principal-desk"
              : isManagementCommittee
                ? "/management-committee"
                : isPTA
                  ? "/parents-teachers-association"
                  : isAwardsAchievements
                    ? "/awards-achievements"
                    : isAffiliationDetails
                      ? "/affiliation-details"
                      : isAnnualReport
                        ? "/annual-report"
                        : isSuccessStories
                          ? "/success-stories"
                          : isAchievers
                            ? "/achievers"
                            : isFacilities
                              ? "/facilities"
                              : isTeam
                                ? "/team"
                                : isInfrastructure
                                  ? "/infrastructure"
                                  : isPhotoGallery
                                    ? "/photo-gallery"
                                    : isVideoGallery
                                      ? "/video-gallery"
                                    : isMandatoryDisclosure
                                      ? "/mandatory-disclosure"
                                      : isAdmissions
                                        ? "/admissions"
                                        : isNCC
                                          ? "/ncc"
                                          : isVisionMission
                                            ? "/vision-mission"
                                            : isAims
                                              ? "/aims"
                                              : isRules
                                                ? "/rules-regulations"
                                                : isMessageParents
                                                  ? "/message-parents"
                                                  : isMessageStudents
                                                    ? "/message-students"
                                                    : isProcedure
                                                      ? "/important-procedure"
                                                      : isAnthem
                                                        ? "/school-anthem"
                                                        : isFormerHM
                                                          ? "/former-headmistress"
                                                          : isRetiredTeachers
                                                            ? "/retired-teachers"
                                                            : isNoticeBoard
                                                              ? "/notice-board"
                                                              : isHolidayList
                                                                ? "/holiday-list"
                                                                : isAcademicCalendar
                                                                  ? "/academic-calendar"
                                                                  : isSchoolTimings
                                                                    ? "/school-timings"
                                                                    : isSchoolUniform
                                                                      ? "/school-uniform"
                                                                      : isDownloads
                                                                        ? "/downloads"
                                                                        : isTransferCertificate
                                                                          ? "/transfer-certificate"
                                                                          : isOnlineStudyMaterials
                                                                            ? "/online-study-materials"
                                                                            : isMartialArts
                                                                              ? "/martial-arts"
                                                                              : isAnnualSports
                                                                                ? "/annual-sports"
                                                                                : isExhibitions
                                                                                  ? "/exhibitions"
                                                                                  : isCelebrations
                                                                                    ? "/celebrations"
                                                                                    : isCompetitions
                                                                                      ? "/competitions"
                                                                                      : isStaffActivity
                                                                                        ? "/staff-activity"
                                                                                        : isExtraCurricular
                                                                                          ? "/extra-curricular"
                                                                                          : isQuizTest
                                                                                            ? "/quiz"
                                                            : "#";
          const linkProps = {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 18px",
              color: "#374151",
              fontSize: "13.5px",
              fontFamily: "'Nunito',sans-serif",
              fontWeight: "500",
              textDecoration: "none",
              transition: "all 0.15s ease",
            },
            onMouseEnter: (e) => {
              e.currentTarget.style.background = `${color}12`;
              e.currentTarget.style.color = color;
              e.currentTarget.style.paddingLeft = "22px";
            },
            onMouseLeave: (e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#374151";
              e.currentTarget.style.paddingLeft = "18px";
            },
          };
          const isInternalRoute =
            isAboutSchool ||
            isPrincipalDesk ||
            isManagementCommittee ||
            isPTA ||
            isAwardsAchievements ||
            isAffiliationDetails ||
            isAnnualReport ||
            isSuccessStories ||
            isAchievers ||
            isFacilities ||
            isTeam ||
            isInfrastructure ||
            isPhotoGallery ||
            isVideoGallery ||
            isMandatoryDisclosure ||
            isAdmissions ||
            isNCC ||
            isVisionMission ||
            isAims ||
            isRules ||
            isMessageParents ||
            isMessageStudents ||
            isProcedure ||
            isAnthem ||
            isFormerHM ||
            isRetiredTeachers ||
            isNoticeBoard ||
            isHolidayList ||
            isAcademicCalendar ||
            isSchoolTimings ||
            isSchoolUniform ||
            isDownloads ||
            isTransferCertificate ||
            isOnlineStudyMaterials ||
            isMartialArts ||
            isAnnualSports ||
            isExhibitions ||
            isCelebrations ||
            isCompetitions ||
            isStaffActivity ||
            isExtraCurricular ||
            isQuizTest;
          return isInternalRoute ? (
            <Link key={i} to={href} {...linkProps}>
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: color,
                  opacity: 0.65,
                  flexShrink: 0,
                }}
              />
              {item}
            </Link>
          ) : (
            <a key={i} href={href} {...linkProps}>
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: color,
                  opacity: 0.65,
                  flexShrink: 0,
                }}
              />
              {item}
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN HEADER
───────────────────────────────────────────────────── */
const Header = () => {
  const location = useLocation();
  const [lang, setLang] = useState("en");
  const [activeNav, setActiveNav] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [adminEmail, setAdminEmail] = useState(getAdminEmail());
  const headerRef = useRef(null);
  const timerRef = useRef(null);
  const t = T[lang];

  useEffect(() => {
    setAdminEmail(getAdminEmail());
  }, [location.pathname]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setActiveNav(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const onEnter = useCallback((name) => {
    clearTimeout(timerRef.current);
    setActiveNav(name);
  }, []);
  const onLeave = useCallback(() => {
    timerRef.current = setTimeout(() => setActiveNav(null), 130);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');

        @keyframes gradFlow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes marqueeScroll {
          0%   { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }

        .srps-marquee {
          display:inline-block;
          white-space:nowrap;
          animation: marqueeScroll 30s linear infinite;
        }
        .srps-marquee:hover { animation-play-state: paused; cursor: default; }

        .srps-icon-wrap {
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
        }

        .srps-ham-line {
          display:block; width:22px; height:2.5px; background:#1e3a5f;
          border-radius:3px;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .srps-ham.open .srps-ham-line:nth-child(1){ transform: translateY(8.5px) rotate(45deg); }
        .srps-ham.open .srps-ham-line:nth-child(2){ opacity:0; transform:scaleX(0); }
        .srps-ham.open .srps-ham-line:nth-child(3){ transform: translateY(-8.5px) rotate(-45deg); }

        .srps-drawer { max-height:0; overflow:hidden; transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1); }
        .srps-drawer.open { max-height:100vh; }
        .srps-mob-acc { max-height:0; overflow:hidden; transition: max-height 0.35s cubic-bezier(0.4,0,0.2,1); }
        .srps-mob-acc.open { max-height:600px; }

        .srps-lang-pill {
          display:flex; align-items:center; gap:5px;
          background: rgba(255,255,255,0.18);
          border: 1.5px solid rgba(255,255,255,0.35);
          border-radius:999px;
          padding: 3px 12px;
          cursor:pointer;
          font-size:11.5px; font-weight:800;
          color:white;
          transition: background 0.2s, transform 0.15s;
          font-family:'Nunito',sans-serif;
          letter-spacing:0.4px;
        }
        .srps-lang-pill:hover { background: rgba(255,255,255,0.3); transform:scale(1.05); }

        /* school name shimmer on hover */
        .srps-name-shimmer:hover .srps-n1 { opacity:0.85; }
        .srps-name-shimmer:hover .srps-n2 { opacity:0.85; }

        @media(max-width:960px){
          .srps-desktop-nav{ display:none !important; }
          .srps-ham{ display:flex !important; }
        }
        @media(min-width:961px){
          .srps-ham{ display:none !important; }
          .srps-drawer-wrap{ display:none !important; }
        }
      `}</style>

      <header
        ref={headerRef}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          fontFamily: "'Nunito',sans-serif",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.10)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* ══ ANIMATED GRADIENT TOP BAR ══ */}
        <div
          style={{
            height: "44px",
            background:
              "linear-gradient(270deg, #1a6b7a, #d4883a, #5cb85c, #3eb5e5, #9b59b6, #e91e8c, #e05a4e, #1a6b7a)",
            backgroundSize: "350% 350%",
            animation: "gradFlow 9s ease infinite",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
          }}
        >
          <LiveClock lang={lang} />

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {isAdminLoggedIn() ? (
              <>
                <Link
                  to="/admin"
                  className="srps-lang-pill"
                  style={{ textDecoration: "none" }}
                  title={adminEmail || "Admin"}
                >
                  Admin Panel
                </Link>
                <button
                  className="srps-lang-pill"
                  onClick={() => {
                    clearAdminSession();
                    setAdminEmail("");
                  }}
                  title={adminEmail || "Admin"}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="srps-lang-pill"
                style={{ textDecoration: "none" }}
              >
                Sign In
              </Link>
            )}

            {/* Lang toggle */}
            <button
              className="srps-lang-pill"
              onClick={() => setLang((l) => (l === "en" ? "hi" : "en"))}
            >
              <svg
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
              </svg>
              {t.langBtn}
            </button>
          </div>
        </div>

        {/* ══ NOTICE TICKER ══ */}
        <div
          style={{
            height: "32px",
            background: "#fff8e1",
            borderBottom: "1px solid #ffe082",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          {/* Badge */}
          <div
            style={{
              flexShrink: 0,
              background: `linear-gradient(135deg, ${LOGO_TEAL}, #1e8a9e)`,
              color: "white",
              fontSize: "10.5px",
              fontWeight: "800",
              padding: "0 18px 0 14px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)",
              zIndex: 2,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="11"
              height="11"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            >
              <path d="M22 17H2a3 3 0 000 6h20" />
              <path d="M8 17V4a2 2 0 012-2h4a2 2 0 012 2v13" />
              <path d="M16 8h4a2 2 0 010 4h-4" />
            </svg>
            {t.noticeLabel}
          </div>
          {/* Scrolling text */}
          <div style={{ flex: 1, overflow: "hidden", marginLeft: "10px" }}>
            <span
              className="srps-marquee"
              style={{
                fontSize: "12px",
                fontWeight: "600",
                color: "#5d4037",
                fontFamily: "'Nunito',sans-serif",
              }}
            >
              {t.notices.join("   ✦   ")}
            </span>
          </div>
        </div>

        {/* ══ MAIN NAV BAR ══ */}
        <div
          style={{
            background: scrolled ? "rgba(255,255,255,0.97)" : "#ffffff",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            transition: "background 0.3s ease",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "74px",
            }}
          >
            {/* ── LOGO ── */}
            <a
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                textDecoration: "none",
                flexShrink: 0,
              }}
              className="srps-name-shimmer"
            >
              {/* Logo image — rounded shield style matching the badge */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: `0 4px 16px rgba(26,107,122,0.25), 0 0 0 2px ${LOGO_TEAL}22`,
                  background: "#e8f4f6",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/logo.jpg"
                  alt="School Logo"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.parentElement.style.cssText +=
                      "display:flex;align-items:center;justify-content:center;";
                    e.target.outerHTML = `<span style="font-size:18px;font-weight:900;color:${LOGO_TEAL};">SR</span>`;
                  }}
                />
              </div>

              {/* School name text */}
              <div>
                <div style={{ lineHeight: "1.15", marginBottom: "2px" }}>
                  {/* "Shree Ram" — warm orange from logo */}
                  <span
                    className="srps-n1"
                    style={{
                      fontSize: "19px",
                      fontWeight: "900",
                      color: LOGO_ORANGE,
                      fontFamily: "'Nunito',sans-serif",
                      letterSpacing: "-0.2px",
                      transition: "opacity 0.2s",
                    }}
                  >
                    {t.schoolName1}
                  </span>{" "}
                  {/* "Public School" — deep teal-blue */}
                  <span
                    className="srps-n2"
                    style={{
                      fontSize: "19px",
                      fontWeight: "900",
                      color: LOGO_BLUE,
                      fontFamily: "'Nunito',sans-serif",
                      letterSpacing: "-0.2px",
                      transition: "opacity 0.2s",
                    }}
                  >
                    {t.schoolName2}
                  </span>
                </div>
                {/* Affiliation */}
                <div
                  style={{
                    fontSize: "10.5px",
                    fontWeight: "700",
                    color: LOGO_TEAL,
                    letterSpacing: "0.3px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: LOGO_TEAL,
                      display: "inline-block",
                    }}
                  />
                  {t.affiliation}
                </div>
              </div>
            </a>

            {/* ── DESKTOP NAV ── */}
            <nav
              className="srps-desktop-nav"
              style={{ display: "flex", alignItems: "center", gap: "2px" }}
            >
              {t.nav.map((name, i) => {
                const { color, glow } = NAV_COLORS[i];
                const items = t.dropdowns[i];
                const isActive = activeNav === name;
                // Set path for nav items
                let path = "#";
                if (name === "NCC" || name === "एनसीसी") path = "/ncc";
                else if (name === "About Us" || name === "हमारे बारे में")
                  path = "/about";
                else if (name === "Academics" || name === "शैक्षणिक")
                  path = "/academic";
                else if (name === "Gallery" || name === "गैलरी")
                  path = "/photo-gallery";
                // Add more as needed
                return (
                  <div
                    key={name}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {i > 0 && (
                      <div
                        style={{
                          width: "1.5px",
                          height: "22px",
                          background: `linear-gradient(to bottom,transparent,${NAV_COLORS[i - 1].color}55,transparent)`,
                          margin: "0 2px",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <div
                      style={{ position: "relative" }}
                      onMouseEnter={() => items.length && onEnter(name)}
                      onMouseLeave={onLeave}
                    >
                      {path !== "#" ? (
                        <Link
                          to={path}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "5px",
                            padding: "10px 13px 8px",
                            textDecoration: "none",
                          }}
                        >
                          <div
                            className="srps-icon-wrap"
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "50%",
                              background: `linear-gradient(135deg,${color},${color}bb)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: isActive
                                ? `0 8px 22px ${glow}`
                                : `0 3px 10px ${glow}`,
                              transform: isActive
                                ? "translateY(-4px) scale(1.12)"
                                : "translateY(0) scale(1)",
                              transition:
                                "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
                            }}
                          >
                            {NAV_ICONS[i]}
                          </div>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "700",
                              whiteSpace: "nowrap",
                              color: isActive ? color : "#374151",
                              transition: "color 0.2s",
                            }}
                          >
                            {name}
                          </span>
                        </Link>
                      ) : (
                        <a
                          href="#"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "5px",
                            padding: "10px 13px 8px",
                            textDecoration: "none",
                          }}
                        >
                          <div
                            className="srps-icon-wrap"
                            style={{
                              width: "42px",
                              height: "42px",
                              borderRadius: "50%",
                              background: `linear-gradient(135deg,${color},${color}bb)`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: isActive
                                ? `0 8px 22px ${glow}`
                                : `0 3px 10px ${glow}`,
                              transform: isActive
                                ? "translateY(-4px) scale(1.12)"
                                : "translateY(0) scale(1)",
                              transition:
                                "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease",
                            }}
                          >
                            {NAV_ICONS[i]}
                          </div>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "700",
                              whiteSpace: "nowrap",
                              color: isActive ? color : "#374151",
                              transition: "color 0.2s",
                            }}
                          >
                            {name}
                          </span>
                        </a>
                      )}
                      {items.length > 0 && (
                        <DropdownMenu
                          items={items}
                          color={color}
                          visible={isActive}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* ── HAMBURGER ── */}
            <button
              className={`srps-ham ${mobileOpen ? "open" : ""}`}
              onClick={() => setMobileOpen((o) => !o)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "10px",
                display: "none",
                flexDirection: "column",
                gap: "6px",
                borderRadius: "10px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f3f4f6")
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              aria-label="Toggle menu"
            >
              <span className="srps-ham-line" />
              <span className="srps-ham-line" />
              <span className="srps-ham-line" />
            </button>
          </div>
        </div>

        {/* ══ MOBILE DRAWER ══ */}
        <div className="srps-drawer-wrap">
          <div className={`srps-drawer ${mobileOpen ? "open" : ""}`}>
            <div
              style={{
                background: "#fff",
                borderTop: "1px solid #f0f0f0",
                paddingBottom: "12px",
              }}
            >
              {t.nav.map((name, i) => {
                const { color, glow } = NAV_COLORS[i];
                const items = t.dropdowns[i];
                const expanded = mobileExpanded === name;
                return (
                  <div key={name} style={{ borderBottom: "1px solid #f7f7f7" }}>
                    <div
                      onClick={() =>
                        items.length &&
                        setMobileExpanded(expanded ? null : name)
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "13px 20px",
                        cursor: items.length ? "pointer" : "default",
                        background: expanded ? `${color}0d` : "transparent",
                        transition: "background 0.2s",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "13px",
                        }}
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            background: `linear-gradient(135deg,${color},${color}bb)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: `0 3px 10px ${glow}`,
                            flexShrink: 0,
                          }}
                        >
                          {NAV_ICONS[i]}
                        </div>
                        <span
                          style={{
                            fontWeight: "700",
                            fontSize: "14.5px",
                            color: expanded ? color : "#1e3a5f",
                            transition: "color 0.2s",
                          }}
                        >
                          {name}
                        </span>
                      </div>
                      {items.length > 0 && (
                        <div
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            background: `${color}18`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transform: expanded
                              ? "rotate(180deg)"
                              : "rotate(0)",
                            transition:
                              "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
                          }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="12"
                            height="12"
                            fill="none"
                            stroke={color}
                            strokeWidth="2.5"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className={`srps-mob-acc ${expanded ? "open" : ""}`}>
                      <div
                        style={{
                          background: "#fafafa",
                          padding: "4px 0 8px 69px",
                          borderLeft: `3px solid ${color}`,
                          marginLeft: "20px",
                        }}
                      >
                        {items.map((sub, j) => {
                          const isAboutSchool =
                            sub === "About School" ||
                            sub === "विद्यालय के बारे में";
                          const isPrincipalDesk =
                            sub === "Principal Desk" ||
                            sub === "प्रधानाचार्य डेस्क";
                          const isManagementCommittee =
                            sub === "Management Committee" ||
                            sub === "प्रबंधन समिति";
                          const isPTA =
                            sub === "Parents Teachers Association" ||
                            sub === "अभिभावक शिक्षक संघ";
                          const isAwardsAchievements =
                            sub === "Awards & Achievements" ||
                            sub === "पुरस्कार एवं उपलब्धियाँ";
                          const isAffiliationDetails =
                            sub === "Affiliation Details" ||
                            sub === "संबद्धता विवरण";
                          const isAnnualReport =
                            sub === "Annual Report" ||
                            sub === "वार्षिक रिपोर्ट";
                          const isSuccessStories =
                            sub === "Success Stories" ||
                            sub === "सफलता की कहानियाँ";
                          const isAchievers =
                            sub === "Our Achievers (Toppers)" ||
                            sub === "हमारे उपलब्धकर्ता";
                          const isFacilities =
                            sub === "Our Facilities" ||
                            sub === "हमारी सुविधाएँ";
                          const isTeam = sub === "Team" || sub === "टीम";
                          const isInfrastructure =
                            sub === "Infrastructure" || sub === "अवसंरचना";
                          const isPhotoGallery =
                            sub === "Photo Gallery" || sub === "फोटो गैलरी";
                          const isVideoGallery =
                            sub === "Video Gallery" || sub === "वीडियो गैलरी";
                          const isMandatoryDisclosure =
                            sub === "Mandatory Public Disclosure" ||
                            sub === "अनिवार्य सार्वजनिक प्रकटीकरण";
                          const isAdmissions =
                            sub === "Admissions" || sub === "प्रवेश";
                          const isNCC =
                            sub === "National Cadet Corps (NCC)" ||
                            sub === "राष्ट्रीय कैडेट कोर (एनसीसी)";
                          const isVisionMission =
                            sub === "Vision & Mission" ||
                            sub === "दृष्टि और मिशन";
                          const isAims = sub === "Aims" || sub === "उद्देश्य";
                          const isRules =
                            sub === "Rules & Regulations" ||
                            sub === "नियम एवं विनियम";
                          const isMessageParents =
                            sub === "Message for Parents" ||
                            sub === "अभिभावकों के लिए संदेश";
                          const isMessageStudents =
                            sub === "Message for Students" ||
                            sub === "छात्रों के लिए संदेश";
                          const isProcedure =
                            sub === "Important Procedure" ||
                            sub === "महत्वपूर्ण प्रक्रिया";
                          const isAnthem =
                            sub === "School Anthem" || sub === "विद्यालय गान";
                          const isFormerHM =
                            sub === "Former Headmistress" ||
                            sub === "पूर्व प्रधानाध्यापिका";
                          const isRetiredTeachers =
                            sub === "Retired Teachers" ||
                            sub === "सेवानिवृत्त शिक्षक";
                          const isNoticeBoard =
                            sub === "Notice Board" || sub === "सूचना पट्ट";
                          const isHolidayList =
                            sub === "Holiday List" || sub === "छुट्टी सूची";
                          const isAcademicCalendar =
                            sub === "Academic Calendar" ||
                            sub === "शैक्षणिक कैलेंडर";
                          const isSchoolTimings =
                            sub === "School Timings" || sub === "विद्यालय समय";
                          const isSchoolUniform =
                            sub === "School Uniform" || sub === "विद्यालय गणवेश";
                          const isDownloads =
                            sub === "Downloads" || sub === "डाउनलोड";
                          const isTransferCertificate =
                            sub === "Transfer Certificate" ||
                            sub === "स्थानांतरण प्रमाणपत्र";
                          const isOnlineStudyMaterials =
                            sub === "Online Study Materials" ||
                            sub === "ऑनलाइन अध्ययन सामग्री";
                          const isMartialArts =
                            sub === "Martial Arts" || sub === "मार्शल आर्ट";
                          const isAnnualSports =
                            sub === "Annual Sports" || sub === "वार्षिक खेल";
                          const isExhibitions =
                            sub === "Exhibitions" || sub === "प्रदर्शनियाँ";
                          const isCelebrations =
                            sub === "Celebrations" || sub === "उत्सव";
                          const isCompetitions =
                            sub === "Competitions" || sub === "प्रतियोगिताएँ";
                          const isStaffActivity =
                            sub === "Staff Activity" ||
                            sub === "कर्मचारी गतिविधि";
                          const isExtraCurricular =
                            sub === "Extra Curricular" ||
                            sub === "पाठ्येतर गतिविधियाँ";
                          const isQuizTest =
                            sub === "Quiz Test" || sub === "क्विज टेस्ट";
                          const href = isAboutSchool
                            ? "/about"
                            : isPrincipalDesk
                              ? "/principal-desk"
                              : isManagementCommittee
                                ? "/management-committee"
                                : isPTA
                                  ? "/parents-teachers-association"
                                  : isAwardsAchievements
                                    ? "/awards-achievements"
                                    : isAffiliationDetails
                                      ? "/affiliation-details"
                                      : isAnnualReport
                                        ? "/annual-report"
                                        : isSuccessStories
                                          ? "/success-stories"
                                          : isAchievers
                                            ? "/achievers"
                                            : isFacilities
                                              ? "/facilities"
                                              : isTeam
                                                ? "/team"
                                                : isInfrastructure
                                                  ? "/infrastructure"
                                                  : isPhotoGallery
                                                    ? "/photo-gallery"
                                                    : isVideoGallery
                                                      ? "/video-gallery"
                                                    : isMandatoryDisclosure
                                                      ? "/mandatory-disclosure"
                                                      : isAdmissions
                                                        ? "/admissions"
                                                        : isNCC
                                                          ? "/ncc"
                                                          : isVisionMission
                                                            ? "/vision-mission"
                                                            : isAims
                                                              ? "/aims"
                                                              : isRules
                                                                ? "/rules-regulations"
                                                                : isMessageParents
                                                                  ? "/message-parents"
                                                                  : isMessageStudents
                                                                    ? "/message-students"
                                                                    : isProcedure
                                                                      ? "/important-procedure"
                                                                      : isAnthem
                                                                        ? "/school-anthem"
                                                                        : isFormerHM
                                                                          ? "/former-headmistress"
                                                                          : isRetiredTeachers
                                                                            ? "/retired-teachers"
                                                                            : isNoticeBoard
                                                                              ? "/notice-board"
                                                                              : isHolidayList
                                                                                ? "/holiday-list"
                                                                                : isAcademicCalendar
                                                                                  ? "/academic-calendar"
                                                                                  : isSchoolTimings
                                                                                    ? "/school-timings"
                                                                                    : isSchoolUniform
                                                                                      ? "/school-uniform"
                                                                                      : isDownloads
                                                                                      ? "/downloads"
                                                                                        : isTransferCertificate
                                                                                          ? "/transfer-certificate"
                                                                                          : isOnlineStudyMaterials
                                                                                            ? "/online-study-materials"
                                                                                            : isMartialArts
                                                                                              ? "/martial-arts"
                                                                                              : isAnnualSports
                                                                                                ? "/annual-sports"
                                                                                                : isExhibitions
                                                                                                  ? "/exhibitions"
                                                                                                  : isCelebrations
                                                                                                    ? "/celebrations"
                                                                                                    : isCompetitions
                                                                                                      ? "/competitions"
                                                                                                      : isStaffActivity
                                                                                                        ? "/staff-activity"
                                                                                                        : isExtraCurricular
                                                                                                          ? "/extra-curricular"
                                                                                                          : isQuizTest
                                                                                                            ? "/quiz"
                                                                            : "#";
                          const linkProps = {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "9px 16px 9px 0",
                              color: "#4b5563",
                              fontSize: "13.5px",
                              fontFamily: "'Nunito',sans-serif",
                              fontWeight: "500",
                              textDecoration: "none",
                              transition: "color 0.15s",
                            },
                            onMouseEnter: (e) =>
                              (e.currentTarget.style.color = color),
                            onMouseLeave: (e) =>
                              (e.currentTarget.style.color = "#4b5563"),
                          };
                          const isInternalRouteMobile =
                            isAboutSchool ||
                            isPrincipalDesk ||
                            isManagementCommittee ||
                            isPTA ||
                            isAwardsAchievements ||
                            isAffiliationDetails ||
                            isAnnualReport ||
                            isSuccessStories ||
                            isAchievers ||
                            isFacilities ||
                            isTeam ||
                            isInfrastructure ||
                            isPhotoGallery ||
                            isVideoGallery ||
                            isMandatoryDisclosure ||
                            isAdmissions ||
                            isNCC ||
                            isVisionMission ||
                            isAims ||
                            isRules ||
                            isMessageParents ||
                            isMessageStudents ||
                            isProcedure ||
                            isAnthem ||
                            isFormerHM ||
                            isRetiredTeachers ||
                            isNoticeBoard ||
                            isHolidayList ||
                            isAcademicCalendar ||
                            isSchoolTimings ||
                            isSchoolUniform ||
                            isDownloads ||
                            isTransferCertificate ||
                            isOnlineStudyMaterials ||
                            isMartialArts ||
                            isAnnualSports ||
                            isExhibitions ||
                            isCelebrations ||
                            isCompetitions ||
                            isStaffActivity ||
                            isExtraCurricular ||
                            isQuizTest;
                          return isInternalRouteMobile ? (
                            <Link key={j} to={href} {...linkProps}>
                              <span
                                style={{
                                  width: "4px",
                                  height: "4px",
                                  borderRadius: "50%",
                                  background: color,
                                  flexShrink: 0,
                                }}
                              />
                              {sub}
                            </Link>
                          ) : (
                            <a key={j} href={href} {...linkProps}>
                              <span
                                style={{
                                  width: "4px",
                                  height: "4px",
                                  borderRadius: "50%",
                                  background: color,
                                  flexShrink: 0,
                                }}
                              />
                              {sub}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

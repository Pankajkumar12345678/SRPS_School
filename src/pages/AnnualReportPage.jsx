import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaDownload,
  FaChartLine,
  FaUsers,
  FaGraduationCap,
  FaBook,
  FaAward,
} from "react-icons/fa";

const REPORTS = [
  {
    year: "2023-24",
    title: "Annual Report 2023-24",
    description:
      "Comprehensive overview of academic achievements, infrastructure developments, and student accomplishments.",
    status: "Available",
  },
  {
    year: "2022-23",
    title: "Annual Report 2022-23",
    description:
      "Detailed report on curriculum implementation, extracurricular activities, and examination results.",
    status: "Available",
  },
  {
    year: "2021-22",
    title: "Annual Report 2021-22",
    description:
      "Post-pandemic recovery report with focus on digital learning and student welfare initiatives.",
    status: "Available",
  },
  {
    year: "2020-21",
    title: "Annual Report 2020-21",
    description:
      "Online learning report detailing adaptation to new educational norms and achievements.",
    status: "Available",
  },
];

const STATS = [
  { icon: <FaUsers />, value: "1,200+", label: "Total Students" },
  { icon: <FaGraduationCap />, value: "75+", label: "Teaching Staff" },
  { icon: <FaBook />, value: "50+", label: "Classrooms" },
  { icon: <FaAward />, value: "98%", label: "Pass Rate" },
];

const HIGHLIGHTS_2024 = [
  {
    title: "Academic Excellence",
    description:
      "Class X & XII board results exceeded 98% pass rate with 45+ students scoring above 90%.",
    icon: <FaGraduationCap />,
  },
  {
    title: "Infrastructure Development",
    description:
      "New science laboratory, digital library, and smart classrooms inaugurated.",
    icon: <FaChartLine />,
  },
  {
    title: "Sports Achievements",
    description:
      "District-level championships in football, athletics, and kabaddi.",
    icon: <FaAward />,
  },
  {
    title: "Community Initiatives",
    description:
      "Health awareness campaigns, tree plantation drives, and literacy programs conducted.",
    icon: <FaUsers />,
  },
];

export default function AnnualReportPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Jost:wght@300;400;500;600;700&display=swap');
        
        :root {
          --primary: #1B6B7A;
          --primary-dark: #134F5C;
          --accent: #E8B97A;
          --accent-dark: #C9943A;
          --bg-light: #FAF9F6;
          --bg-cream: #F5F0E8;
          --text-dark: #1A1A1A;
          --text-muted: #6B7280;
        }
        
        * { box-sizing: border-box; }
        
        .ar-page {
          font-family: 'Jost', sans-serif;
          color: var(--text-dark);
          background: var(--bg-light);
        }
        
        .ar-hero {
          position: relative;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          padding: 100px 24px 80px;
          text-align: center;
          overflow: hidden;
        }
        
        .ar-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1950&q=80') center/cover;
          opacity: 0.1;
        }
        
        .ar-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .ar-badge {
          display: inline-block;
          background: var(--accent);
          color: var(--primary-dark);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 6px 18px;
          border-radius: 2rem;
          margin-bottom: 20px;
        }
        
        .ar-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.15;
        }
        
        .ar-hero p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .ar-section {
          padding: 80px 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .ar-intro {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .ar-intro h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 16px;
        }
        
        .ar-intro p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
        }
        
        /* Stats */
        .ar-stats {
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          padding: 60px 24px;
          border-radius: 24px;
          margin-bottom: 60px;
        }
        
        .ar-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          text-align: center;
        }
        
        @media (max-width: 768px) {
          .ar-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .ar-stat-item {
          color: #fff;
        }
        
        .ar-stat-icon {
          font-size: 2rem;
          color: var(--accent);
          margin-bottom: 12px;
        }
        
        .ar-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 8px;
        }
        
        .ar-stat-label {
          font-size: 0.85rem;
          opacity: 0.8;
        }
        
        /* Current Year Highlights */
        .ar-highlights {
          margin-bottom: 60px;
        }
        
        .ar-highlights h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 40px;
          text-align: center;
        }
        
        .ar-highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }
        
        .ar-highlight-card {
          background: #fff;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          transition: transform 0.3s;
          border-left: 4px solid var(--accent);
        }
        
        .ar-highlight-card:hover {
          transform: translateY(-4px);
        }
        
        .ar-highlight-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: var(--bg-cream);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 1.4rem;
          color: var(--primary);
        }
        
        .ar-highlight-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: var(--primary-dark);
          margin: 0 0 10px;
        }
        
        .ar-highlight-card p {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }
        
        /* Reports List */
        .ar-reports h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 40px;
          text-align: center;
        }
        
        .ar-reports-grid {
          display: grid;
          gap: 20px;
        }
        
        .ar-report-card {
          background: #fff;
          border-radius: 16px;
          padding: 28px 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 24px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .ar-report-card:hover {
          transform: translateX(8px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        
        @media (max-width: 768px) {
          .ar-report-card {
            flex-direction: column;
            text-align: center;
          }
        }
        
        .ar-report-icon {
          width: 70px;
          height: 70px;
          border-radius: 16px;
          background: var(--bg-cream);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          color: var(--primary);
          flex-shrink: 0;
        }
        
        .ar-report-content {
          flex: 1;
        }
        
        .ar-report-year {
          display: inline-block;
          background: var(--primary-dark);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 2rem;
          margin-bottom: 8px;
        }
        
        .ar-report-content h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: var(--primary-dark);
          margin: 0 0 6px;
        }
        
        .ar-report-content p {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }
        
        .ar-report-download {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--primary);
          color: #fff;
          padding: 12px 24px;
          border-radius: 3rem;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.85rem;
          transition: background 0.3s, transform 0.2s;
          flex-shrink: 0;
        }
        
        .ar-report-download:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }
        
        /* Notice */
        .ar-notice {
          background: var(--bg-cream);
          padding: 40px;
          border-radius: 16px;
          text-align: center;
          margin-top: 40px;
          border: 2px dashed var(--accent);
        }
        
        .ar-notice h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          color: var(--primary-dark);
          margin: 0 0 10px;
        }
        
        .ar-notice p {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .ar-hero { padding: 80px 20px 60px; }
          .ar-section { padding: 60px 20px; }
          .ar-stats { padding: 40px 20px; border-radius: 16px; }
        }
      `}</style>

      <div className="ar-page">
        {/* Hero Section */}
        <section className="ar-hero">
          <div className="ar-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="ar-badge">Transparency & Accountability</span>
              <h1>Annual Reports</h1>
              <p>
                Transparent reporting of our academic performance, achievements,
                and future initiatives.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="ar-section">
          <motion.div
            className="ar-stats"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="ar-stats-grid">
              {STATS.map((stat, index) => (
                <motion.div
                  key={index}
                  className="ar-stat-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="ar-stat-icon">{stat.icon}</div>
                  <div className="ar-stat-value">{stat.value}</div>
                  <div className="ar-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Current Year Highlights */}
          <div className="ar-highlights">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Highlights of 2023-24</h2>
            </motion.div>
            <div className="ar-highlights-grid">
              {HIGHLIGHTS_2024.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="ar-highlight-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="ar-highlight-icon">{highlight.icon}</div>
                  <h3>{highlight.title}</h3>
                  <p>{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reports List */}
          <div className="ar-reports">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Previous Annual Reports</h2>
            </motion.div>
            <div className="ar-reports-grid">
              {REPORTS.map((report, index) => (
                <motion.div
                  key={index}
                  className="ar-report-card"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="ar-report-icon">
                    <FaFileAlt />
                  </div>
                  <div className="ar-report-content">
                    <span className="ar-report-year">{report.year}</span>
                    <h3>{report.title}</h3>
                    <p>{report.description}</p>
                  </div>
                  <a href="#" className="ar-report-download">
                    <FaDownload /> Download
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="ar-notice">
              <h4>📄 Note</h4>
              <p>
                Hard copies of annual reports are available at the school
                office. For any queries, please contact the administration.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

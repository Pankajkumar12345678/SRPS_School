import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaGraduationCap,
  FaBuilding,
  FaFileAlt,
  FaDownload,
} from "react-icons/fa";

const AFFILIATION_INFO = {
  schoolName: "Shree Ram Public School",
  address:
    "Village Kanhra, Post Office - Kanhra, District Muzaffarnagar, Uttar Pradesh - 251001",
  affiliation: "Central Board of Secondary Education (CBSE)",
  affiliationNo: "531526",
  schoolCode: "62614",
  board: "CBSE, New Delhi",
  streams: ["Science (PCM)", "Science (PCB)", "Commerce", " Humanities"],
  languages: ["English", "Hindi", "Sanskrit"],
  yearEstablished: "2012",
  annualAffiliationFee: "₹25,000 (Approx.)",
  nextReaffiliation: "2027",
};

const DOCUMENTS = [
  { name: "Affiliation Certificate", status: "Valid", expiry: "2027" },
  { name: "Recognition Certificate", status: "Valid", expiry: "N/A" },
  { name: "Fire Safety Certificate", status: "Valid", expiry: "2025" },
  { name: "Building Safety Certificate", status: "Valid", expiry: "2026" },
  { name: "Water & Sanitation Certificate", status: "Valid", expiry: "2026" },
  { name: "Society Registration", status: "Valid", expiry: "Perpetual" },
];

const ACADEMIC_HIGHLIGHTS = [
  "CBSE affiliated since 2012",
  "Classes from Nursery to Class XII",
  "Science, Commerce, and Humanities streams",
  "English Medium of Instruction",
  "Regular CBSE board examinations",
  "National level competitive exam preparation",
];

export default function AffiliationDetailsPage() {
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
          --success: #10B981;
        }
        
        * { box-sizing: border-box; }
        
        .ad-page {
          font-family: 'Jost', sans-serif;
          color: var(--text-dark);
          background: var(--bg-light);
        }
        
        .ad-hero {
          position: relative;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          padding: 100px 24px 80px;
          text-align: center;
          overflow: hidden;
        }
        
        .ad-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1950&q=80') center/cover;
          opacity: 0.1;
        }
        
        .ad-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .ad-badge {
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
        
        .ad-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.15;
        }
        
        .ad-hero p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .ad-section {
          padding: 80px 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .ad-intro {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .ad-intro h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 16px;
        }
        
        .ad-intro p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
        }
        
        /* Certificate Display */
        .ad-cert-box {
          background: #fff;
          border-radius: 20px;
          padding: 48px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
          margin-bottom: 50px;
          text-align: center;
        }
        
        .ad-cert-logo {
          width: 100px;
          height: 100px;
          margin: 0 auto 24px;
          background: var(--primary-dark);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .ad-cert-logo svg {
          width: 50px;
          height: 50px;
          fill: #fff;
        }
        
        .ad-cert-box h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          color: var(--primary-dark);
          margin: 0 0 8px;
        }
        
        .ad-cert-board {
          color: var(--accent-dark);
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 24px;
        }
        
        .ad-cert-number {
          display: inline-block;
          background: var(--bg-cream);
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 1rem;
          color: var(--text-dark);
        }
        
        .ad-cert-number span {
          color: var(--primary);
          font-weight: 700;
        }
        
        /* Info Grid */
        .ad-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 50px;
        }
        
        .ad-info-card {
          background: #fff;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }
        
        .ad-info-card:hover {
          transform: translateY(-4px);
        }
        
        .ad-info-icon {
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
        
        .ad-info-card h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          color: var(--text-muted);
          margin: 0 0 8px;
          font-weight: 500;
        }
        
        .ad-info-card p {
          font-size: 1rem;
          color: var(--text-dark);
          font-weight: 600;
          margin: 0;
        }
        
        /* Documents Table */
        .ad-docs {
          background: #fff;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        
        .ad-docs h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          color: var(--primary-dark);
          margin: 0 0 28px;
          text-align: center;
        }
        
        .ad-docs-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .ad-docs-table th {
          text-align: left;
          padding: 14px 16px;
          background: var(--bg-cream);
          color: var(--primary-dark);
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .ad-docs-table th:first-child {
          border-radius: 8px 0 0 8px;
        }
        
        .ad-docs-table th:last-child {
          border-radius: 0 8px 8px 0;
          text-align: center;
        }
        
        .ad-docs-table td {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          font-size: 0.95rem;
        }
        
        .ad-docs-table td:last-child {
          text-align: center;
        }
        
        .ad-docs-table tr:last-child td {
          border-bottom: none;
        }
        
        .ad-status-valid {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--success);
          font-weight: 600;
          font-size: 0.85rem;
        }
        
        /* Highlights */
        .ad-highlights {
          background: var(--primary-dark);
          padding: 80px 24px;
          margin-top: 60px;
        }
        
        .ad-highlights-inner {
          max-width: 900px;
          margin: 0 auto;
        }
        
        .ad-highlights h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #fff;
          margin: 0 0 40px;
          text-align: center;
        }
        
        .ad-highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        
        .ad-highlight-item {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255,255,255,0.08);
          padding: 18px 22px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        
        .ad-highlight-item svg {
          color: var(--accent);
          flex-shrink: 0;
        }
        
        .ad-highlight-item span {
          color: #fff;
          font-size: 0.95rem;
        }
        
        /* CTA */
        .ad-cta {
          background: var(--bg-cream);
          padding: 80px 24px;
          text-align: center;
        }
        
        .ad-cta-inner {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .ad-cta h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          color: var(--primary-dark);
          margin: 0 0 16px;
        }
        
        .ad-cta p {
          color: var(--text-muted);
          margin: 0 0 28px;
        }
        
        .ad-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--primary);
          color: #fff;
          padding: 14px 32px;
          border-radius: 3rem;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background 0.3s, transform 0.2s;
        }
        
        .ad-cta-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .ad-hero { padding: 80px 20px 60px; }
          .ad-section { padding: 60px 20px; }
          .ad-cert-box { padding: 32px 20px; }
          .ad-docs { padding: 24px 16px; }
          .ad-docs-table { font-size: 0.85rem; }
        }
      `}</style>

      <div className="ad-page">
        {/* Hero Section */}
        <section className="ad-hero">
          <div className="ad-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="ad-badge">CBSE Affiliated</span>
              <h1>Affiliation Details</h1>
              <p>
                Official affiliation information and regulatory compliance of
                Shree Ram Public School.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Certificate Display */}
        <section className="ad-section">
          <motion.div
            className="ad-cert-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="ad-cert-logo">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>
            <h3>{AFFILIATION_INFO.schoolName}</h3>
            <p className="ad-cert-board">{AFFILIATION_INFO.affiliation}</p>
            <div className="ad-cert-number">
              Affiliation No: <span>{AFFILIATION_INFO.affiliationNo}</span>
            </div>
          </motion.div>

          {/* Info Grid */}
          <div className="ad-info-grid">
            {[
              {
                icon: <FaBuilding />,
                title: "School Code",
                value: AFFILIATION_INFO.schoolCode,
              },
              {
                icon: <FaGraduationCap />,
                title: "Board",
                value: AFFILIATION_INFO.board,
              },
              {
                icon: <FaFileAlt />,
                title: "Established",
                value: AFFILIATION_INFO.yearEstablished,
              },
              {
                icon: <FaCheckCircle />,
                title: "Next Reaffiliation",
                value: AFFILIATION_INFO.nextReaffiliation,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="ad-info-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="ad-info-icon">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Documents Table */}
          <motion.div
            className="ad-docs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Valid Certificates & Documents</h3>
            <table className="ad-docs-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Status</th>
                  <th>Valid Until</th>
                </tr>
              </thead>
              <tbody>
                {DOCUMENTS.map((doc, index) => (
                  <tr key={index}>
                    <td>{doc.name}</td>
                    <td>
                      <span className="ad-status-valid">
                        <FaCheckCircle /> {doc.status}
                      </span>
                    </td>
                    <td>{doc.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </section>

        {/* Academic Highlights */}
        <section className="ad-highlights">
          <div className="ad-highlights-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Academic Highlights</h2>
            </motion.div>
            <div className="ad-highlights-grid">
              {ACADEMIC_HIGHLIGHTS.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="ad-highlight-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <FaCheckCircle />
                  <span>{highlight}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ad-cta">
          <div className="ad-cta-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3>View Mandatory Disclosure</h3>
              <p>
                Access complete regulatory information and compliance documents
                as per CBSE guidelines.
              </p>
              <a href="/mandatory-disclosure" className="ad-cta-btn">
                <FaDownload /> View Disclosure
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

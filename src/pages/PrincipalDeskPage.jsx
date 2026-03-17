import { motion } from "framer-motion";
import {
  FaQuoteLeft,
  FaGraduationCap,
  FaUserGraduate,
  FaAward,
  FaCalendarAlt,
} from "react-icons/fa";

const PARAGRAPHS = [
  `At Shree Ram Public School, we believe in the transformative power of education. Our mission is to empower young minds, nurturing them to reach their full potential and contribute meaningfully to society.`,
  `We create an environment where curiosity is encouraged, creativity is celebrated, and lifelong learning is embraced. Our dedicated faculty and comprehensive curriculum ensure every student receives a well-rounded education.`,
  `As the principal, I am honored to lead a community committed to excellence. Together we inspire, innovate, and ignite a passion for learning. May each student discover the brilliance of knowledge every day.`,
];

const PRINCIPAL_INFO = {
  name: "Mrs. Sunita Sharma",
  qualification: "M.A., B.Ed., M.Ed.",
  experience: "22+ Years in Education",
  image: "/School_pic/NCC_Pic_36.JPEG",
};

export default function PrincipalDeskPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Source+Serif+4:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        
        :root {
          --primary: #1B6B7A;
          --primary-dark: #134F5C;
          --accent: #E8A830;
          --accent-dark: #C9943A;
          --bg-light: #FAF9F6;
          --bg-cream: #F5F0E8;
          --text-dark: #1A1A1A;
          --text-muted: #6B7280;
        }
        
        * { box-sizing: border-box; }
        
        .pd-page {
          font-family: 'Source Serif 4', serif;
          color: var(--text-dark);
          background: var(--bg-light);
        }
        
        .pd-hero {
          position: relative;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          padding: 100px 24px 80px;
          text-align: center;
          overflow: hidden;
        }
        
        .pd-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1950&q=80') center/cover;
          opacity: 0.1;
        }
        
        .pd-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .pd-badge {
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
        
        .pd-hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.15;
        }
        
        .pd-hero p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
          font-family: 'Source Serif 4', serif;
        }
        
        /* Main Content */
        .pd-section {
          padding: 80px 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .pd-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 64px;
          align-items: start;
        }
        
        @media (max-width: 800px) {
          .pd-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        
        /* Image Side */
        .pd-image-wrap {
          position: relative;
        }
        
        .pd-image-shadow {
          position: absolute;
          top: 14px;
          left: 14px;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          background: #0E5F6B;
          z-index: 0;
        }
        
        .pd-image {
          position: relative;
          z-index: 1;
          border-radius: 4px;
          overflow: hidden;
          aspect-ratio: 3/4;
        }
        
        .pd-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          display: block;
        }
        
        .pd-name-card {
          position: absolute;
          bottom: -20px;
          left: 20px;
          z-index: 2;
          background: var(--accent);
          padding: 14px 24px;
        }
        
        .pd-name-card h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
          letter-spacing: 0.04em;
        }
        
        .pd-name-card p {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.88);
          margin: 4px 0 0;
          letter-spacing: 0.06em;
        }
        
        /* Content Side */
        .pd-content {
          padding-top: 20px;
        }
        
        .pd-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.75rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 12px;
          font-family: 'Source Serif 4', serif;
        }
        
        .pd-label::before {
          content: '';
          display: block;
          width: 30px;
          height: 2px;
          background: var(--accent);
        }
        
        .pd-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 700;
          color: var(--primary-dark);
          line-height: 1.2;
          margin: 0 0 24px;
        }
        
        .pd-title em {
          font-style: italic;
          color: var(--primary);
        }
        
        .pd-divider {
          width: 60px;
          height: 3px;
          background: var(--accent);
          margin-bottom: 28px;
        }
        
        .pd-para {
          font-size: 1rem;
          color: #555;
          line-height: 1.9;
          margin-bottom: 20px;
          font-weight: 300;
        }
        
        .pd-signature {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(14,95,107,0.15);
        }
        
        .pd-signature svg {
          display: block;
          margin-bottom: 8px;
        }
        
        .pd-signature-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--primary-dark);
          margin: 0 0 4px;
        }
        
        .pd-signature-role {
          font-size: 0.75rem;
          color: #aaa;
          font-style: italic;
          margin: 0;
        }
        
        .pd-blessing {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 1rem;
          color: var(--primary);
          margin: 24px 0 0;
        }
        
        /* Stats Section */
        .pd-stats {
          background: var(--primary-dark);
          padding: 60px 24px;
        }
        
        .pd-stats-inner {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
        }
        
        .pd-stat {
          text-align: center;
        }
        
        .pd-stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(232,168,48,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          font-size: 1.2rem;
          color: var(--accent);
        }
        
        .pd-stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
        }
        
        .pd-stat-label {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
        }
        
        /* Quote Section */
        .pd-quote-sec {
          background: var(--bg-cream);
          padding: 80px 24px;
        }
        
        .pd-quote-inner {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .pd-quote-icon {
          font-size: 3rem;
          color: var(--accent);
          margin-bottom: 20px;
        }
        
        .pd-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.3rem, 2.5vw, 1.8rem);
          font-style: italic;
          color: var(--primary-dark);
          line-height: 1.6;
          margin: 0 0 24px;
        }
        
        .pd-quote-author {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        
        @media (max-width: 768px) {
          .pd-hero { padding: 80px 20px 60px; }
          .pd-section { padding: 60px 20px; }
        }
      `}</style>

      <div className="pd-page">
        {/* Hero Section */}
        <section className="pd-hero">
          <div className="pd-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="pd-badge">Leadership</span>
              <h1>Principal's Desk</h1>
              <p>A message of vision and excellence for our school community</p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pd-section">
          <div className="pd-grid">
            {/* Left: Image */}
            <motion.div
              className="pd-image-wrap"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <div className="pd-image-shadow" />
              <div className="pd-image">
                <img
                  src={PRINCIPAL_INFO.image}
                  alt={PRINCIPAL_INFO.name}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  style={{
                    display: "none",
                    width: "100%",
                    height: "100%",
                    background: "#0E5F6B",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle
                      cx="32"
                      cy="24"
                      r="14"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 58 C10 44 20 36 32 36 C44 36 54 44 54 58"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="pd-name-card">
                <h3>{PRINCIPAL_INFO.name}</h3>
                <p>{PRINCIPAL_INFO.qualification}</p>
              </div>
            </motion.div>

            {/* Right: Message */}
            <motion.div
              className="pd-content"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true }}
            >
              <div className="pd-label">
                <FaQuoteLeft style={{ fontSize: "0.9rem" }} />
                From the Principal's Desk
              </div>

              <h2 className="pd-title">
                A Message of
                <br />
                <em>Vision & Excellence</em>
              </h2>

              <div className="pd-divider" />

              {PARAGRAPHS.map((para, i) => (
                <motion.p
                  key={i}
                  className="pd-para"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  {para}
                </motion.p>
              ))}

              <p className="pd-blessing">May God Bless and Guide Us All 🙏</p>

              <div className="pd-signature">
                <svg width="110" height="30" viewBox="0 0 110 30">
                  <path
                    d="M4 24 C14 8 26 20 38 14 C50 8 60 22 74 15 C85 9 96 22 107 13"
                    fill="none"
                    stroke="#0E5F6B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>
                <p className="pd-signature-name">{PRINCIPAL_INFO.name}</p>
                <p className="pd-signature-role">
                  Principal, Shree Ram Public School (CBSE)
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="pd-stats">
          <div className="pd-stats-inner">
            {[
              { icon: <FaUserGraduate />, value: "1000+", label: "Students" },
              { icon: <FaGraduationCap />, value: "45+", label: "Teachers" },
              { icon: <FaAward />, value: "13+", label: "Years of Excellence" },
              { icon: <FaCalendarAlt />, value: "2012", label: "Established" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="pd-stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="pd-stat-icon">{stat.icon}</div>
                <div className="pd-stat-value">{stat.value}</div>
                <div className="pd-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quote Section */}
        <section className="pd-quote-sec">
          <div className="pd-quote-inner">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="pd-quote-icon">
                <FaQuoteLeft />
              </div>
              <p className="pd-quote">
                "Education is the most powerful weapon which you can use to
                change the world."
              </p>
              <p className="pd-quote-author">— Nelson Mandela</p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

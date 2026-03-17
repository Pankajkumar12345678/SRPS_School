import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaUsers,
  FaBullseye,
  FaHandshake,
} from "react-icons/fa";

const COMMITTEE_MEMBERS = [
  {
    name: "Mr. Ramesh Kumar Gupta",
    role: "Chairman",
    qualification: "M.A., B.Ed.",
    experience: "30+ Years",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "A visionary educationist dedicated to transforming rural education landscape in Haryana.",
  },
  {
    name: "Mrs. Anita Devi Agarwal",
    role: "Vice Chairperson",
    qualification: "M.Com, M.Ed.",
    experience: "25+ Years",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Committed to girl-child education and women's empowerment initiatives.",
  },
  {
    name: "Dr. Vikas Singh",
    role: "Secretary",
    qualification: "Ph.D. in Education",
    experience: "20+ Years",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    bio: "Oversees academic policies and ensures quality education standards.",
  },
  {
    name: "Mr. Suresh Kumar",
    role: "Treasurer",
    qualification: "CA, M.Com",
    experience: "15+ Years",
    image: "https://randomuser.me/api/portraits/men/58.jpg",
    bio: "Manages financial operations and resource allocation efficiently.",
  },
  {
    name: "Mrs. Sunita Sharma",
    role: "Principal (Ex-officio)",
    qualification: "M.A., B.Ed., M.Ed.",
    experience: "22+ Years",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Leading the institution with dedication and educational excellence.",
  },
  {
    name: "Mr. Ajay Kumar",
    role: "Member",
    qualification: "B.Tech, MBA",
    experience: "10+ Years",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "Brings industry perspective and technical expertise to the committee.",
  },
  {
    name: "Mrs. Kavita Devi",
    role: "Member (Parent Representative)",
    qualification: "M.A.",
    experience: "5+ Years",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "Represents parental concerns and contributes to school improvement.",
  },
  {
    name: "Mr. Raghavendra Rao",
    role: "Member (Educationist)",
    qualification: "Ph.D.",
    experience: "28+ Years",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    bio: "Provides academic guidance and curriculum development expertise.",
  },
];

export default function ManagementCommitteePage() {
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
          --text-dark: #1A1A1A;
          --text-muted: #6B7280;
        }
        
        * { box-sizing: border-box; }
        
        .mc-page {
          font-family: 'Jost', sans-serif;
          color: var(--text-dark);
          background: var(--bg-light);
        }
        
        .mc-hero {
          position: relative;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          padding: 100px 24px 80px;
          text-align: center;
          overflow: hidden;
        }
        
        .mc-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1950&q=80') center/cover;
          opacity: 0.1;
        }
        
        .mc-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .mc-badge {
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
        
        .mc-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.15;
        }
        
        .mc-hero p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .mc-section {
          padding: 80px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .mc-intro {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .mc-intro h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 16px;
        }
        
        .mc-intro p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .mc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
        }
        
        .mc-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .mc-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        
        .mc-card-img {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        
        .mc-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        
        .mc-card:hover .mc-card-img img {
          transform: scale(1.08);
        }
        
        .mc-card-img::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
        }
        
        .mc-card-role {
          position: absolute;
          top: 16px;
          right: 16px;
          background: var(--accent);
          color: var(--primary-dark);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 2rem;
          z-index: 1;
        }
        
        .mc-card-body {
          padding: 24px;
        }
        
        .mc-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--primary-dark);
          margin: 0 0 8px;
        }
        
        .mc-card-qual {
          font-size: 0.8rem;
          color: var(--accent-dark);
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .mc-card-exp {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        
        .mc-card-bio {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        
        .mc-values {
          background: var(--primary-dark);
          padding: 80px 24px;
        }
        
        .mc-values-inner {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }
        
        .mc-values h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #fff;
          margin: 0 0 40px;
        }
        
        .mc-values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
        }
        
        .mc-value-item {
          text-align: center;
        }
        
        .mc-value-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(232,185,122,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 1.6rem;
          color: var(--accent);
        }
        
        .mc-value-item h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: #fff;
          margin: 0 0 8px;
        }
        
        .mc-value-item p {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
        }
        
        @media (max-width: 768px) {
          .mc-hero { padding: 80px 20px 60px; }
          .mc-section { padding: 60px 20px; }
        }
      `}</style>

      <div className="mc-page">
        {/* Hero Section */}
        <section className="mc-hero">
          <div className="mc-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mc-badge">Est. 2012 · CBSE Affiliated</span>
              <h1>Management Committee</h1>
              <p>
                Guided by experienced leaders committed to excellence in
                education and holistic development of every student.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mc-section">
          <div className="mc-intro">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Our Governing Body</h2>
              <p>
                The Management Committee of Shree Ram Public School comprises
                dedicated educationists, experienced administrators, and
                community representatives who work tirelessly to ensure the
                highest standards of education and institutional growth.
              </p>
            </motion.div>
          </div>

          {/* Committee Members Grid */}
          <div className="mc-grid">
            {COMMITTEE_MEMBERS.map((member, index) => (
              <motion.div
                key={index}
                className="mc-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="mc-card-img">
                  <img src={member.image} alt={member.name} />
                  <span className="mc-card-role">{member.role}</span>
                </div>
                <div className="mc-card-body">
                  <h3>{member.name}</h3>
                  <p className="mc-card-qual">{member.qualification}</p>
                  <p className="mc-card-exp">Experience: {member.experience}</p>
                  <p className="mc-card-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mc-values">
          <div className="mc-values-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Our Core Values</h2>
            </motion.div>
            <div className="mc-values-grid">
              {[
                {
                  icon: <FaBullseye />,
                  title: "Integrity",
                  desc: "Upholding honesty and ethical practices in all decisions",
                },
                {
                  icon: <FaGraduationCap />,
                  title: "Excellence",
                  desc: "Striving for the highest standards in education",
                },
                {
                  icon: <FaUsers />,
                  title: "Inclusivity",
                  desc: "Ensuring equal opportunities for all students",
                },
                {
                  icon: <FaHandshake />,
                  title: "Collaboration",
                  desc: "Working together for student success",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="mc-value-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mc-value-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

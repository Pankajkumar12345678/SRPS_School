import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaUsers,
  FaBullseye,
  FaHandshake,
  FaChalkboardTeacher,
  FaUserTie,
  FaMedal,
} from "react-icons/fa";

const TEAM_MEMBERS = [
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
    role: "Principal",
    qualification: "M.A., B.Ed., M.Ed.",
    experience: "22+ Years",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Leading the institution with dedication and educational excellence.",
  },
  {
    name: "Mr. Ajay Kumar",
    role: "Administrative Officer",
    qualification: "B.Tech, MBA",
    experience: "10+ Years",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "Brings industry perspective and technical expertise to the committee.",
  },
  {
    name: "Mrs. Kavita Devi",
    role: "Senior Teacher (Science)",
    qualification: "M.Sc., B.Ed.",
    experience: "15+ Years",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "Passionate science educator with excellent student outcomes.",
  },
  {
    name: "Mr. Raghavendra Rao",
    role: "Senior Teacher (Mathematics)",
    qualification: "M.A., B.Ed.",
    experience: "18+ Years",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    bio: "Expert mathematics educator with innovative teaching methods.",
  },
];

const STAFF_CATEGORIES = [
  {
    title: "Teaching Staff",
    count: "45+",
    description: "Dedicated and well-qualified teachers",
  },
  {
    title: "Non-Teaching Staff",
    count: "25+",
    description: "Support staff ensuring smooth operations",
  },
  {
    title: "Administrative Staff",
    count: "10+",
    description: "Efficient management team",
  },
];

export default function TeamPage() {
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
        
        .team-page {
          font-family: 'Jost', sans-serif;
          color: var(--text-dark);
          background: var(--bg-light);
        }
        
        .team-hero {
          position: relative;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          padding: 100px 24px 80px;
          text-align: center;
          overflow: hidden;
        }
        
        .team-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1950&q=80') center/cover;
          opacity: 0.1;
        }
        
        .team-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .team-badge {
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
        
        .team-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.15;
        }
        
        .team-hero p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .team-section {
          padding: 80px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .team-intro {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .team-intro h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 16px;
        }
        
        .team-intro p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
        }
        
        /* Stats */
        .team-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-bottom: 60px;
        }
        
        .team-stat-card {
          background: #fff;
          border-radius: 16px;
          padding: 28px;
          text-align: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
        }
        
        .team-stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 1.4rem;
          color: #fff;
        }
        
        .team-stat-count {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-dark);
          margin-bottom: 4px;
        }
        
        .team-stat-label {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        
        /* Team Grid */
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
        }
        
        .team-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        
        .team-card-img {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        
        .team-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        
        .team-card:hover .team-card-img img {
          transform: scale(1.08);
        }
        
        .team-card-img::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
        }
        
        .team-card-role {
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
        
        .team-card-body {
          padding: 24px;
        }
        
        .team-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--primary-dark);
          margin: 0 0 8px;
        }
        
        .team-card-qual {
          font-size: 0.8rem;
          color: var(--accent-dark);
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .team-card-exp {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        
        .team-card-bio {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
        }
        
        /* Values Section */
        .team-values {
          background: var(--primary-dark);
          padding: 80px 24px;
        }
        
        .team-values-inner {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }
        
        .team-values h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #fff;
          margin: 0 0 40px;
        }
        
        .team-values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
        }
        
        .team-value-item {
          text-align: center;
        }
        
        .team-value-icon {
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
        
        .team-value-item h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: #fff;
          margin: 0 0 8px;
        }
        
        .team-value-item p {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          line-height: 1.6;
        }
        
        @media (max-width: 768px) {
          .team-hero { padding: 80px 20px 60px; }
          .team-section { padding: 60px 20px; }
        }
      `}</style>

      <div className="team-page">
        {/* Hero Section */}
        <section className="team-hero">
          <div className="team-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="team-badge">Our Team</span>
              <h1>Meet Our Team</h1>
              <p>
                The dedicated professionals behind Shree Ram Public School who
                work tirelessly to nurture young minds.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="team-section">
          <div className="team-stats">
            {STAFF_CATEGORIES.map((stat, index) => (
              <motion.div
                key={index}
                className="team-stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="team-stat-icon">
                  {index === 0 ? (
                    <FaChalkboardTeacher />
                  ) : index === 1 ? (
                    <FaUserTie />
                  ) : (
                    <FaMedal />
                  )}
                </div>
                <div className="team-stat-count">{stat.count}</div>
                <div className="team-stat-label">{stat.title}</div>
              </motion.div>
            ))}
          </div>

          {/* Introduction */}
          <div className="team-intro">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Our Dedicated Team</h2>
              <p>
                At Shree Ram Public School, our team is our greatest asset.
                Comprising experienced educators, dedicated administrators, and
                passionate support staff, we work together to provide the best
                possible education for every student.
              </p>
            </motion.div>
          </div>

          {/* Team Members Grid */}
          <div className="team-grid">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="team-card-img">
                  <img src={member.image} alt={member.name} />
                  <span className="team-card-role">{member.role}</span>
                </div>
                <div className="team-card-body">
                  <h3>{member.name}</h3>
                  <p className="team-card-qual">{member.qualification}</p>
                  <p className="team-card-exp">
                    Experience: {member.experience}
                  </p>
                  <p className="team-card-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="team-values">
          <div className="team-values-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Our Core Values</h2>
            </motion.div>
            <div className="team-values-grid">
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
                  className="team-value-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="team-value-icon">{item.icon}</div>
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

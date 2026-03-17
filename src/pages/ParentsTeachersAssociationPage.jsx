import { motion } from "framer-motion";
import {
  FaUsers,
  FaHandshake,
  FaCalendarAlt,
  FaComments,
  FaAward,
} from "react-icons/fa";

const PTA_OFFICERS = [
  {
    name: "Mrs. Priya Sharma",
    role: "President",
    class: "Class IX - Parent",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    name: "Mr. Rajendra Kumar",
    role: "Vice President",
    class: "Class XI - Parent",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
  {
    name: "Mrs. Sunita Rao",
    role: "Secretary",
    class: "Class VII - Parent",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    name: "Mr. Amit Kumar",
    role: "Treasurer",
    class: "Class V - Parent",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Mrs. Kavita Singh",
    role: "Executive Member",
    class: "Class III - Parent",
    image: "https://randomuser.me/api/portraits/women/37.jpg",
  },
  {
    name: "Mr. Deepak Verma",
    role: "Executive Member",
    class: "Class X - Parent",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

const ACTIVITIES = [
  {
    icon: <FaCalendarAlt />,
    title: "Parent Orientation Programs",
    description:
      "Regular sessions to familiarize parents with the curriculum, teaching methodologies, and school policies.",
  },
  {
    icon: <FaComments />,
    title: "Open Dialogue Forums",
    description:
      "Quarterly meetings between parents and teachers to discuss student progress and address concerns.",
  },
  {
    icon: <FaAward />,
    title: "Fundraising Initiatives",
    description:
      "Organizing events to support school infrastructure, scholarships, and educational programs.",
  },
  {
    icon: <FaAward />,
    title: "Student Achievement Ceremonies",
    description:
      "Recognizing and celebrating academic and non-academic achievements of students.",
  },
  {
    icon: <FaUsers />,
    title: "Volunteer Programs",
    description:
      "Coordinating parent volunteers for school events, field trips, and extracurricular activities.",
  },
  {
    icon: <FaHandshake />,
    title: "Community Outreach",
    description:
      "Building bridges between school and local community through joint social initiatives.",
  },
];

export default function ParentsTeachersAssociationPage() {
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
        
        .pta-page {
          font-family: 'Jost', sans-serif;
          color: var(--text-dark);
          background: var(--bg-light);
        }
        
        .pta-hero {
          position: relative;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          padding: 100px 24px 80px;
          text-align: center;
          overflow: hidden;
        }
        
        .pta-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1950&q=80') center/cover;
          opacity: 0.1;
        }
        
        .pta-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .pta-badge {
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
        
        .pta-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.15;
        }
        
        .pta-hero p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .pta-section {
          padding: 80px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .pta-intro {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .pta-intro h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 16px;
        }
        
        .pta-intro p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .pta-objective {
          background: #fff;
          border-radius: 20px;
          padding: 48px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          margin-bottom: 60px;
        }
        
        .pta-objective h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem;
          color: var(--primary-dark);
          margin: 0 0 20px;
          text-align: center;
        }
        
        .pta-objective p {
          color: var(--text-muted);
          line-height: 1.9;
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .pta-officers h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 40px;
          text-align: center;
        }
        
        .pta-officers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        
        .pta-officer-card {
          background: #fff;
          border-radius: 16px;
          padding: 32px 24px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          transition: transform 0.3s, box-shadow 0.3s;
          border-bottom: 4px solid transparent;
        }
        
        .pta-officer-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
          border-bottom-color: var(--accent);
        }
        
        .pta-officer-img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin: 0 auto 20px;
          overflow: hidden;
          border: 4px solid var(--bg-cream);
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
        }
        
        .pta-officer-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .pta-officer-card h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: var(--primary-dark);
          margin: 0 0 6px;
        }
        
        .pta-officer-role {
          color: var(--accent-dark);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .pta-officer-class {
          color: var(--text-muted);
          font-size: 0.8rem;
        }
        
        .pta-activities {
          background: var(--primary-dark);
          padding: 80px 24px;
          margin-top: 60px;
        }
        
        .pta-activities-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .pta-activities h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #fff;
          margin: 0 0 50px;
          text-align: center;
        }
        
        .pta-activities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 28px;
        }
        
        .pta-activity-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 32px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: transform 0.3s, background 0.3s;
        }
        
        .pta-activity-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.12);
        }
        
        .pta-activity-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 1.4rem;
          color: var(--primary-dark);
        }
        
        .pta-activity-card h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: #fff;
          margin: 0 0 10px;
        }
        
        .pta-activity-card p {
          color: rgba(255,255,255,0.7);
          font-size: 0.9rem;
          line-height: 1.7;
          margin: 0;
        }
        
        .pta-cta {
          background: var(--bg-cream);
          padding: 80px 24px;
          text-align: center;
        }
        
        .pta-cta-inner {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .pta-cta h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          color: var(--primary-dark);
          margin: 0 0 16px;
        }
        
        .pta-cta p {
          color: var(--text-muted);
          margin: 0 0 28px;
        }
        
        .pta-cta-btn {
          display: inline-block;
          background: var(--primary);
          color: #fff;
          padding: 14px 36px;
          border-radius: 3rem;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background 0.3s, transform 0.2s;
        }
        
        .pta-cta-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .pta-hero { padding: 80px 20px 60px; }
          .pta-section { padding: 60px 20px; }
          .pta-objective { padding: 32px 20px; }
        }
      `}</style>

      <div className="pta-page">
        {/* Hero Section */}
        <section className="pta-hero">
          <div className="pta-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="pta-badge">Together We Grow</span>
              <h1>Parents Teachers Association</h1>
              <p>
                Bridging home and school to create a supportive environment for
                every child's holistic development.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction & Objectives */}
        <section className="pta-section">
          <motion.div
            className="pta-objective"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>Our Mission</h3>
            <p>
              The Parents Teachers Association (PTA) at Shree Ram Public School
              serves as a vital link between parents and the school
              administration. Our mission is to foster collaboration, support
              educational initiatives, and create a nurturing environment where
              every student can thrive academically, socially, and emotionally.
            </p>
          </motion.div>

          {/* PTA Officers */}
          <div className="pta-officers">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Our Executive Committee</h2>
            </motion.div>

            <div className="pta-officers-grid">
              {PTA_OFFICERS.map((officer, index) => (
                <motion.div
                  key={index}
                  className="pta-officer-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="pta-officer-img">
                    <img src={officer.image} alt={officer.name} />
                  </div>
                  <h4>{officer.name}</h4>
                  <p className="pta-officer-role">{officer.role}</p>
                  <p className="pta-officer-class">{officer.class}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section className="pta-activities">
          <div className="pta-activities-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Our Activities</h2>
            </motion.div>

            <div className="pta-activities-grid">
              {ACTIVITIES.map((activity, index) => (
                <motion.div
                  key={index}
                  className="pta-activity-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="pta-activity-icon">{activity.icon}</div>
                  <h4>{activity.title}</h4>
                  <p>{activity.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pta-cta">
          <div className="pta-cta-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3>Join the PTA Family</h3>
              <p>
                Your participation makes a difference. Become an active member
                of our PTA and contribute to your child's educational journey.
              </p>
              <a href="/contact" className="pta-cta-btn">
                Contact Us
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

import { motion } from "framer-motion";
import {
  FaTrophy,
  FaMedal,
  FaStar,
  FaCrown,
  FaAward,
  FaGraduationCap,
  FaSchool,
} from "react-icons/fa";

const TOPPERS_12 = [
  {
    name: "Priya Sharma",
    marks: "98.2%",
    rank: "District 1st",
    stream: "Science",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    name: "Rahul Kumar",
    marks: "97.8%",
    rank: "District 3rd",
    stream: "Science",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ananya Verma",
    marks: "96.5%",
    rank: "District 5th",
    stream: "Commerce",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Vikram Singh",
    marks: "95.8%",
    rank: "School 4th",
    stream: "Science",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Kavya Gupta",
    marks: "95.2%",
    rank: "School 5th",
    stream: "Science",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    name: "Aditya Mehta",
    marks: "94.8%",
    rank: "School 6th",
    stream: "Commerce",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const TOPPERS_10 = [
  {
    name: "Aryan Sharma",
    marks: "98.5%",
    rank: "District 2nd",
    section: "A",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    name: "Sanya Kapoor",
    marks: "97.9%",
    rank: "District 4th",
    section: "B",
    image: "https://randomuser.me/api/portraits/women/38.jpg",
  },
  {
    name: "Rohan Verma",
    marks: "97.2%",
    rank: "School 3rd",
    section: "A",
    image: "https://randomuser.me/api/portraits/men/63.jpg",
  },
  {
    name: "Anjali Singh",
    marks: "96.8%",
    rank: "School 4th",
    section: "C",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
];

const ACHIEVERS = [
  {
    name: "Aditya Singh",
    achievement: "National Science Olympiad - Rank 12",
    year: "2024",
    category: "Academic",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
  },
  {
    name: "Ananya Verma",
    achievement: "NTSE State Topper - Rank 5",
    year: "2024",
    category: "Academic",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    name: "Vikram Singh",
    achievement: "State Athletics Gold - 100m",
    year: "2024",
    category: "Sports",
    image: "https://randomuser.me/api/portraits/men/58.jpg",
  },
  {
    name: "Sanya Gupta",
    achievement: "National Chess Camp Selection",
    year: "2023",
    category: "Sports",
    image: "https://randomuser.me/api/portraits/women/61.jpg",
  },
  {
    name: "Arjun Mehta",
    achievement: "All India Debate Winner",
    year: "2024",
    category: "Co-Curricular",
    image: "https://randomuser.me/api/portraits/men/72.jpg",
  },
  {
    name: "Kavya Singh",
    achievement: "State Music Competition - 1st",
    year: "2023",
    category: "Co-Curricular",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
  },
];

const MEDALISTS = [
  {
    name: "District Football Champions",
    category: "U-14 Team",
    year: "2024",
    icon: <FaTrophy />,
  },
  {
    name: "State Kabaddi Silver",
    category: "U-17",
    year: "2023",
    icon: <FaMedal />,
  },
  {
    name: "District Athletics - 3 Gold",
    category: "Individual",
    year: "2024",
    icon: <FaStar />,
  },
  {
    name: "Inter-School Chess - 1st",
    category: "Team",
    year: "2023",
    icon: <FaAward />,
  },
];

export default function AchieversPage() {
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
          --gold: #FFD700;
          --silver: #C0C0C0;
          --bronze: #CD7F32;
        }
        
        * { box-sizing: border-box; }
        
        .ach-page {
          font-family: 'Jost', sans-serif;
          color: var(--text-dark);
          background: var(--bg-light);
        }
        
        .ach-hero {
          position: relative;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          padding: 100px 24px 80px;
          text-align: center;
          overflow: hidden;
        }
        
        .ach-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1950&q=80') center/cover;
          opacity: 0.1;
        }
        
        .ach-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .ach-badge {
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
        
        .ach-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.15;
        }
        
        .ach-hero p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .ach-section {
          padding: 80px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .ach-intro {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .ach-intro h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 16px;
        }
        
        .ach-intro p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
        }
        
        /* Class 12 Toppers */
        .ach-toppers {
          margin-bottom: 70px;
        }
        
        .ach-toppers h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 40px;
          text-align: center;
        }
        
        .ach-winner {
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          border-radius: 24px;
          padding: 40px;
          text-align: center;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
        }
        
        .ach-winner::before {
          content: '👑';
          position: absolute;
          top: 20px;
          right: 30px;
          font-size: 5rem;
          opacity: 0.15;
        }
        
        .ach-winner-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 0 auto 20px;
          overflow: hidden;
          border: 5px solid var(--accent);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        
        .ach-winner-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .ach-winner h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          color: #fff;
          margin: 0 0 8px;
        }
        
        .ach-winner-marks {
          display: inline-block;
          background: var(--accent);
          color: var(--primary-dark);
          font-size: 1.5rem;
          font-weight: 700;
          padding: 8px 24px;
          border-radius: 2rem;
          margin-bottom: 12px;
        }
        
        .ach-winner-rank {
          color: rgba(255,255,255,0.8);
          font-size: 1rem;
        }
        
        .ach-toppers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        
        .ach-topper-card {
          background: #fff;
          border-radius: 16px;
          padding: 28px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          transition: transform 0.3s;
          border-bottom: 4px solid transparent;
        }
        
        .ach-topper-card:hover {
          transform: translateY(-6px);
          border-bottom-color: var(--accent);
        }
        
        .ach-topper-card.gold { border-bottom-color: var(--gold); }
        .ach-topper-card.silver { border-bottom-color: var(--silver); }
        .ach-topper-card.bronze { border-bottom-color: var(--bronze); }
        
        .ach-topper-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 16px;
          overflow: hidden;
          border: 3px solid var(--bg-cream);
        }
        
        .ach-topper-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .ach-topper-card h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: var(--primary-dark);
          margin: 0 0 6px;
        }
        
        .ach-topper-marks {
          color: var(--accent-dark);
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 4px;
        }
        
        .ach-topper-rank {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        
        /* Class 10 Toppers */
        .ach-class10 {
          margin-bottom: 70px;
        }
        
        .ach-class10 .ach-toppers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        /* Achievers */
        .ach-achievers {
          margin-bottom: 70px;
        }
        
        .ach-achievers h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 40px;
          text-align: center;
        }
        
        .ach-achievers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }
        
        .ach-achiever-card {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }
        
        .ach-achiever-card:hover {
          transform: translateX(8px);
        }
        
        .ach-achiever-img {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 3px solid var(--bg-cream);
        }
        
        .ach-achiever-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .ach-achiever-info h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: var(--primary-dark);
          margin: 0 0 4px;
        }
        
        .ach-achievement {
          color: var(--accent-dark);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 4px;
        }
        
        .ach-achiever-meta {
          display: flex;
          gap: 12px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        
        /* Sports */
        .ach-sports {
          background: var(--primary-dark);
          padding: 80px 24px;
          margin-bottom: 60px;
        }
        
        .ach-sports-inner {
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .ach-sports h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #fff;
          margin: 0 0 40px;
          text-align: center;
        }
        
        .ach-sports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }
        
        .ach-sport-card {
          background: rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 28px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.1);
          transition: background 0.3s;
        }
        
        .ach-sport-card:hover {
          background: rgba(255,255,255,0.12);
        }
        
        .ach-sport-icon {
          font-size: 2.5rem;
          color: var(--accent);
          margin-bottom: 16px;
        }
        
        .ach-sport-card h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: #fff;
          margin: 0 0 6px;
        }
        
        .ach-sport-category {
          color: rgba(255,255,255,0.7);
          font-size: 0.85rem;
          margin-bottom: 4px;
        }
        
        .ach-sport-year {
          color: var(--accent);
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        /* CTA */
        .ach-cta {
          background: var(--bg-cream);
          padding: 80px 24px;
          text-align: center;
        }
        
        .ach-cta-inner {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .ach-cta h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          color: var(--primary-dark);
          margin: 0 0 16px;
        }
        
        .ach-cta p {
          color: var(--text-muted);
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .ach-hero { padding: 80px 20px 60px; }
          .ach-section { padding: 60px 20px; }
          .ach-sports { padding: 60px 20px; }
        }
      `}</style>

      <div className="ach-page">
        {/* Hero Section */}
        <section className="ach-hero">
          <div className="ach-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="ach-badge">Excellence Recognized</span>
              <h1>Our Achievers</h1>
              <p>
                Celebrating the outstanding achievements of our brilliant
                students in academics, sports, and beyond.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Class 12 Toppers */}
        <section className="ach-section">
          <div className="ach-toppers">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Class XII Board Toppers 2024</h2>
            </motion.div>

            {/* Winner */}
            <motion.div
              className="ach-winner"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="ach-winner-img">
                <img src={TOPPERS_12[0].image} alt={TOPPERS_12[0].name} />
              </div>
              <h3>{TOPPERS_12[0].name}</h3>
              <div className="ach-winner-marks">{TOPPERS_12[0].marks}</div>
              <p className="ach-winner-rank">
                {TOPPERS_12[0].rank} • {TOPPERS_12[0].stream}
              </p>
            </motion.div>

            {/* Other Toppers */}
            <div className="ach-toppers-grid">
              {TOPPERS_12.slice(1).map((topper, index) => (
                <motion.div
                  key={index}
                  className={`ach-topper-card ${index === 0 ? "silver" : index === 1 ? "bronze" : ""}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="ach-topper-img">
                    <img src={topper.image} alt={topper.name} />
                  </div>
                  <h4>{topper.name}</h4>
                  <p className="ach-topper-marks">{topper.marks}</p>
                  <p className="ach-topper-rank">
                    {topper.rank} • {topper.stream}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Class 10 Toppers */}
          <div className="ach-class10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Class X Board Toppers 2024</h2>
            </motion.div>

            <div className="ach-toppers-grid">
              {TOPPERS_10.map((topper, index) => (
                <motion.div
                  key={index}
                  className={`ach-topper-card ${index === 0 ? "gold" : index === 1 ? "silver" : index === 2 ? "bronze" : ""}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="ach-topper-img">
                    <img src={topper.image} alt={topper.name} />
                  </div>
                  <h4>{topper.name}</h4>
                  <p className="ach-topper-marks">{topper.marks}</p>
                  <p className="ach-topper-rank">
                    {topper.rank} • Section {topper.section}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievers */}
          <div className="ach-achievers">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Other Notable Achievers</h2>
            </motion.div>

            <div className="ach-achievers-grid">
              {ACHIEVERS.map((achiever, index) => (
                <motion.div
                  key={index}
                  className="ach-achiever-card"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="ach-achiever-img">
                    <img src={achiever.image} alt={achiever.name} />
                  </div>
                  <div className="ach-achiever-info">
                    <h4>{achiever.name}</h4>
                    <p className="ach-achievement">{achiever.achievement}</p>
                    <div className="ach-achiever-meta">
                      <span>{achiever.year}</span>
                      <span>•</span>
                      <span>{achiever.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sports Achievements */}
        <section className="ach-sports">
          <div className="ach-sports-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Sports Championships</h2>
            </motion.div>

            <div className="ach-sports-grid">
              {MEDALISTS.map((medal, index) => (
                <motion.div
                  key={index}
                  className="ach-sport-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="ach-sport-icon">{medal.icon}</div>
                  <h4>{medal.name}</h4>
                  <p className="ach-sport-category">{medal.category}</p>
                  <p className="ach-sport-year">{medal.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="ach-cta">
          <div className="ach-cta-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3>Be the Next Achiever</h3>
              <p>Join SRPS and embark on your journey to excellence.</p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

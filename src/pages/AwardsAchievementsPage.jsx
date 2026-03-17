import { motion } from "framer-motion";
import {
  FaTrophy,
  FaMedal,
  FaAward,
  FaStar,
  FaCrown,
  FaGraduationCap,
  FaSchool,
  FaUserGraduate,
} from "react-icons/fa";

const SCHOOL_AWARDS = [
  {
    year: "2024",
    title: "Best CBSE School Award",
    organization: "Haryana Education Excellence Awards",
    description:
      "Recognized for outstanding academic performance and holistic education initiatives.",
    icon: <FaCrown />,
  },
  {
    year: "2023",
    title: "Best School in Muzaffarnagar",
    organization: "Education Today Magazine",
    description:
      "Conferred for excellence in academics, infrastructure, and student development.",
    icon: <FaSchool />,
  },
  {
    year: "2022",
    title: "Green School Certification",
    organization: "Green Education Foundation",
    description:
      "Awarded for outstanding environmental initiatives and sustainability practices.",
    icon: <FaStar />,
  },
  {
    year: "2021",
    title: "Excellence in Sports Education",
    organization: "District Sports Authority",
    description:
      "Recognized for promoting sports and physical education among students.",
    icon: <FaMedal />,
  },
  {
    year: "2020",
    title: "Innovative Teaching Practices Award",
    organization: "Educational Innovation Forum",
    description:
      "Honored for implementing modern teaching methodologies and technology integration.",
    icon: <FaAward />,
  },
  {
    year: "2019",
    title: "Best NCC Unit Award",
    organization: "Haryana NCC Directorate",
    description: "Excellence in NCC activities and cadet development programs.",
    icon: <FaTrophy />,
  },
];

const STUDENT_ACHIEVEMENTS = [
  {
    category: "Academic Excellence",
    items: [
      {
        title: "CBSE Class XII Topper - District 1st",
        student: "Priya Sharma",
        year: "2024",
        marks: "98.2%",
      },
      {
        title: "CBSE Class X Topper - District 3rd",
        student: "Rahul Kumar",
        year: "2024",
        marks: "97.8%",
      },
      {
        title: "National Level Rank in NSO",
        student: "Aditya Singh",
        year: "2023",
        marks: "National Rank 12",
      },
      {
        title: "State Topper in NTSE",
        student: "Ananya Verma",
        year: "2023",
        marks: "State Rank 5",
      },
    ],
  },
  {
    category: "Sports Achievements",
    items: [
      {
        title: "State Gold - Athletics",
        student: "Vikram Singh",
        year: "2024",
        marks: "100m Sprint",
      },
      {
        title: "District Champion - Football",
        student: "Team",
        year: "2024",
        marks: "U-14 Category",
      },
      {
        title: "State Silver - Kabaddi",
        student: "Rohit Kumar",
        year: "2023",
        marks: "U-17 Category",
      },
      {
        title: "National Level - Chess",
        student: "Sanya Gupta",
        year: "2022",
        marks: "National Camp",
      },
    ],
  },
  {
    category: "Co-Curricular",
    items: [
      {
        title: "All India Debate Winner",
        student: "Arjun Mehta",
        year: "2024",
        marks: "National Level",
      },
      {
        title: "Music Competition - 1st Place",
        student: "Kavya Singh",
        year: "2023",
        marks: "State Level",
      },
      {
        title: "Art Exhibition - Best Painting",
        student: "Dev Sharma",
        year: "2023",
        marks: "National Level",
      },
      {
        title: "Robotics Competition Winner",
        student: "Team of 4",
        year: "2022",
        marks: "Regional Level",
      },
    ],
  },
];

const ALUMNI_SUCCESS = [
  {
    name: "Dr. Amit Kumar",
    batch: "2018",
    achievement: "MBBS, AIIMS Delhi",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ms. Priya Singh",
    batch: "2019",
    achievement: "Engineer, Google India",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mr. Rahul Verma",
    batch: "2020",
    achievement: "IIT Kharagpur",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
  },
  {
    name: "Ms. Anjali Gupta",
    batch: "2017",
    achievement: "CA, Delhi",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

export default function AwardsAchievementsPage() {
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
        
        .aa-page {
          font-family: 'Jost', sans-serif;
          color: var(--text-dark);
          background: var(--bg-light);
        }
        
        .aa-hero {
          position: relative;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          padding: 100px 24px 80px;
          text-align: center;
          overflow: hidden;
        }
        
        .aa-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?auto=format&fit=crop&w=1950&q=80') center/cover;
          opacity: 0.1;
        }
        
        .aa-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .aa-badge {
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
        
        .aa-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.15;
        }
        
        .aa-hero p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .aa-section {
          padding: 80px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .aa-intro {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .aa-intro h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 16px;
        }
        
        .aa-intro p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
        }
        
        /* School Awards */
        .aa-awards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }
        
        .aa-award-card {
          background: #fff;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .aa-award-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 100%;
          background: var(--accent);
        }
        
        .aa-award-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        
        .aa-award-year {
          display: inline-block;
          background: var(--primary-dark);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 2rem;
          margin-bottom: 16px;
        }
        
        .aa-award-icon {
          font-size: 2.5rem;
          color: var(--accent);
          margin-bottom: 16px;
        }
        
        .aa-award-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          color: var(--primary-dark);
          margin: 0 0 8px;
        }
        
        .aa-award-org {
          color: var(--accent-dark);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 12px;
        }
        
        .aa-award-desc {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        
        /* Student Achievements */
        .aa-student-section {
          background: var(--primary-dark);
          padding: 80px 24px;
          margin-top: 60px;
        }
        
        .aa-student-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .aa-student-section h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #fff;
          margin: 0 0 50px;
          text-align: center;
        }
        
        .aa-category {
          margin-bottom: 48px;
        }
        
        .aa-category:last-child {
          margin-bottom: 0;
        }
        
        .aa-category h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          color: var(--accent);
          margin: 0 0 24px;
          padding-bottom: 12px;
          border-bottom: 2px solid rgba(255,255,255,0.1);
        }
        
        .aa-achievements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }
        
        .aa-achievement-card {
          background: rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: background 0.3s;
        }
        
        .aa-achievement-card:hover {
          background: rgba(255,255,255,0.12);
        }
        
        .aa-achievement-title {
          color: #fff;
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .aa-achievement-student {
          color: var(--accent);
          font-size: 0.85rem;
          margin-bottom: 4px;
        }
        
        .aa-achievement-marks {
          color: rgba(255,255,255,0.6);
          font-size: 0.8rem;
        }
        
        /* Alumni Success */
        .aa-alumni h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 40px;
          text-align: center;
        }
        
        .aa-alumni-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
        }
        
        .aa-alumni-card {
          background: #fff;
          border-radius: 16px;
          padding: 28px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }
        
        .aa-alumni-card:hover {
          transform: translateY(-6px);
        }
        
        .aa-alumni-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 16px;
          overflow: hidden;
          border: 3px solid var(--accent);
        }
        
        .aa-alumni-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .aa-alumni-card h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: var(--primary-dark);
          margin: 0 0 4px;
        }
        
        .aa-alumni-batch {
          color: var(--accent-dark);
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 8px;
        }
        
        .aa-alumni-achievement {
          color: var(--text-muted);
          font-size: 0.85rem;
        }
        
        /* Stats */
        .aa-stats {
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
          padding: 60px 24px;
        }
        
        .aa-stats-grid {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          text-align: center;
        }
        
        @media (max-width: 768px) {
          .aa-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .aa-stat-item {
          color: var(--primary-dark);
        }
        
        .aa-stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 8px;
        }
        
        .aa-stat-label {
          font-size: 0.85rem;
          font-weight: 600;
          opacity: 0.8;
        }
        
        @media (max-width: 768px) {
          .aa-hero { padding: 80px 20px 60px; }
          .aa-section { padding: 60px 20px; }
          .aa-student-section { padding: 60px 20px; }
        }
      `}</style>

      <div className="aa-page">
        {/* Hero Section */}
        <section className="aa-hero">
          <div className="aa-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="aa-badge">Excellence Recognized</span>
              <h1>Awards & Achievements</h1>
              <p>
                Celebrating the milestones of our students, faculty, and
                institution in academics, sports, and beyond.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="aa-stats">
          <div className="aa-stats-grid">
            {[
              { number: "50+", label: "Awards Won" },
              { number: "500+", label: "Student Achievers" },
              { number: "100%", label: "Board Pass Rate" },
              { number: "200+", label: "Alumni Success Stories" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="aa-stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="aa-stat-number">{stat.number}</div>
                <div className="aa-stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* School Awards */}
        <section className="aa-section">
          <div className="aa-intro">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Institutional Recognition</h2>
              <p>
                Over the years, Shree Ram Public School has been honored with
                numerous accolades for its commitment to educational excellence.
              </p>
            </motion.div>
          </div>

          <div className="aa-awards-grid">
            {SCHOOL_AWARDS.map((award, index) => (
              <motion.div
                key={index}
                className="aa-award-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="aa-award-year">{award.year}</span>
                <div className="aa-award-icon">{award.icon}</div>
                <h3>{award.title}</h3>
                <p className="aa-award-org">{award.organization}</p>
                <p className="aa-award-desc">{award.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Student Achievements */}
        <section className="aa-student-section">
          <div className="aa-student-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Student Achievements</h2>
            </motion.div>

            {STUDENT_ACHIEVEMENTS.map((category, catIndex) => (
              <div key={catIndex} className="aa-category">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3>{category.category}</h3>
                </motion.div>
                <div className="aa-achievements-grid">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      className="aa-achievement-card"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: itemIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <p className="aa-achievement-title">{item.title}</p>
                      <p className="aa-achievement-student">{item.student}</p>
                      <p className="aa-achievement-marks">
                        {item.year} • {item.marks}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Alumni Success */}
        <section className="aa-section aa-alumni">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Our Proud Alumni</h2>
          </motion.div>

          <div className="aa-alumni-grid">
            {ALUMNI_SUCCESS.map((alumni, index) => (
              <motion.div
                key={index}
                className="aa-alumni-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="aa-alumni-img">
                  <img src={alumni.image} alt={alumni.name} />
                </div>
                <h4>{alumni.name}</h4>
                <p className="aa-alumni-batch">Batch of {alumni.batch}</p>
                <p className="aa-alumni-achievement">{alumni.achievement}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

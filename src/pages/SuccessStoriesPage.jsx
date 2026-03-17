import { motion } from "framer-motion";
import {
  FaQuoteLeft,
  FaUniversity,
  FaBriefcase,
  FaStethoscope,
  FaFlask,
  FaCode,
  FaGraduationCap,
  FaAward,
} from "react-icons/fa";

const SUCCESS_STORIES = [
  {
    name: "Dr. Priya Sharma",
    batch: "2015",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    achievement: "Doctor (MBBS, AIIMS Delhi)",
    story:
      "SRPS shaped my personality and gave me the confidence to pursue my dreams. The teachers' guidance and moral education helped me become not just a successful doctor but a compassionate human being.",
    quote:
      "The discipline and values I learned at SRPS continue to guide me in my medical career.",
  },
  {
    name: "Amit Kumar Singh",
    batch: "2018",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    achievement: "Software Engineer, Google India",
    story:
      "From coding clubs to science fairs, SRPS provided the perfect platform to explore my interest in technology. The supportive faculty encouraged me to think innovatively.",
    quote:
      "Every problem is an opportunity to learn - a lesson I learned at SRPS that drives my work today.",
  },
  {
    name: "Anjali Gupta",
    batch: "2016",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    achievement: "Chartered Accountant",
    story:
      "The strong academic foundation at SRPS helped me clear CA exams in first attempt. The competitive environment prepared me well for professional challenges.",
    quote:
      "SRPS taught me that success is 1% inspiration and 99% perspiration.",
  },
  {
    name: "Rahul Verma",
    batch: "2019",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    achievement: "IIT Kharagpur (B.Tech)",
    story:
      "The rigorous academics and dedicated teachers at SRPS made my IIT dreams come true. The lab facilities and project-based learning were exceptional.",
    quote:
      "My journey from SRPS to IIT was smooth because of the solid foundation built here.",
  },
  {
    name: "Sanya Kapoor",
    batch: "2017",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    achievement: "Research Scientist, ISRO",
    story:
      "The science teachers at SRPS ignited my passion for space science. Participating in national science olympiads at school level gave me the exposure I needed.",
    quote:
      "Dream big and work hard - the mantra I adopted from my SRPS teachers.",
  },
  {
    name: "Vikram Singh",
    batch: "2020",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    achievement: "MBA, IIM Lucknow",
    story:
      "Beyond academics, SRPS taught me leadership through various extracurricular activities. The NCC training instilled discipline that helps me even today.",
    quote:
      "SRPS is not just a school, it's a launching pad for future leaders.",
  },
];

const STATS = [
  { icon: <FaGraduationCap />, value: "500+", label: "Alumni Worldwide" },
  { icon: <FaUniversity />, value: "50+", label: "IIT/Medical/NIT Students" },
  { icon: <FaBriefcase />, value: "100+", label: "Corporate Leaders" },
  { icon: <FaAward />, value: "95%", label: "Higher Education Rate" },
];

const FIELDS = [
  { icon: <FaStethoscope />, name: "Medical", count: "25+" },
  { icon: <FaCode />, name: "Engineering", count: "80+" },
  { icon: <FaBriefcase />, name: "Commerce/Business", count: "45+" },
  { icon: <FaFlask />, name: "Research", count: "15+" },
];

export default function SuccessStoriesPage() {
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
        
        .ss-page {
          font-family: 'Jost', sans-serif;
          color: var(--text-dark);
          background: var(--bg-light);
        }
        
        .ss-hero {
          position: relative;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          padding: 100px 24px 80px;
          text-align: center;
          overflow: hidden;
        }
        
        .ss-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1950&q=80') center/cover;
          opacity: 0.1;
        }
        
        .ss-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .ss-badge {
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
        
        .ss-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.15;
        }
        
        .ss-hero p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .ss-section {
          padding: 80px 24px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        /* Stats */
        .ss-stats {
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          padding: 60px 24px;
          border-radius: 24px;
          margin-bottom: 60px;
        }
        
        .ss-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          text-align: center;
        }
        
        @media (max-width: 768px) {
          .ss-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .ss-stat-item {
          color: #fff;
        }
        
        .ss-stat-icon {
          font-size: 2rem;
          color: var(--accent);
          margin-bottom: 12px;
        }
        
        .ss-stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 8px;
        }
        
        .ss-stat-label {
          font-size: 0.85rem;
          opacity: 0.8;
        }
        
        /* Fields */
        .ss-fields {
          margin-bottom: 60px;
        }
        
        .ss-fields h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 40px;
          text-align: center;
        }
        
        .ss-fields-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        
        @media (max-width: 768px) {
          .ss-fields-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        .ss-field-card {
          background: #fff;
          border-radius: 16px;
          padding: 28px 20px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          transition: transform 0.3s;
        }
        
        .ss-field-card:hover {
          transform: translateY(-4px);
        }
        
        .ss-field-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--bg-cream);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 1.4rem;
          color: var(--primary);
        }
        
        .ss-field-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          color: var(--primary-dark);
          margin: 0 0 4px;
        }
        
        .ss-field-count {
          color: var(--accent-dark);
          font-weight: 700;
          font-size: 0.9rem;
        }
        
        /* Stories */
        .ss-stories h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 50px;
          text-align: center;
        }
        
        .ss-stories-grid {
          display: grid;
          gap: 32px;
        }
        
        .ss-story-card {
          background: #fff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 36px;
          align-items: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .ss-story-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        }
        
        @media (max-width: 900px) {
          .ss-story-card {
            grid-template-columns: 1fr;
            text-align: center;
          }
        }
        
        .ss-story-img {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          overflow: hidden;
          border: 5px solid var(--bg-cream);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          flex-shrink: 0;
        }
        
        .ss-story-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .ss-story-content {
          position: relative;
        }
        
        .ss-quote-icon {
          position: absolute;
          top: -10px;
          left: -5px;
          font-size: 3rem;
          color: var(--accent);
          opacity: 0.3;
          font-family: serif;
        }
        
        .ss-story-content h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          color: var(--primary-dark);
          margin: 0 0 4px;
        }
        
        .ss-story-batch {
          color: var(--accent-dark);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 8px;
        }
        
        .ss-story-achievement {
          color: var(--primary);
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 16px;
        }
        
        .ss-story-text {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 16px;
          font-style: italic;
        }
        
        .ss-story-quote {
          background: var(--bg-cream);
          padding: 16px 20px;
          border-radius: 12px;
          border-left: 4px solid var(--accent);
        }
        
        .ss-story-quote p {
          color: var(--primary-dark);
          font-size: 0.9rem;
          font-style: italic;
          margin: 0;
        }
        
        /* CTA */
        .ss-cta {
          background: var(--bg-cream);
          padding: 80px 24px;
          text-align: center;
          margin-top: 60px;
        }
        
        .ss-cta-inner {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .ss-cta h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          color: var(--primary-dark);
          margin: 0 0 16px;
        }
        
        .ss-cta p {
          color: var(--text-muted);
          margin: 0 0 28px;
        }
        
        .ss-cta-btn {
          display: inline-block;
          background: var(--primary);
          color: #fff;
          padding: 14px 32px;
          border-radius: 3rem;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background 0.3s, transform 0.2s;
        }
        
        .ss-cta-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .ss-hero { padding: 80px 20px 60px; }
          .ss-section { padding: 60px 20px; }
          .ss-stats { padding: 40px 20px; border-radius: 16px; }
        }
      `}</style>

      <div className="ss-page">
        {/* Hero Section */}
        <section className="ss-hero">
          <div className="ss-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="ss-badge">Inspiring Journeys</span>
              <h1>Success Stories</h1>
              <p>
                Celebrating the remarkable achievements of our alumni who have
                made their mark across the globe.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="ss-section">
          <motion.div
            className="ss-stats"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="ss-stats-grid">
              {STATS.map((stat, index) => (
                <motion.div
                  key={index}
                  className="ss-stat-item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="ss-stat-icon">{stat.icon}</div>
                  <div className="ss-stat-value">{stat.value}</div>
                  <div className="ss-stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Career Fields */}
          <div className="ss-fields">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Career Paths of Our Alumni</h2>
            </motion.div>
            <div className="ss-fields-grid">
              {FIELDS.map((field, index) => (
                <motion.div
                  key={index}
                  className="ss-field-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="ss-field-icon">{field.icon}</div>
                  <h3>{field.name}</h3>
                  <p className="ss-field-count">{field.count} Alumni</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Success Stories */}
          <div className="ss-stories">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Alumni Spotlight</h2>
            </motion.div>
            <div className="ss-stories-grid">
              {SUCCESS_STORIES.map((story, index) => (
                <motion.div
                  key={index}
                  className="ss-story-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="ss-story-img">
                    <img src={story.image} alt={story.name} />
                  </div>
                  <div className="ss-story-content">
                    <FaQuoteLeft className="ss-quote-icon" />
                    <h3>{story.name}</h3>
                    <p className="ss-story-batch">Batch of {story.batch}</p>
                    <p className="ss-story-achievement">{story.achievement}</p>
                    <p className="ss-story-text">"{story.story}"</p>
                    <div className="ss-story-quote">
                      <p>"{story.quote}"</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <section className="ss-cta">
            <div className="ss-cta-inner">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3>Share Your Success Story</h3>
                <p>
                  Are you an SRPS alumnus? We'd love to hear about your journey
                  and achievements.
                </p>
                <a href="/contact" className="ss-cta-btn">
                  Contact Us
                </a>
              </motion.div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

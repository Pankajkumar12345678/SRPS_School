import { motion } from "framer-motion";
import {
  FaBuilding,
  FaLaptop,
  FaFlask,
  FaBook,
  FaFootballBall,
  FaMusic,
  FaPalette,
  FaWifi,
  FaChair,
  FaDesktop,
  FaDumbbell,
  FaBus,
  FaTree,
  FaParking,
  FaFirstAid,
  FaVideo,
  FaGraduationCap,
  FaLightbulb,
} from "react-icons/fa";

const CAMPUS_FEATURES = [
  {
    category: "Academic Infrastructure",
    icon: <FaGraduationCap />,
    items: [
      {
        name: "Smart Classrooms",
        desc: "Digital boards, AC rooms, and interactive learning tools",
        image:
          "https://images.unsplash.com/photo-1588072432836-e100327ed50e?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Science Laboratories",
        desc: "Fully equipped Physics, Chemistry, and Biology labs",
        image:
          "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Computer Lab",
        desc: "50+ nodes with high-speed internet and latest software",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Library",
        desc: "5,000+ books, periodicals, and digital resources",
        image:
          "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    category: "Sports Infrastructure",
    icon: <FaFootballBall />,
    items: [
      {
        name: "Sports Ground",
        desc: "Full-size playground for athletics and team sports",
        image:
          "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Basketball Court",
        desc: "Professional outdoor basketball court",
        image:
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Indoor Games Hall",
        desc: "Table tennis, carrom, chess, and more",
        image:
          "https://images.unsplash.com/photo-1518467166778-b88f373ff434?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Yoga Center",
        desc: "Dedicated space for yoga and meditation",
        image:
          "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    category: "Arts & Culture",
    icon: <FaMusic />,
    items: [
      {
        name: "Music Room",
        desc: "Instruments for classical and modern music training",
        image:
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Art & Craft Studio",
        desc: "Painting, drawing, and craft activities",
        image:
          "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Dance Hall",
        desc: "Space for classical and contemporary dance",
        image:
          "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Auditorium",
        desc: "600-seat hall for events and assemblies",
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    category: "Support Facilities",
    icon: <FaChair />,
    items: [
      {
        name: "Cafeteria",
        desc: "Hygienic food served in clean environment",
        image:
          "https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Medical Room",
        desc: "First aid and health check-ups available",
        image:
          "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Transport",
        desc: "Safe and monitored school buses",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Security",
        desc: "CCTV surveillance and trained security personnel",
        image:
          "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

const CAMPUS_SPECS = [
  { label: "Total Area", value: "2 Acres" },
  { label: "Built-up Area", value: "50,000 sq ft" },
  { label: "Classrooms", value: "40+" },
  { label: "Labs", value: "4" },
  { label: "Library Books", value: "5,000+" },
  { label: "Computer Nodes", value: "50+" },
  { label: "Bus Fleet", value: "12" },
  { label: "CCTV Cameras", value: "25+" },
];

export default function InfrastructurePage() {
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
        
        .infra-page {
          font-family: 'Jost', sans-serif;
          color: var(--text-dark);
          background: var(--bg-light);
        }
        
        .infra-hero {
          position: relative;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          padding: 100px 24px 80px;
          text-align: center;
          overflow: hidden;
        }
        
        .infra-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1950&q=80') center/cover;
          opacity: 0.1;
        }
        
        .infra-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .infra-badge {
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
        
        .infra-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.15;
        }
        
        .infra-hero p {
          color: rgba(255,255,255,0.8);
          font-size: 1.1rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }
        
        /* Campus Overview */
        .infra-overview {
          background: var(--primary-dark);
          padding: 60px 24px;
        }
        
        .infra-specs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .infra-spec {
          text-align: center;
        }
        
        .infra-spec-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--accent);
        }
        
        .infra-spec-label {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        /* Sections */
        .infra-section {
          padding: 80px 24px;
          max-width: 1300px;
          margin: 0 auto;
        }
        
        .infra-intro {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .infra-intro h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 16px;
        }
        
        .infra-intro p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.8;
          max-width: 700px;
          margin: 0 auto;
        }
        
        /* Category Section */
        .infra-category {
          margin-bottom: 80px;
        }
        
        .infra-category-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
        }
        
        .infra-category-icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #fff;
        }
        
        .infra-category h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          color: var(--primary-dark);
          margin: 0;
        }
        
        .infra-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        
        .infra-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .infra-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.12);
        }
        
        .infra-card-img {
          height: 180px;
          overflow: hidden;
          position: relative;
        }
        
        .infra-card-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        
        .infra-card:hover .infra-card-img img {
          transform: scale(1.08);
        }
        
        .infra-card-img::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);
        }
        
        .infra-card-body {
          padding: 24px;
        }
        
        .infra-card h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: var(--primary-dark);
          margin: 0 0 8px;
        }
        
        .infra-card p {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
          margin: 0;
        }
        
        /* Features */
        .infra-features {
          background: var(--bg-cream);
          padding: 80px 24px;
          margin-bottom: 60px;
        }
        
        .infra-features-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .infra-features h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: var(--primary-dark);
          margin: 0 0 50px;
          text-align: center;
        }
        
        .infra-features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 28px;
        }
        
        .infra-feature-item {
          background: #fff;
          border-radius: 16px;
          padding: 28px;
          text-align: center;
          border: 1px solid rgba(0,0,0,0.08);
          transition: all 0.3s;
        }
        
        .infra-feature-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.1);
        }
        
        .infra-feature-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 18px;
          font-size: 1.4rem;
          color: #fff;
        }
        
        .infra-feature-item h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          color: var(--primary-dark);
          margin: 0 0 8px;
        }
        
        .infra-feature-item p {
          color: var(--text-muted);
          font-size: 0.85rem;
          line-height: 1.6;
          margin: 0;
        }
        
        /* Campus Life */
        .infra-campus {
          background: var(--primary-dark);
          padding: 80px 24px;
        }
        
        .infra-campus-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        
        .infra-campus h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          color: #fff;
          margin: 0 0 40px;
          text-align: center;
        }
        
        .infra-campus-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        
        .infra-campus-item {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 16/10;
        }
        
        .infra-campus-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        
        .infra-campus-item:hover img {
          transform: scale(1.08);
        }
        
        .infra-campus-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(19,79,92,0.9) 0%, transparent 60%);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 24px;
        }
        
        .infra-campus-overlay h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: #fff;
          margin: 0 0 4px;
        }
        
        .infra-campus-overlay p {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.7);
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .infra-hero { padding: 80px 20px 60px; }
          .infra-section { padding: 60px 20px; }
          .infra-features { padding: 60px 20px; }
          .infra-campus { padding: 60px 20px; }
        }
      `}</style>

      <div className="infra-page">
        {/* Hero Section */}
        <section className="infra-hero">
          <div className="infra-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="infra-badge">World-Class Infrastructure</span>
              <h1>Our Infrastructure</h1>
              <p>
                State-of-the-art facilities designed to support holistic
                development and enhance learning experiences.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Campus Overview Stats */}
        <section className="infra-overview">
          <div className="infra-specs">
            {CAMPUS_SPECS.map((spec, index) => (
              <motion.div
                key={index}
                className="infra-spec"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="infra-spec-value">{spec.value}</div>
                <div className="infra-spec-label">{spec.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Infrastructure Sections */}
        <section className="infra-section">
          <div className="infra-intro">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>State-of-the-Art Facilities</h2>
              <p>
                Our campus is equipped with modern amenities to ensure the best
                possible environment for learning and growth.
              </p>
            </motion.div>
          </div>

          {CAMPUS_FEATURES.map((category, catIndex) => (
            <div key={catIndex} className="infra-category">
              <motion.div
                className="infra-category-header"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="infra-category-icon">{category.icon}</div>
                <h2>{category.category}</h2>
              </motion.div>

              <div className="infra-grid">
                {category.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    className="infra-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: itemIndex * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="infra-card-img">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="infra-card-body">
                      <h3>{item.name}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Additional Features */}
        <section className="infra-features">
          <div className="infra-features-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Technology & Safety</h2>
            </motion.div>
            <div className="infra-features-grid">
              {[
                {
                  icon: <FaWifi />,
                  title: "Campus WiFi",
                  desc: "High-speed internet connectivity across the entire campus",
                },
                {
                  icon: <FaDesktop />,
                  title: "Smart Boards",
                  desc: "Interactive digital learning in every classroom",
                },
                {
                  icon: <FaVideo />,
                  title: "24/7 Security",
                  desc: "CCTV surveillance and trained security personnel",
                },
                {
                  icon: <FaDumbbell />,
                  title: "Gymnasium",
                  desc: "Well-equipped fitness center for staff and students",
                },
                {
                  icon: <FaBus />,
                  title: "Transport",
                  desc: "GPS-enabled buses covering all major routes",
                },
                {
                  icon: <FaFirstAid />,
                  title: "Medical Facility",
                  desc: "Full-time nurse and first aid available",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="infra-feature-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="infra-feature-icon">{feature.icon}</div>
                  <h4>{feature.title}</h4>
                  <p>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Life */}
        <section className="infra-campus">
          <div className="infra-campus-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>Life on Campus</h2>
            </motion.div>
            <div className="infra-campus-grid">
              {[
                {
                  title: "Lush Green Campus",
                  desc: "Beautiful gardens and open spaces",
                  img: "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?auto=format&fit=crop&w=800&q=80",
                },
                {
                  title: "Modern Classrooms",
                  desc: "Smart learning environment",
                  img: "https://images.unsplash.com/photo-1588072432836-e100327ed50e?auto=format&fit=crop&w=800&q=80",
                },
                {
                  title: "Sports Facilities",
                  desc: "Excellence in athletics",
                  img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
                },
                {
                  title: "Cultural Activities",
                  desc: "Holistic development",
                  img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="infra-campus-item"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img src={item.img} alt={item.title} />
                  <div className="infra-campus-overlay">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

export default function InfoHubPageTemplate({
  badge,
  title,
  subtitle,
  heroImage,
  stats,
  cards,
  timelineTitle,
  timelineItems,
  resourceTitle,
  resources,
  ctaTitle,
  ctaText,
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Jost:wght@300;400;500;600;700&display=swap');

        :root {
          --ih-primary: #1B6B7A;
          --ih-primary-dark: #134F5C;
          --ih-accent: #E8B97A;
          --ih-bg: #FAF9F6;
          --ih-bg-soft: #F4EFE6;
          --ih-text: #1E293B;
          --ih-muted: #64748B;
          --ih-line: #E2E8F0;
        }

        .ih-page {
          font-family: 'Jost', sans-serif;
          background: var(--ih-bg);
          color: var(--ih-text);
        }

        .ih-hero {
          position: relative;
          overflow: hidden;
          padding: 96px 24px 86px;
          text-align: center;
          background: linear-gradient(130deg, var(--ih-primary-dark) 0%, var(--ih-primary) 100%);
        }

        .ih-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(8,27,36,0.74), rgba(8,27,36,0.58)), url(${heroImage}) center/cover;
          opacity: 0.88;
        }

        .ih-hero-content {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
        }

        .ih-badge {
          display: inline-block;
          padding: 7px 20px;
          border-radius: 999px;
          background: var(--ih-accent);
          color: #5A3A1A;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 18px;
        }

        .ih-hero h1 {
          margin: 0 0 14px;
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.3rem, 4.8vw, 4rem);
          line-height: 1.12;
          font-weight: 700;
        }

        .ih-hero p {
          margin: 0 auto;
          max-width: 740px;
          color: rgba(255,255,255,0.86);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .ih-body {
          max-width: 1180px;
          margin: -42px auto 0;
          padding: 0 24px 84px;
          position: relative;
          z-index: 2;
        }

        .ih-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
          margin-bottom: 30px;
        }

        .ih-stat {
          background: rgba(255,255,255,0.95);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 16px;
          padding: 20px 16px;
          text-align: center;
          backdrop-filter: blur(12px);
          box-shadow: 0 12px 28px rgba(15,23,42,0.08);
        }

        .ih-stat strong {
          display: block;
          font-size: 1.5rem;
          color: var(--ih-primary-dark);
          margin-bottom: 5px;
        }

        .ih-stat span {
          color: var(--ih-muted);
          font-size: 0.92rem;
        }

        .ih-grid {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 24px;
          margin-bottom: 28px;
        }

        .ih-panel {
          background: #fff;
          border-radius: 20px;
          border: 1px solid var(--ih-line);
          box-shadow: 0 12px 32px rgba(15,23,42,0.07);
          padding: 26px;
        }

        .ih-panel h2 {
          margin: 0 0 16px;
          font-family: 'Cormorant Garamond', serif;
          color: var(--ih-primary-dark);
          font-size: 2rem;
          line-height: 1.1;
        }

        .ih-cards {
          display: grid;
          gap: 14px;
        }

        .ih-card {
          border: 1px solid var(--ih-line);
          border-radius: 14px;
          padding: 16px;
          background: linear-gradient(160deg, #ffffff 0%, #f8fbfd 100%);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .ih-card:hover {
          transform: translateY(-4px);
          border-color: rgba(27,107,122,0.3);
          box-shadow: 0 14px 28px rgba(27,107,122,0.15);
        }

        .ih-card-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .ih-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          background: linear-gradient(135deg, var(--ih-primary-dark), var(--ih-primary));
        }

        .ih-card h3 {
          margin: 0;
          font-size: 1.04rem;
          color: #0F172A;
        }

        .ih-card p {
          margin: 0;
          color: var(--ih-muted);
          line-height: 1.62;
          font-size: 0.95rem;
        }

        .ih-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
        }

        .ih-list li {
          padding: 12px 14px;
          border-radius: 12px;
          background: var(--ih-bg-soft);
          border: 1px solid #eadfcd;
          font-size: 0.94rem;
          color: #475569;
        }

        .ih-timeline {
          display: grid;
          gap: 12px;
        }

        .ih-item {
          border: 1px solid var(--ih-line);
          border-radius: 14px;
          padding: 14px;
          background: #fff;
          display: grid;
          grid-template-columns: 132px 1fr;
          gap: 14px;
          align-items: start;
        }

        .ih-item-tag {
          background: #E9F5F7;
          color: #0C5B68;
          border: 1px solid #B5D9DF;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 7px 10px;
          text-align: center;
        }

        .ih-item h4 {
          margin: 0 0 5px;
          font-size: 1rem;
          color: #0F172A;
        }

        .ih-item small {
          display: inline-block;
          color: #155E75;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .ih-item p {
          margin: 0;
          color: var(--ih-muted);
          line-height: 1.6;
          font-size: 0.93rem;
        }

        .ih-cta {
          margin-top: 24px;
          border-radius: 20px;
          padding: 28px;
          background: linear-gradient(135deg, #124452 0%, #1B6B7A 60%, #2A8D9D 100%);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow: 0 18px 34px rgba(13,63,74,0.28);
        }

        .ih-cta h3 {
          margin: 0 0 10px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
        }

        .ih-cta p {
          margin: 0;
          color: rgba(255,255,255,0.86);
          line-height: 1.7;
          max-width: 840px;
        }

        @media (max-width: 1024px) {
          .ih-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .ih-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .ih-hero {
            padding: 84px 16px 72px;
          }

          .ih-body {
            padding: 0 16px 70px;
          }

          .ih-item {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .ih-item-tag {
            width: fit-content;
          }
        }
      `}</style>

      <div className="ih-page">
        <section className="ih-hero">
          <motion.div className="ih-hero-content" {...fadeUp}>
            <span className="ih-badge">{badge}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </motion.div>
        </section>

        <section className="ih-body">
          <motion.div className="ih-stats" {...fadeUp}>
            {stats.map((stat) => (
              <div className="ih-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <div className="ih-grid">
            <motion.article className="ih-panel" {...fadeUp}>
              <h2>Key Highlights</h2>
              <div className="ih-cards">
                {cards.map((card) => (
                  <div className="ih-card" key={card.title}>
                    <div className="ih-card-top">
                      <span className="ih-icon">{card.icon}</span>
                      <h3>{card.title}</h3>
                    </div>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            </motion.article>

            <motion.article className="ih-panel" {...fadeUp}>
              <h2>{resourceTitle}</h2>
              <ul className="ih-list">
                {resources.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          </div>

          <motion.article className="ih-panel" {...fadeUp}>
            <h2>{timelineTitle}</h2>
            <div className="ih-timeline">
              {timelineItems.map((item) => (
                <div className="ih-item" key={`${item.tag}-${item.title}`}>
                  <div className="ih-item-tag">{item.tag}</div>
                  <div>
                    <h4>{item.title}</h4>
                    <small>{item.meta}</small>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.article className="ih-cta" {...fadeUp}>
            <h3>{ctaTitle}</h3>
            <p>{ctaText}</p>
          </motion.article>
        </section>
      </div>
    </>
  );
}

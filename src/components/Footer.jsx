import { Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+3:wght@300;400;600;700&display=swap');

        .footer-wrap {
          background: linear-gradient(160deg, #0d4a50 0%, #1a6b72 100%);
          position: relative;
        }

        /* diagonal stripe texture */
        .footer-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            -45deg, transparent, transparent 18px,
            rgba(255,255,255,0.025) 18px, rgba(255,255,255,0.025) 20px
          );
          pointer-events: none;
        }

        .footer-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 56px 24px 0;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
          gap: 40px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(232,185,106,0.2);
        }

        .footer-col h4 {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.05rem;
          color: #e8b96a;
          margin-bottom: 18px;
          padding-bottom: 8px;
          border-bottom: 2px solid rgba(232,185,106,0.3);
          display: inline-block;
        }

        /* Brand / logo col */
        .brand-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 6px;
        }
        .brand-since {
          display: inline-block;
          background: #e8b96a;
          color: #0d4a50;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 2px 10px;
          border-radius: 20px;
          margin-bottom: 16px;
        }
        .brand-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.65);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        /* Contact items */
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 12px;
          font-size: 13px;
          color: rgba(255,255,255,0.72);
          line-height: 1.5;
        }
        .contact-icon {
          color: #e8b96a;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Nav links */
        .footer-link {
          display: block;
          font-size: 13px;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          padding: 5px 0;
          transition: color 0.2s, padding-left 0.2s;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .footer-link:hover { color: #e8b96a; padding-left: 6px; }

        /* App store buttons */
        .app-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #111;
          border: 1.5px solid rgba(255,255,255,0.18);
          color: #fff;
          padding: 9px 16px;
          border-radius: 10px;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          font-family: 'Open Sans', sans-serif;
          min-width: 140px;
        }
        .app-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
          border-color: rgba(255,255,255,0.35);
        }
        .app-btn-icon { font-size: 26px; flex-shrink: 0; line-height: 1; }
        .app-btn-text { display: flex; flex-direction: column; }
        .app-btn-sub { font-size: 9px; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.8px; line-height: 1; margin-bottom: 3px; }
        .app-btn-name { font-size: 14px; font-weight: 700; color: #fff; line-height: 1; }

        .school-code {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          margin-top: 14px;
          margin-bottom: 16px;
        }
        .school-code span { color: #e8b96a; font-weight: 700; }

        /* Social icons */
        .social-row { display: flex; gap: 10px; }
        .social-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(232,185,106,0.35);
          color: rgba(255,255,255,0.8);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .social-btn:hover { background: #e8b96a; color: #0d4a50; transform: translateY(-3px); }

        /* Bottom bar */
        .footer-bottom {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .footer-bottom p { font-size: 12px; color: rgba(255,255,255,0.4); letter-spacing: 0.5px; }
        .footer-bottom a { color: rgba(232,185,106,0.7); text-decoration: none; }
        .footer-bottom a:hover { color: #e8b96a; }

        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>

      {/* Curved wave top */}
      <div style={{ lineHeight: 0, background: "#f5efe0" }}>
        <svg
          viewBox="0 0 1440 70"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 70 }}
        >
          <path d="M0,50 C480,0 960,70 1440,25 L1440,0 L0,0 Z" fill="#0d4a50" />
        </svg>
      </div>

      <div className="footer-wrap">
        <div className="footer-inner">
          <div className="footer-grid">
            {/* ── Col 1: Brand ── */}
            <div className="footer-col">
              <div className="brand-name">Shree Ram Public School</div>
              <div className="brand-since">Since 2012</div>
              <p className="brand-desc">
                Nurturing bright minds through a rigorous CBSE curriculum
                blended with innovation, creativity, and character-building.
              </p>
              <div className="contact-item">
                <FiMapPin className="contact-icon" size={14} />
                <span>Kanhra-Badhra Road, Charkhi Dadri, Haryana 127306</span>
              </div>
              <div className="contact-item">
                <FiPhone className="contact-icon" size={14} />
                <span>+91 12345 67890</span>
              </div>
              <div className="contact-item">
                <FiMail className="contact-icon" size={14} />
                <span>info@srpskanhra.com</span>
              </div>
            </div>

            {/* ── Col 2: Site Map ── */}
            <div className="footer-col">
              <h4>Site Map</h4>
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/academic", label: "Academic" },
                { to: "/student-life", label: "Student Life" },
                { to: "/admissions", label: "Admissions" },
                { to: "/gallery", label: "Gallery" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── Col 3: Quick Links ── */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              {[
                { to: "/gallery", label: "Gallery" },
                { to: "/mandatory-disclosure", label: "Mandatory Disclosure" },
                { to: "/cyber-security", label: "Cyber Security" },
                { to: "/careers", label: "Careers" },
                { to: "/contact", label: "Contact Us" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── Col 4: App & Social ── */}
            <div className="footer-col">
              <h4>Download App</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 0,
                }}
              >
                <a href="#" className="app-btn">
                  <span className="app-btn-icon">
                    {/* Google Play icon SVG */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.18 1.14C2.83 1.5 2.62 2.06 2.62 2.79v18.42c0 .73.21 1.29.56 1.65l.09.08 10.32-10.32v-.24L3.27 1.06l-.09.08z"
                        fill="#EA4335"
                      />
                      <path
                        d="M17.02 15.52l-3.44-3.44v-.24l3.44-3.44.08.04 4.07 2.32c1.16.66 1.16 1.74 0 2.4l-4.07 2.32-.08.04z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M17.1 15.48L13.59 12 3.18 22.41c.38.4.98.45 1.66.08l12.26-7.01z"
                        fill="#34A853"
                      />
                      <path
                        d="M17.1 8.52L4.84 1.51C4.16 1.14 3.56 1.19 3.18 1.59L13.59 12l3.51-3.48z"
                        fill="#4285F4"
                      />
                    </svg>
                  </span>
                  <span className="app-btn-text">
                    <span className="app-btn-sub">Get it on</span>
                    <span className="app-btn-name">Google Play</span>
                  </span>
                </a>
                <a href="#" className="app-btn">
                  <span className="app-btn-icon">
                    {/* Apple icon SVG */}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </span>
                  <span className="app-btn-text">
                    <span className="app-btn-sub">Download on the</span>
                    <span className="app-btn-name">App Store</span>
                  </span>
                </a>
              </div>
              <p className="school-code">
                School Code: <span>SRPS123</span>
              </p>
              <h4 style={{ marginTop: 4 }}>Follow Us</h4>
              <div className="social-row">
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@shreeramschoolkanhra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="YouTube"
                  style={{
                    background: "#FF0000",
                    border: "none",
                    color: "#fff",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C17.4 2.7 12 2.7 12 2.7s-5.4 0-8.3.2c-.4.1-1.4.1-2.3 1-.7.7-.9 2.3-.9 2.3S.2 8 .2 9.8v1.7c0 1.8.3 3.6.3 3.6s.2 1.6.9 2.3c.9.9 2 .9 2.6 1C5.6 18.6 12 18.6 12 18.6s5.4 0 8.3-.2c.4-.1 1.4-.1 2.3-1 .7-.7.9-2.3.9-2.3s.3-1.8.3-3.6V9.8c0-1.8-.3-3.6-.3-3.6zM9.7 14.7V8.6l6.3 3.1-6.3 3z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/srpskanhracharkhidadri/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Instagram"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 110%, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                    border: "none",
                    color: "#fff",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/srpskanhra2014/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Facebook"
                  style={{
                    background: "#1877F2",
                    border: "none",
                    color: "#fff",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                </a>
                {/* Website */}
                <a
                  href="https://srpskanhra.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label="Website"
                  style={{
                    background: "#1a6b72",
                    border: "1.5px solid #e8b96a",
                    color: "#e8b96a",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>© 2024 Shree Ram Public School. All Rights Reserved.</p>
          <p>
            Powered by <a href="#">SRPS Tech</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

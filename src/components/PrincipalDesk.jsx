import React from "react";
import { motion } from "framer-motion";

const PARAGRAPHS = [
  `At Shree Ram Public School, we believe in the transformative power of education. Our mission is to empower young minds, nurturing them to reach their full potential and contribute meaningfully to society.`,
  `We create an environment where curiosity is encouraged, creativity is celebrated, and lifelong learning is embraced. Our dedicated faculty and comprehensive curriculum ensure every student receives a well-rounded education.`,
  `As the principal, I am honored to lead a community committed to excellence. Together we inspire, innovate, and ignite a passion for learning. May each student discover the brilliance of knowledge every day.`,
];

export default function PrincipalDesk() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');
        @media (max-width: 700px) {
          .pd-grid { grid-template-columns: 1fr !important; }
          .pd-img-wrap { margin-bottom: 48px; }
        }
      `}</style>

      <section
        style={{
          background: "#f9f6f1",
          padding: "80px 24px",
          fontFamily: "'Source Serif 4', serif",
        }}
      >
        <div
          className="pd-grid"
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Image ── */}
          <motion.div
            className="pd-img-wrap"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ position: "relative" }}
          >
            {/* Teal shadow block */}
            <div
              style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                width: "100%",
                height: "100%",
                borderRadius: "4px",
                background: "#0E5F6B",
                zIndex: 0,
              }}
            />

            {/* Image container */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                borderRadius: "4px",
                overflow: "hidden",
                aspectRatio: "3/4",
              }}
            >
              <img
                src="/School_pic/NCC_Pic_36.JPEG"
                alt="Principal"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Fallback avatar */}
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

            {/* Name tag floating on image bottom */}
            <div
              style={{
                position: "absolute",
                bottom: "-16px",
                left: "20px",
                zIndex: 2,
                background: "#E8A830",
                padding: "10px 20px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "#fff",
                  margin: 0,
                  letterSpacing: "0.04em",
                }}
              >
                Principal Name
              </p>
              <p
                style={{
                  fontSize: "0.66rem",
                  color: "rgba(255,255,255,0.88)",
                  margin: "2px 0 0",
                  letterSpacing: "0.06em",
                }}
              >
                M.A., B.Ed., Ph.D.
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: Message ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ paddingTop: "8px" }}
          >
            <p
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#E8A830",
                margin: "0 0 10px",
              }}
            >
              From the Principal's Desk
            </p>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 2.8vw, 2.3rem)",
                fontWeight: 700,
                color: "#0E5F6B",
                lineHeight: 1.2,
                margin: "0 0 18px",
              }}
            >
              A Message of
              <br />
              <em style={{ fontStyle: "italic" }}>Vision & Excellence</em>
            </h2>

            <div
              style={{
                width: "44px",
                height: "3px",
                background: "#E8A830",
                marginBottom: "22px",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "13px",
                marginBottom: "22px",
              }}
            >
              {PARAGRAPHS.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    fontSize: "0.9rem",
                    color: "#555",
                    lineHeight: 1.85,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "0.88rem",
                color: "#0E5F6B",
                margin: "0 0 24px",
              }}
            >
              May God Bless and Guide Us All 🙏
            </p>

            <div
              style={{
                borderTop: "1px solid rgba(14,95,107,0.15)",
                paddingTop: "18px",
              }}
            >
              <svg
                width="110"
                height="30"
                viewBox="0 0 110 30"
                style={{ display: "block", marginBottom: "6px" }}
              >
                <path
                  d="M4 24 C14 8 26 20 38 14 C50 8 60 22 74 15 C85 9 96 22 107 13"
                  fill="none"
                  stroke="#0E5F6B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#0E5F6B",
                  margin: "0 0 2px",
                }}
              >
                Principal Name
              </p>
              <p
                style={{
                  fontSize: "0.7rem",
                  color: "#aaa",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                Principal, Shree Ram Public School (CBSE)
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
